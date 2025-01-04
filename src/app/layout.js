import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-center items-center h-screen p-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
