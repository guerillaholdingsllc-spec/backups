export type CallType = 'STANDARD' | 'BARIATRIC' | 'TRAUMA' | 'BIOHAZARD' | 'GOVERNMENT' | 'ELITE';
export type Market = 'SACRAMENTO' | 'BAY_AREA' | 'RENO' | 'STOCKTON';
export type ActorType = 'DRIVER' | 'VENDOR' | 'ADMIN' | 'SYSTEM';
export type CallStatus = 'OPEN' | 'OFFERED' | 'ACCEPTED' | 'IN_PROGRESS' | 'DELIVERED' | 'CANCELLED';

export interface Offer {
  offerId: string;
  callId: string;
  callType: CallType;
  driverPay: number;
  companyShare: number;
  distanceKm: number;
  driverEligible: boolean;
  requiredCertName?: string;
  certPrice?: number;
  deltaPerCall?: number;
  ttlSeconds: number;
  market: Market;
}

export interface AuditLogEvent {
  id: string;
  callId: string;
  actorType: ActorType;
  actorId?: string;
  event:
    | 'CALL_CREATED'
    | 'OFFER_SENT'
    | 'OFFER_ACCEPTED'
    | 'ARRIVED'
    | 'PICKED_UP'
    | 'DEPARTED'
    | 'DELIVERED'
    | 'POD_SUBMITTED';
  timestamp: string;
  gps?: { lat: number; lng: number };
  evidence?: {
    photos?: { key: string; sha256: string }[];
    signature?: { key: string; sha256: string };
    documents?: { key: string; sha256: string }[];
  };
  hash: string;
  prevHash?: string;
}

