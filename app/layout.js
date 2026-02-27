export const metadata = {
  title: "Headline Hero",
  description: "AI headline game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
