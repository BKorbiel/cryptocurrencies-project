import React, {useState} from 'react';
import Currencies from './components/Currencies/Currencies';
import Exchanges from './components/Exchanges/Exchanges';
import './App.css';

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  return (
    <div className="App">
      <Exchanges/>
      <Currencies onCurrencySelection={setSelectedCurrency} selectedCurrency={selectedCurrency ? selectedCurrency.id : null}/>
    </div>
  );
}

export default App;
