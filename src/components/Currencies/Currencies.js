import React, {useEffect, useState} from 'react';
import './currencies.css';

const CURRENCIES_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

async function getCurrenciesData() {
  const response = await fetch(CURRENCIES_API_URL);
  return response.json();
}

const Currencies = () => {
	const [currencies, setCurrencies] = useState([]);
	const [search, setSearch] = useState('');

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

	const filteredCurrencies = currencies.filter(currency => (
		currency.name.toLowerCase().includes(search.toLowerCase()) || 
    currency.symbol.toLowerCase().includes(search.toLowerCase())
	));

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<div className="currency-app">
			<div className="currency-search">
				<h1 className="currency-text">Search a cryptocurrency</h1>
				<form>
					<input type="text" placeholder="Search..." className="currency-input" onChange={handleChange}/>
				</form>
			</div>
			<div className="currency-list">
				{filteredCurrencies.map(currency => {
					return (
						<button
							className="currency-button"
							key={currency.id}
						>
							<div className="currency-row">
								<img src={currency.image}/>
								<div className="currency-name">{currency.name}</div>
								<div className="currency-symbol">{currency.symbol}</div>
								<div className="currency-price">{currency.current_price}$</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	)
};

export default Currencies;