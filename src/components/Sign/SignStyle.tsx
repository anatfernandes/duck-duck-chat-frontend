import styled from "styled-components";
import React from "react";
import logo from "../../assets/images/logo.png";

export default function SignStyle({ children }: React.PropsWithChildren) {
	return (
		<Container>
			<img alt="trackit" src={logo} />
			<h1>Duck, Duck, Chat</h1>
			{children}
		</Container>
	);
}

const Container = styled.div`
	width: 90%;
	max-width: 600px;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;

	h1 {
		font-size: 30px;
		margin-bottom: 40px;
	}

	img {
		width: 80px;
		margin: 68px 0 30px;
	}

	form {
		width: 90%;
	}

	input {
		width: 100%;
		height: 45px;
		border-radius: 5px;
		background-color: var(--white);
		border: 1px solid var(--light-gray);
		padding: 0 11px;
		font-size: 18px;
		margin-bottom: 6px;
	}

	input::placeholder {
		color: var(--dark-gray);
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 30px white inset;
	}

	input:-webkit-autofill {
		-webkit-text-fill-color: var(--black);
	}

	button {
		width: 100%;
		height: 45px;
		border-radius: 5px;
		background-color: var(--medium-yellow);
		border: none;
		margin: 10px 0 25px;
		font-size: 20px;
		color: var(--black);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		:hover {
			filter: brightness(0.9);
		}

		:disabled {
			filter: brightness(0.7);
		}
	}

	span {
		line-height: 20px;
		font-size: 16px;
		color: var(--dark-yellow);
		margin-bottom: 10px;
	}
`;
