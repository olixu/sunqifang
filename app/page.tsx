import Link from "next/link";
import { profile, publications, patents, courses } from "@/lib/content";

const pubPreview = publications.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <h1>
        <Link href="/" className="name-link">{profile.name}（{profile.nameEn}）</Link>
        <span style={{fontSize:"0.8rem",fontWeight:"normal"}}>
          {profile.university} · {profile.department}
        </span>
      </h1>

      <div className="subnav">
        <Link href="/">首页</Link>
        <Link href="/research">研究</Link>
        <Link href="/publications">论文</Link>
        <Link href="/courses">课程</Link>
        <Link href="/contact">联系</Link>
      </div>

      <dl className="contents">
        <dd><Link href="#intro">个人简介 Introduction</Link></dd>
        <dd><Link href="#education">教育经历 Education</Link></dd>
        <dd><Link href="#research">研究方向 Research</Link></dd>
        <dd><Link href="#publications">代表性论文 Publications</Link></dd>
        <dd><Link href="#patents">发明专利 Patents</Link></dd>
        <dd><Link href="#teaching">教学工作 Teaching</Link></dd>
        <dd><Link href="#service">学术服务 Profession</Link></dd>
        <dd><Link href="#contact-info">联系方式 Contact</Link></dd>
      </dl>

      <h2 id="intro">个人简介 Introduction</h2>
      <p>孙其芳，女，工学博士，{profile.university}{profile.department}讲师。本科毕业于中国海洋大学，博士毕业于上海交通大学。</p>
      <p dangerouslySetInnerHTML={{ __html: profile.biography }}></p>

      <h2 id="education">教育经历 Education</h2>
      <ul>
        {profile.education.map((e, i) => (
          <li key={i}><strong>{e.degree}</strong> {e.school}，{e.major}</li>
        ))}
      </ul>

      <h2 id="research">研究方向 Research</h2>
      <ul>
        {profile.researchDirections.map((d, i) => (
          <li key={i}><strong>{d.split(" —")[0]}</strong> — {d.split("— ")[1] || d}</li>
        ))}
      </ul>
      <p><Link href="/research">查看更多细节 →</Link></p>

      <h2 id="publications">代表性论文 Publications</h2>
      {pubPreview.map((pub, i) => (
        <div key={i} className="pub-entry">
          <div className="pub-authors">{pub.authors}</div>
          <div className="pub-title">{pub.title}</div>
          <div className="pub-source">
            {pub.journal}, {pub.year}{pub.vol ? `, ${pub.vol}` : ""}{pub.pages ? `: ${pub.pages}` : ""}
            <span className="pub-badge">{pub.badge}</span>
          </div>
        </div>
      ))}
      <p><Link href="/publications">查看全部{publications.length}篇论文 →</Link></p>

      <h2 id="patents">发明专利 Patents</h2>
      <table>
        <tbody>
          {patents.map((pat, i) => (
            <tr key={i}>
              <td style={{width:"30%"}}>{pat.no}</td>
              <td>{pat.title}</td>
              <td style={{width:"12%"}}><span className="tag" style={pat.status==="授权"?{background:"#e8ffec"}:{background:"#fff8e8"}}>{pat.status}</span></td>
              <td style={{width:"15%"}}>{pat.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 id="teaching">教学工作 Teaching</h2>
      {[...new Set(courses.map(c => c.name))].map((name, i) => (
        <span key={i} className="tag" style={{margin:"0.15em 0.3em"}}>{name}</span>
      ))}
      <p style={{marginTop:"1em"}}><Link href="/courses">查看课程表 →</Link></p>

      <h2 id="service">学术服务 Profession</h2>
      <ul>
        <li><strong>科研项目</strong>：主持"多源信息融合的油中溶解气体动态感知与深度诊断机制研究"（在研）</li>
      </ul>

      <h2 id="contact-info">联系方式 Contact</h2>
      <p>
        <strong>邮箱：</strong><a href={`mailto:${profile.email}`}>{profile.email}</a><br />
        <strong>办公：</strong>{profile.office} · {profile.university}奉贤校区<br />
        <strong>地址：</strong>{profile.address}
      </p>
      <p>欢迎跨学科背景交流与合作！</p>
    </>
  );
}