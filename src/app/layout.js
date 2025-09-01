import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/animations.css";
import { ThemeProvider } from "../contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gokul Upadhyay Guragain - Cloud Engineer & Developer",
  description: "Portfolio of Gokul Upadhyay Guragain - A passionate Computer Science student with expertise in cloud architecture, DevOps, and full-stack development. AWS certified professional from Nepal.",
  keywords: "Gokul Upadhyay Guragain, Cloud Engineer, AWS, DevOps, Full Stack Developer, Nepal, Computer Science, Portfolio",
  author: "Gokul Upadhyay Guragain",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
