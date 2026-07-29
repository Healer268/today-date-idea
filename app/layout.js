import "./globals.css";

export const metadata = {
  title: "今天约什么",
  description: "把平凡的今天，约成特别的一天。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
