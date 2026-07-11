import type { Metadata } from "next";
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
      <p style={{fontSize:"0.85rem",color:"#666"}}>
        下方可上传 CSV 文件（学号,姓名,成绩），数据保存在此浏览器中。
      </p>

      {/* Client-side student management */}
      <div id="student-manager">
        <div id="student-table-placeholder">
          <p style={{color:"#999",fontStyle:"italic"}}>暂无学生数据。使用下方功能上传。</p>
        </div>
      </div>

      <h2 id="upload">上传学生数据</h2>
      <div style={{border:"2px dashed #ccc",borderRadius:"8px",padding:"1.5em",background:"#fafafa",marginTop:"0.5em"}}>
        <p style={{fontSize:"0.9rem",marginBottom:"0.8em"}}>
          <strong>格式说明：</strong> CSV 或粘贴文本，每行一个学生，用逗号或Tab分隔。<br />
          <span style={{color:"#888"}}>例：20240101,张三,85.5 或 李四,92</span>
        </p>

        <div style={{display:"flex",gap:"0.5em",flexWrap:"wrap",marginBottom:"1em"}}>
          <input type="file" id="csvFile" accept=".csv,.txt"
            style={{fontSize:"0.85rem",padding:"0.4em",border:"1px solid #ccc",borderRadius:"4px",flex:1}} />
          <button id="uploadBtn" style={{
            padding:"0.5em 1.5em",background:"#2f4f4f",color:"#f5deb3",
            border:"1px solid #000",borderRadius:"4px",cursor:"pointer",fontWeight:"bold",fontSize:"0.85rem"
          }}>📤 上传</button>
        </div>

        <textarea id="studentDataInput" rows={5}
          placeholder="也可以直接粘贴数据在这里，然后点「保存到本地」
格式：学号,姓名,成绩
例：
20240101,张三,85.5
20240102,李四,92
20240103,王五,78"
          style={{width:"100%",fontFamily:'"SF Mono","Courier New",monospace',fontSize:"0.85rem",
            padding:"0.8em",border:"1px solid #ccc",borderRadius:"4px",background:"#fff",
            boxSizing:"border-box",marginBottom:"0.5em"}}></textarea>

        <button id="saveLocalBtn" style={{
          padding:"0.5em 1.5em",background:"#2f4f4f",color:"#f5deb3",
          border:"1px solid #000",borderRadius:"4px",cursor:"pointer",fontWeight:"bold",fontSize:"0.85rem"
        }}>💾 保存到本地</button>
        <button id="clearBtn" style={{
          padding:"0.5em 1.2em",background:"#fff",color:"#c00",
          border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontSize:"0.85rem",marginLeft:"0.5em"
        }}>🗑 清空数据</button>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          const slug = "${params.slug}";
          const storageKey = "sunqifang_course_" + slug;
          const tbodyId = "student-tbody-" + slug;

          // Create table
          const placeholder = document.getElementById("student-table-placeholder");
          if (!placeholder) return;

          const table = document.createElement("table");
          table.innerHTML = '<thead><tr><th>#</th><th>学号</th><th>姓名</th><th>成绩</th></tr></thead><tbody id="' + tbodyId + '"></tbody>';
          placeholder.parentNode.insertBefore(table, placeholder);
          placeholder.style.display = "none";

          function renderStudents() {
            const tbody = document.getElementById(tbodyId);
            if (!tbody) return;
            const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
            if (data.length === 0) {
              tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999;font-style:italic;">暂无学生数据</td></tr>';
              return;
            }
            tbody.innerHTML = data.map(function(s, i) {
              return '<tr>' +
                '<td style="width:40px;color:#888;text-align:center">' + (i+1) + '</td>' +
                '<td>' + (s.id || '') + '</td>' +
                '<td>' + (s.name || '') + '</td>' +
                '<td>' + (s.grade || s.score || '') + '</td>' +
                '</tr>';
            }).join('');
          }

          function parseAndSave(text) {
            var lines = text.split('\\\\n').filter(function(l) { return l.trim(); });
            var students = [];
            var hasHeader = lines.length > 0 && /^\\\\s*(学号|id|name|姓名|成绩|grade|score)\\\\s*[,，\\\\t]/i.test(lines[0]);
            var start = hasHeader ? 1 : 0;
            for (var i = start; i < lines.length; i++) {
              var parts = lines[i].split(/[,，\\\\t]+/);
              if (parts.length >= 1) {
                var s = { id: parts[0] ? parts[0].trim() : '', name: '', grade: '' };
                if (parts.length >= 2) { s.name = parts[1].trim(); }
                if (parts.length >= 3) { s.grade = parts[2].trim(); }
                students.push(s);
              }
            }
            localStorage.setItem(storageKey, JSON.stringify(students));
            renderStudents();
            return students.length;
          }

          // Upload button
          document.getElementById("uploadBtn").addEventListener("click", function() {
            var fileInput = document.getElementById("csvFile");
            if (fileInput.files && fileInput.files[0]) {
              var reader = new FileReader();
              reader.onload = function(e) {
                var count = parseAndSave(e.target.result || "");
                alert("✅ 成功导入 " + count + " 名学生数据！");
              };
              reader.readAsText(fileInput.files[0]);
            } else {
              alert("请先选择 CSV 文件");
            }
          });

          // Save text button
          document.getElementById("saveLocalBtn").addEventListener("click", function() {
            var text = document.getElementById("studentDataInput").value;
            if (!text.trim()) { alert("请先输入学生数据"); return; }
            var count = parseAndSave(text);
            alert("✅ 成功保存 " + count + " 名学生数据！");
          });

          // Clear button
          document.getElementById("clearBtn").addEventListener("click", function() {
            if (confirm("确定要清空所有学生数据吗？")) {
              localStorage.removeItem(storageKey);
              renderStudents();
            }
          });

          // Initial render
          renderStudents();
        })();
      `}} />
    </>
  );
}
