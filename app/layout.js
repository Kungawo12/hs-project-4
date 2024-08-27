import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProviderWrapper } from './themeContext';
import lightDark from './lightDarkMode';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      
    <html lang="en">
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <lightDark />
            {children}
        </ThemeProviderWrapper>
        </body>
    </html>
    
    </ClerkProvider>
  );
}
