import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { getUsers } from "../../services/api";
import { UserType } from "../../utils/protocols";

export function Users() {
	const [users, setUsers] = useState<UserType[]>([]);
	console.log(users);
	useEffect(() => {
		getUsers()
			.then((users) => {
				if (typeof users === "object") setUsers(users);
			})
			.catch(({ response }) =>
				toast(
					response.data.message ||
						"Não foi possível carregar os usuários. Por favor, tente novamente."
				)
			);
	}, []);

	return (
		<Wrapper>
			<h2>Usuários</h2>
			<div>
				{users.map((user, index) => (
					<User key={index}>
						<img src={user.image} alt={user.username} />
						<span>{user.username}</span>
					</User>
				))}
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	width: 340px;
	height: 100vh;
	padding: 80px 0 0;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	overflow-x: hidden;
	background-color: var(--medium-gray);

	> h2 {
		line-height: 50px;
		margin-left: 10px;
	}

	> div {
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
`;

const User = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	padding: 10px;
	background-color: var(--medium-gray);
	color: var(--black);
	cursor: default;

	img {
		width: 40px;
		height: 40px;
		border-radius: 50px;
		object-fit: contain;
		margin-right: 10px;
	}

	span {
		font-size: 16px;
	}

	:hover {
		background-color: var(--dark-gray);
		color: var(--white);
		font-weight: 500;
	}
`;
