import React from "react";
import transactions from "../assets/transactions.svg";
function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={transactions} alt="" style={{ width: "400px", margin: "4rem", }} />
      <h1 style={{ textAlign: "center", fontSize: "2rem", }}>
        You Have No Transactions Currently
      </h1>
    </div>
  );
}

export default NoTransactions;