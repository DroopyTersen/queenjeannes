import React from "/web_modules/react.js";
import Header from "./Layout/Header.js";

function App({}) {
	return (
		<div className="app">
			<Header />
			<div style={{ textAlign: "center", marginTop: "40px" }}>
				<h1>Coming Soon!</h1>
				<h4>Queen Jeanne's Gluten Free Bakery</h4>
			</div>
		</div>
	);
}

export default App;
