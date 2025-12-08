import type React from "react";
import { useContext } from "react";
import { playerContext } from "../context/playerContext";

interface SongItemProps {
  name: string;
  image: string;
  desc: string;
  id: number;
}

const SongItem: React.FC<SongItemProps> = ({ name, image, desc, id }) => {
  const {playWithId}= useContext(playerContext);
  return (
    <div onClick={()=> playWithId(id)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#fffff26]">
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
