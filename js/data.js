const K_PASS_POLICY = {
  refundRates: {
    general: 0.2,
    youth: 0.3,
    multiChild2: 0.3,
    senior: 0.3,
    multiChild3: 0.5,
    lowIncome: 0.533,
  },
  regionalMaxLimits: {
    seoul: 20000,
    metro: 24000,
    metro_gtx: 28000,
    non_metro: 18000,
  },
  moduGeneralThresholds: {
    general: { seoul: 60000, metro: 65000, metro_gtx: 70000, non_metro: 55000 },
    youth: { seoul: 55000, metro: 60000, metro_gtx: 65000, non_metro: 50000 },
    multiChild2: { seoul: 52000, metro: 57000, metro_gtx: 62000, non_metro: 47000 },
    multiChild3: { seoul: 48000, metro: 53000, metro_gtx: 58000, non_metro: 43000 },
    senior: { seoul: 55000, metro: 60000, metro_gtx: 65000, non_metro: 50000 },
    lowIncome: { seoul: 45000, metro: 50000, metro_gtx: 55000, non_metro: 40000 },
  },
  moduPlusThresholds: {
    general: { seoul: 75000, metro: 80000, metro_gtx: 85000, non_metro: 70000 },
    youth: { seoul: 70000, metro: 75000, metro_gtx: 80000, non_metro: 65000 },
    multiChild2: { seoul: 68000, metro: 73000, metro_gtx: 78000, non_metro: 63000 },
    multiChild3: { seoul: 64000, metro: 69000, metro_gtx: 74000, non_metro: 59000 },
    senior: { seoul: 70000, metro: 75000, metro_gtx: 80000, non_metro: 65000 },
    lowIncome: { seoul: 60000, metro: 65000, metro_gtx: 70000, non_metro: 55000 },
  },
};

const CLIMATE_CARD_POLICY = {
  monthlyPrices: {
    general: 65000,
    youth: 55000,
    multiChild2: 50000,
    multiChild3: 45000,
    senior: 55000,
    lowIncome: 45000,
  },
  validAreas: ["seoul"],
};

