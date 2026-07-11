import type { Metadata } from "next";
import Link from "next/link";
import { publications, patents } from "@/lib/content";

export const metadata: Metadata = {
  title: "合作与成果 People & Publications",
};

export default function PublicationsPage() {
  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#sec1">合作导师 Cooperating</a></dt>
          <dt><a href="#sec2">合作者 Collaborators</a></dt>
          <dt><a href="#sec3">论文 Papers</a></dt>
          <dt><a href="#sec4">专利 Patents</a></dt>
          <dt><a href="#sec5">项目 Projects</a></dt>
        </dl>
      </div>

      <p>
        <strong>孙其芳</strong> (<strong>Qifang Sun</strong>) — 合作网络与学术成果。
      </p>

      <h2 id="sec1">合作导师 Cooperating</h2>
      <ul>
        <li><strong>黄梅珍（Meizhen Huang）</strong>，上海交通大学教授，博士生导师。孙其芳博士期间的导师。主要研究方向为光谱分析、光电检测、传感器技术。</li>
      </ul>

      <h2 id="sec2">合作者 Collaborators</h2>
      <ul>
        <li><strong>刘天元（Tianyuan Liu）</strong>，上海交通大学，合作NDIR气体检测及SERS论文多篇。</li>
        <li><strong>于新娜（Xinna Yu）</strong>，上海交通大学，合作SERS基底制备与拉曼检测。</li>
        <li><strong>孔丽丽（Lili Kong）</strong>，上海交通大学，合作SERS食品添加剂检测。</li>
        <li><strong>陈婕（Jie Chen）</strong>，上海交通大学，合作SERS基底及拉曼检测。</li>
        <li><strong>屈凡华（Fanhua Qu）</strong>，上海交通大学，合作LIBS土壤分析。</li>
        <li><strong>蓝天朔（Tianshuo Lan）</strong>，上海交通大学，合作SERS基底研究。</li>
        <li><strong>Xu J</strong>，合作IEEE Trans. SMC论文（自适应动态规划）。</li>
      </ul>

      <h2 id="sec3">论文 Papers</h2>
      <p>共参与论文10篇，其中第一作者3篇，中科院一区TOP论文5篇。</p>
      {publications.map((p, i) => (
        <div key={i} className="pub-entry">
          <div className="pub-authors">{p.authors}</div>
          <div className="pub-title">{p.title}</div>
          <div className="pub-source">
            {p.journal}, {p.year}{p.vol ? `, ${p.vol}` : ""}{p.pages ? `: ${p.pages}` : ""}
            <span className="pub-badge">{p.badge}</span>
            {p.tag && <span className="pub-badge" style={p.tag==="一作"?{background:"#ffeedd"}:{}}>{p.tag}</span>}
          </div>
        </div>
      ))}
      <p><a href="https://scholar.google.com/citations?user=FGRNe1cAAAAJ">完整列表见 Google Scholar →</a></p>

      <h2 id="sec4">专利 Patents</h2>
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

      <h2 id="sec5">科研项目 Projects</h2>
      <p><strong>多源信息融合的油中溶解气体动态感知与深度诊断机制研究</strong>（主持，在研）</p>
    </>
  );
}
