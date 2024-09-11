import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold">My Website</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/presentation" className="text-white">
              Presentation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
