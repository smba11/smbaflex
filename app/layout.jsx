import "./globals.css";

export const metadata = {
  title: "SMBAFLEX",
  description: "Streaming Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
