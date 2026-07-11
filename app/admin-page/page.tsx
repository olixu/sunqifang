import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "内容管理 Admin",
};

export default function AdminPage() {
  return (
    <>
      <div className="contents" style={{display:"none"}}></div>
      <AdminPanel />
    </>
  );
}
