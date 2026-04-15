import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const heading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "900"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Zest & Sip | Energy in a Bottle",
  description: "Lekki's premier juice bar serving cold-pressed, 100% organic vitality.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}