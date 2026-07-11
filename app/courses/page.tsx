import type { Metadata } from "next";
import Link from "next/link";
import { courses, profile } from "@/lib/content";

export const metadata: Metadata = { title: "教学课程 Courses" };

export default function CoursesPage() {
  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#sec1">本科生课程 Undergraduate</a></dt>
          <dt><a href="#sec2">研究生指导 Graduate</a></dt>
        </dl>
      </div>

      <p><strong>{profile.name}</strong> (<strong>{profile.nameEn}</strong>) — 教学课程。</p>

      <h2 id="sec1">本科生课程 Undergraduate</h2>
      <ul>
        {courses.map((c, i) => (
          <li key={i}>
            <Link href={`/courses/${c.slug}`}>
              {c.semester}年{/*  {c.term} — <strong>{c.name}</strong> */}
              <strong>{c.name}</strong>
            </Link>
            <span style={{color:"#888",fontSize:"0.85rem",marginLeft:"0.5em"}}>{c.term} · {c.hours}</span>
          </li>
        ))}
      </ul>

      <h2 id="sec2">研究生指导 Graduate</h2>
      <ul>
        <li>已进入上海师范大学研究生招生导师名录，可招收硕士研究生。</li>
        <li>欢迎对光电传感器测控系统、光谱大数据分析、机器学习算法方向感兴趣的同学联系报考。</li>
        <li>办公室：{profile.office} · {profile.university}奉贤校区</li>
        <li>邮箱：<a href={`mailto:${profile.email}`}>{profile.email}</a></li>
      </ul>
    </>
  );
}
