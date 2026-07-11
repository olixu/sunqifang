import Link from "next/link";
import { AdminPanel } from "@/components/AdminPanel";
import { profile } from "@/lib/content";

export default function AdminPage() {
  return (
    <>
      <h1>
        <Link href="/" className="name-link">{profile.name}（{profile.nameEn}）</Link>
        <span style={{fontSize:"0.8rem",fontWeight:"normal"}}>内容管理</span>
      </h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/contact">联系</Link>
      </div>
      <AdminPanel />
    </>
  );
}