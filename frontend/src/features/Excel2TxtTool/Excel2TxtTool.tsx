import { useState } from "react";
import * as XLSX from "xlsx";
import FileDrop from "../../components/FileDrop/FileDrop";
import { useNoti } from "@contexts/NotiContext";
import { useLoading } from "@contexts/LoadingContext";

export default function Excel2TxtTool() {
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [txtContent, setTxtContent] = useState("");
    const [workbook, setWorkbook] = useState<any>(null);
    const [sheetNames, setSheetNames] = useState<string[]>([]);
    const [selectedSheets, setSelectedSheets] = useState<string[]>([]);

    const noti = useNoti();
    const loading = useLoading();

    const handleConvert = async () => {
        if (!excelFile) {
            noti.warning("Vui lòng chọn file Excel!");
            return;
        }
        loading.show();
        try {
            if (!workbook) {
                alert("Chưa có file hoặc workbook chưa được load");
                return;
            }

            if (selectedSheets.length === 0) {
                alert("Vui lòng chọn ít nhất 1 sheet");
                return;
            }

            let fullText = "";

            selectedSheets.forEach((sheetName: string) => {
                const worksheet = workbook.Sheets[sheetName];
                const rows: (string | number | boolean | null)[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                fullText += `===== 📄 Sheet: ${sheetName} =====\n`;

                rows.forEach((row: (string | number | boolean | null)[]) => {
                    fullText += row.join('\t') + '\n';
                });

                fullText += '\n';
            });

            setTxtContent(fullText);
            noti.success("Chuyển đổi thành công!");
        } catch (err) {
            loading.hide();
            noti.error("Lỗi khi chuyển đổi file!");
        } finally {
            loading.hide();
        }
    };

    function handleExcelFileUpload(file: File) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const wb = XLSX.read(data, { type: "array" });

            setWorkbook(wb);
            setSheetNames(wb.SheetNames);         // Hiện danh sách sheet
            setSelectedSheets(wb.SheetNames);     // Mặc định chọn hết
        };
        reader.readAsArrayBuffer(file);
    }


    function handleDownload(content: string, filename = "excel_to_txt_output.txt"): void {
        if (!content.trim()) {
            alert("Không có nội dung để tải xuống.");
            return;
        }

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();

        setTimeout(() => URL.revokeObjectURL(url), 100); // cleanup
    }

    return (
        <div className="mx-auto p-4">
            {/* Title + warning */}
            <div className="flex items-center gap-2 mb-2 text-xl font-bold">
                <span role="img" aria-label="excel">📥</span>
                Convert Excel ➔ TXT (Chọn sheet)
            </div>
            <div className="text-red-600 font-semibold text-base mb-2 flex items-center gap-2">
                <span role="img" aria-label="warning">⚠️</span>
                <span>
                    Vui lòng <b>loại bỏ mọi thông tin chứa tên khách hàng</b> khỏi nội dung Spect trước khi gửi yêu cầu!
                    <br />
                    <span className="font-normal text-sm">
                        (dùng cho trường hợp extract txt phục vụ cho chức năng Review Code + Generate Test Case)
                    </span>
                </span>
            </div>
            {/* Hướng dẫn */}
            <div className="mb-4 bg-cyan-100 border border-cyan-200 rounded-lg p-4 text-sm">
                <b>ⓘ Mục đích:</b> Chuyển đổi file excel sang format txt.<br />
                <b>② Cách dùng:</b>
                <ul className="ml-4 list-disc">
                    <li>Tải lên file excel cần chuyển đổi</li>
                    <li>
                        <b>Chuyển Excel thành TXT:</b> Convert file excel sang txt và hiển thị output
                    </li>
                    <li>
                        <b>Tải TXT:</b> Download file đã chuyển đổi về máy
                    </li>
                </ul>
            </div>
            {/* Upload */}
            <FileDrop onFileSelected={excelFile => {
                if (excelFile) {
                    setExcelFile(excelFile);
                    handleExcelFileUpload(excelFile);
                    noti.success("Tải file thành công!", `Đã upload file ${excelFile.name}`);
                }
            }} />

            {sheetNames.length > 0 && (
                <div className="mb-3">
                    <p className="font-semibold mb-1">Chọn sheet muốn export:</p>
                    <div className="flex flex-wrap gap-4" id="sheetSelector">
                        {sheetNames.map(sheet => (
                            <label key={sheet} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={selectedSheets.includes(sheet)}
                                    onChange={e => {
                                        setSelectedSheets(list =>
                                            e.target.checked
                                                ? [...list, sheet]
                                                : list.filter(name => name !== sheet)
                                        );
                                    }}
                                />
                                {sheet}
                            </label>
                        ))}
                    </div>
                </div>
            )}


            {/* Button */}
            <div className="flex gap-2 mb-4">
                <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded font-semibold flex items-center gap-1 disabled:bg-gray-300"
                    disabled={!excelFile}
                    onClick={handleConvert}
                >
                    <span role="img" aria-label="convert">🔄</span>
                    Chuyển Excel thành TXT
                </button>
                <button
                    className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded font-semibold flex items-center gap-1 disabled:bg-gray-300"
                    disabled={!txtContent}
                    onClick={() => handleDownload(txtContent)}
                >
                    <span role="img" aria-label="download">⬇️</span>
                    Tải TXT
                </button>
            </div>
            {/* Kết quả */}
            <textarea
                className="w-full min-h-[120px] rounded border border-gray-300 bg-gray-50 p-3 text-sm"
                placeholder="Nội dung TXT sẽ hiển thị ở đây..."
                value={txtContent}
                readOnly
            />
        </div>
    );
}
