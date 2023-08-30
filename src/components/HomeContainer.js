import React from 'react'
import Delivery from '../img/delivery.png';
import Herobg from '../img/heroBg.png';
import { HeroData } from '../utils/Data';

const HomeContainer = () => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id="home">
            {/* first half section1 */}
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
                {/* ICON */}
                <div className='flex items-center gap-2 justify-center bg-orange-100 py-1 px-4 rounded-full'>
                    <p className='text-base text-orange-500 font-semibold '>
                        Bike Delivery
                    </p>
                    <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
                        <img className='w-full h-full object-contain' src={Delivery} alt="delivery" />
                    </div>
                </div>
                {/* text */}
        
                <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
                    The Fastest Delivery In
                    {/* <br /> */}
                    <span className='text-orange-500 text-[3rem] lg:text-[5rem]'> Your City</span>
                </p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <button
                    className='bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg py-2 px-4 hover:shadow-lg  w-full transition-all ease-in-out md:w-auto'
                    type='button'>Order Now</button>
        
            </div>
            {/* second half section1 */}
            <div className='py-2 flex-1 flex items-center relative overflow-hidden overflow-y-hidden'>
                <img
                    className='ml-auto h-420 w-full lg:w-auto lg:h-650'
                    src={Herobg}
                    alt="hero background" />
                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center xl:px-16  py-4 gap-4 flex-wrap'>
                    {HeroData &&
                        HeroData.map((n) => (
                            <div
                                key={n.id}
                                className=" lg:w-[215px]  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                            >
                                <img
                                    src={n.imageSrc}
                                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                    alt="I1"
                                />
                                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                    {n.name}
                                </p>

                                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                    {n.decp}
                                </p>

                                <p className="text-sm font-semibold text-headingColor">
                                    <span className="text-xs text-red-600">$</span> {n.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default HomeContainer