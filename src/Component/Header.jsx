import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../Appwrite/Auth";
import Logo from "../images/imgbg.jpg";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    async function onclickhandler() {
        try {
            await AuthService.LogOut(); // Ensure logout is awaited if it's asynchronous
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <>
            <div className="h-24 w-full bg-purple-700 flex flex-col md:flex-row justify-between items-center px-4">
                {/* Logo and Title */}
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-16 w-16 rounded-full mr-4" />
                    <div className="flex flex-col">
                        <h1 className="text-white text-3xl md:text-4xl font-bold">The Blooming Pen</h1>
                        <h2 className="text-black font-bold text-lg">Tell Your Own Story</h2>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                    <Link 
                        to="/home" 
                        className={`text-white font-bold hover:underline ${
                            location.pathname === "/home" ? "text-yellow-300" : ""
                        }`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/selfposts" 
                        className={`text-white font-bold hover:underline ${
                            location.pathname === "/selfposts" ? "text-yellow-300" : ""
                        }`}
                    >
                        Your Posts
                    </Link>
                    <Link 
                        to="/about" 
                        className={`text-white font-bold hover:underline ${
                            location.pathname === "/about" ? "text-yellow-300" : ""
                        }`}
                    >
                        About
                    </Link>
                </div>

                {/* Logout Button */}
                <button
                    onClick={onclickhandler}
                    className="text-white text-2xl font-bold hover:text-gray-800 hover:underline mt-4 md:mt-0"
                    aria-label="Logout"
                >
                    Logout
                </button>
            </div>
        </>
    );
}

export default Header;
