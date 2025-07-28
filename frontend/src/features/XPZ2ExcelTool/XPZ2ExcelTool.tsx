import { useState } from "react";
import FileDrop from "../../components/FileDrop/FileDrop";
import { useNoti } from "@contexts/NotiContext";

export default function XPZ2ExcelTool() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const noti = useNoti();

    // Xử lý khi click button
    const handleProcess = () => {
        if (!selectedFile) {
            alert("Hãy chọn file trước!");
            return;
        }
    };
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

            <FileDrop onFileSelected={file => {
                if (file) {
                    setSelectedFile(file);
                    noti.success("Tải file thành công!", `Đã upload file ${file.name}`);
                }
            }} />

            <div className="flex flex-col gap-3 max-w-md">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleProcess}
                >
                    Chuyển đổi &amp; Tải Transaction Excel
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
                >
                    Tải source Procedure (Excel)
                </button>
                <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow transition"
                >
                    Tải source WebPanel (Excel)
                </button>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition"
                >
                    Tải danh sách domain
                </button>
            </div>

        </div>
    );
}
