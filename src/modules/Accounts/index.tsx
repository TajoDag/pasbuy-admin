import React, { useEffect, useState } from "react";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { getListUser } from "./api";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import useRefresh from "../../hooks/useRefresh";
import { Card, Table, TableProps } from "antd";
import { splitText } from "../../utils";
import TranslateTing from "../../components/Common/TranslateTing";

const Accounts = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState<any>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [refresh, refecth] = useRefresh();

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
  ];
  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      try {
        const response = await getListUser(searchParams);
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
  }, [searchParams, refresh]);
  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPagination(pagination);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card
        title={<TranslateTing text="Accounts" />}
        style={{ width: "100%" }}
      ></Card>
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
    </div>
  );
};

export default Accounts;
