type MessageType = {
	id: number;
	text: string;
	userId: number;
	date: string;
	userImage: string;
	username: string;
};

type UserType = {
	id: number;
	username: string;
	image: string;
};

type User = {
	username: string;
	image: string;
	token: string;
};

type SetState<Type> = React.Dispatch<React.SetStateAction<Type>>;

export type { MessageType, SetState, User, UserType };
