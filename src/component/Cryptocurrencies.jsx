import React ,{ useState, useEffect }from 'react';

// import millify to convert larger numbers in human readable string no.
import millify from 'millify';
import { Link } from 'react-router-dom';
// import components from ant design 
import { Card, Row, Col, Input, Typography} from 'antd';
// import Auto generated Hook by redux from cryptoApi file to get data and render in our ui
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


// give props to add some logic
const Cryptocurrencies = ({ simplified ,top }) => {
  //  callling the prop from the function and add if operator to get 10 if simplified 
  // only give 10 data coins else 100 coins
  const count = simplified ? 10 : 100;
  
  // calling hook to get data 
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  // calling useState Hook passing the data from auto generated hook that redux for us automatically and request 
  // for the data we need in our ui
  const [ cryptos, setCryptos ] = useState([]);
   console.log(cryptos);
  // add loading state before get data
  const [ searchTerm, setSearchTerm ] = useState('');  
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
      setCryptos(filteredData);
  },[cryptoList, searchTerm])

  if(isFetching) return  <Loader />;
  return (
    <>
    { top ? ( 
    <div className='home-heading-container' >
     <Typography.Title level={1} style={{fontFamily:'sans-serif', color: 'grey' , fontWeight: 100, letterSpacing: '0.2rem'}}>
      Top 10 Cryptocurrencies
     </Typography.Title>
      <Typography.Title level={3} hoverable>
        <Link to='/cryptocurrencies' style={{color:'#000'}}>Show more</Link>
      </Typography.Title>
   </div> ) : 
   (
     <Typography.Title level={1} style={{fontFamily:'sans-serif', color: 'grey' , fontWeight: 100, letterSpacing: '0.2rem'}}>
     Top 100 Cryptocurrencies
    </Typography.Title>
   )} 
    
    {
    !simplified && (
        <div className='search-crypto'>
         <Input  placeholder='Search Cryptos' onChange={(e) => setSearchTerm(e.target.value)}/>
       </div>
       )
    }

     
     <Row gutter={[32, 32]} className='crypto-card-container' >
      {/* map over cryptos  to get data*/}
         {cryptos?.map(( currency ) => (
       
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                   <Card title={`${currency.rank}. ${currency.name}`} 
                    extra={<img className='crypto-image' alt=''src={currency.iconUrl}   />}
                    hoverable
                   >
                    <h1>{currency.symbol}</h1>
                    <p>Price: {millify(currency.price)} </p>
                    <p>Market cap: {millify(currency.marketCap)} </p>
                    <p>change: {millify(currency.change)} </p>
                   </Card>
              </Link>
          </Col>
         ))}
     </Row>
    </>
  )
}

export default Cryptocurrencies