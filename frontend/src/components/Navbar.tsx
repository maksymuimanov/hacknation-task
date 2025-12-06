import { Link } from "react-router-dom";
import zusLogo from "../assets/logo_zus_darker_with_text.svg";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-[75px] items-center px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <img className="h-10 w-auto" src={zusLogo} alt="ZANT Logo" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
