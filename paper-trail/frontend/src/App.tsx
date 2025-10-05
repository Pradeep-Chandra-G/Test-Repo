import "./App.css";
import AnimatedBar from "./components/AnimatedBar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import NewNote from "./components/CreateNote";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <div className="flex flex-col p-2">
        <Navbar />
        <AnimatedBar orientation="horizontal" />
        <MainContent />
      </div>
    </>
  );
}

export default App;
