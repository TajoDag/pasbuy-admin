import { Modal, Table } from "antd";
import React from "react";
import TranslateTing from "../../../components/Common/TranslateTing";
import { formatPrice } from "../../../utils";
import { useCurrency } from "../../../context/CurrencyContext";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
};

const ModalItem = (props: Props) => {
  const { onClose, open, data } = props;
  const { currency } = useCurrency();
  const columns: any = [
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <p>
          {" "}
          <TranslateTing text="Price" />
        </p>
      ),
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "center",
      render: (_: any, record: any) => (
        <>{formatPrice(record.price, currency)}</>
      ),
    },
    {
      title: <TranslateTing text="Quantity" />,
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];
  return (
    <Modal
      title={<TranslateTing text="Order detail" />}
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
