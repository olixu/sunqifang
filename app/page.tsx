import Link from "next/link";
import { profile, publications, patents, courses } from "@/lib/content";

const pubPreview = publications.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* TOC contents like template */}
      <div className="contents">
        <dl>
          <dt><a href="#intro">个人简介 Introduction</a></dt>
          <dt><a href="#education">教育经历 Education</a></dt>
          <dt><a href="#research">研究方向 Research</a></dt>
          <dt><a href="#publications">代表性论文 Publications</a></dt>
          <dt><a href="#patents">发明专利 Patents</a></dt>
          <dt><a href="#teaching">教学工作 Teaching</a></dt>
          <dt><a href="#service">学术服务 Profession</a></dt>
          <dt><a href="#contact">联系方式 Contact</a></dt>
        </dl>
      </div>

      {/* Header paragraph like template */}
      <p>
        <strong>{profile.name}</strong> (<strong>{profile.nameEn}</strong>), 工学博士, {profile.title}, {profile.department}, {profile.university}.
        <br />
        [<Link href="https://scholar.google.com/citations?user=FGRNe1cAAAAJ">Google Scholar</Link>]
        [<Link href="https://www.researchgate.net/scientific-contributions/Qifang-Sun-2217948775">ResearchGate</Link>]
        [<Link href="https://teacher.shnu.edu.cn/xxjdgcxy/sqf/listm.htm">SHNU主页</Link>]
      </p>

      {/* Section: Intro */}
      <h2 id="intro">个人简介 Introduction</h2>
      <ul>
        <li><strong>教学</strong>：主讲《感测技术》《高频电子线路》《嵌入式系统与应用》《电路分析基础实验》等电子信息类专业核心课程，注重理论与实践相结合，培养学生动手与创新能力。</li>
        <li><strong>科研</strong>：<span dangerouslySetInnerHTML={{ __html: profile.biography }} /></li>
        <li><strong>学术</strong>：与上海交通大学黄梅珍教授课题组保持密切合作关系，联合发表多篇高水平论文。Google Scholar 总引用次数98次，h-index 6，i10-index 4。</li>
      </ul>

      {/* Section: Education */}
      <h2 id="education">教育经历 Education</h2>
      <ul>
        {profile.education.map((e, i) => (
          <li key={i}><strong>{e.degree}</strong> {e.school}，{e.major || e.degree}</li>
        ))}
      </ul>

      {/* Section: Research */}
      <h2 id="research">研究方向 Research</h2>
      <ul>
        {profile.researchDirections.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
      <p><Link href="/research">查看更多细节 →</Link></p>

      {/* Section: Publications */}
      <h2 id="publications">代表性论文 Publications</h2>
      {pubPreview.map((pub, i) => (
        <div key={i} className="pub-entry">
          <div className="pub-authors">{pub.authors}</div>
          <div className="pub-title">{pub.title}</div>
          <div className="pub-source">
            {pub.journal}, {pub.year}{pub.vol ? `, ${pub.vol}` : ""}{pub.pages ? `: ${pub.pages}` : ""}
            <span className="pub-badge">{pub.badge}</span>
            {pub.tag && <span className="pub-badge" style={{background:"#e8ffec"}}>{pub.tag}</span>}
          </div>
        </div>
      ))}
      <p><Link href="/publications">查看全部{publications.length}篇论文 →</Link></p>

      {/* Section: Patents */}
      <h2 id="patents">发明专利 Patents</h2>
      <table>
        <thead>
          <tr><th>专利号</th><th>名称</th><th>状态</th><th>日期</th></tr>
        </thead>
        <tbody>
          {patents.map((pat, i) => (
            <tr key={i}>
              <td style={{width:"22%"}}>{pat.no}</td>
              <td>{pat.title}</td>
              <td style={{width:"10%"}}><span className="tag" style={pat.status==="授权"?{background:"#e8ffec"}:{background:"#fff8e8"}}>{pat.status}</span></td>
              <td style={{width:"15%"}}>{pat.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section: Teaching */}
      <h2 id="teaching">教学工作 Teaching</h2>
      <ul>
        {[...new Set(courses.map(c => c.name))].slice(0, 8).map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
      <p><Link href="/courses">查看课程表 →</Link></p>

      {/* Section: Service */}
      <h2 id="service">学术服务 Profession</h2>
      <ul>
        <li><strong>科研项目</strong>：主持"多源信息融合的油中溶解气体动态感知与深度诊断机制研究"（在研）</li>
        <li><strong>论文审稿</strong>：为 Sensors and Actuators B、IEEE TIM 等期刊担任审稿人</li>
        <li><strong>招生</strong>：已进入上海师范大学研究生招生导师名录，欢迎联系报考</li>
      </ul>
      <p><Link href="/publications">查看完整学术信息 →</Link></p>

      {/* Section: Contact */}
      <h2 id="contact">联系方式 Contact</h2>
      <p>
        <strong>邮箱：</strong><a href={`mailto:${profile.email}`}>{profile.email}</a><br />
        <strong>办公：</strong>{profile.office} · {profile.university}奉贤校区<br />
        <strong>地址：</strong>{profile.address}<br />
        <strong>个人主页：</strong><a href="https://teacher.shnu.edu.cn/xxjdgcxy/sqf/listm.htm">SHNU教师主页</a>
      </p>
      <p>欢迎跨学科背景交流与合作！</p>
    </>
  );
}
