import Link from "next/link";
import { profile } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <h1>
        <Link href="/" className="name-link">{profile.name}（{profile.nameEn}）</Link>
        <span style={{fontSize:"0.8rem",fontWeight:"normal"}}>联系方式</span>
      </h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/research">研究</Link>
        <Link href="/publications">论文</Link>
        <Link href="/courses">课程</Link>
        <Link href="/contact">联系</Link>
      </div>

      <h2>联系方式 Contact</h2>
      <p><strong>邮箱：</strong><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      <p><strong>办公地点：</strong>{profile.office} · {profile.university}奉贤校区</p>
      <p><strong>通讯地址：</strong>{profile.address}</p>
      <p><strong>所在单位：</strong>{profile.university}{profile.department}</p>
      <p><strong>内容管理：</strong><a href="/admin-page">点此在线编辑内容</a>（需要 GitHub 账号）</p>
      <p>欢迎跨学科背景交流与合作！</p>
    </>
  );
}