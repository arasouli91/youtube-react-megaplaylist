import React, {useState} from "react";
import HTMLReactParser from "html-react-parser";
import { Collapse, Row, Avatar } from 'antd';
import millify from "millify";
import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import { Loader } from ".";

const {Panel} = Collapse;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const Exchanges = () => {
    const {data: exchangesData, isFetching} = useGetCryptoExchangesQuery();
    
    if(isFetching) return <Loader />;
    const exchanges = exchangesData?.data?.exchanges;
    
    return (
        <>
            <div className="exchange">
                <div className="exc-item">
                    Exchange
                </div>
                <div className="exc-item">
                    24h Trade Volume
                </div>
                <div className="exc-item">
                    Markets
                </div>
                <div className="exc-item">
                    Change
                </div>
            </div>
            <Collapse defaultActiveKey={['1']} >
                {exchanges?.map((exchange)=>(
                    <Panel
                        header={(
                        <div className="exchange">
                            <div className="exc-item">
                                <Avatar className="exchange-image" src={exchange.iconUrl || demoImage} alt="" />
                                <strong>{exchange.name}</strong>
                            </div>
                            <div className="exc-item">
                                ${millify(exchange.volume)}
                            </div>
                            <div className="exc-item">
                                {millify(exchange.numberOfMarkets)}
                            </div>
                            <div className="exc-item">
                                {millify(exchange.marketShare)}%
                            </div>
                        </div>)} 
                        key={exchange.id} 
                        showArrow={false}
                    >
                        {HTMLReactParser((String)(exchange.description))}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}

export default Exchanges