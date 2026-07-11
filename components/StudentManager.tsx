"use client";

import { useState, useEffect, useCallback } from "react";

interface Student {
  id: string;
  name: string;
  grade: string;
}

export default function StudentManager({ slug }: { slug: string }) {
  const storageKey = "sunqifang_course_" + slug;
  const [students, setStudents] = useState<Student[]>([]);
  const [textInput, setTextInput] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setStudents(JSON.parse(saved));
    } catch {}
  }, [storageKey]);

  const render = useCallback((data: Student[]) => {
    setStudents(data);
    setCount(data.length);
    try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch {}
  }, [storageKey]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCSV(text);
      render(parsed);
    };
    reader.readAsText(file);
  };

  const handleSaveText = () => {
    if (!textInput.trim()) { alert("请输入学生数据"); return; }
    const parsed = parseCSV(textInput);
    render(parsed);
    alert("✅ 成功导入 " + parsed.length + " 名学生");
  };

  const handleClear = () => {
    if (confirm("确定清空所有数据？")) {
      render([]);
      setTextInput("");
    }
  };

  return (
    <div>
      <div id="student-table">
        {students.length === 0 ? (
          <p style={{color:"#999",fontStyle:"italic"}}>暂无学生数据。使用下方功能上传。</p>
        ) : (
          <table>
            <thead><tr><th>#</th><th>学号</th><th>姓名</th><th>成绩</th></tr></thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td style={{width:"40px",color:"#888",textAlign:"center"}}>{i+1}</td>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {count > 0 && (
        <p style={{fontSize:"0.85rem",color:"#666",marginTop:"0.5em"}}>
          ✅ 共 {count} 名学生
        </p>
      )}

      <div style={{border:"2px dashed #ccc",borderRadius:"8px",padding:"1.5em",background:"#fafafa",marginTop:"1.5em"}}>
        <p style={{fontSize:"0.9rem",marginBottom:"0.8em"}}>
          <strong>上传学生名单 &amp; 成绩</strong><br />
          <span style={{color:"#888",fontSize:"0.85rem"}}>
            格式：学号,姓名,成绩（每行一个学生，逗号或Tab分隔）<br />
            例：20240101,张三,85.5
          </span>
        </p>

        <div style={{display:"flex",gap:"0.5em",flexWrap:"wrap",marginBottom:"1em"}}>
          <input type="file" accept=".csv,.txt" onChange={handleFileUpload}
            style={{fontSize:"0.85rem",padding:"0.4em",border:"1px solid #ccc",borderRadius:"4px",flex:1}} />
        </div>

        <textarea value={textInput} onChange={e => setTextInput(e.target.value)}
          placeholder="或直接粘贴数据在这里，点「导入」
格式：学号,姓名,成绩
例：
20240101,张三,85.5
20240102,李四,92"
          rows={5}
          style={{width:"100%",fontFamily:'"SF Mono","Courier New",monospace',fontSize:"0.85rem",
            padding:"0.8em",border:"1px solid #ccc",borderRadius:"4px",background:"#fff",
            boxSizing:"border-box",marginBottom:"0.5em"}} />

        <div style={{display:"flex",gap:"0.5em"}}>
          <button onClick={handleSaveText} style={{
            padding:"0.5em 1.5em",background:"#2f4f4f",color:"#f5deb3",
            border:"1px solid #000",borderRadius:"4px",cursor:"pointer",fontWeight:"bold",fontSize:"0.85rem"
          }}>📤 导入</button>
          <button onClick={handleClear} style={{
            padding:"0.5em 1.2em",background:"#fff",color:"#c00",
            border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer",fontSize:"0.85rem"
          }}>🗑 清空</button>
        </div>
      </div>
    </div>
  );
}

function parseCSV(text: string): Student[] {
  const lines = text.split("\n").filter(l => l.trim());
  const start = (lines.length > 0 && /^\s*(学号|id|name|姓名|成绩|grade|score)/i.test(lines[0])) ? 1 : 0;
  const students: Student[] = [];
  for (let i = start; i < lines.length; i++) {
    const parts = lines[i].split(/[,，\t]+/);
    if (parts.length >= 1) {
      students.push({
        id: parts[0]?.trim() || "",
        name: parts[1]?.trim() || "",
        grade: parts[2]?.trim() || "",
      });
    }
  }
  return students;
}
