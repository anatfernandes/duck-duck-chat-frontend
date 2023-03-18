import styled from "styled-components";
import { useState } from "react";
import { IoIosSend as SendIcon } from "react-icons/io";
import { SetState } from "../../utils/protocols";
import { toast } from "react-toastify";
import { postMessage } from "../../services/api";
import { getUserData } from "../../utils/getUserData";

type CreateMessageParams = {
	setUpdateMessages: SetState<boolean>;
	showUsers: boolean;
};

type WrapperProps = {
	showUsers: boolean;
};

export function CreateMessage({
	setUpdateMessages,
	showUsers,
}: CreateMessageParams) {
	const [message, setMessage] = useState({ text: "" });
	const user = getUserData();

	function sendMessage(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		postMessage(message)
			.then(() => {
				setMessage({ text: "" });
				setUpdateMessages((prev) => !prev);
			})
			.catch(({ response }) =>
				toast(
					response.data.message ||
						"Não foi possível enviar a mensagen. Por favor, tente novamente."
				)
			);
	}

	return (
		<Wrapper onSubmit={sendMessage} showUsers={showUsers}>
			{!user && (
				<span>
					Faça <u>login</u> para mandar uma mensagem :)
				</span>
			)}

			{user && (
				<>
					<textarea
						required
						autoComplete="off"
						placeholder="Escrever..."
						value={message.text}
						onChange={(e) => setMessage({ text: e.target.value })}
					/>
					<button>
						<SendIcon />
					</button>
				</>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.form<WrapperProps>`
	width: 100%;
	padding: 10px 0;
	display: flex;
	justify-content: center;
	position: relative;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--light-yellow);
	padding-left: ${(props) => (props.showUsers ? "350px" : "0")};

	textarea {
		width: 95%;
		height: 33px;
		resize: none;
		outline: none;
		border-radius: 5px;
		padding: 6px 30px 6px 10px;
		border: 1px solid var(--dark-yellow);
		box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
		font-size: 16px;
		font-family: "Roboto", sans-serif;
		word-wrap: break-word;

		::placeholder {
			font-style: italic;
		}
	}

	button {
		height: 100%;
		border: none;
		background-color: transparent;
		position: absolute;
		right: 3%;
		top: 1px;
		cursor: pointer;
	}

	svg {
		font-size: 20px;
		color: var(--dark-yellow);
	}

	> span {
		margin: 10px 0;
	}
`;
