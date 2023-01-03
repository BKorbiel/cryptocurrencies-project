import React, {useState, useEffect} from 'react';
import './exchanges.css';


const EXCHANGES_API_URL = 'https://api.coingecko.com/api/v3/exchanges?per_page=20';

async function getExchangesData()
{
	const response = await fetch(EXCHANGES_API_URL);
	return response.json();
}

const Exchanges = () => {
	const [exchanges, setExchanges] = useState([]);

	useEffect(() => {
	    let timeoutId;
	    async function getLatestData() {
		try {
			const exchanges = await getExchangesData();
			setExchanges(exchanges);
		} catch (error) {
			console.log(error);
		}
	      
			timeoutId = setTimeout(getLatestData, 60*1000);
	    }
	    
	    getLatestData();
	    
	    return () => {
			clearTimeout(timeoutId);
	    };
	}, []);

	return (
		<div className="exchanges-app">
			<h1 className="exchange-text">Best markets</h1>
			<div className="exchange-list">
				{exchanges.map((exchange, ind) => {
		            return (
		                <a 
			                className="exchange-container" 
			                href={exchange.url}
			                key={exchange.id} >
			                <div className="exchange-col">
								<img className="exchange-image" src={exchange.image} alt="exchange"/>
								<h1 className="exchange-name">{ind+1}. {exchange.name}</h1>
								<div className="exchange-info">
									<strong>Trade volume BTC 24h:</strong> {exchange.trade_volume_24h_btc.toFixed(2)}
								</div>
							</div>
		                </a>
		            );
		        })}
			</div>
		</div>
	);
};

export default Exchanges;