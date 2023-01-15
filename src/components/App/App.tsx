import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./GlobalStyles";
import { Messages } from "../Messages/Messages";

function App() {
	return (
		<>
			<GlobalStyle />
			<ToastContainer />

			<Messages />
		</>
	);
}

export default App;
