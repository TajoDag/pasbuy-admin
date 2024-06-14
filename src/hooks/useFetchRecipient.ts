import { useEffect, useState } from "react";
import { getDetailUser } from "../modules/Accounts/api";

// Định nghĩa kiểu cho chat và user
interface Member {
    _id: string;
    username: string;
    email?: string;
}

interface Chat {
    members: Member[];
}

interface User {
    id: string;
    username: string;
    email: string;
    // Thêm các thuộc tính khác của User nếu có
}

interface ApiResponse<T> {
    status: boolean;
    result: T;
    message?: string;
}

export const useFetchRecipientUser = (chat: Chat | null, idBotChat: string) => {
    const [recipientUser, setRecipientUser] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Tìm thành viên có _id khác với idBotChat
    const recipient = chat?.members.length === 2 ? chat?.members.find((member) => member._id !== idBotChat) : null;
    // console.log(recipient)
    // console.log(chat)
    useEffect(() => {
        const getUser = async () => {
            if (recipient?._id) {
                try {
                    const response: ApiResponse<User> = await getDetailUser(recipient._id);
                    if (response.status) {
                        setRecipientUser(response.result);
                        console.log(response.result)
                    } else {
                        setError(response.message || "An error occurred");
                    }
                } catch (err) {
                    setError("Failed to fetch recipient user");
                }
            }


        };

        getUser();
    }, [recipient?._id]);

    return { recipientUser, error };
};
