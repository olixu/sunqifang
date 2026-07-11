import Link from "next/link";
import { courses, profile } from "@/lib/content";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course) return <p>课程不存在</p>;

  return (
    <>
      <h1>
        <Link href="/" className="name-link">{profile.name}（{profile.nameEn}）</Link>
        <span style={{fontSize:"0.8rem",fontWeight:"normal"}}>课程详情</span>
      </h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/courses">← 课程列表</Link>
      </div>

      <Link href="/courses" style={{fontSize:"0.85rem",color:"#555"}}>← 返回课程列表</Link>

      <h2 style={{marginTop:"0.5em"}}>{course.name}</h2>
      <table>
        <tbody>
          <tr><td style={{fontWeight:"bold",width:"100px"}}>学年</td><td>{course.semester}</td></tr>
          <tr><td style={{fontWeight:"bold"}}>学期</td><td>{course.term}</td></tr>
          <tr><td style={{fontWeight:"bold"}}>学时</td><td>{course.hours}</td></tr>
        </tbody>
      </table>

      <h3 style={{marginTop:"1.5em"}}>学生名单（{course.students ? course.students.length : 0}人）</h3>
      {course.students && course.students.length > 0 ? (
        <table>
          <thead><tr><th>#</th><th>姓名</th></tr></thead>
          <tbody>
            {course.students.map((s: any, i: number) => (
              <tr key={i}>
                <td style={{width:"40px",color:"#888"}}>{i + 1}</td>
                <td>{typeof s === "string" ? s : s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{color:"#999",fontSize:"0.9rem"}}>暂无学生名单</p>
      )}

      <p style={{marginTop:"1.5em",fontSize:"0.85rem",color:"#999"}}>
        💡 如需上传学生名单，请前往 <a href="/admin-page" style={{fontWeight:"bold",color:"#00008b"}}>内容管理</a> → 课程信息 → 修改 students 数组
      </p>
    </>
  );
}