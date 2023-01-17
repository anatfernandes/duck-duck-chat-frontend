import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./GlobalStyles";
import { Messages } from "../Messages/Messages";
import { Header } from "../Header/Header";

function App() {
	return (
		<>
			<GlobalStyle />
			<ToastContainer />

			<Header />
			<Messages />
		</>
	);
}

export default App;
