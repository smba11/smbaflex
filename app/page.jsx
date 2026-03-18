"use client";

import { Lock, Shield } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const VIEWER_CODE = "famwatch2026";
  const CREATOR_CODE = "amancreator2026";

  const handleEnter = () => {
    if (code === VIEWER_CODE || code === CREATOR_CODE) {
      setError("");
      alert(code === CREATOR_CODE ? "Creator access granted" : "Viewer access granted");
      return;
    }
    setError("Wrong code");
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-black/70 p-8 shadow-2xl">
        <h1 className="text-5xl font-black tracking-[0.22em] text-red-600 mb-3">
          SMBAFLEX
        </h1>
        <p className="text-zinc-400 mb-6">Invite-only streaming access</p>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 mb-5 space-y-3">
          <div className="flex items-center gap-2 text-zinc-200">
            <Lock className="h-5 w-5" />
            <span>Viewer code = watch access</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-200">
            <Shield className="h-5 w-5" />
            <span>Creator code = dashboard access</span>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter access code"
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
          <button
            onClick={handleEnter}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            Enter
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
    </main>
  );
}
