import React, { useRef, useState } from "react";
import styles from "./AIChatTool.module.css";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    imageUrl?: string;
}

export default function AIChatTool() {
    const [input, setInput] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [zoomImage, setZoomImage] = useState<string | null>(null);

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        if (image) return;
        const items = event.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf("image") !== -1) {
                const file = item.getAsFile();
                if (file) {
                    setImage(file);
                    const reader = new FileReader();
                    reader.onload = (e) => setImagePreview(e.target?.result as string);
                    reader.readAsDataURL(file);
                }
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim() && !image) return;

        setMessages((msgs) => [
            ...msgs,
            {
                id: Math.random().toString(36).substring(2),
                role: "user",
                content: input,
                imageUrl: imagePreview || undefined,
            },
        ]);
        setInput("");
        setImage(null);
        setImagePreview(null);

        const aiReply = await fakeAiApi(input, image);

        setMessages((msgs) => [
            ...msgs,
            {
                id: Math.random().toString(36).substring(2),
                role: "ai",
                content: aiReply,
            },
        ]);
    };

    async function fakeAiApi(text: string, img?: File | null): Promise<string> {
        return new Promise((resolve) =>
            setTimeout(
                () =>
                    resolve(
                        img
                            ? `(AI đã nhận được ảnh + text: "${text}")`
                            : `(AI trả lời: "${text}")`
                    ),
                1200
            )
        );
    }

    return (
        <div className={styles.aiChatToolRoot}>
            {zoomImage && (
                <div
                    className={styles.aiChatImageModal}
                    onClick={() => setZoomImage(null)}
                    tabIndex={-1}
                >
                    <img src={zoomImage} alt="Zoom" className={styles.aiChatImageModalImg} />
                </div>
            )}

            {/* Khung chat */}
            <div className={styles.aiChatMessages}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={[
                            styles.aiChatMessageRow,
                            msg.role === "user" ? styles.user : "",
                        ].join(" ")}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                            {msg.imageUrl && (
                                <img
                                    src={msg.imageUrl}
                                    alt="user upload"
                                    className={[
                                        styles.aiChatAvatarImg,
                                        msg.role === "user" ? styles.user : "",
                                    ].join(" ")}
                                    style={{ margin: "0 0 4px 0", cursor: "pointer" }}
                                    onClick={() => setZoomImage(msg.imageUrl!)}
                                    title="Bấm để phóng to"
                                />
                            )}
                            <span
                                className={[
                                    styles.aiChatBubble,
                                    msg.role === "user" ? styles.user : "",
                                ].join(" ")}
                            >
                                {msg.content}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


            {/* Nhập chat */}
            <div className={styles.aiChatInputBox}>
                {imagePreview && (
                    <div className={styles.aiChatImagePreviewContainer}>
                        <div className={styles.aiChatImagePreviewBox}>
                            <img
                                src={imagePreview}
                                alt="Pasted preview"
                                className={styles.aiChatImagePreviewImg}
                            />
                            <button
                                onClick={() => {
                                    setImage(null);
                                    setImagePreview(null);
                                }}
                                className={styles.aiChatImageRemoveBtn}
                                title="Xóa ảnh"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
                <div className={styles.aiChatToolbar}>
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPaste={handlePaste}
                        placeholder="Hỏi bất kỳ điều gì"
                        className={styles.aiChatTextarea}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // Ngăn xuống dòng
                                if (input.trim() || image) {
                                    handleSend();
                                }
                            }
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() && !image}
                        className={styles.aiChatSendBtn}
                        title="Gửi"
                    >
                        <span role="img" aria-label="send">⏎</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
