import React from 'react';
// importing Link from react router dom 
import { Link } from 'react-router-dom';
// importing millify millify does a larger numbers in string 
import millify from 'millify';
// importing commponents from antd
import { Row, Typography, Col, Statistic } from 'antd';
// import hook that we created to get data from api
import { useGetCryptosQuery } from '../services/cryptoApi';
// import cryptocurrencies and news component
import { Cryptocurrencies, Loader, News } from '../component';
// to make things earier 
const { Title } = Typography;

const Homepage = () => {

  // we give the state and call it with hook 
  const { data, isFetching } = useGetCryptosQuery(10); 
  // if operator for loading state
  if(isFetching) return <Loader />;

  // set data as a globalStats to get data from hook that we made in our store js and passing in value in statistic
   const globalStats = data?.data?.stats;
   console.log(globalStats)
 
  console.log(data);
  return (
   <>
   <Title level={2} className='heading'>Global Crypt Stats</Title> 
   {/* setting up row and column component and on this component setting up statistics component  */}
   <Row>
      <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats.total}/></Col>
      <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/></Col>
      <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}/></Col>
      <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}/></Col>
      <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}/></Col>
   </Row>
   
  <Cryptocurrencies  simplified top >
</Cryptocurrencies>  
  
   <News simplified />
   </>
  )
}

export default Homepage
