import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers } from "../../services/api";
import { UserType } from "../../utils/protocols";

export function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch(({ response }) =>
        toast(
          response.data.message ||
            "Não foi possível carregar os usuários. Por favor, tente novamente."
        )
      );
  }, []);

  function showMessagesByUser(user: UserType) {
    navigate(`/messages/${user.username}`, {
      state: { user: user.id },
    });
  }

  function showAllMessages() {
    navigate(`/`);
  }

  return (
    <Wrapper>
      <h2>Usuários</h2>

      <div>
        <User onClick={showAllMessages}>
          <span>
            <b>Todos</b>
          </span>
        </User>

        {users.map((user, index) => (
          <User key={index} onClick={() => showMessagesByUser(user)}>
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
  height: calc(100vh - 70px);
  height: -moz-calc(100vh - 70px);
  height: -webkit-calc(100vh - 70px);
  padding: 10px 0 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: 70px;
  z-index: 1;
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
