import { Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../../assets/search.svg";
import { parse, unparse } from "papaparse";
import "./style.css";
import { toast } from "react-toastify";

const TransactionsTable = ({
  transactions,
  addTransaction,
  fetchTransactions,
}) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="name-cell">{text}</div>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div className="amount-cell">{text}</div>,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (text) => <div className="name-cell">{text}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <div className="amount-cell">{text}</div>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <div className="name-cell">{text}</div>,
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "dateAsc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "dateDesc") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortKey === "amountAsc") {
      return a.amount - b.amount;
    } else if (sortKey === "amountDesc") {
      return b.amount - a.amount;
    } else {
      return 0;
    }
  });

  function exportCSV() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const sortingOptions = [
    { value: "", label: "No Sort" },
    { value: "dateAsc", label: "Sort by Date : (Ascending)" },
    { value: "dateDesc", label: "Sort by Date : (Descending)" },
    { value: "amountAsc", label: "Sort by Amount : (Ascending)" },
    { value: "amountDesc", label: "Sort by Amount : (Descending)" },
  ];

  function getRowClassName(index) {
    return index % 2 === 0 ? "table-row even-row" : "table-row odd-row";
  }



  return (
    <div classname="responsive"
    // style={{
    //   width: "85%",
    //   padding: "0rem 2rem",
    // }}
    >


      <div className="my-table" style={{ opacity: "5" }}>
        <h2>My Transactions </h2>

        <div className="input-wrapper">
          <div className="input-flex">
            <img src={searchImg} width="16" alt="" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Name"
            />
          </div>

          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
        <div className="table-wrapper">

          <Select
            className="select-input"
            onChange={(value) => setSortKey(value)}
            value={sortKey}
            placeholder="Sort by"
          >
            {sortingOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>

          <div
            className="btn-wrapper-new"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn custom-btn-new-1" onClick={exportCSV}>
              Export to CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue custom-btn-new-2">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table
          dataSource={sortedTransactions}
          columns={columns}
          className="table"
          rowClassName={(index) => getRowClassName(index)}
          size="small"
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
