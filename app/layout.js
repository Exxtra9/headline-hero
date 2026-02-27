import "./globals.css";

export const metadata = {
  title: "Headline Hero",
  description: "AI headline game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
