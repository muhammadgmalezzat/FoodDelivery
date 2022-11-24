import React from 'react'
import {} from '@mui/material'
import { SearchRoundedIcon } from '@mui/icons-material';

const Header = () => {

return (
    <header>
        <img src='' alt='' />
        
        <div className='inputBox'>
            <SearchRoundedIcon className="searchIcon" />
            <input type='text' placeholder='Search'/>

        </div>
        <div className='shoppingCart'>
            {/* <ShoppingCartRoundedIcon className='cart' /> */}
            <div className='cartContent'>
                <p>2</p>
            </div>
        </div>
        <div className='profileContainer'>

        </div>
    </header>
)
}

export default Header