import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';
import './graph.css';

const LoadingSpinner = () => {
	return (
    <div className="spinner-container">
      	<div className="loading-spinner">
      	</div>
    </div>
  );
}

const Graph = ({id, name, image, current_price, market_cap, total_volume, high_24h, low_24h, price_change_percentage_24h,
				ath, ath_date, market_cap_change_percentage_24h, onClose}) => {

	const [isLoading, setIsLoading] = useState(false);
	const [series, setSeries] = useState([]);
	const [days, setDays] = useState("91");

	const options = {
		chart: {
          	id: id,
          	type: "line",
          	toolbar: {
          		tools: {
          			pan: false
          		},
          		background: '#fff'
      	  	}
        },
        xaxis: {
            type: 'datetime',
		},
        yaxis: {
        	labels:
        	{
	        	formatter: function (value) {
			      	return value.toFixed(2) + "$";
			    }
			}
        },
        tooltip: {
      	  	x: {
      	  		format: "dd MMM yyyy HH:mm"
      	  	},
      	  	y: {
      	  		formatter: (value) => value+'$',
      	  	}
      	}
	}

	async function getChartData() {
		const API_CHART_URL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
		const response = await fetch(API_CHART_URL);
		return response.json();
	}

	useEffect(() => {
		setIsLoading(true);
		let timeoutId;
		async function getLatestData() { 
	    	try {
	    		const chartData = await getChartData();
	    		setSeries([{name:"Price", data: chartData.prices.map((chartData) => [chartData[0], chartData[1]])}]);
	    	}
		    catch (error) {
		        console.log(error);
		    }
		    if (days=="1") {
		    	timeoutId = setTimeout(getLatestData, 1000*60*5);
		    }
		    setIsLoading(false);
	    }

	    getLatestData();

	    return () => {
	    	clearTimeout(timeoutId);
	    }
	}, [id, days]);

	return (
		<div className="graph-app">
			{isLoading ? <LoadingSpinner/> : 
			<div className="graph-container">
				<div className="title">
					<img src={image} alt="crypto"/>
					<div className="name">{name}</div>
				</div>
				<div className="info-container">
					<div className="info"><strong>Current price: </strong>{current_price}$</div>
					<div className="info"><strong>Volume: </strong>{total_volume}$</div>
					<div className="info"><strong>Price change 24h: </strong>{price_change_percentage_24h}%</div>
					<div className="info"><strong>High 24h: </strong>{high_24h}$</div>
					<div className="info"><strong>Market cap: </strong>{market_cap}$</div>
					<div className="info"><strong>Low 24h: </strong>{low_24h}$</div>
					<div className="info"><strong>Market cap change 24h: </strong>{market_cap_change_percentage_24h}%</div>
					<div className="info"><strong>ATH: </strong>{ath}$ 
						on {ath_date.replace('T', ', ').slice(0, -5)}
					</div>
				</div>
				<div className="buttons-container">
		          	<button 
			            className={["time-button", days=="1" ? "selected-button" : ""].join(" ")} 
			            onClick={() => setDays("1")}>
			            1 Day
		          	</button>
		          	<button 
			            className={["time-button", days=="7" ? "selected-button" : ""].join(" ")} 
			            onClick={() => setDays("7")}>
			            7 Days
		          	</button>
		          	<button 
			            className={["time-button", days=="30" ? "selected-button" : ""].join(" ")}
			            onClick={() => setDays("30")}>
			            1 Month
		          	</button>
		          	<button 
			            className={["time-button", days=="91" ? "selected-button" : ""].join(" ")}
			            onClick={() => setDays("91")}>
			            3 Months
		          	</button>
		          	<button 
			            className={["time-button", days=="182" ? "selected-button" : ""].join(" ")} 
			            onClick={() => setDays("182")}>
			            6 Months
		          	</button>
		          	<button 
			            className={["time-button", days=="365" ? "selected-button" : ""].join(" ")}
			            onClick={() => setDays("365")}>
			            1 Year
		          	</button>
		          	<button 
			            className={["time-button", days=="1826" ? "selected-button" : ""].join(" ")}
			            onClick={() => setDays("1826")}>
			            5 Years
		          	</button>
		          	<div className="close">
						<button className="close-button" onClick={onClose}>Close</button>
					</div>
			    </div>
				<Chart options={options} series={series} type="line" width="95%"/>
			</div>
			}
		</div>
	);

};

export default Graph;

