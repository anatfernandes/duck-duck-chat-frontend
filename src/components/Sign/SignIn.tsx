import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postSingIn, PostSingInParams } from "../../services/api";
import SignStyle from "./SignStyle";

export default function SignIn() {
	const [form, setForm] = useState<PostSingInParams>({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	function handleForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		postSingIn(form)
			.then((response) => {
				localStorage.setItem("duckduckchat", JSON.stringify(response));
				navigate("/");
			})
			.catch(({ response }) =>
				toast(
					response.data.message ||
						"Não foi possível fazer login. Por favor, verifique os dados e tente novamente."
				)
			);
	}

	function updateForm(name: string, value: string) {
		setForm({
			...form,
			[name]: value,
		});
	}

	return (
		<SignStyle>
			<form onSubmit={handleForm}>
				<input
					autoComplete="off"
					required
					name="email"
					type="email"
					placeholder="Email"
					onChange={(e) => updateForm(e.target.name, e.target.value)}
				></input>
				<input
					autoComplete="off"
					required
					name="password"
					type="password"
					placeholder="Senha"
					onChange={(e) => updateForm(e.target.name, e.target.value)}
				></input>

				<button>Entrar</button>
			</form>

			<Link to="/sign-up">
				<span>
					<u>
						Não tem uma conta? <b>Cadastre-se! </b>
					</u>
				</span>
			</Link>

			<Link to="/">
				<span>Home</span>
			</Link>
		</SignStyle>
	);
}
