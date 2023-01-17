import React, {useState} from 'react';
import Currencies from './components/Currencies/Currencies';
import Exchanges from './components/Exchanges/Exchanges';
import Graph from './components/Graph/Graph';
import './App.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const handleClose = () => {
    setSelectedCurrency(null);
  }
  return (
    <div className="App">
      {selectedCurrency ? 
        <Graph 
          id={selectedCurrency.id} 
          name={selectedCurrency.name}
          image={selectedCurrency.image}
          current_price={selectedCurrency.current_price}
          market_cap={selectedCurrency.market_cap}
          total_volume={selectedCurrency.total_volume}
          high_24h={selectedCurrency.high_24h}
          low_24h={selectedCurrency.low_24h}
          price_change_percentage_24h={selectedCurrency.price_change_percentage_24h}
          ath={selectedCurrency.ath}
          ath_date={selectedCurrency.ath_date}
          market_cap_change_percentage_24h = {selectedCurrency.market_cap_change_percentage_24h}
          onClose={handleClose}
        />
        :
        <Exchanges/>
      }
      <Currencies onCurrencySelection={setSelectedCurrency} selectedCurrency={selectedCurrency ? selectedCurrency.id : null}/>
    </div>
  );
}

export default App;
