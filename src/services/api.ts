import axios from "axios";
import { getUserData } from "../utils/getUserData";
import { MessageType, UserType } from "../utils/protocols";

const BASE_URI = process.env.REACT_APP_API_URI;

function createHeaders() {
	const data = getUserData();

	if (!data) return {};

	const token = data.token;

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return config;
}

async function getMessages(): Promise<MessageType[]> {
	const messages = await axios.get<MessageType[]>(`${BASE_URI}/messages`);
	return messages.data;
}

function postMessage(body: PostMessageParams) {
	const config = createHeaders();
	return axios.post(`${BASE_URI}/messages`, body, config);
}

async function getUsers(): Promise<UserType[]> {
	const users = await axios.get<UserType[]>(`${BASE_URI}/users`);
	return users.data;
}

export type PostMessageParams = { text: string };

export { getMessages, postMessage, getUsers };
