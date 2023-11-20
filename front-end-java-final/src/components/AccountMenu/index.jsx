import React, { useState } from 'react';
import CurrentUser from './CurrentUser';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { CiHeart, CiShoppingBasket, CiLogout } from 'react-icons/ci';
import { TbShoppingBagMinus } from 'react-icons/tb';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiMessage2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
function AccountMenu() {
    const [selectedItem, setSelectedItem] = useState(null);
    const handleMenuItemClick = (item) =>{
        setSelectedItem(item);
    }
    const isItemSelected = (item) => item === selectedItem;
  return (
    <div className="mt-10 ml-10">
      <CurrentUser initialName="Nguyen Dat Khuong" />
      <Sidebar>
        <Menu>
          <MenuItem
            icon={<MdOutlinePersonSearch />}
            // className={isItemSelected('Personal Data') ? 'text-primary' : ''}
            // onClick={() => handleMenuItemClick('Personal Data')}
            className='hover:text-primary'
          >
            <Link to="/account">Personal Data</Link>
          </MenuItem>
          
          <MenuItem 
          icon={<RiMoneyDollarCircleLine />}
          className='hover:text-primary'
          > 
          <Link to="/payment-installment">Payment & Installments</Link>
          
          </MenuItem>
          <MenuItem 
          icon={<CiShoppingBasket />}
          className='hover:text-primary'
          >
            <Link to="/orders">Orders</Link>
          </MenuItem>

          <MenuItem 
          icon={<CiHeart />}
          className='hover:text-primary'
          >
            <Link to="/wishlist">Wish List</Link>
          </MenuItem>

          <MenuItem 
          icon={<TbShoppingBagMinus />}
          className='hover:text-primary'
          >
            <Link to="/discounts">Discounts</Link>
          </MenuItem>

          <MenuItem 
          icon={<AiOutlineSecurityScan />}
          className='hover:text-primary'
          >            
            <Link to="/sercurity-access">Security & Access</Link>
          </MenuItem>

          <MenuItem 
          icon={<IoMdNotificationsOutline />}
          className='hover:text-primary'
          >
            <Link to="/notification">Notification</Link>
          </MenuItem>
          
          <MenuItem 
          icon={<RiMessage2Line />}
          className='hover:text-primary'
          >
            <Link to="/contact">Contact Us</Link>
           </MenuItem>

          <MenuItem 
          icon={<CiLogout />}
          className='hover:text-primary'
          >
            <Link to="">Log Out</Link>
            </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default AccountMenu;
