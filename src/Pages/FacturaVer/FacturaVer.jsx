import React from 'react'

function FacturaImprimir() {
  return (
    <>
    
    <div className="h-[297mm] w-[210mm] p-12 pl-32">
  <div className="flex justify-between">
    <div>
      <p className="pb-2 text-4xl">MB Road apples</p>
      <p className="text-sm text-gray-400">4520 Wood Duck Drive</p>
      <p className="text-sm text-gray-400">Marquette Michigan 49855</p>
    </div>
    <div>
      <img src="https://logo.clearbit.com/react.com" />
    </div>
  </div>
  <div className="flex justify-between pt-16">
    <div>
      <p>01/31/2022</p>
      <p className="pb-3 text-4xl font-bold">INVOICE</p>
      <p className="text-sm font-bold">INVOICE NO. <span className="pl-1 font-normal">0001</span></p>
      <p className="text-sm font-bold">DUE DATE: <span className="pl-1 font-normal">02/15/2002</span></p>
    </div>
    <div className="pl-2 text-right">
      <p className="text-gray-400">CLIENT</p>
      <p className="font-bold">Tony Stark</p>
      <p className="text-sm">Avengers Mansion</p>
      <p className="text-sm">890 Fifth Avenue</p>
      <p className="text-sm">Manhattan New York 10004</p>
    </div>
  </div>
  <div className="pt-16">
    <table className="w-full table-auto text-sm">
      <thead className="border-b-2">
        <tr className="h-10 text-left">
          <th>ITEM</th>
          <th>QUANTITY</th>
          <th>PRICE €</th>
          <th className="text-right">TOTAL €</th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-10">
          <td>Iron Man Suit</td>
          <td>3</td>
          <td>120.00</td>
          <td className="text-right">360.00</td>
        </tr>
        <tr className="h-10">
          <td>Helicopter</td>
          <td>2</td>
          <td>750.00</td>
          <td className="text-right">1500.00</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="flex justify-end">
    <p className="pt-6 text-xl font-bold">1860.00 €</p>
  </div>
  <div className="pt-16 text-sm">
    <p className="font-bold">PAYMENT ADVICE</p>
    <p>Account name: MB Road apples</p>
    <p>Bank name: Hello World</p>
    <p>IBAN: GB95BARC20038428989175</p>
  </div>
</div>
    </>
  )
}

export default FacturaImprimir