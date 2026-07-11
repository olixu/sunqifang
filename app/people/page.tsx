import type { Metadata } from "next";
import Link from "next/link";
import profile from "@/content/profile.json";
import team from "@/content/team.json";

export const metadata: Metadata = { title: "团队成员 People" };

export default function PeoplePage() {
  const undergrad = team.filter((m: any) => m.type === "undergrad");
  const graduate = team.filter((m: any) => m.type === "graduate");

  return (
    <>
      <div className="contents">
        <dl>
          <dt><a href="#graduate">硕士研究生 Graduate</a></dt>
          <dt><a href="#undergrad">本科生 Undergraduate</a></dt>
        </dl>
      </div>

      <p><strong>{profile.name}</strong> (<strong>{profile.nameEn}</strong>) — 团队成员。</p>

      <h2 id="graduate">硕士研究生 Graduate</h2>
      {graduate.length > 0 ? (
        <table>
          <thead><tr><th>姓名</th><th>研究方向</th><th>入学年份</th></tr></thead>
          <tbody>
            {graduate.map((m: any, i: number) => (
              <tr key={i}>
                <td>{m.name}</td>
                <td>{m.topic}</td>
                <td>{m.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{color:"#999",fontStyle:"italic"}}>暂无硕士研究生，欢迎联系报考</p>
      )}

      <h2 id="undergrad">本科生 Undergraduate</h2>
      {undergrad.length > 0 ? (
        <table>
          <thead><tr><th>姓名</th><th>项目/课题</th><th>年份</th></tr></thead>
          <tbody>
            {undergrad.map((m: any, i: number) => (
              <tr key={i}>
                <td>{m.name}</td>
                <td>{m.topic}</td>
                <td>{m.start}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{color:"#999",fontStyle:"italic"}}>暂无本科生</p>
      )}

      <p style={{marginTop:"1.5em",fontSize:"0.85rem",color:"#999"}}>
        💡 编辑团队成员请前往 <a href="/admin-page" style={{fontWeight:"bold",color:"#00008b"}}>内容管理</a> → 修改 content/team.json
      </p>
    </>
  );
}