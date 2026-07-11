"use client";

import { useState, useEffect } from "react";

interface Student { id: string; name: string; grade: string; }

function parseCSV(text: string): Student[] {
  const lines = text.split("\n").filter(l => l.trim());
  const start = lines.length > 0 && /^\s*(学号|id|name|姓名|成绩|grade|score)/i.test(lines[0]) ? 1 : 0;
  const result: Student[] = [];
  for (let i = start; i < lines.length; i++) {
    const parts = lines[i].split(/[,，\t]+/);
    result.push({ id: parts[0]?.trim() || "", name: parts[1]?.trim() || "", grade: parts[2]?.trim() || "" });
  }
  return result;
}

export default function StudentManager({ slug }: { slug: string }) {
  const storageKey = "sunqifang_course_" + slug;
  const [students, setStudents] = useState<Student[]>([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    try { const saved = localStorage.getItem(storageKey); if (saved) setStudents(JSON.parse(saved)); } catch {}
  }, [storageKey]);

  const save = (data: Student[]) => {
    setStudents(data);
    try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch {}
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { const text = ev.target?.result as string; save(parseCSV(text)); };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!textInput.trim()) { alert("请输入数据"); return; }
    save(parseCSV(textInput));
    alert("✅ 导入 " + students.length + " 名学生");
  };

  const handleClear = () => { if (confirm("确定清空？")) { save([]); setTextInput(""); } };

  return (
    <div>
      {students.length === 0 ? (
        <p style={{color:"#999",fontStyle:"italic"}}>暂无学生数据。使用下方 CSV 功能上传。</p>
      ) : (
        <>
          <p style={{fontSize:"0.85rem",color:"#666"}}>共 {students.length} 名学生</p>
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
        </>
      )}

      <div style={{border:"2px dashed #ccc",borderRadius:"8px",padding:"1.2em",background:"#fafafa",marginTop:"1.2em"}}>
        <p style={{fontSize:"0.85rem",marginBottom:"0.5em"}}><strong>📤 上传 CSV 文件</strong></p>
        <input type="file" accept=".csv,.txt" onChange={handleFile}
          style={{fontSize:"0.85rem",marginBottom:"0.8em",display:"block"}} />
        <p style={{fontSize:"0.85rem",marginBottom:"0.3em"}}><strong>✏️ 或直接粘贴数据</strong></p>
        <textarea value={textInput} onChange={e => setTextInput(e.target.value)}
          placeholder="每行一个：学号,姓名,成绩"
          rows={4}
          style={{width:"100%",fontFamily:'monospace',fontSize:"0.85rem",
            padding:"0.5em",border:"1px solid #ccc",borderRadius:"4px",boxSizing:"border-box"}} />
        <div style={{display:"flex",gap:"0.5em",marginTop:"0.5em"}}>
          <button onClick={handleImport} style={{padding:"0.4em 1.2em",background:"#2f4f4f",color:"#f5deb3",border:"1px solid #000",borderRadius:"4px",cursor:"pointer"}}>📥 导入</button>
          <button onClick={handleClear} style={{padding:"0.4em 1em",background:"#fff",color:"#c00",border:"1px solid #ccc",borderRadius:"4px",cursor:"pointer"}}>🗑 清空</button>
        </div>
      </div>
    </div>
  );
}
