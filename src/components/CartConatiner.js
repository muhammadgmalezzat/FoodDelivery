import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

const CartConatiner = () => {
    const [{ cartItems, user }, dispatch] = useStateValue();
    const fireBaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    }, [tot, flag,cartItems]);
    
    const closeCartHandler = () => {
        dispatch({
                type: actionType.SET_CART_SHOW,
                cartShow: false
            });
    }

    const login = async () => {
            const {user:{refreshToken ,providerData}} = await signInWithPopup(fireBaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            });
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='fixed top-0 right-0 w-full md:w-375 h-screen z-[101] bg-white drop-shadow-md flex flex-col '>
            {/* Top Section */}
            <div
                className='w-full flex items-center justify-between p-4'>
                <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={closeCartHandler}>
                    <MdOutlineKeyboardBackspace
                        className='text-textColor text-3xl cursor-pointer'
                    />
                </motion.div>
                <p className='text-textColor text-lg font-semibold'>Cart</p>
                <motion.p
                    whileTap={{ scale: 0.75 }}
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base '
                >  {" "} </motion.p>
            </div>
            {/* Items Section */}
            {
                cartItems && cartItems.length > 0 ? (
                    <>
                        <div className='w-full h-full bg-cartBg  flex flex-col'>
                            <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                                {/* item of Cart */}
                                {
                                    cartItems && cartItems.length > 0 && cartItems.map(
                                        (item) => <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
                                    )
                                }
                            </div>
                        </div>
                        <div className="w-full flex-1 bg-cartTotal  flex flex-col items-center justify-evenly px-8 py-2">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gray-400 text-lg">Sub Total</p>
                                <p className="text-gray-400 text-lg">${tot} </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gray-400 text-lg">Delivery</p>
                                <p className="text-gray-400 text-lg">$ 2.5</p>
                            </div>

                            <div className="w-full border-b border-gray-600 my-3"></div>

                            <div className="w-full flex items-center justify-between">
                                <p className="text-gray-200 text-xl font-semibold">Total</p>
                                <p className="text-gray-200 text-xl font-semibold"> ${tot + 2.5} </p>
                            </div>
                            {
                                user ? (
                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        type="button"
                                        className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                                    >
                                        Check Out
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        onClick={login}
                                        whileTap={{ scale: 0.8 }}
                                        type="button"
                                        className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                                    >
                                        Login to Check Out
                                    </motion.button>
                                )
                            }

                            
                        </div>
                    </>

                    
                ) : (<div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                    <img src={EmptyCart} alt="EmptyCart" />
                    <p className='text-xl text-textColor font-semibold'>
                        Add some items to your cart
                    </p>
                </div>)
            }

            

            {/* bottom Section */}
            
            
        </motion.div>
    );
}

export default CartConatiner