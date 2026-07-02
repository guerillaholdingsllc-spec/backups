import { createHash } from 'crypto';

export class AuditService {
  hashEvent(payload: unknown, prevHash = '') {
    const canonical = JSON.stringify(payload, Object.keys(payload as object).sort());
    return createHash('sha256').update(`${canonical}${prevHash}`).digest('hex');
  }

  append(event: { callId: string; actorType: string; event: string; payload?: unknown; prevHash?: string }) {
    const hash = this.hashEvent(event, event.prevHash);
    return { ...event, hash, timestamp: new Date().toISOString() };
  }
}

