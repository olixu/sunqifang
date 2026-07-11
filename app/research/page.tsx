import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "研究方向 Research",
};

export default function ResearchPage() {
  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#sec1">光电传感器测控系统</a></dt>
          <dt><a href="#sec2">光谱大数据分析</a></dt>
          <dt><a href="#sec3">机器学习算法</a></dt>
          <dt><a href="#sec4">在研项目</a></dt>
        </dl>
      </div>

      <p>
        <strong>孙其芳</strong> (<strong>Qifang Sun</strong>) — 研究方向详情。
      </p>

      <h2 id="sec1">光电传感器测控系统</h2>
      <p>聚焦NDIR（非色散红外）气体传感器技术，开展差分消元法、可变光程设计等核心算法研究与系统开发。实现高精度、宽量程、抗干扰的气体检测方案，应用于气体分析、环境监测等领域。</p>
      <ul>
        <li>差分消元NDIR混合气体检测方法（Sensors Actuators B, 2023）</li>
        <li>差动光路NDIR宽量程CO₂检测方法（Sensors Actuators A, 2023）</li>
        <li>SMLP混合气体快速识别与浓度预测（IEEE TIM, 2024）</li>
      </ul>

      <h2 id="sec2">光谱大数据分析</h2>
      <p>基于拉曼光谱（SERS）和LIBS光谱技术，结合机器学习与深度学习算法，实现复杂混合物的快速识别与定量分析。</p>
      <ul>
        <li>富集增强SERS基底设计与制备（Food Bioscience, 2025）</li>
        <li>SpecRecFormer深度学习光谱组分识别（Analytical Chemistry, 2025）</li>
        <li>咖啡环效应SERS痕量PAHs检测（Surfaces &amp; Interfaces, 2024）</li>
        <li>PCA-GS-ELM土壤元素LIBS定量分析（JAAS, 2024）</li>
      </ul>

      <h2 id="sec3">机器学习算法</h2>
      <p>开发面向光谱数据的高效机器学习模型，包括SMLP网络、深度特征提取、模式识别与回归预测。</p>
      <ul>
        <li>SMLP混合气体识别与预测</li>
        <li>SpecRecFormer深度学习光谱组分识别</li>
        <li>PCA-GS-ELM特征提取与回归</li>
      </ul>

      <h2 id="sec4">在研项目</h2>
      <p><strong>多源信息融合的油中溶解气体动态感知与深度诊断机制研究</strong>（主持，在研）</p>
    </>
  );
}
