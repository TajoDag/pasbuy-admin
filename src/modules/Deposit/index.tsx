import React, { useEffect, useState } from "react";
import { Button, Card, Form, Space, Table, TableProps } from "antd";
import TranslateTing from "./../../components/Common/TranslateTing";
import { useDispatch } from "react-redux";
import { FaEye } from "react-icons/fa";
import { TagsOrder } from "../Orders/components/TagsOrder";
import { formatPrice } from "../../utils";
import { useCurrency } from "./../../context/CurrencyContext";
import useRefresh from "./../../hooks/useRefresh";
import DepositModal from "./Modal/DepositModal";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { getListDeposit } from "./apis";
import { useIntl } from "react-intl";
type Props = {};

const Deposit = (props: Props) => {
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
      title: <TranslateTing text="Status" />,
      dataIndex: "status",
      align: "center" as "center",
      width: 150,
      render: (value: any) => TagsOrder(value),
    },

    // {
    //   title: <TranslateTing text="Creator" />,
    //   dataIndex: "handler",
    //   align: "center" as "center",
    //   width: 100,
    //   render: (value: any) => <p>{value.name}</p>,
    // },
    {
      title: <TranslateTing text="Date" />,
      dataIndex: "createdAt",
      align: "center" as "center",
      width: 100,
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
        const response = await getListDeposit(searchParams);
        if (response.status) {
          // console.log(response)
          const updatedProducts: any = response.result.depositRequests.map(
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
        title={<TranslateTing text="Deposits" />}
        style={{ width: "100%" }}
        extra={
          <Button onClick={onAdd}>
            <TranslateTing text="Deposit" />
          </Button>
        }
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
      <DepositModal
        open={open}
        form={form}
        onClose={onClose}
        refecth={refecth}
      />
    </div>
  );
};

export default Deposit;
