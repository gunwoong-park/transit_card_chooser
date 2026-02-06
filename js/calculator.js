const K_PASS_METHODS = {
  original: "원래 K-패스(환급률)",
  moduGeneral: "모두카드 일반",
  moduPlus: "모두카드 플러스",
};

function getThreshold(table, userType, area) {
  if (!table[userType]) {
    return Number.POSITIVE_INFINITY;
  }
  return table[userType][area] ?? Number.POSITIVE_INFINITY;
}

function clampRefund(refund, monthlyCost) {
  if (!Number.isFinite(refund)) {
    return 0;
  }
  return Math.max(0, Math.min(refund, monthlyCost));
}

function calculateKpass(monthlyCost, userType, area) {
  const refundRate = K_PASS_POLICY.refundRates[userType] ?? 0.2;
  const regionalLimit = K_PASS_POLICY.regionalMaxLimits[area] ?? 0;

  const originalRefund = clampRefund(
    Math.min(monthlyCost * refundRate, regionalLimit),
    monthlyCost
  );

  const generalThreshold = getThreshold(K_PASS_POLICY.moduGeneralThresholds, userType, area);
  const moduGeneralRefund = clampRefund(monthlyCost - generalThreshold, monthlyCost);

  const plusThreshold = getThreshold(K_PASS_POLICY.moduPlusThresholds, userType, area);
  const moduPlusRefund = clampRefund(monthlyCost - plusThreshold, monthlyCost);

  const candidates = [
    { method: "original", refund: originalRefund },
    { method: "moduGeneral", refund: moduGeneralRefund },
    { method: "moduPlus", refund: moduPlusRefund },
  ];

  const best = candidates.reduce((prev, current) =>
    current.refund > prev.refund ? current : prev
  );

  return {
    cardName: "K-패스",
    estimatedBenefit: best.refund,
    netCost: monthlyCost - best.refund,
    method: best.method,
    methodLabel: K_PASS_METHODS[best.method],
  };
}

function calculateClimateCard(monthlyCost, userType, area) {
  const isAvailable = CLIMATE_CARD_POLICY.validAreas.includes(area);

  if (!isAvailable) {
    return {
      cardName: "기후동행카드",
      available: false,
      estimatedBenefit: 0,
      netCost: Number.POSITIVE_INFINITY,
      message: "기후동행카드는 서울 전용이라 현재 지역에서는 이용할 수 없어요.",
    };
  }

  const price = CLIMATE_CARD_POLICY.monthlyPrices[userType] ??
    CLIMATE_CARD_POLICY.monthlyPrices.general;

  return {
    cardName: "기후동행카드",
    available: true,
    estimatedBenefit: Math.max(monthlyCost - price, 0),
    netCost: price,
    message: "서울 전용 월 고정요금으로 이용할 수 있어요.",
  };
}

