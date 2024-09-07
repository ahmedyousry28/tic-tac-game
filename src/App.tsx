import "./App.css";
import Gridgame from "./components/Gridgame";

function App() {
  return (
    <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 container mx-auto flex items-center justify-center flex-col h-dvh">
      {<Gridgame />}
    </div>
  );
}

export default App;
