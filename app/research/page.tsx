import Link from "next/link";

export default function ResearchPage() {
  return (
    <>
      <h1><Link href="/" className="name-link">孙其芳（Qifang Sun）</Link><span style={{fontSize:"0.8rem",fontWeight:"normal"}}>研究方向</span></h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/research">研究</Link>
        <Link href="/publications">论文</Link>
        <Link href="/courses">课程</Link>
        <Link href="/contact">联系</Link>
      </div>

      <h2>光电传感器测控系统</h2>
      <p>聚焦NDIR（非色散红外）气体传感器技术，开展差分消元法、可变光程设计等核心算法研究与系统开发。实现高精度、宽量程、抗干扰的气体检测方案，应用于气体分析、环境监测等领域。</p>
      <ul>
        <li>差分消元NDIR混合气体检测方法（Sensors Actuators B, 2023）</li>
        <li>差动光路NDIR宽量程CO₂检测方法（Sensors Actuators A, 2023）</li>
        <li>SMLP混合气体快速识别与浓度预测（IEEE TIM, 2024）</li>
      </ul>

      <h2>光谱大数据分析</h2>
      <p>基于拉曼光谱（SERS）和LIBS光谱技术，结合机器学习与深度学习算法，实现复杂混合物的快速识别与定量分析。</p>
      <ul>
        <li>富集增强SERS基底设计与制备（Food Bioscience, 2025）</li>
        <li>SpecRecFormer深度学习光谱组分识别（Analytical Chemistry, 2025）</li>
        <li>咖啡环效应SERS痕量PAHs检测（Surfaces & Interfaces, 2024）</li>
        <li>PCA-GS-ELM土壤元素LIBS定量分析（JAAS, 2024）</li>
      </ul>

      <h2>机器学习算法</h2>
      <p>开发面向光谱数据的高效机器学习模型，包括SMLP网络、深度特征提取、模式识别与回归预测。</p>
      <ul>
        <li>SMLP混合气体识别与预测</li>
        <li>SpecRecFormer深度学习光谱组分识别</li>
        <li>PCA-GS-ELM特征提取与回归</li>
      </ul>

      <h2>在研项目</h2>
      <p><strong>多源信息融合的油中溶解气体动态感知与深度诊断机制研究</strong>（主持，在研）</p>
    </>
  );
}