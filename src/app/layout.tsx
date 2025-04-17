import "./globals.css";
import { ChakraProviderWrapper } from "./ChakraProviderWrapper";
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

import { Inter, Montserrat } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Egypt Travel Experience",
  description: "Discover the wonders of ancient Egypt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-black min-h-screen`}
      >
        <ChakraProviderWrapper>
          <AuthProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </AuthProvider>
        </ChakraProviderWrapper>
      </body>
    </html>
  );
}
