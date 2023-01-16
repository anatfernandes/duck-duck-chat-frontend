import { User } from "./protocols";

export function getUserData(): User | null {
	const data = localStorage.getItem("duckduckchat");
	if (!data) return null;
	return JSON.parse(data);
}
