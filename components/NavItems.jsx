import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from '../contexts/AuthProvider';

const NavItems = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    // Get user and loading state from AuthContext
    const { user, loading, logout } = useContext(AuthContext);
    console.log("User in NavItems:", user); // Log the user object

    // Default avatar URL
    const defaultAvatar = "https://www.gravatar.com/avatar/default?s=200&d=mp";
    const userPhoto = user?.photoURL || defaultAvatar;
    const userName = user?.displayName || "User";

    // Handle logout
    const handleLogout = () => {
        logout();
        setProfileDropdown(false);
    };

    // If loading, show a loading spinner or nothing
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
            {/* Header top */}
            <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
                <div className="container">
                    <div className="header-top-area">
                        {user ? (
                            <div>
                                {/* Debug: Display user info directly */}
                                <div style={{ color: "red", fontWeight: "bold" }}>
                                    Debug: User is logged in - {user.displayName}
                                </div>
                                <div className="user-profile" onClick={() => setProfileDropdown(!profileDropdown)} style={{ border: "2px solid red" }}>
                                    <img
                                        src={userPhoto}
                                        alt={userName}
                                        className="profile-pic"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                    />
                                    {profileDropdown && (
                                        <div className="profile-dropdown" style={{ border: "2px solid blue", padding: "10px", backgroundColor: "white" }}>
                                            <Link to="/profile" onClick={() => setProfileDropdown(false)}>Profile</Link>
                                            <Link to="/orders" onClick={() => setProfileDropdown(false)}>Orders</Link>
                                            <Link to="/cart" onClick={() => setProfileDropdown(false)}>Shopping Cart</Link>
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/signup" className='lab-btn me-3'><span>Create Account</span></Link>
                                <Link to="/login">Log in</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Header bottom */}
            <div className="header-bottom">
                <div className="container">
                    <div className="header-wrapper">
                        {/* Logo */}
                        <div className='logo-search-acte'>
                            <div className="logo">
                                <Link to={"/"}>
                                    <img src={logo} alt="" />
                                </Link>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </div>

                            {/* Sign in & Sign out */}
                            {user ? (
                                <div className="user-profile d-none d-md-block" onClick={() => setProfileDropdown(!profileDropdown)}>
                                    <img
                                        src={userPhoto}
                                        alt={userName}
                                        className="profile-pic"
                                    />
                                    {profileDropdown && (
                                        <div className="profile-dropdown">
                                            <Link to="/profile" onClick={() => setProfileDropdown(false)}>Profile</Link>
                                            <Link to="/shop" onClick={() => setProfileDropdown(false)}>Orders</Link>
                                            <Link to="/cart-page" onClick={() => setProfileDropdown(false)}>Shopping Cart</Link>
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="sign-up" className='lab-btn me-3 d-none d-md-block'>
                                        Create Account
                                    </Link>
                                    <Link to="login" className='d-none d-md-block'>
                                        Log In
                                    </Link>
                                </>
                            )}

                            {/* Menu toggler */}
                            <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {/* Social toggler */}
                            <div className='ellepsis-bar d-md-none' onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavItems;