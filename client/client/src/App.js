import "./App.css";
import { Search } from "./Search";
import { useState } from "react";

function App() {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
      {isToggled && <Search />}
    </div>
  );
}

export default App;
