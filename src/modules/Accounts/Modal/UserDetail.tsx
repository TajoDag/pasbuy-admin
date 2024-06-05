import { Modal, Table } from "antd";
import TranslateTing from "../../../components/Common/TranslateTing";

type Props = {
  onClose?: any;
  open: boolean;
  data?: any;
  typeBtn?: string;
  paginationCustomer?: any;
  handleTableChangeCustomer?: any;
  dataTableUser?: any;
};

const UserDetail = (props: Props) => {
  const {
    onClose,
    open,
    data,
    typeBtn,
    paginationCustomer,
    handleTableChangeCustomer,
    dataTableUser,
  } = props;

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
      render: (_: any, record: any) => (
        <p>{record.phone ? record.phone : null}</p>
      ),
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
      dataIndex: "bankNumber",
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
  const columnList: any = [
    {
      title: "#",
      dataIndex: "stt",
    },
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
    },
    {
      title: <TranslateTing text="Username" />,
      dataIndex: "username",
    },
    {
      title: <TranslateTing text="Phone number" />,
      dataIndex: "phone",
    },
    {
      title: <TranslateTing text="Invite code" />,
      dataIndex: "inviteCode",
    },
  ];
  // Chuyển đổi data thành một mảng nếu nó không phải là mảng
  const dataSource = Array.isArray(data) ? data : [data];
  let title: any = "";
  if (typeBtn === "detail") {
    title = <TranslateTing text="Detail User" />;
  } else if (typeBtn === "list") {
    title = <TranslateTing text="Customers" />;
  }
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width="80%"
    >
      {typeBtn === "detail" && (
        <Table columns={columns} dataSource={dataSource} rowKey="_id" />
      )}

      {typeBtn === "list" && dataTableUser && (
        <Table
          columns={columnList}
          dataSource={dataTableUser}
          pagination={{
            current: paginationCustomer.current,
            pageSize: paginationCustomer.pageSize,
            total: paginationCustomer.total,
          }}
          onChange={handleTableChangeCustomer}
        />
      )}
    </Modal>
  );
};

export default UserDetail;
