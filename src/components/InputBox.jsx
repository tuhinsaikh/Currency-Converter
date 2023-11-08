import {useState,useId} from 'react';

function InputBox({
     label,
     amount,
     onChangeCurrency,
     onAmountChange,
     currencyTypes = [],
     currencyName,
     setUseCurrency,
     isChangable,
     //setRequestAmount
}){
    const amountId = useId();
    const [currencyChangeName, setCurrencyChangeName] = useState("");
    const [requestedAmount, setRequestedAmount] = useState(0);
    //console.log(currencyChangeName)

    const currencyHandeler = (data) =>{
        setCurrencyChangeName(data.target.value)
        setUseCurrency(currencyChangeName)
        onChangeCurrency(data.target.value);
        //console.log(first)
    }
    const amountHandler = (data) =>{
         console.log(data.target.value);
         setRequestedAmount(data.target.value);
        onAmountChange(data.target.value);
        //setRequestAmount(data.target.value);
         console.log(data.target.value)
    }
    
     
    return(
        <div className='bg-white p-3 rounded-lg text-sm flex'>
            <div className='w-1/2'> 
             <label htmlFor={amountId} className='text-black mb-2 inline-block'>
                {label}
             </label>
             <input className='outline-none w-full bg-transparent py-1.5' type="number"
             onChange={amountHandler}
             value={isChangable === true ? requestedAmount : amount}
             placeholder={0}
             id={amountId}
             />
            </div>
            <div className='w-1/2 flex flex-wrap justify-end text-right'>
            <p className="text-black/40 mb-2 w-full">Currency Type</p>
             <select className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none'
                onChange = {currencyHandeler}
                value = {currencyChangeName==="" ? currencyName : currencyChangeName}
             >
                {
                    currencyTypes.map((currency)=>(
                        <option key={currency} value={currency}>{currency} </option>
                    ))
                }
                
             </select>
            </div>
        </div>
    ) 
}
export default InputBox;