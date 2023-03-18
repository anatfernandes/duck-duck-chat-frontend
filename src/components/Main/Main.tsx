import styled from "styled-components";
import { Messages } from "../Messages/Messages";
import { Users } from "../Users/Users";

type MainParams = {
	showUsers: boolean;
};

export function Main({ showUsers }: MainParams) {
	return (
		<Wrapper showUsers={showUsers}>
			<Messages showUsers={showUsers} />
			{showUsers && <Users />}
		</Wrapper>
	);
}

const Wrapper = styled.main<MainParams>`
	display: flex;
	padding: 80px 0 70px;
	padding-left: ${(props) => (props.showUsers ? "345px" : "0")};
`;
