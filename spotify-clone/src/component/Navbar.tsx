import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold ">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            alt=""
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          />
          <img
            src={assets.arrow_right}
            alt=""
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
