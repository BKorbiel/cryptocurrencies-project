import React, {useEffect, useState} from 'react';

const CURRENCIES_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

async function getCurrenciesData() {
  const response = await fetch(CURRENCIES_API_URL);
  return response.json();
}

const Currencies = () => {
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		let timeoutId;
	    async function getLatestData() {
	      try {
	        const data = await getCurrenciesData();
	        setCurrencies(data);
	      } catch (error) {
	        console.log(error);
	      }
	      
	      timeoutId = setTimeout(getLatestData, 30*1000);
	    }
	    
	    getLatestData();
	    
	    return () => {
	      clearTimeout(timeoutId);
	    };
	}, []);

	return (
		<div>
		</div>
	)
};

export default Currencies;