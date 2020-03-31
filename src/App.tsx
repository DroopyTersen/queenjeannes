import React from "/web_modules/react.js";
import Header from "./Layout/Header.js";
import HomeScreen from "./Home/HomeScreen.js";

function App({}) {
  return (
    <div className="app">
      <Header />
      <HomeScreen />
    </div>
  );
}

export default App;
