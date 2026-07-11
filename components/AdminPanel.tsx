"use client";

import { useState, useEffect } from "react";

const PASSWORD_HASH = btoa("sunqifang2024"); // simple obfuscation
const STORAGE_KEY = "sunqifang_admin_auth";

const files = [
  { name: "个人信息", file: "content/profile.json", desc: "姓名、邮箱、研究方向、个人简介等" },
  { name: "论文列表", file: "content/publications.json", desc: "10篇学术论文" },
  { name: "专利列表", file: "content/patents.json", desc: "5项发明专利" },
  { name: "课程信息", file: "content/courses.json", desc: "8门课程" },
  { name: "团队成员", file: "content/team.json", desc: "研究生/本科生名单" },
];

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const check = () => {
    if (btoa(pw) === PASSWORD_HASH) {
      localStorage.setItem(STORAGE_KEY, "1");
      onAuth();
    } else {
      setErr("密码错误");
    }
  };

  return (
    <div style={{
      maxWidth: "400px", margin: "4em auto", padding: "2em",
      border: "1px solid #ccc", borderRadius: "8px", textAlign: "center"
    }}>
      <h2 style={{marginBottom:"1em"}}>🔒 内容管理</h2>
      <p style={{fontSize:"0.9rem", color:"#666", marginBottom:"1.5em"}}>
        请输入管理密码
      </p>
      <input
        type="password"
        value={pw}
        onChange={(e) => { setPw(e.target.value); setErr(""); }}
        onKeyDown={(e) => e.key === "Enter" && check()}
        style={{
          width:"100%", padding:"0.6em", fontSize:"1rem",
          border:"1px solid #ccc", borderRadius:"4px", marginBottom:"0.5em",
          boxSizing:"border-box"
        }}
        placeholder="输入密码"
        autoFocus
      />
      {err && <p style={{color:"red", fontSize:"0.85rem"}}>{err}</p>}
      <button onClick={check} style={{
        marginTop:"0.5em", padding:"0.6em 2em", fontSize:"1rem",
        background:"#2f4f4f", color:"#f5deb3", border:"1px solid #000",
        borderRadius:"4px", cursor:"pointer", fontWeight:"bold"
      }}>
        进入
      </button>
    </div>
  );
}

export function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
  }, []);

  const handleAuth = () => setAuthed(true);

  useEffect(() => {
    if (!authed) return;
    Promise.all(
      files.map(async (f) => {
        const r = await fetch(`https://raw.githubusercontent.com/olixu/sunqifang/main/${f.file}`);
        const text = await r.text();
        return [f.file, text] as const;
      })
    ).then((entries) => {
      setData(Object.fromEntries(entries));
    });
  }, [authed]);

  if (!authed) return <AuthGate onAuth={handleAuth} />;

  const update = (file: string, val: string) => {
    setData((prev) => ({ ...prev, [file]: val }));
  };

  const download = (file: string) => {
    const blob = new Blob([data[file]], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.split("/").pop()!;
    a.click();
    URL.revokeObjectURL(url);
    setMsg(`✅ ${file} 已下载`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <h2>📝 在线内容管理</h2>
      <p style={{color:"#555", marginBottom:"1em"}}>
        修改下面的内容 → 点击下载 → 到 GitHub 上传替换文件 → 自动部署
      </p>

      {msg && <div style={{background:"#d4edda", color:"#155724", padding:"0.75em", borderRadius:"4px", marginBottom:"1em"}}>{msg}</div>}

      <div style={{background:"#fff8e8", border:"1px solid #ffc107", borderRadius:"8px", padding:"1em", marginBottom:"1.5em", fontSize:"0.9rem"}}>
        <strong>⚡ 两步更新：</strong><br />
        1. 在下面对应框里修改内容<br />
        2. 点「下载」→ 打开{" "}
        <a href="https://github.com/olixu/sunqifang/tree/main/content" target="_blank" rel="noopener" style={{fontWeight:"bold"}}>
          GitHub content/ 目录
        </a>{" "}
        → 找到同名的文件 → 点编辑（✏️）→ 粘贴修改后的内容 → Commit changes → 等1分钟自动更新
      </div>

      {files.map((file) => (
        <div key={file.file} style={{marginBottom:"2em"}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5em"}}>
            <div>
              <strong style={{fontSize:"1.1rem"}}>{file.name}</strong>
              <span style={{color:"#888", fontSize:"0.85rem", marginLeft:"0.75em"}}>{file.desc}</span>
            </div>
            <button
              onClick={() => download(file.file)}
              style={{
                padding:"0.4em 1em",
                background:"#2f4f4f",
                color:"#f5deb3",
                border:"1px solid #000",
                borderRadius:"4px",
                cursor:"pointer",
                fontWeight:"bold",
                fontSize:"0.85rem",
              }}
            >
              ⬇ 下载
            </button>
          </div>
          <textarea
            value={data[file.file] || "加载中..."}
            onChange={(e) => update(file.file, e.target.value)}
            style={{
              width:"100%",
              minHeight:"250px",
              fontFamily:'"SF Mono", "Courier New", monospace',
              fontSize:"0.8rem",
              padding:"1em",
              border:"1px solid #ccc",
              borderRadius:"6px",
              background:"#fafafa",
              lineHeight:"1.5",
              boxSizing:"border-box",
            }}
          />
        </div>
      ))}

      <div style={{background:"#f0f4ff", border:"1px solid #b8d4fe", borderRadius:"8px", padding:"1.2em", marginTop:"1em"}}>
        <strong>🔗 直接编辑 GitHub（更快）</strong><br />
        <a href="https://github.com/olixu/sunqifang/tree/main/content" target="_blank" rel="noopener">
          https://github.com/olixu/sunqifang/tree/main/content
        </a>
        <p style={{color:"#555", marginTop:"0.5em", fontSize:"0.85rem"}}>
          点任意JSON文件 → ✏️编辑 → Commit changes → 等1-2分钟自动部署到网站
        </p>
      </div>
    </div>
  );
}