import { Modal, Table } from "antd";
import React from "react";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
};

const ModalItem = (props: Props) => {
  const { onClose, open, data } = props;

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];
  return (
    <Modal
      title="Order detail"
      // centered
      open={open}
      onCancel={onClose}
      footer={null}
      width="50%"
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};

export default ModalItem;
