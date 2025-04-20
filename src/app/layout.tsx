import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salud Rural IA",
  description: "Salud Rural IA es un proyecto de investigación que busca mejorar la atención médica en áreas rurales utilizando inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
