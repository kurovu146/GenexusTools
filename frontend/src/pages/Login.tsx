import React, { useState } from "react";
import { useNoti } from "@contexts/NotiContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const noti = useNoti();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      noti.warning("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (username === "admin" && password === "123456") {
        noti.success("Đăng nhập thành công!");
        // TODO: Chuyển hướng sang trang chính
      } else {
        noti.error("Sai tài khoản hoặc mật khẩu!");
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-200 via-sky-200 to-blue-200 overflow-hidden">
      <div className="flex flex-col w-full max-w-3xl items-center px-4">
        {/* Logo hoặc Icon lớn */}
        <div className="mb-4 flex items-center gap-3">
          <img src="favicon.ico" alt="Genexus Tools" className="w-14 h-14 rounded-2xl shadow-lg border-4 border-white" />
          <span className="text-3xl font-bold text-cyan-700 tracking-wide drop-shadow">Genexus Tools</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 shadow-2xl rounded-2xl px-8 py-8 w-full flex flex-col gap-6 border backdrop-blur"
          autoComplete="off"
        >
          <div className="mb-2 text-center">
            <span className="text-lg font-semibold text-gray-500">Đăng nhập bằng tài khoản CREATE</span>
          </div>
          <div>
            <label className="block font-medium mb-1 text-cyan-700">Tài khoản</label>
            <input
              type="text"
              className="w-full border-2 border-cyan-100 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              disabled={loading}
              placeholder="Nhập tài khoản"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-cyan-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full border-2 border-cyan-100 rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-tr from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl px-4 py-2 font-bold shadow-lg transition-all duration-150 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Đang đăng nhập...
              </span>
            ) : "Đăng nhập"}
          </button>
        </form>
        <div className="mt-6 text-gray-400 text-sm">
          © {new Date().getFullYear()} Genexus Tools by sw.kuro.14@gmail.com
        </div>
      </div>
    </div>
  );
}
