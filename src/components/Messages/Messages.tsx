import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getMessages } from "../../services/api";
import { MessageType } from "../../utils/protocols";
import { CreateMessage } from "./CreateMessage";
import { Message } from "./Message";

export function Messages() {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [updateMessages, setUpdateMessages] = useState(false);
	const currentDate = useRef("");

	useEffect(() => {
		getMessages()
			.then((messages) => {
				if (typeof messages === "object") setMessages(messages);
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

						<Message key={index} {...message} />
					</>
				))}
			</div>

			<CreateMessage setUpdateMessages={setUpdateMessages} />
		</Wrapper>
	);
}

const Wrapper = styled.section`
	height: 100%;
	width: 97%;
	margin: 0 auto;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: end;

	> div {
		width: 100%;
		height: auto;
		max-height: 80%;
		padding-top: 17px;
		overflow-y: scroll;
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
