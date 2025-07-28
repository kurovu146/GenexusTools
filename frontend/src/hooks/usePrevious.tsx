import { useRef, useEffect } from "react";

/**
 * Hook giúp bạn lấy giá trị trước đó của một state/prop bất kỳ
 * @param value - Giá trị muốn lưu lại
 * @returns - Giá trị cũ (ở lần render trước)
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
