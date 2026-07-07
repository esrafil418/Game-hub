import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Failed to find root element");
}
createRoot(rootElement).render(
	<BrowserRouter>
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	</BrowserRouter>,
);
