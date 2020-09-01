import React, { useContext ,useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const {getTransactions, transactions } = useContext(GlobalContext);
  useEffect(() => {
    getTransactions();
  } , [getTransactions])

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
      </ul>
    </>
  )
}
