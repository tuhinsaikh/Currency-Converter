import { useState, useEffect } from 'react'
import InputBox from './components/InputBox'
import background from './assets/currency-converter-background.jpg'
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {

  
  const [amount, setAmount] = useState(0);
  const [from,setFrom] = useState("inr");
  const[to,setTo] = useState("usd");
  const [currency,setCurrency] = useState();
  const [currencyTo, setCurrencyTo] = useState();
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [isChangable, setIsChangable] = useState(false);
  const [requestAmount, setRequestAmount] = useState(0);
  const[initialLoad, setInitialLoad] = useState(true);

  let currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo).slice(2);
  //console.log(options);
 
   const useCurrencyFrom = (data) =>{
    setCurrency(data);
    // console.log(data)
    
   }

   const useCurrencyTo = (data) =>{
    setCurrencyTo(data);
   }
   const handleCurrencyChangeFrom = (currency) =>{
    setFrom(currency)
    console.log(currency)
   }

   const handleCurrencyChangeTo = (currencyTo) =>{
    setTo(currencyTo)
    // console.log(currencyTo)
   }

   const calculateAmount = (newAmount) =>{
    //console.log(newAmount)
    setRequestAmount(newAmount)
   }
 

   useEffect(()=>{
    if(initialLoad){
      setInitialLoad(false);
      return;
    }
    calculateAmount(requestAmount);  
   },[requestAmount,currency])

  const convertHandler = () =>{
    setCalculatedAmount(currencyInfo[to] * requestAmount);
    console.log(requestAmount);
  }

  const swapHandler = () =>{
    const fromName = from;
    setFrom(to);
    setTo(fromName);
    
  }
  //console.log(from, to);
  
    return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('${background}')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();                      
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                             label={from}
                             currencyTypes = {options}
                             currencyName = {from}
                             setUseCurrency = {useCurrencyFrom}
                             isChangable
                             onChangeCurrency = {handleCurrencyChangeFrom}
                             onAmountChange = {calculateAmount}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            onClick={swapHandler}
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"  
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                               label={to}
                               currencyTypes = {options}
                               currencyName = {to}
                               amount = {calculatedAmount}
                               setUseCurrency = {useCurrencyTo}
                               onChangeCurrency = {handleCurrencyChangeTo}
                              
                        />
                    </div>
                    <button onClick={convertHandler} type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert 
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default App
