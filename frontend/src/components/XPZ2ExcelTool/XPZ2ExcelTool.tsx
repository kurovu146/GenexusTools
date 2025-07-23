import React from "react";

export default function XPZ2ExcelTool() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        Chuyển đổi XPZ <span className="mx-1">➜</span> Excel
      </h2>

      <div className="bg-cyan-100 rounded border border-cyan-200 p-4 mb-4">
        <div className="font-semibold">① Mục đích:</div>
        <div className="mb-2">Trích xuất dữ liệu từ file .xpz thành file Excel để kiểm tra hoặc mapping.</div>
        <div className="font-semibold">② Cách dùng:</div>
        <div>
          Tải lên file .xpz/.zip Bấm nút để xuất dữ liệu:<br />
          <b>Chuyển đổi &amp; Tải Transaction Excel:</b> Danh sách field các bảng<br />
          <b>Tải source Procedure (Excel):</b> Mã nguồn xử lý<br />
          <b>Tải source WebPanel (Excel):</b> Mã nguồn xử lý<br />
          <b>Tải danh sách domain:</b> Danh sách domain định nghĩa
        </div>
      </div>

      <div className="border border-dashed rounded-xl p-8 mb-5 flex flex-col items-center justify-center">
        {/* Icon download */}
        <div className="text-5xl mb-2">⬇️</div>
        <div className="font-semibold text-gray-700 mb-2">
          <span className="font-bold text-lg">Choose a .xpz/.zip</span> or drag it here.
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-md">
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold shadow">
          Chuyển đổi &amp; Tải Transaction Excel
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded font-semibold shadow">
          Tải source Procedure (Excel)
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded font-semibold shadow">
          Tải source WebPanel (Excel)
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow">
          Tải danh sách domain
        </button>
      </div>
    </div>
  );
}
