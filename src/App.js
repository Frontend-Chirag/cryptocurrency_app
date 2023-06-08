import React from 'react';
// importing component Switch: { which used to render only one route at the time 
// when it matches the URL and ignore all the routes} Route: { which is used to mapping 
// a URL path to a React Componenet allowing you to define the routing behaviour of your application }
// and Link: { It is similar as <a><a/> tag to navigate the pages} 
// Switch on work on "react-router-dom": "^5.2.0", dependencies
import {Switch, Route, Link } from 'react-router-dom';
import {  } from 'react-router-dom';
// importing ant design component Layout Typography and Space
import { Layout, Typography, Space } from 'antd';
// importing App.css for styling 
import './App.css';
// importing all the components that we created to make a our website
import { Navbar, CryptoDetails, Cryptocurrencies, Exchanges, News, Homepage, } from './component';
const App = () => {
  return (
    <div className='app'>
       <div className='navbar'>
        {/* Navbarcomponent */}
         <Navbar/>
       </div>
       <div className='main'>
        {/* start of layout component */}
        <Layout>
          <div className='routes'>
            {/* so How it's work switch match path URL with the path URL that i given in Navbar component
            in that way i was able to go on tat specific component when i clicked on it  */}
             <Switch>
                <Route exact path='/'>
                   <Homepage />
                </Route>
                <Route exact path='/cryptocurrencies' >
                   <Cryptocurrencies />
                </Route>
                <Route exact path='/crypto/:coinId'>
                   <CryptoDetails />
                </Route>
                <Route exact path='/news'>
                   <News />
                </Route>
             </Switch> 
          </div>
        </Layout>
        {/* End of Layout  */}
       <div className='footer'>
           <Typography.Title level={5} style={{color:'#fff', textAlign:'center'}} >
            CryptoVerse <br/>
            All rights Reserved
            </Typography.Title>
           <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
           </Space>
       </div>
       </div>
    </div>
  )
}

export default App