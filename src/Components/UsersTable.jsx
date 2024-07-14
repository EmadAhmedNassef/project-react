import React from "react";

export default function UsersTable({ users, transactions, clickHandler }) {
  return (
    <table className="table table-hover border">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Transactions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id} onClick={() => clickHandler(user)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                {transactions
                  .filter((transaction) => transaction.customer_id == user.id)
                  .map((transaction) => (
                    <ul key={transaction.id}>
                      <li>
                        {transaction.date} - {transaction.amount}
                      </li>
                    </ul>
                  ))}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">There are no users here</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
