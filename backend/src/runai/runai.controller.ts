import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';

type ChatMessage = { role: "user" | "assistant"; content: string };

@Controller('runai')
export class RunaiController {

    @Post('chat')
    async chat(@Body() body: { messages: ChatMessage[] }) {
        // Giới hạn chỉ lấy 10 câu gần nhất (nếu gửi lên nhiều hơn)
        const lastMessages = body.messages.slice(-10);

        const res = await axios.post(
            process.env.RUNAI_API_URL || "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o", // hoặc "gpt-4o"
                messages: lastMessages,
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Trả lại message trả lời đầu tiên của AI
        const aiReply = res.data.choices[0].message;
        return { reply: aiReply };
    }
}
