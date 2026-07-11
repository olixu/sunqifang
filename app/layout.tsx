import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "孙其芳 | 上海师范大学", template: "%s | 孙其芳" },
  description: "孙其芳，上海师范大学信息与机电工程学院讲师，工学博士（上海交通大学），研究方向：光电传感器测控系统、光谱大数据分析、机器学习算法。",
  openGraph: { type: "website", locale: "zh_CN" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="page-wrap">
          {children}
          <div className="footer">
            © 2024 孙其芳 · 上海师范大学信息与机电工程学院 · 
            qifangsun@shnu.edu.cn · Updated: Jul. 9, 2026
          </div>
        </div>
      </body>
    </html>
  );
}