import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./GlobalStyles";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../Sign/SignIn";

function App() {
	const [showUsers, setShowUsers] = useState(false);

	return (
		<BrowserRouter>
			<GlobalStyle />
			<ToastContainer />

			<Routes>
				<Route path="/sign-in" element={<SignIn />} />

				<Route
					path="/"
					element={
						<>
							<Header setShowUsers={setShowUsers} />
							<Main showUsers={showUsers} />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
