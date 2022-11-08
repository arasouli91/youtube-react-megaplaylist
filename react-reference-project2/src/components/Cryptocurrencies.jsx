import React, {useState, useEffect} from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import {Card, Row, Col, Input} from 'antd';

import { Loader } from ".";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    // create a state variable and the setter
    const [searchTerm, setSearchTerm] = useState(''); 

    // the callback passed into useEffect will be executed whenever one of the variables
    // passed into the dependency list changes
    // useEffect happens for componentDidMount and for componentDidUpdate for its dependencies
    // so it will happen at the start, since searchTerm is empty, it won't filter anything at first
    useEffect(()=>{
        // filter out cryptocurrencies that include the search term
        const filteredData 
            = cryptosList?.data?.coins
                .filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData);
    },[cryptosList, searchTerm]);

    if(isFetching) return <Loader />;
    console.log(cryptos);

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e)=>setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Cryptocurrencies