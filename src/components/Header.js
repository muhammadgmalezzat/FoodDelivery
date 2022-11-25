import React from 'react'

const Header = () => {
    return (
        <div className='fixid z-50 w-screen bg-slate-300  p-6 px-16'>
            Header
            {/* for web  */}
            <div className='hidden md:flex w-full  h-full'>

            </div>

            {/* for mobile  */}
            <div className='flex md:hidden w-full h-full'>

            </div>
        </div>
    )
};

export default Header