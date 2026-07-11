import Link from "next/link";
import { courses } from "@/lib/content";

export default function CoursesPage() {
  const grouped = courses.reduce((acc: any, c) => {
    if (!acc[c.name]) acc[c.name] = [];
    acc[c.name].push(c);
    return acc;
  }, {} as Record<string, typeof courses>);

  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#sec1">本科生课程 Undergraduate</a></dt>
          <dt><a href="#sec2">研究生指导 Graduate</a></dt>
        </dl>
      </div>

      <p>
        <strong>孙其芳</strong> (<strong>Qifang Sun</strong>) — 教学课程。
      </p>

      <h2 id="sec1">本科生课程 Undergraduate</h2>
      <table>
        <thead>
          <tr><th>课程名称</th><th>学期</th></tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.semester} {c.term}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="sec2">研究生指导 Graduate</h2>
      <ul>
        <li>已进入上海师范大学研究生招生导师名录，可招收硕士研究生。</li>
        <li>欢迎对光电传感器测控系统、光谱大数据分析、机器学习算法方向感兴趣的同学联系报考。</li>
        <li>办公室：上海师范大学奉贤校区科技楼A705</li>
        <li>邮箱：<a href="mailto:qifangsun@shnu.edu.cn">qifangsun@shnu.edu.cn</a></li>
      </ul>
    </>
  );
}
