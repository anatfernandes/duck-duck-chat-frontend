import styled from "styled-components";
import { Messages } from "../Messages/Messages";
import { Users } from "../Users/Users";

type MainParams = {
	showUsers: boolean;
};

export function Main({ showUsers }: MainParams) {
	return (
		<>
			{showUsers && (
				<Wrapper>
					<Messages showUsers={showUsers}/>
					<Users />
				</Wrapper>
			)}
			{!showUsers && <Messages showUsers={showUsers}/>}
		</>
	);
}

const Wrapper = styled.section`
	display: flex;
`;
