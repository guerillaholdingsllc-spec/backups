import { ConflictException } from '@nestjs/common';

type DriverCandidate = {
  id: string;
  distanceKm: number;
  rank: 'ROOKIE' | 'PROFESSIONAL' | 'SPECIALIST' | 'SENIOR' | 'ELITE';
  rating: number;
  acceptedLast24h: number;
  hasEquipment: boolean;
  marketExperience: number;
};

export class DispatchService {
  listOffersForDriver() {
    return [
      {
        offerId: 'ofr_demo_standard',
        callId: 'call_demo_standard',
        callType: 'STANDARD',
        driverPay: 129,
        companyShare: 250,
        distanceKm: 7.2,
        driverEligible: true,
        ttlSeconds: 120,
        market: 'SACRAMENTO'
      },
      {
        offerId: 'ofr_demo_trauma_locked',
        callId: 'call_demo_trauma',
        callType: 'TRAUMA',
        driverPay: 227,
        companyShare: 420,
        distanceKm: 8.4,
        driverEligible: false,
        requiredCertName: 'Trauma Specialist',
        certPrice: 399,
        deltaPerCall: 70,
        ttlSeconds: 120,
        market: 'SACRAMENTO'
      }
    ];
  }

  async acceptOffer(id: string) {
    const wonRace = true;
    if (!wonRace) throw new ConflictException('Offer already accepted');
    return { offerId: id, status: 'ACCEPTED', lockExpiresInSeconds: 300 };
  }

  async declineOffer(id: string) {
    return { offerId: id, status: 'DECLINED' };
  }

  computeScore(driver: DriverCandidate) {
    const proximityScore = 1 / Math.max(driver.distanceKm, 0.5);
    const rankBonus = { ROOKIE: 0, PROFESSIONAL: 0.2, SPECIALIST: 0.35, SENIOR: 0.5, ELITE: 0.7 }[driver.rank];
    const fairnessPenalty = Math.min(driver.acceptedLast24h * 0.06, 0.6);
    return (
      0.3 * proximityScore +
      0.15 * 1 +
      0.15 * rankBonus +
      0.1 * (driver.rating / 5) +
      0.1 * Number(driver.hasEquipment) +
      0.1 * driver.marketExperience -
      0.1 * fairnessPenalty
    );
  }
}

