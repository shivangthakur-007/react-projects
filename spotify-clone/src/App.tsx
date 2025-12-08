import { useContext } from "react";
import "./App.css";
import Display from "./component/Display";
import Player from "./component/Player";
import Sidebar from "./component/Sidebar";
import { playerContext } from "./context/playerContext";

function App() {
  const {audioRef, track}= useContext(playerContext); 

  const trackSrc= track?.file || '';
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio  preload="auto" src={trackSrc} ref={audioRef}></audio>
    </div>
  );
}

export default App;
