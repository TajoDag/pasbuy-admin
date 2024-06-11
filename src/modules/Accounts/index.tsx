import React, { useEffect, useState } from "react";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { deleteUser, getDetailUser, getListCustomer, getListUser } from "./api";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import useRefresh from "../../hooks/useRefresh";
import { Button, Card, Input, Row, Space, Table, TableProps } from "antd";
import { splitText } from "../../utils";
import TranslateTing from "../../components/Common/TranslateTing";
import { FaEye, FaRegEdit } from "react-icons/fa";
import UserDetail from "./Modal/UserDetail";
import { useIntl } from "react-intl";
import { UserSwitchOutlined } from "@ant-design/icons";
import { MdDelete } from "react-icons/md";
import UpdateUser from "./Modal/UpdateUser";
import { RiLockPasswordLine } from "react-icons/ri";
import ResetPassword from "./Modal/ResetPassword";

type Props = {
  role?: string | null;
};

const Accounts = (props: Props) => {
  const { role } = props;
  const dispatch = useDispatch();
  const [dataDetail, setDataDetail] = useState<any>({});
  const [typeBtn, setTypeBtn] = useState<any>("");
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [dataTableUser, setDataTableUser] = useState([]);
  const [searchParams, setSearchParams] = useState<any>({
    page: 0,
    size: 10,
    search: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchParamsCustomer, setSearchParamsCustomer] = useState({
    page: 0,
    size: 10,
    inviteCode: "",
  });
  const [paginationCustomer, setPaginationCustomer] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [name, setName] = useState<any>(null);
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [refresh, refecth] = useRefresh();
  const [dataUpdate, setDataUpdate] = useState<any>();
  const [dataResetPassword, setDataResetPassword] = useState<any>();
  const onCloseModalDetail = () => {
    setOpenDetail(false);
    setDataDetail({});
  };

  const onCloseModalUpdate = () => {
    setTypeBtn("");
    setDataUpdate({});
    setOpenUpdate(false);
  };
  const onCloseModalReset = () => {
    setTypeBtn("");
    setDataResetPassword({});
    setOpenReset(false);
  };
  const onListCustomer = async (id: string) => {
    setTypeBtn("list");
    setSearchParamsCustomer((prevParams) => ({
      ...prevParams,
      page: 0,
      inviteCode: id,
    }));
  };

  const getUpdateUser = async (id: string) => {
    setTypeBtn("update");
    try {
      dispatch(startLoading());
      const rp = await getDetailUser(id);
      if (rp.status) {
        setDataUpdate(rp.result);
        setOpenUpdate(true);
      } else {
        setOpenUpdate(false);
      }
    } catch (err) {
      setOpenUpdate(false);
      setDataUpdate({});
    } finally {
      dispatch(stopLoading());
    }
  };

  const resetPassword = async (id: string) => {
    setTypeBtn("resetPassword");
    try {
      dispatch(startLoading());
      const rp = await getDetailUser(id);
      if (rp.status) {
        setDataResetPassword(rp.result);
        setOpenReset(true);
      } else {
        setOpenReset(false);
      }
    } catch (err) {
      setOpenReset(false);
      setDataResetPassword({});
    } finally {
      dispatch(stopLoading());
    }
  };

  const deleteUserById = async (id: string) => {
    try {
      dispatch(startLoading());
      const response = await deleteUser(id);
      if (response.status) {
        refecth();
      }
    } catch (err) {
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      dispatch(startLoading());
      try {
        const response = await getListCustomer(searchParamsCustomer);
        if (response.status) {
          const cus = response.result.users.map((item: any, i: any) => ({
            ...item,
            stt: i + 1 + searchParamsCustomer.page * searchParamsCustomer.size,
          }));
          setOpenDetail(true);
          setDataTableUser(cus);
          setPaginationCustomer((prev) => ({
            ...prev,
            total: response.result.pagination?.total,
          }));
        }
      } catch (err) {
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };

    if (searchParamsCustomer.inviteCode) {
      fetchCustomers();
    }
  }, [searchParamsCustomer]);

  const columns: TableProps<any>["columns"] = [
    {
      title: <TranslateTing text="#" />,
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      fixed: "left",
    },
    {
      title: <TranslateTing text="Username" />,
      dataIndex: "username",
      key: "username",
      width: 100,
      align: "left",
      render: (_, record: any) => {
        return <p>{splitText(record.username, 70)}</p>;
      },
    },
    {
      title: <TranslateTing text="Name" />,
      dataIndex: "name",
      key: "name",
      width: 100,
      align: "left",
      render: (_, record: any) => {
        return <p>{splitText(record.name, 70)}</p>;
      },
    },
    {
      title: <TranslateTing text="Email" />,
      dataIndex: "email",
      key: "email",
      width: 100,
      align: "center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: <TranslateTing text="Phone number" />,
      dataIndex: "phone",
      key: "address",
      width: 100,
      align: "center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: <TranslateTing text="Agency" />,
      dataIndex: "isShop",
      key: "isShop",
      width: 100,
      align: "center",
      render: (text) => <p>{text ? "Shop" : "No"}</p>,
    },
    {
      title: <TranslateTing text="Invite Code" />,
      dataIndex: "inviteCode",
      key: "inviteCode",
      width: 100,
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: <TranslateTing text="Role" />,
      dataIndex: "role",
      key: "role",
      width: 100,
      align: "center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "",
      align: "center" as "center",
      width: 140,
      render: (_: any, record: any, index: number) => {
        return (
          <Space size="middle">
            <Button
              icon={<FaEye />}
              onClick={() => {
                setTypeBtn("detail");
                setOpenDetail(true);
                setDataDetail(record);
              }}
            />
            <Button
              icon={<FaRegEdit />}
              onClick={() => {
                getUpdateUser(record._id);
              }}
            />
            <Button
              icon={<RiLockPasswordLine />}
              onClick={() => resetPassword(record._id)}
            />
            <Button
              icon={<MdDelete />}
              onClick={() => {
                deleteUserById(record._id);
              }}
            />
            {record.isShop && (
              <Button
                icon={<UserSwitchOutlined />}
                onClick={() => onListCustomer(record.inviteCode)}
              />
            )}
          </Space>
        );
      },
    },
  ];

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    setSearchParams({
      ...searchParams,
      page: 0,
      search: name,
    });
    refecth();
  };

  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      let payload = {
        ...searchParams,
        role: role,
      };
      try {
        const response = await getListUser(payload);
        if (response.status) {
          const updatedUsers: any = response.result.users.map(
            (item: any, i: any) => ({
              ...item,
              stt: i + 1 + searchParams.page * searchParams.size,
            })
          );
          setDataTable(updatedUsers);
          setPagination((prev) => ({
            ...prev,
            total: response.result.pagination?.total,
          }));
        }
      } catch (err) {
        setDataTable([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    getList();
  }, [searchParams, refresh, role]);

  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPagination(pagination);
  };
  const handleTableChangeCustomer = (pagination: any) => {
    setSearchParamsCustomer({
      ...searchParamsCustomer,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPaginationCustomer(pagination);
  };
  const intl = useIntl();
  const placeholderText = intl.formatMessage({ id: "Enter name or username" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card title={<TranslateTing text="Accounts" />} style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            placeholder={placeholderText}
            value={name}
            onChange={handleInputChange}
            style={{ width: "90%" }}
          />
          <Button type="primary" onClick={handleSubmit}>
            <TranslateTing text="Search" />
          </Button>
        </div>
      </Card>
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        scroll={{ x: 1300 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
      <UserDetail
        typeBtn={typeBtn}
        open={openDetail}
        data={dataDetail}
        paginationCustomer={paginationCustomer}
        handleTableChangeCustomer={handleTableChangeCustomer}
        onClose={onCloseModalDetail}
        dataTableUser={dataTableUser}
      />
      <UpdateUser
        onClose={onCloseModalUpdate}
        open={openUpdate}
        typeBtn={typeBtn}
        dataUpdate={dataUpdate}
        width={"50%"}
        refecth={refecth}
      />
      <ResetPassword
        onClose={onCloseModalReset}
        open={openReset}
        typeBtn={typeBtn}
        dataUpdate={dataResetPassword}
        width={"50%"}
        refecth={refecth}
      />
    </div>
  );
};

export default Accounts;
