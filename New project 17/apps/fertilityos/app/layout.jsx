import "./globals.css";
import { AnalyticsBoot } from "../components/AnalyticsBoot";
import { CookieConsent } from "../components/CookieConsent";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://trustchainservices.com"),
  title: {
    default: "FertilityOS | Fertility Decision Intelligence",
    template: "%s | FertilityOS"
  },
  description:
    "FertilityOS connects IVF financing, benefits intelligence, clinic comparison, and educational AI guidance for fertility decisions."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnalyticsBoot />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
