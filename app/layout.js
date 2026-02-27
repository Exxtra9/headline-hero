export const metadata = {
  title: "Headline Hero",
  description: "AI-powered headline writing game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f4f4f4" }}>
        {children}
      </body>
    </html>
  );
}
