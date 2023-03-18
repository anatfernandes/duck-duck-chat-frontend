import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getMessages } from "../../services/api";
import { MessageType } from "../../utils/protocols";
import { CreateMessage } from "./CreateMessage";
import { Message } from "./Message";

type MessagesParams = {
	showUsers: boolean;
};

export function Messages({ showUsers }: MessagesParams) {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [updateMessages, setUpdateMessages] = useState(false);
	const currentDate = useRef("");

	useEffect(() => {
		getMessages()
			.then((messages) => {
				if (typeof messages === "object") setMessages([...messages]);
			})
			.catch(({ response }) =>
				toast(
					response.data.message ||
						"Não foi possível carregar as mensagens. Por favor, recarregue a página."
				)
			);
	}, [updateMessages]);

	function dateIsNotCurrent(date: string) {
		return (
			currentDate.current !==
			new Date(date).toLocaleString("pt-br").slice(0, 10)
		);
	}

	function updateCurrentDate(date: string) {
		currentDate.current = new Date(date).toLocaleString("pt-br").slice(0, 10);
		return true;
	}

	function getMessagesDate() {
		const today = new Date().toLocaleDateString("pt-br");
		return currentDate.current === today ? "HOJE" : currentDate.current;
	}

	return (
		<Wrapper>
			<div>
				{messages.map((message, index) => (
					<>
						{dateIsNotCurrent(message.date) &&
							updateCurrentDate(message.date) && (
								<MessagesDate key={Date.now()}>
									<b>{getMessagesDate()}</b>
								</MessagesDate>
							)}

						<Message
							key={index}
							{...message}
							isLast={index === messages.length - 1}
						/>
					</>
				))}
			</div>

			<CreateMessage
				setUpdateMessages={setUpdateMessages}
				showUsers={showUsers}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 97%;
	height: calc(100vh - (80px + 70px));
	height: -moz-calc(100vh - (80px + 70px));
	height: -webkit-calc(100vh - (80px + 70px));
	margin: 0 auto;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: end;

	> div {
		width: 100%;
		height: auto;
		padding-top: 17px;
		overflow-x: hidden;
	}
`;

const MessagesDate = styled.div`
	&& {
		width: 100%;
		height: 30px;
		background-color: var(--dark-gray);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		color: var(--white);
	}
`;
