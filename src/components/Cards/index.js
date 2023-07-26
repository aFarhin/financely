import React from "react";
import "./styles.css";
import { Card, Row, Modal } from "antd";
import Button from "../Button";

const Cards = ({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  resetBalance,
}) => {
  const showResetConfirmationModal = () => {
    Modal.confirm({
      title: "Reset Balance",
      content: "Are you sure you want to reset the balance and delete all transactions?",
      okText: "Yes",
      cancelText: "No",
      onOk: resetBalance,
    });
  };

  return (
    <div>
      <Row className="my-row" >
        <Card bordered={true} className="my-card"  >
          <h2>Current Balance</h2>
          <p>₹{currentBalance}</p>
          <Button text="Reset Balance" blue={true} onClick={showResetConfirmationModal} />
        </Card>

        <Card bordered={true} className="my-card"  >
          <h2>Total Income</h2>
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>

        <Card bordered={true} className="my-card" >
          <h2>Total Expenses</h2>
          <p>₹{expenses}</p>
          <Button class='btns a' text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
