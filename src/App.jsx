import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersTable from "./Components/UsersTable";
import TransactionsGraph from "./Components/TransactionsGraph";

function App() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  function handleSelectedUser(user) {
    console.log(user);
    setSelectedUser(user);
  }

  const getUsers = async () => {
    const data = await axios.get("http://localhost:3001/customers");
    setUsers(data.data);
  };

  const getTransactions = async () => {
    const data = await axios.get("http://localhost:3001/transactions");
    setTransactions(data.data);
  };

  useEffect(() => {
    getUsers();
    getTransactions();
  }, []);

  const filteredCustomers = users.filter((user) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.amount.toString().includes(amountFilter)
  );

  return (
    <div className="w-75 mx-auto">
      <div className="mb-4 d-flex gap-3 align-items-center">
        <div className="w-100">
          <label htmlFor="name" className="form-label">
            Search By Name:
          </label>
          <input
            id="name"
            type="search"
            className="form-control"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="w-100">
          <label htmlFor="amount" className="form-label">
            Search By Amount:
          </label>
          <input
            id="amount"
            type="search"
            className="form-control"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
          />
        </div>
      </div>
      <UsersTable
        users={filteredCustomers}
        transactions={filteredTransactions}
        clickHandler={handleSelectedUser}
      />
      {selectedUser && (
        <TransactionsGraph
          transactions={transactions.filter(
            (transaction) => transaction.customer_id == selectedUser.id
          )}
        />
      )}
    </div>
  );
}

export default App;
