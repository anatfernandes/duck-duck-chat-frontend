import styled from "styled-components";
import { ImEnter as EnterIcon, ImExit as ExitIcon } from "react-icons/im";
import { BsPeopleFill as PeapleIcon } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import { getUserData } from "../../utils/getUserData";
import { SetState } from "../../utils/protocols";

type HeaderParams = {
	setShowUsers: SetState<boolean>;
};

export function Header({ setShowUsers }: HeaderParams) {
	const user = getUserData();

	return (
		<Wrapper>
			<Logo>
				<img src={logo} alt="Duck, Duck, Chat" />
				<h1>Duck, Duck, Chat</h1>
			</Logo>

			<Reception>
				{user !== null && (
					<>
						<h2>Olá, {user.username}!</h2>
						<ExitIcon />
					</>
				)}
				{!user && (
					<>
						<h2>Olá, Estranho!</h2>
						<EnterIcon />
					</>
				)}
			</Reception>

			<Users onClick={() => setShowUsers((prev) => !prev)}>
				<PeapleIcon />
			</Users>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 100%;
	height: 70px;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	box-shadow: 1px 0 7px 4px rgba(0, 0, 0, 0.1);
	background-color: var(--medium-yellow);

	svg {
		height: 25px;
		width: auto;
		margin-left: 20px;
		cursor: pointer;
	}
`;

const Logo = styled.div`
	display: flex;
	align-items: center;

	img {
		height: 60px;
	}

	h1 {
		margin-left: 21px;
	}
`;

const Reception = styled.div`
	display: flex;
	align-items: center;
	padding: 0 20px;

	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		object-fit: contain;
		margin-left: 13px;
	}

	h2 {
		font-weight: 400;
	}
`;

const Users = styled.div`
	width: 43px;
	height: 43px;
	position: absolute;
	top: 80px;
	right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50px;
	background-color: var(--light-yellow);
	box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.2);
	cursor: pointer;

	svg {
		margin: 0;
	}

	:hover {
		filter: brightness(0.9);
	}
`;
