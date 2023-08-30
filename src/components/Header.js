import React, { useState } from 'react'
import Logo from "../img/logo.png"
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdShoppingBasket,MdAdd,MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import {useStateValue} from '../Context/StateProvider'
import { actionType } from '../Context/reducer';

const navItems = ["Home", "Menu", "About", "Services"];

const Header = () => {
    const fireBaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user ,cartShow,cartItems}, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const showCartHandler = () => {
        dispatch({
                type: actionType.SET_CART_SHOW,
                cartShow: !cartShow
            });
    }
    const login = async () => {
        if (!user) {
            const {user:{refreshToken ,providerData}} = await signInWithPopup(fireBaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
        } else {
            setIsMenu(!isMenu);
        }
    }
    const logout = () => {
        setIsMenu(false);
        dispatch({
                type: actionType.RESET_USER
            });
    }

    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary bg-cardOverlay backdrop-blur-md'>
            {/* for web  */}
            <div className='hidden md:flex w-full  h-full items-center justify-between'>
                <Link to="/" className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt='logo' />
                    <p className='text-headingColor text-xl font-bold '>
                        FUDO
                    </p>
                </Link>

                <div className='flex items-center gap-8 ml-auto'>
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        
                        className='flex items-center gap-8 ml-auto'>
                        {
                            navItems.map((item) =>
                                <Link to="/">
                                    <li
                                    key={item}
                                    onClick={()=> setIsMenu(false)}
                                    className='text-base text-textColor hover:text-orange-500 duration-100 transition-all ease-in-out curoser-pointer '>{item}</li>
                                </Link>
                                )
                        }
                    </motion.ul>
                    <div
                        onClick={showCartHandler}
                        className='relative flex items-center justify-center curoser-pointer'>
                        <MdShoppingBasket
                            className='text-textColor text-2xl  curoser-pointer'
                            
                        />
                        {
                            cartItems && cartItems.length > 0 && (
                                <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold '>
                                {cartItems.length}
                            </p>
                        </div>
                            )
                        }
                        
                    </div>
                </div>

                <div className='relative'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user === null? Avatar : user.photoURL}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl ml-6 cursor-pointer rounded-full"
                        alt='user profile'
                        onClick={login}
                    />
                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 ">
                                
                                {
                                user && user.email === process.env.REACT_APP_ADMIN_EMAIL &&  (
                                    <Link to='/createItem'>
                                            <p
                                                onClick={()=> setIsMenu(false)}
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        >New Item <MdAdd />
                                        </p>
                                    </Link>
                                    )
                                }
                                
                                <p
                                    onClick={logout}
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                >Logout <MdLogout /> </p>
                            </motion.div>)
                    }
                    
                </div>

            </div>

            {/* for mobile  */}
            <div className='flex items-center justify-between md:hidden w-full h-full'>
                {/* CART */}
                <div
                    onClick={showCartHandler}
                    className='relative flex items-center justify-center '>
                    <MdShoppingBasket
                        className='text-textColor text-2xl  curoser-pointer' />
                    {
                            cartItems && cartItems.length > 0 && (
                                <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                            <p className='text-xs text-white font-semibold '>
                                {cartItems.length}
                            </p>
                        </div>
                            )
                        }

                    </div>
                {/* LOGO */}
                <Link to="/" className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt='logo' />
                    <p className='text-headingColor text-xl font-bold '>
                        City
                    </p>
                </Link>
                
                {/* MENU */}
                <div className='relative'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user === null? Avatar : user.photoURL}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl ml-6 cursor-pointer rounded-full"
                        alt='user profile'
                        onClick={login}
                    />
                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 ">
                                
                                {
                                user && user.email === process.env.REACT_APP_ADMIN_EMAIL &&  (
                                    <Link to='/createItem'>
                                            <p
                                                onClick={()=> setIsMenu(false)}
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        >New Item <MdAdd />
                                        </p>
                                    </Link>
                                    )
                                }
                                <ul className='flex flex-col '>
                                    {
                                        navItems.map((item) =>
                                            <Link to="/">
                                                <li
                                                key={item}
                                                onClick={()=> setIsMenu(false)}
                                                className='text-base text-textColor hover:text-orange-500 duration-100 transition-all ease-in-out curoser-pointer hover:bg-slate-100 px-4 py-2'>{item}</li>
                                            </Link>
                                            )
                        }  
                                    
                                </ul>
                                <p
                                    className="px-4 py-2 m-2 p-2 flex rounded-md shadow-md items-center gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base justify-center bg-gray-200"
                                    onClick={logout}
                                >Logout <MdLogout /> </p>
                            </motion.div>)
                    }
                    
                </div>

            </div>
        </header>
    )
};

export default Header