import Link from "next/link";

const allPapers = [
  { authors: "Sun Q, Liu T, Yu X, et al.", title: "Non-interference NDIR detection method for mixed gases based on differential elimination", journal: "Sensors and Actuators B: Chemical", year: 2023, vol: "390", pages: "133901", badge: "中科院一区TOP · IF=8.4", tag: "一作" },
  { authors: "Sun Q, Liu T, Huang M, et al.", title: "High Accuracy Wide Range CO2 Detection Method Based on Difference Optical Path NDIR", journal: "Sensors and Actuators A: Physical", year: 2023, vol: "363", pages: "114722", badge: "中科院二区 · IF=4.6", tag: "一作" },
  { authors: "Sun Q, Liu T, Huang M, et al.", title: "Rapid Recognition and Concentration Prediction of Gas Mixtures Based on SMLP", journal: "IEEE Trans. Instrumentation & Measurement", year: 2024, vol: "73", pages: "1-9", badge: "中科院二区TOP · IF=5.6", tag: "一作" },
  { authors: "Kong L, Yu X, Sun Q, et al.", title: "Rapid and accurate detection and identification of food additives in liquid environments via SERS", journal: "Food Bioscience", year: 2025, vol: "", pages: "106804", badge: "中科院一区TOP · IF=5.9", tag: "合作" },
  { authors: "Yu X, Liu T*, Kong L, Lan T, Sun Q, et al.", title: "SpecRecFormer: Deep Learning-Driven Adaptive Component Identification of PAH Mixtures", journal: "Analytical Chemistry", year: 2025, vol: "97(18)", pages: "9876-9883", badge: "中科院一区TOP · IF=6.7", tag: "合作" },
  { authors: "Yu X, Kong L, Lan T, Chen J, Sun Q, et al.", title: "Enrichment-enhancement membrane SERS substrate for PAH detection", journal: "Spectrochimica Acta A", year: 2025, vol: "328", pages: "125429", badge: "中科院二区 · IF=4.6", tag: "合作" },
  { authors: "Yu X, Lan T, Kong L, Liu T, Sun Q, et al.", title: "Ultra-stable Ag-HP-β-CD/GO/NCF SERS substrate with coffee-ring effect for trace PAHs", journal: "Surfaces and Interfaces", year: 2024, vol: "44", pages: "103763", badge: "中科院二区 · IF=5.7", tag: "合作" },
  { authors: "Qu F, Li H, Sun Q, et al.", title: "High-accuracy quantification of soil elements by LIBS based on PCA-GS-ELM", journal: "J. Analytical Atomic Spectrometry", year: 2024, vol: "39(10)", pages: "2514-2521", badge: "中科院一区 · IF=3.1", tag: "合作" },
  { authors: "Kong L, Yu X, Sun Q, et al.", title: "Sensitive and Stable NCF/GO/Au@Ag SERS Substrate for PAHs", journal: "Polymers", year: 2025, vol: "17(12)", pages: "1716", badge: "中科院三区 · IF=4.9", tag: "合作" },
  { authors: "Xu J, Wang J, Rao J, Sun Q, et al.", title: "Parallel cross entropy policy gradient ADP for optimal tracking control", journal: "IEEE Trans. Systems Man Cybernetics: Systems", year: 2024, vol: "54(6)", pages: "3809-3821", badge: "中科院一区 · IF=8.7", tag: "合作" },
];

const allPatents = [
  { title: "一种可变光程NDIR宽量程气体检测方法和系统", no: "ZL202210229949.3", date: "2024.08.20", status: "授权" },
  { title: "利用咖啡环效应的高效富集SERS基底及其制备方法", no: "ZL202010668236.8", date: "2021.05.18", status: "授权" },
  { title: "富集增强双功能滤膜SERS基底及其制备方法和应用", no: "CN202411594334.6", date: "2025.01.21", status: "公开" },
  { title: "增强颗粒物在溶液中拉曼信号的方法", no: "CN202311855632.1", date: "2024.03.22", status: "公开" },
  { title: "基于差分消元的抗干扰NDIR混合气体检测方法和系统", no: "CN202211723852.4", date: "2023.05.30", status: "公开" },
];

export default function PublicationsPage() {
  return (
    <>
      <h1><Link href="/" className="name-link">孙其芳（Qifang Sun）</Link><span style={{fontSize:"0.8rem",fontWeight:"normal"}}>论文与专利</span></h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/research">研究</Link>
        <Link href="/publications">论文</Link>
        <Link href="/courses">课程</Link>
        <Link href="/contact">联系</Link>
      </div>

      <h2>论文成果 Papers</h2>
      <p>共参与论文10篇，其中第一作者3篇，中科院一区TOP论文5篇</p>
      {allPapers.map((p, i) => (
        <div key={i} className="pub-entry">
          <div className="pub-authors">{p.authors}</div>
          <div className="pub-title">{p.title}</div>
          <div className="pub-source">
            {p.journal}, {p.year}{p.vol ? `, ${p.vol}` : ""}{p.pages ? `: ${p.pages}` : ""}
            <span className="pub-badge">{p.badge}</span>
            <span className="pub-badge" style={p.tag==="一作"?{background:"#ffeedd"}:{}}>{p.tag}</span>
          </div>
        </div>
      ))}

      <h2>发明专利 Patents</h2>
      <p>授权2项，公开3项</p>
      <table>
        <thead>
          <tr><th>专利号</th><th>名称</th><th>状态</th><th>日期</th></tr>
        </thead>
        <tbody>
          {allPatents.map((p, i) => (
            <tr key={i}>
              <td style={{fontSize:"0.8rem"}}>{p.no}</td>
              <td>{p.title}</td>
              <td><span className="tag" style={p.status==="授权"?{background:"#e8ffec"}:{background:"#fff8e8"}}>{p.status}</span></td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>科研项目 Projects</h2>
      <p><strong>多源信息融合的油中溶解气体动态感知与深度诊断机制研究</strong>（主持，在研）</p>
    </>
  );
}