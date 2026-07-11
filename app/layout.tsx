import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "孙其芳（Qifang Sun） | 上海师范大学", template: "%s | 孙其芳" },
  description: "孙其芳，上海师范大学信息与机电工程学院讲师，工学博士（上海交通大学），研究方向：光电传感器测控系统、光谱大数据分析、机器学习算法。",
  openGraph: { type: "website", locale: "zh_CN" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </head>
      <body>
        {/* Right-side menu (exactly like template) */}
        <div className="menu">
          <div className="menuitem"><Link title="Home" href="/">Home</Link></div>
          <div className="menuitem"><Link title="Research" href="/research">Research</Link></div>
          <div className="menuitem"><Link title="People" href="/publications">People</Link></div>
          <div className="menuitem"><Link title="Courses" href="/courses">Courses</Link></div>
          <div className="menuitem"><Link title="Admin" href="/admin-page">Admin</Link></div>
        </div>

        {/* h1 top bar exactly like template */}
        <h1 id="top">
          <Link href="/" className="top-link" style={{textDecoration: "none"}}>
            Sun Qifang - 孙其芳
          </Link>
        </h1>

        {/* Main content */}
        {children}

        {/* Footer navfoot exactly like template */}
        <div className="navfoot">
          <hr />
          <table style={{width:"100%"}} border={0} summary="Footer navigation">
            <colgroup>
              <col width="33%" /><col width="34%" /><col width="33%" />
            </colgroup>
            <tbody>
              <tr>
                <th align="left">
                  Updated: <span className="footdate">Jul. 10, 2026</span>
                </th>
                <th align="center">
                  <span className="foothome">
                    <Link href="/">Home</Link> / <Link href="/research">Research</Link> /{" "}
                    <Link href="/publications">People</Link> / <Link href="/courses">Courses</Link>
                  </span>
                </th>
                <th align="right">
                  Edited by <Link href="/">Sun Qifang</Link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}
