function calculateKpass(monthlyCost, userType, area) {
  const estimatedBenefit = Math.min(
    monthlyCost * K_PASS_POLICY.refundRate,
    K_PASS_POLICY.monthlyLimit
  );

  return {
    cardName: "K-패스",
    estimatedBenefit,
    netCost: monthlyCost - estimatedBenefit,
  };
}

function calculateClimateCard(monthlyCost, userType, area) {
  const estimatedBenefit = CLIMATE_CARD_POLICY.fixedBenefit;

  return {
    cardName: "기후동행카드",
    estimatedBenefit,
    netCost: monthlyCost - estimatedBenefit,
  };
}
