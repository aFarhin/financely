import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  const incomeSources = [
    "Salary",
    "Freelance",
    "Investment",
    "Rent",
    "Savings Interest",
    "Bonus",
    "Dividends",
    "Gifts",
    "Pension",
    "Rental Income",
    "Online Sales",
    "Refunds",
    "Royalties",
    "Commissions",
    "Tips",
    "Alimony",
    "Grants",
    "Scholarships",
    "Child Support",
    "Side Hustle",
    "Part-time Job",
    "Petty Cash",
    "Business Income",
    "Social Security",
    "Other",
  ];
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            {incomeSources.map((source) => (
              <Select.Option key={source} value={source.toLowerCase()}>
                {source}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
