import styled from "styled-components";
import { useEffect, useRef } from "react";
import { IoIosTrash as TrashIcon } from "react-icons/io";
import { toast } from "react-toastify";
import { deleteMessage } from "../../services/api";
import { getUserData } from "../../utils/getUserData";
import { MessageType, SetState } from "../../utils/protocols";

type MessageParams = MessageType & {
  isLast: boolean;
  setUpdateMessages: SetState<boolean>;
};

export function Message({
  id,
  text,
  date,
  userImage,
  username,
  isLast,
  setUpdateMessages,
}: MessageParams) {
  const ref = useRef<HTMLDivElement>(null);
  const user = getUserData();

  useEffect(() => {
    if (ref.current && isLast) {
      ref.current.scrollIntoView({
        behavior: "auto",
      });
    }
  }, [id, isLast]);

  function handleDeleteMessage() {
    deleteMessage(id)
      .catch(({ response }) =>
        toast(
          response.data.message ||
            "Não foi possível apagar a mensagen. Por favor, tente novamente."
        )
      )
      .then(() => setUpdateMessages((prev) => !prev));
  }

  return (
    <Wrapper ref={ref}>
      {username === user?.username && (
        <DeleteIconContainer>
          <TrashIcon title="apagar mensagem" onClick={handleDeleteMessage} />
        </DeleteIconContainer>
      )}

      <Container>
        <Image>
          <img src={userImage} alt={username} />
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
    overflow: hidden;
  }
`;

const DeleteIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    height: 1.4rem;
    width: auto;
    color: red;
    cursor: pointer;
  }
`;
