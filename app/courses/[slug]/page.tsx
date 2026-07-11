import type { Metadata } from "next";
import Link from "next/link";
import { courses, profile } from "@/lib/content";
import StudentManager from "@/components/StudentManager";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return <p>课程未找到</p>;

  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#info">课程信息</a></dt>
          <dt><a href="#students">学生名单 &amp; 成绩</a></dt>
          <dt><a href="#upload">上传数据</a></dt>
        </dl>
      </div>

      <p><strong>{profile.name}</strong> (<strong>{profile.nameEn}</strong>) — 课程：{course.name}</p>
      <p><a href="/courses" style={{fontSize:"0.85rem"}}>← 返回课程列表</a></p>

      <h2 id="info">课程信息</h2>
      <table>
        <tbody>
          <tr><td style={{fontWeight:"bold",width:"100px",background:"#eeeecc"}}>课程名称</td><td>{course.name}</td></tr>
          <tr><td style={{fontWeight:"bold",background:"#eeeecc"}}>学年</td><td>{course.semester}</td></tr>
          <tr><td style={{fontWeight:"bold",background:"#eeeecc"}}>学期</td><td>{course.term}</td></tr>
          <tr><td style={{fontWeight:"bold",background:"#eeeecc"}}>学时</td><td>{course.hours}</td></tr>
        </tbody>
      </table>

      <h2 id="students">学生名单 &amp; 成绩</h2>
      <StudentManager slug={slug} />

      <p style={{marginTop:"1.5em",fontSize:"0.82rem",color:"#999"}}>
        💡 永久保存方法：前往 <a href="/admin-page" style={{fontWeight:"bold",color:"#00008b"}}>内容管理</a> → 课程信息 → 修改 students 数组
      </p>
    </>
  );
}
