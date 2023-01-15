import axios from "axios";
import { MessageType } from "../utils/protocols";

const BASE_URI = process.env.REACT_APP_API_URI;

async function getMessages(): Promise<MessageType[]> {
	const messages = await axios.get<MessageType[]>(`${BASE_URI}/messages`);
	return messages.data;
}

export { getMessages };
