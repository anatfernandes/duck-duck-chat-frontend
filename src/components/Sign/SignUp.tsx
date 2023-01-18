import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { postSingUp, PostSingUpParams } from "../../services/api";
import SignStyle from "./SignStyle";

type SingUpForm = PostSingUpParams & {
	confirmPassword: string;
};

export default function SignUp() {
	const [form, setForm] = useState<SingUpForm>({
		username: "",
		image: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	function handleForm(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (form.password !== form.confirmPassword) {
			toast("As senhas devem ser iguais!");
			return;
		}

		const { confirmPassword, ...body } = form;

		postSingUp(body)
			.then(() => {
				navigate("/sign-in");
			})
			.catch(({ response }) =>
				toast(
					response.data.message ||
						response.data ||
						"Não foi possível fazer o cadastro. Por favor, verifique os dados e tente novamente."
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
					name="username"
					type="text"
					placeholder="Nome de usuário"
					onChange={(e) => updateForm(e.target.name, e.target.value)}
				></input>
				<input
					autoComplete="off"
					required
					name="image"
					type="url"
					placeholder="Avatar"
					onChange={(e) => updateForm(e.target.name, e.target.value)}
				></input>
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
				<input
					autoComplete="off"
					required
					name="confirmPassword"
					type="password"
					placeholder="Confirme a senha"
					onChange={(e) => updateForm(e.target.name, e.target.value)}
				></input>

				<button>Cadastrar</button>
			</form>

			<Link to="/sign-in">
				<span>
					<u>
						Já tem uma conta? <b>Entre! </b>
					</u>
				</span>
			</Link>

			<Link to="/">
				<span>Home</span>
			</Link>
		</SignStyle>
	);
}
