import { Modal, Table } from "antd";
import TranslateTing from "../../../components/Common/TranslateTing";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
};

const UserDetail = (props: Props) => {
  const { onClose, open, data } = props;

  console.log(data)
  const columns: any = [
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: <TranslateTing text="Username" />,
      dataIndex: "username",
      key: "username",
      width: 100,
      align: "center",
    },
    {
      title: <TranslateTing text="Email" />,
      dataIndex: "email",
      key: "email",
      width: 100,
      align: "center",
      render: (text: any) => <p>{text ? text : null}</p>,
    },
    {
      title: <TranslateTing text="Phone number" />,
      dataIndex: "phone",
      key: "phone",
      width: 100,
      align: "center",
      render: (_: any, record: any) => <p>{record.phone ? record.phone : null}</p>,
    },
    {
      title: <TranslateTing text="Agency" />,
      dataIndex: "isShop",
      key: "isShop",
      width: 100,
      align: "center",
      render: (text: any) => <p>{text ? "Shop" : "No"}</p>,
    },
    {
      title: <TranslateTing text="Invite Code" />,
      dataIndex: "inviteCode",
      key: "inviteCode",
      width: 100,
      align: "center",
      render: (text: any) => <p>{text ? text : null}</p>,
    },
    {
      title: <TranslateTing text="Point" />,
      dataIndex: "point",
      key: "point",
      width: 100,
      align: "center",
    },
    {
      title: <TranslateTing text="Bank Name" />,
      dataIndex: "bankName",
      key: "bankName",
      width: 100,
      align: "center",
    },
    {
      title: <TranslateTing text="Bank Number" />,
      dataIndex:"bankNumber",
      key: "bankNumber",
      width: 100,
      align: "center",
    },
    {
      title: <TranslateTing text="Owner" />,
      dataIndex: "owner",
      key: "owner",
      width: 100,
      align: "center",
    },
  ];

  // Chuyển đổi data thành một mảng nếu nó không phải là mảng
  const dataSource = Array.isArray(data) ? data : [data];

  return (
    <Modal
      title={<TranslateTing text="Detail User" />}
      open={open}
      onCancel={onClose}
      footer={null}
      width="80%"
    >
      <Table columns={columns} dataSource={dataSource} rowKey="_id" />
    </Modal>
  );
};

export default UserDetail;
