export function calculateSplit(grossRate: number) {
  return {
    grossRate,
    companyShare: Math.round(grossRate * 0.65 * 100) / 100,
    driverShare: Math.round(grossRate * 0.35 * 100) / 100
  };
}

export function monthlyRevenue(input: {
  calls: number;
  avgRate: number;
  certRevenue: number;
  equipmentRental: number;
  storage: number;
  interstate: number;
  government: number;
}) {
  return input.calls * input.avgRate * 0.65 + input.certRevenue + input.equipmentRental + input.storage + input.interstate + input.government;
}

