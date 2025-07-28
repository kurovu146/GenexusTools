import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Noti from "@components/Notification";
import { AnimatePresence, motion } from "framer-motion";

type NotiType = "success" | "error" | "info" | "warning";

type NotiItem = {
    id: number;
    type: NotiType;
    message: string;
    detail?: string;
    timeout?: number;
};

type NotiContextProps = {
    show: (type: NotiType, message: string, detail?: string, timeout?: number) => void;
    success: (message: string, detail?: string, timeout?: number) => void;
    error: (message: string, detail?: string, timeout?: number) => void;
    info: (message: string, detail?: string, timeout?: number) => void;
    warning: (message: string, detail?: string, timeout?: number) => void;
};

const NotiContext = createContext<NotiContextProps | undefined>(undefined);

let _id = 1;

export function NotiProvider({ children }: { children: ReactNode }) {
    const [notis, setNotis] = useState<NotiItem[]>([]);

    const remove = useCallback((id: number) => {
        setNotis(n => n.filter(x => x.id !== id));
    }, []);

    const show = useCallback(
        (type: NotiType, message: string, detail?: string, timeout = 3200) => {
            const id = _id++;
            setNotis(n => [...n, { id, type, message, detail, timeout }]);
            setTimeout(() => remove(id), timeout);
        },
        [remove]
    );

    // Rút gọn hàm cho từng loại noti
    const api: NotiContextProps = {
        show,
        success: (msg, d, t) => show("success", msg, d, t),
        error: (msg, d, t) => show("error", msg, d, t),
        info: (msg, d, t) => show("info", msg, d, t),
        warning: (msg, d, t) => show("warning", msg, d, t)
    };

    return (
        <NotiContext.Provider value={api}>
            {children}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end">
                <AnimatePresence>
                    {notis.map(n => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, y: -32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -32 }}
                            transition={{ duration: 0.24, ease: [0.36, 1.01, 0.68, 1] }}
                            style={{ width: "100%" }}
                        >
                            <Noti
                                type={n.type}
                                message={n.message}
                                detail={n.detail}
                                onClose={() => remove(n.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotiContext.Provider>
    );
}

// Custom hook để dùng ở bất cứ đâu trong app
export function useNoti() {
    const ctx = useContext(NotiContext);
    if (!ctx) throw new Error("useNoti must be used within a NotiProvider");
    return ctx;
}
