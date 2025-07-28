import { useState } from "react";
import styles from "./GuideModal.module.css";
import { AnimatePresence, motion } from "framer-motion";

type GuideModalProps = {
    open: boolean;
    onClose: () => void;
};

const steps = [
    {
        title: "Bước 1: Đăng nhập vào OpenAI",
        content: (
            <>
                <p>Truy cập <a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer">OpenAI Platform</a> và đăng nhập bằng tài khoản của bạn.</p>
                <img src="src/assets/guide/step1.png" alt="OpenAI login" className={styles.img} />
            </>
        ),
    },
    {
        title: "Bước 2: Vào trang API Keys",
        content: (
            <>
                <p>Chọn mục <b>API keys</b> ở thanh bên trái.</p>
                <img src="src/assets/guide/step2.png" alt="API Keys menu" className={styles.img} />
            </>
        ),
    },
    {
        title: "Bước 3: Tạo API Key mới",
        content: (
            <>
                <p>Bấm nút <b>Create new secret key</b> để tạo khóa mới.</p>
                <img src="src/assets/guide/step3.jpeg" alt="Tạo API key mới" className={styles.img} />
            </>
        ),
    },
    {
        title: "Bước 4: Copy API Key",
        content: (
            <>
                <p>Sao chép khóa API vừa tạo và <b>lưu lại ở nơi an toàn</b>.</p>
                <img src="src/assets/guide/step4.jpg" alt="Copy API key" className={styles.img} />
            </>
        ),
    },
    {
        title: "Bước 5: Dán API Key vào phần Setting",
        content: (
            <>
                <p>Quay lại ứng dụng và dán API key vào phần <b>Cài đặt</b> &gt; <b>API Key</b> rồi bấm Lưu.</p>
                <img src="src/assets/guide/step5.png" alt="Dán API key vào app" className={styles.img} />
            </>
        ),
    },
];

export default function GuideModal({ open, onClose }: GuideModalProps) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    if (!open) return null;

    return (
        <div className={styles.overlay} tabIndex={-1}>
            <div className={styles.modal}>
                <div className={styles.body}>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={step}
                            custom={direction}
                            initial={{ x: 20 * direction, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20 * direction, opacity: 0 }}
                            transition={{ type: "tween", duration: 0.38, ease: "easeInOut" }}
                            style={{ width: "100%" }}
                        >
                            <div className={styles.header}>
                                <h2>{steps[step].title}</h2>
                            </div>
                            {steps[step].content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.footer}>
                    <button
                        disabled={step === 0}
                        onClick={() => {
                            setStep((s) => Math.max(0, s - 1))
                            setDirection(-1)
                        }}
                    >
                        Quay lại
                    </button>
                    {/* Step indicator động */}
                    <div className={styles.stepDots} style={{ position: "relative" }}>
                        {/* Dot nền (tất cả) */}
                        {steps.map((_, i) => (
                            <span key={i} className={styles.stepDot} />
                        ))}
                        {/* Dot active động, animate left */}
                        <motion.span
                            className={`${styles.stepDot} ${styles.active}`}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: step * (20 + 13),
                                pointerEvents: "none",
                            }}
                            layout
                            transition={{
                                type: "tween",
                                duration: 0.38,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                    <button
                        disabled={step === steps.length - 1}
                        onClick={() => {
                            setStep((s) => Math.min(steps.length - 1, s + 1))
                            setDirection(1)
                        }}
                    >
                        Tiếp theo
                    </button>
                </div>
            </div>
        </div>
    );
}
