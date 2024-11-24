import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../Appwrite/Auth";
import Logo from "../images/imgbg.jpg";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
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
        <header className="w-full bg-purple-700 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center h-20 px-4 md:px-8">
                {/* Logo and Title */}
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-16 w-16 rounded-full mr-4"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            The Blooming Pen
                        </h1>
                        <h2 className="text-sm md:text-base font-medium">
                            Tell Your Own Story
                        </h2>
                    </div>
                </div>

                {/* Hamburger Icon for Mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-3xl md:hidden focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <i
                        className={`fas ${
                            menuOpen ? "fa-times" : "fa-bars"
                        }`}
                    ></i>
                </button>

                {/* Navigation Links */}
                <nav
                    className={`${
                        menuOpen ? "flex" : "hidden"
                    } flex-col md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-purple-700 w-full md:w-auto top-20 left-0 z-10 shadow-md md:shadow-none`}
                >
                    <Link
                        to="/home"
                        className={`block py-2 md:py-0 px-4 md:px-0 font-bold ${
                            location.pathname === "/home"
                                ? "text-yellow-300"
                                : "hover:text-gray-300"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/selfposts"
                        className={`block py-2 md:py-0 px-4 md:px-0 font-bold ${
                            location.pathname === "/selfposts"
                                ? "text-yellow-300"
                                : "hover:text-gray-300"
                        }`}
                    >
                        Your Posts
                    </Link>
                    <Link
                        to="/about"
                        className={`block py-2 md:py-0 px-4 md:px-0 font-bold ${
                            location.pathname === "/about"
                                ? "text-yellow-300"
                                : "hover:text-gray-300"
                        }`}
                    >
                        About
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={onclickhandler}
                        className="block md:inline text-xl font-bold py-2 hover:underline hover:text-gray-300 md:ml-auto"
                        aria-label="Logout"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;


