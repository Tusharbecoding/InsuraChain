// app/layout.tsx
import "./globals.css"; // Import Tailwind CSS
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
