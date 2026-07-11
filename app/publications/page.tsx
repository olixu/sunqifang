import type { Metadata } from "next";
import Link from "next/link";
import { publications, patents } from "@/lib/content";

export const metadata: Metadata = {
  title: "论文成果 Publications",
};

export default function PublicationsPage() {
  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#sec1">论文 Papers</a></dt>
          <dt><a href="#sec2">专利 Patents</a></dt>
          <dt><a href="#sec3">项目 Projects</a></dt>
        </dl>
      </div>

      <p>
        <strong>孙其芳</strong> (<strong>Qifang Sun</strong>) — 学术成果。
      </p>

      <h2 id="sec1">论文 Papers</h2>
      <p>共参与发表论文10篇，其中第一作者3篇，中科院一区TOP论文5篇。</p>
      {publications.map((p, i) => (
        <div key={i} className="pub-entry">
          <div className="pub-title">{p.title}</div>
          <div className="pub-source">
            {p.journal}, {p.year}{p.vol ? `, ${p.vol}` : ""}{p.pages ? `: ${p.pages}` : ""}
            <span className="pub-badge">{p.badge}</span>
          </div>
        </div>
      ))}
      <p><a href="https://scholar.google.com/citations?user=FGRNe1cAAAAJ">完整列表见 Google Scholar →</a></p>

      <h2 id="sec2">专利 Patents</h2>
      <p>授权2项，公开3项</p>
      <table>
        <thead>
          <tr><th>专利号</th><th>名称</th><th>状态</th><th>日期</th></tr>
        </thead>
        <tbody>
          {patents.map((p, i) => (
            <tr key={i}>
              <td style={{fontSize:"0.8rem",width:"22%"}}>{p.no}</td>
              <td>{p.title}</td>
              <td style={{width:"10%"}}><span className="tag" style={p.status==="授权"?{background:"#e8ffec"}:{background:"#fff8e8"}}>{p.status}</span></td>
              <td style={{width:"15%"}}>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="sec3">科研项目 Projects</h2>
      <p><strong>多源信息融合的油中溶解气体动态感知与深度诊断机制研究</strong>（主持，在研）</p>
    </>
  );
}