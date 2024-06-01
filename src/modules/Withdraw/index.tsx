import React, { useEffect, useState } from "react";
import { Button, Card, Form, Space, Table, TableProps } from "antd";
import TranslateTing from "./../../components/Common/TranslateTing";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { TagsOrder } from "../Orders/components/TagsOrder";
import { formatPrice } from "../../utils";
import { useCurrency } from "./../../context/CurrencyContext";
import useRefresh from "./../../hooks/useRefresh";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { confirmWithdraw, getListWithdraw } from "./apis";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { useIntl } from "react-intl";
type Props = {};

const Withdraw = (props: Props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [refresh, refecth] = useRefresh();
  const intl = useIntl();
  const success = intl.formatMessage({
    id: "Success",
  });
  const error = intl.formatMessage({
    id: "Error",
  });
  const onClose = () => {
    form.resetFields();
    setOpenType("");
    setOpen(false);
  };
  const onAdd = () => {
    setOpenType("add");
    setOpen(true);
  };
  const [searchParams, setSearchParams] = useState<any>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { currency } = useCurrency();
  const handleCancel = async (id: any) => {
    dispatch(startLoading());
    try {
      const response = await confirmWithdraw(id, {
        status: "cancel",
        handler: "admin",
      });
      if (response.status) {
        dispatch(
          showNotification({
            message: success,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(showNotification({ message: error, type: "error" }));
      }
    } catch (err) {
      dispatch(showNotification({ message: error, type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };
  const handleConfirm = async (id: any) => {
    dispatch(startLoading());
    try {
      const response = await confirmWithdraw(id, {
        status: "success",
        handler: "admin",
      });
      if (response.status) {
        dispatch(
          showNotification({
            message: success,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(showNotification({ message: error, type: "error" }));
      }
    } catch (err) {
      dispatch(showNotification({ message: "Có lỗi xảy ra", type: "error" }));
    } finally {
      dispatch(stopLoading());
    }
  };
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
      title: <TranslateTing text="Code Deposit" />,
      dataIndex: "code",
      key: "code",
      width: 100,
      align: "center",
    },
    {
      title: <TranslateTing text="Name customer" />,
      dataIndex: "customer",
      key: "customer",
      width: 200,
      align: "left",
      render: (text) => <>{text.name}</>,
    },
    {
      title: <TranslateTing text="Amount" />,
      dataIndex: "amount",
      align: "center" as "center",
      width: 100,
      render: (_, record: any) => <>{formatPrice(record.amount, currency)}</>,
    },
    {
      title: <TranslateTing text="Message" />,
      dataIndex: "message",
      key: "message",
      width: 250,
      align: "left",
    },
    {
      title: <TranslateTing text="Note" />,
      dataIndex: "note",
      key: "note",
      width: 250,
      align: "left",
    },

    {
      title: <TranslateTing text="Bank" />,
      key: "Bank",
      width: 250,
      align: "left",

      render: (_: any, record: any, index: number) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              Ngân hàng:
              <span style={{ fontWeight: "bold" }}>
                {record.customer.bankName}
              </span>
            </div>
            <div>
              Số tài khoản:{" "}
              <span style={{ fontWeight: "bold" }}>
                {record.customer.bankNumber}
              </span>
            </div>
            <div>
              Chủ tài khoản:{" "}
              <span style={{ fontWeight: "bold" }}>
                {record.customer.owner}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: <TranslateTing text="Status" />,
      dataIndex: "status",
      align: "center" as "center",
      width: 150,
      render: (value: any) => TagsOrder(value),
    },
    {
      title: <TranslateTing text="Date" />,
      dataIndex: "createdAt",
      align: "center" as "center",
      width: 100,
    },
    {
      title: "",
      align: "center" as "center",
      width: 100,
      render: (_: any, record: any, index: number) => {
        return (
          <Space size="middle">
            <Button
              icon={<IoMdCloseCircleOutline />}
              onClick={() => handleCancel(record._id)}
            />
            <Button
              icon={<GiConfirmed />}
              onClick={() => handleConfirm(record._id)}
            />
          </Space>
        );
      },
    },
  ];

  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPagination(pagination);
  };
  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      try {
        const response = await getListWithdraw(searchParams);
        if (response.status) {
          const updatedProducts: any = response.result.withdrawRequests.map(
            (item: any, i: any) => ({
              ...item,
              stt: i + 1 + searchParams.page * searchParams.size,
            })
          );
          setDataTable(updatedProducts);
          setPagination((prev) => ({
            ...prev,
            total: response.result.pagination?.total,
          }));
        }
      } catch (err) {
        setDataTable([]);
        dispatch(
          showNotification({
            message: error,
            type: "error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
    getList();
  }, [searchParams, refresh]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card
        title={<TranslateTing text="Withdraw" />}
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
      {/* <DepositModal
        open={open}
        form={form}
        onClose={onClose}
        refecth={refecth}
      /> */}
    </div>
  );
};

export default Withdraw;
