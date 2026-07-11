import Link from "next/link";
import { profile, courses } from "@/lib/content";

export default function CoursesPage() {
  return (
    <>
      <h1>
        <Link href="/" className="name-link">{profile.name}（{profile.nameEn}）</Link>
        <span style={{fontSize:"0.8rem",fontWeight:"normal"}}>教学工作</span>
      </h1>
      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/research">研究</Link>
        <Link href="/publications">论文</Link>
        <Link href="/courses">课程</Link>
        <Link href="/contact">联系</Link>
      </div>

      <h2>开设课程 Courses</h2>
      <div className="pub-entry" style={{marginBottom:"1em"}}>
        点击课程名称查看详情、学生名单和教学资料
      </div>
      <table>
        <thead>
          <tr><th>课程名称</th><th>学年</th><th>学期</th><th>学时</th><th>学生数</th></tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i} style={{cursor:"pointer"}}>
              <td>
                <Link href={`/courses/${c.slug}`} style={{fontWeight:"bold",color:"#00008b"}}>
                  {c.name} →
                </Link>
              </td>
              <td>{c.semester}</td>
              <td>{c.term}</td>
              <td>{c.hours}</td>
              <td>{c.students ? c.students.length : 0}人</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{marginTop:"1.5em", fontSize:"0.85rem", color:"#999"}}>
        💡 如需上传学生名单，请前往 <a href="/admin-page" style={{fontWeight:"bold"}}>内容管理</a> → 课程信息 → 在 students 数组中添加
      </p>
    </>
  );
}