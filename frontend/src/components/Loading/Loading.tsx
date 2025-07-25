export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <svg className="animate-spin h-8 w-8 text-cyan-600" viewBox="0 0 24 24">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      <span className="ml-3 text-cyan-700 font-medium text-lg">Đang tải...</span>
    </div>
  );
}
