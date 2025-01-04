import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Black-Scholes Visualizer",
  description: "Visualize the Black-Scholes formula",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center items-center h-screen p-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
