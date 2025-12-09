import logo from "../assets/kevinRushLogo.png";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Navbar = () => {
  return (
    <div className="mb-20 flex items-center justify-between py-6">
      <div className="flex shrink-0 items-center">
        <img src={logo} alt="logo" className="mx-2 w-10"/>
      </div>
        <div className="m-8 flex items-center justify-center gap-4 text-2xl">
          <Linkedin />
          <Github />
          <Twitter />
          <Instagram />
        </div>  
    </div>
  );
};

export default Navbar;
