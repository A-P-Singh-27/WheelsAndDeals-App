import InputField from '@/add-listing/components/InputField'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export default function FinancialCalculater({carDetails}) {
  const [carPrice , setCarPrice]=useState(0);
  const [interestRate , setInterestRate]=useState(0);
  const [loanTerm , setLoanTerm]=useState(0);
  const [downPayment , setDownPayment]=useState(0);
  const [monthlyPayment , setMonthlyPayment]=useState(0);

  const CalculateMonthlyPayment = ()=>{
    console.log(carPrice , downPayment , loanTerm , interestRate);
    
    const Principal = carPrice-downPayment;
    const MonthlyInterest = interestRate/1200; //convert to decimal

    const MonthlyPayment = (Principal*MonthlyInterest*Math.pow(1+MonthlyInterest , loanTerm))/
    (Math.pow(1+MonthlyInterest , loanTerm)-1);
    console.log('monthly payment' , MonthlyPayment);
    setMonthlyPayment(MonthlyPayment.toFixed(2));
    
  }


  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
      <h2 className='font-medium text-2xl '>Financial Calculator</h2>
      <div className='flex gap-5 mt-5' >
        <div className='w-full'>
          <label htmlFor="">Price $</label>
          <Input 
          type='number' 
          className=' w-full rounded-xl' 
          onChange={(e)=>setCarPrice(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <label htmlFor="">Interest Rate</label>
          <Input 
          type='number' 
          className='rounded-xl' 
          onChange={(e)=>setInterestRate(e.target.value)}
          />
        </div>
      </div>

      <div className='flex gap-5 mt-5' >
        <div className='w-full'>
          <label htmlFor="">Loan Term (Months)</label>
          <Input 
          type='number'
          className=' w-full rounded-xl'
          onChange={(e)=>setLoanTerm(e.target.value)}
          />
        </div>
        <div className='w-full'>
          <label htmlFor="">Down Payment</label>
          <Input 
          type='number' 
          className='rounded-xl' 
          onChange={(e)=>setDownPayment(e.target.value)}
          />
        </div>
      </div>

      {monthlyPayment>0&& <h2 className='font-medium text-2xl mt5'>Your Monthly Payment Is : $<span className='text-4xl'>{monthlyPayment}</span></h2>}
      <Button className='text-white w-full mt-5 rounded-xl' onClick={CalculateMonthlyPayment}>Calculate</Button>


    </div>
  )
}
