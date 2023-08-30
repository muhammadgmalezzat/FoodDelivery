import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import Loader from "./Loader";
import { actionType } from "../Context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();
    const [{ cartItems }, dispatch] = useStateValue();
    const addToCart = (item) => { 

        const array = [...cartItems, item];
        const uniqueArray = array.filter(
            (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
        );
        dispatch({
                type: actionType.SET_CART_ITEMS,
                cartItems: [...uniqueArray]
            });
    }

    useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue,data]);
    
    return (
        <div
            ref={rowContainer}
            className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${flag
                ? "overflow-x-scroll scrollbar-none"
                : "overflow-x-hidden flex-wrap justify-center"
                }`}
        >
            {
                !data ? <div className="items-center justify-center flex">
                    <Loader /> 
                </div>: (

                    data && data.map((item) => (
                    <div key={item.id} className="w-275 h-[175px] min-w-[300px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
                        <div className="w-full flex items-center justify-between">
                            <motion.div
                                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <img
                                    className="w-full h-full object-contain"
                                    alt="dd "
                                    src={item?.imageUrl}
                                />
                            </motion.div>
                    
                            <motion.div
                                onClick={()=> {addToCart(item)}}
                                whileTap={{ scale: 0.75 }}
                                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8">
                                <MdShoppingBasket className="text-white " />
                        
                            </motion.div>
                        </div>
                        <div className="w-full flex flex-col items-end justify-end -mt-8">
                            <p className="text-textColor font-semibold text-base md:text-lg">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item?.calories} Calories
                            </p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold">
                                    <span className="text-sm text-red-500">$</span>
                                    {item?.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))
                )
            }
            
        </div>
    );
};

export default RowContainer