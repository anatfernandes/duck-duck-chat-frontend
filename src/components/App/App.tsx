import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./GlobalStyles";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";

function App() {
	const [showUsers, setShowUsers] = useState(false);

	return (
		<>
			<GlobalStyle />
			<ToastContainer />

			<Header setShowUsers={setShowUsers} />
			<Main showUsers={showUsers} />
		</>
	);
}

export default App;
