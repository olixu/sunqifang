import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "联系方式 Contact",
};

export default function ContactPage() {
  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#contact">联系方式 Contact</a></dt>
        </dl>
      </div>

      <p><strong>{profile.name}</strong> (<strong>{profile.nameEn}</strong>) — 联系方式。</p>

      <h2 id="contact">联系方式 Contact</h2>
      <p>
        <strong>邮箱：</strong><a href={`mailto:${profile.email}`}>{profile.email}</a><br />
        <strong>办公地点：</strong>{profile.office} · {profile.university}奉贤校区<br />
        <strong>通讯地址：</strong>{profile.address}<br />
        <strong>所在单位：</strong>{profile.university}{profile.department}<br />
        <strong>个人主页：</strong><a href="https://teacher.shnu.edu.cn/xxjdgcxy/sqf/listm.htm">SHNU教师主页</a><br />
        <strong>Google Scholar：</strong><a href="https://scholar.google.com/citations?user=FGRNe1cAAAAJ">FGRNe1cAAAAJ</a><br />
        <strong>内容管理：</strong><a href="/admin-page">点此在线编辑内容</a>（密码：sunqifang2024）
      </p>
      <p>欢迎跨学科背景交流与合作！</p>
    </>
  );
}
