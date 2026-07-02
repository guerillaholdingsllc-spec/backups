export type FeatureFlag =
  | 'dispatch.multiWave'
  | 'pod.offlineDrafts'
  | 'certifications.fullAccessBundle'
  | 'billing.autoInvoice'
  | 'admin.lockOverride';

const defaults: Record<FeatureFlag, boolean> = {
  'dispatch.multiWave': true,
  'pod.offlineDrafts': true,
  'certifications.fullAccessBundle': true,
  'billing.autoInvoice': false,
  'admin.lockOverride': true
};

export function isFeatureEnabled(flag: FeatureFlag, overrides = process.env): boolean {
  const envName = `FLAG_${flag.replaceAll('.', '_').toUpperCase()}`;
  if (overrides[envName] === 'true') return true;
  if (overrides[envName] === 'false') return false;
  return defaults[flag];
}

