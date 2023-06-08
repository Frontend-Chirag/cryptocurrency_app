import React,{ useState } from 'react';

import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { millify } from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCrptoDetailsQuery, useGetCrptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text} = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinId } = useParams(); 
  const [ timePeriod, setTimePeriod ] = useState('24h');
  const { data , isFetching} = useGetCrptoDetailsQuery(coinId);
  const { data: coinHistory} = useGetCrptoHistoryQuery({coinId, timePeriod});
  console.log(coinHistory);

  // console.log(data);
  const cryptoDetails = data?.data?.coin;

  if(isFetching) return <Loader />;
  
  const time = [ "1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y", "3y" ,"5y" ];

  const stats = [
    { title: "Price to USD", value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined />},
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: "All-time-high(daily avg.)", value: `$ ${cryptoDetails.allTimeHigh.price && millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined />}
  ];

  const genericStats = [
    {title: "Number of Markets", value: cryptoDetails.numberOfMarkets, icon: <FundOutlined />},
    {title: "Number of Exchanges", value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined />},
    {title: "Approved Supply", value: cryptoDetails.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined />},
    {title: "Total Supply", value: `$ ${cryptoDetails.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined />},
    {title: "Circulating Supply", value: `$ ${cryptoDetails.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined />},

  ];
  
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} Live price in us Dollars.
          View Value Statistics, Market Captial and Supply.
        </p>
      </Col>
      <Select defaultValue="24h" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>


      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}  />


       <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An Overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
             <Col className='coin-stats'>
               <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
               </Col>
               <Text className='stats'>{value}</Text>
             </Col>
          ))}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title className='coin-details-heading' level={3}>
              Other Statistics
            </Title>
            <p>
              An Overview showing the stats of all Cryptocurrencies 
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
             <Col className='coin-stats'>
               <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
               </Col>
               <Text className='stats'>{value}</Text>
             </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
         <Col className='coin-links'>
          <Title level={3} className='coin-details-headhing'>
            {cryptoDetails.name} Links
          </Title>
           {cryptoDetails.links.map((link) => (
               <Row className='coin-link' key={link.name}>
                    <Title level={5} className='link-name'>
                      {link.type}
                    </Title>
                    <a href={link.url} >{link.name}</a>
               </Row>
           ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails