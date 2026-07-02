export const states = ["california", "texas", "new-york", "florida", "illinois", "georgia", "washington", "colorado"];
export const employers = ["amazon", "apple", "google", "microsoft", "meta", "target", "walmart", "starbucks"];
export const maleTopics = ["trt-and-fertility", "male-fertility-by-age", "sperm-optimization"];
export const clinicLocations = ["los-angeles-ca", "san-francisco-ca", "new-york-ny", "austin-tx", "miami-fl", "chicago-il"];

export function titleCaseSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
