import styled from "styled-components";
import { useEffect, useRef } from "react";
import { MessageType } from "../../utils/protocols";

type MessageParams = MessageType & {
	isLast: boolean;
};

export function Message({
	id,
	text,
	userId,
	date,
	userImage,
	username,
	isLast,
}: MessageParams) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current && isLast) {
			ref.current.scrollIntoView({
				behavior: "auto",
			});
		}
	}, [id]);

	return (
		<Wrapper ref={ref}>
			<Container>
				<Image>
					<img src={userImage} />
				</Image>

				<div>
					<span>{username}</span>
					<p>{text}</p>
				</div>
			</Container>

			<Time>{new Date(date).toLocaleString("pt-br").slice(-8)}</Time>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
	border-radius: 5px;
	margin: 5px 0;
	background: var(--light-gray);
`;

const Container = styled.div`
	display: flex;

	span {
		font-size: 14px;
		color: var(--dark-yellow);
	}

	p {
		margin-top: 5px;
	}
`;

const Time = styled.span`
	align-self: end;
	font-size: 12px;
	color: var(--dark-gray);
`;

const Image = styled.div`
	display: flex;
	align-items: center;
	margin-right: 10px;

	img {
		width: 40px;
		height: 40px;
		border-radius: 50px;
		object-fit: contain;
	}
`;
