import React from "react";
import { Line, Pie } from "@ant-design/charts";

const ChartComponent = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });

  const config = {
    data: data, 
    autoFit: false,
    xField: "date",
    yField: "amount",
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: 'blue',
      },
  },
  xAxis: {
    label: {
      style: {
        fill: 'green',
      },
    },
    line: {
      style: {
        stroke: 'green', 
      },
    },
  },
  yAxis: {
    label: {
      style: {
        fill: 'red',
      },
    },
    line: {
      style: {
        stroke: 'red', 
      },
    },
  },
}

  
  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });
  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if(!acc[key]){
      acc[key] = {tag:obj.tag, amount:obj.amount}
    }else{
      acc[key].amount=obj.amount
    }
    return acc;
  }, {})

  const spendingConfig = {
    data: Object.values(finalSpending),
    angleField: "amount",
    colorField: "tag",
    label: {
      style: {
        fill: 'red',
      },
  },
  };

  // eslint-disable-next-line no-unused-vars
  let chart;
  // eslint-disable-next-line no-unused-vars
  let pie;
  return (
    <div className="charts-wrappper">
      <div className="line-chart">
        <h1> Analytics</h1>
        <Line className="li"
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>

      <div className="pie-chart">
        <h1> Spendings</h1>
        <Pie className="pi"
          {...spendingConfig}
          onReady={(chartInstance) => (pie = chartInstance)}
        />
      </div>
    </div>
  );
};

export default ChartComponent;
