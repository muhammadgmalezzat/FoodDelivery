import React, { useEffect, useState } from 'react'
import { IoFastFood } from "react-icons/io5";
import { Categories } from '../utils/Data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';

const MenuContainer = ({data}) => {

    const [filter, setFilter] = useState(" ");


    useEffect(() => { }, [filter])
    
    return (
        <section className="w-full my-6" id='menu'>
            <div className='w-full my-6 w-full flex flex-row items-center justify-center '>
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">Our Hot Dishes</p>
            </div>
            {/* Filter */}
            <div className="w-full  flex flex-row items-center justify-start gap-8 lg:justify-center overflow-x-scroll scrollbar-none py-6">
                {
                    Categories && Categories.map((category) => (
                        <motion.div
                            whileTap={{ scale: 1.5 }}
                            key={category.id}
                            className={`group ${filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                                } w-24  min-w-[94px] h-28 cursor-pointer  drop-shadow-xl  shadow-lg  rounded-lg  items-center justify-center flex flex-col duration-100 transition-all ease-in-out hover:bg-cartNumBg gap-3`}
                            onClick={() => setFilter(category.urlParamName)}
                        >

                            <div className={`w-10 h-10 ${filter === category.urlParamName
                                ? "bg-white"
                                : "bg-cartNumBg"
                                }   rounded-full  group-hover:bg-card my-3 items-center justify-center flex`}>
                                <IoFastFood className={` ${filter === category.urlParamName
                                    ? "text-textColor"
                                    : "text-white"
                                    } group-hover:text-textColor text-lg`} />
                            </div>
                            <p className={`text-sm ${filter === category.urlParamName
                                ? "text-white"
                                : "text-textColor"
                                }   group-hover:text-white `}>{category.name}</p>
                        </motion.div>
                    ))
                }
            </div>
            <RowContainer
                flag={false}
                data={data?.filter((item) => {
                return item.category === filter || filter === " "

        })}
            />
        </section>
    );
}

export default MenuContainer