import React, {useState} from 'react';
import Currencies from './components/Currencies/Currencies';
import Exchanges from './components/Exchanges/Exchanges';
import Graph from './components/Graph/Graph';
import './App.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  return (
    <div className="App">
      {selectedCurrency ? 
        <Graph id={selectedCurrency.id} name={selectedCurrency.name}/>
        :
        <Exchanges/>
      }
      <Currencies onCurrencySelection={setSelectedCurrency} selectedCurrency={selectedCurrency ? selectedCurrency.id : null}/>
    </div>
  );
}

export default App;
