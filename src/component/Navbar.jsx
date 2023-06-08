import React,{useState, useEffect} from 'react';
// importing component button,Menu,Typography,Avatar from ant design for designing 
// our navbar 
import { Button, Menu, Typography, Avatar , ConfigProvider } from 'antd';

// importing link component from react-router-dom;
import { Link } from 'react-router-dom';
// importing icons from ant design
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
// importing icon image from images folder
import icon from '../images/cryptocurrency.png';
const Navbar = () => {
   const [ activeMenu, setActiveMenu ] = useState(true);
   const [ screenSize, setScreenSize ] = useState(null);

   useEffect(() => {
     const handleSize = () => setScreenSize(window.innerWidth);

     window.addEventListener('resize', handleSize);

     handleSize();

     return () => window.removeEventListener('resize', handleSize);

   },[]);

   useEffect(() => {

      if(screenSize < 768) {
         setActiveMenu(false);
      }else{
         setActiveMenu(true);
      }


   },[screenSize]);

  return (
    <div className='nav-container'>
        {/* starting of logo container */}
        <div className='logo-container'>
            {/* to make image and text in circel */}
           <Avatar src={icon} size='large' />
           {/* Typography similar as h1 h2 h3.. tag the meaning level{2} it will be displayed 
           like h2 tag */}
           <Typography.Title level={2} className='logo'>
            <Link to='/'>Crytoverse</Link>
           </Typography.Title>
           <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined/></Button>
        </div>
        {/* ending of logo container */}


        {/* start of Menu Component which is coming from ant design */}
        {/* Menu Component by ant design give all the nessccary things which is used a create a Nav bar */}
         {activeMenu && (

            <Menu className='Menustyle'  >
               <Menu.Item icon={<HomeOutlined /> }>
                  <Link to='/'>Home</Link>
               </Menu.Item>
               <Menu.Item icon={<FundOutlined />}>
                  <Link to='/cryptocurrencies'>Cryptocurriencies</Link>
               </Menu.Item>
               <Menu.Item icon={<BulbOutlined />}>
                  <Link to='/news'>News</Link>
               </Menu.Item>
            </Menu>
         )

         }
    </div>
  )
}

export default Navbar