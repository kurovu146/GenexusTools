import React, { useRef, useState } from "react";
import { useNoti } from "@contexts/NotiContext";

interface FileDropProps {
  onFileSelected: (file: File | null) => void;
}

export default function FileDrop({ onFileSelected }: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const noti = useNoti();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelected(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    inputRef.current!.value = "";
    onFileSelected(null);
    noti.info("Đã xoá file", "Bạn có thể tải lên file mới nếu cần.");
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 mb-5 flex flex-col items-center justify-center transition
        ${isDragging ? "border-cyan-400 bg-cyan-50" : "border-gray-300"}
        cursor-pointer select-none`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-5xl mb-2">⬇️</div>
      <input
        ref={inputRef}
        type="file"
        accept=".xpz,.zip"
        className="hidden"
        onChange={handleChange}
      />
      {selectedFile ? (
        <div className="font-semibold text-gray-700 mb-2">
          <span className="font-bold text-lg text-cyan-500">{selectedFile.name}</span>
          <button
            type="button"
            className="ml-2 px-2 py-0.5 rounded bg-red-100 hover:bg-red-200 text-red-600 font-medium"
            onClick={handleRemoveFile}
          >
            Xoá
          </button>
        </div>
      ) : (
        <div className="font-semibold text-gray-700 mb-2">
            <span className="font-bold text-lg text-cyan-500">Choose a .xpz/.zip</span> or drag it here.
        </div>
      )}
    </div>
  );
}
