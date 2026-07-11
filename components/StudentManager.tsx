"use client";

import { useState, useEffect } from "react";

interface Student { id: string; name: string; grade: string; }

const PASSWORD_HASH = btoa("sunqifang2024");
const AUTH_KEY = "sunqifang_course_auth";

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
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setStudents(JSON.parse(saved));
      if (localStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    } catch {}
  }, [storageKey]);

  const login = () => {
    if (btoa(pw) === PASSWORD_HASH) {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setPwErr("");
    } else {
      setPwErr("密码错误");
    }
  };

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
    const data = parseCSV(textInput);
    save(data);
    alert("✅ 成功导入 " + data.length + " 名学生");
  };

  const handleClear = () => { if (confirm("确定清空所有数据？")) { save([]); setTextInput(""); } };

  // ─── Render: Student table (public) ───────────────────────────────
  const renderTable = () => {
    if (students.length === 0) {
      return <p style={{color:"#999",fontStyle:"italic"}}>暂无学生数据</p>;
    }
    return (
      <>
        <p style={{fontSize:"0.85rem",color:"#666",marginBottom:"0.3em"}}>
          ✅ 共 {students.length} 名学生
        </p>
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
    );
  };

  // ─── Render: Upload panel (requires auth) ──────────────────────────
  const renderUpload = () => {
    if (!authed) {
      return (
        <div style={{border:"2px solid #ccc",borderRadius:"8px",padding:"1.5em",background:"#fafafa",marginTop:"1.2em"}}>
          <p style={{fontSize:"0.9rem",marginBottom:"0.8em"}}>
            <strong>🔒 需验证后方可修改学生数据</strong>
          </p>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(""); }}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="请输入管理密码"
            style={{width:"100%",padding:"0.5em",fontSize:"0.9rem",border:"1px solid #ccc",borderRadius:"4px",boxSizing:"border-box",marginBottom:"0.5em"}} />
          {pwErr && <p style={{color:"red",fontSize:"0.85rem",marginBottom:"0.3em"}}>{pwErr}</p>}
          <button onClick={login} style={{padding:"0.5em 2em",background:"#2f4f4f",color:"#f5deb3",border:"1px solid #000",borderRadius:"4px",cursor:"pointer",fontWeight:"bold"}}>
            验证
          </button>
          <p style={{fontSize:"0.78rem",color:"#999",marginTop:"0.5em"}}>与后台管理密码相同</p>
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div>
      {renderTable()}
      {renderUpload()}
    </div>
  );
}
