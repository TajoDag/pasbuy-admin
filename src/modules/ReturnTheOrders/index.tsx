import { Button, Card, Form, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrency } from "../../context/CurrencyContext";
import useRefresh from "../../hooks/useRefresh";
import TranslateTing from "../../components/Common/TranslateTing";
import { formatPrice } from "../../utils";
import { TagsOrder } from "../Orders/components/TagsOrder";
import { FaEye } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { getOrders, getOrdersAdmin } from "../Orders/apis";
import { showNotification } from "../../redux/reducers/notificationReducer";
import ModalChangeStatusOrder from "../Orders/components/ChangeStatusOrder";
import ModalItem from "../Orders/components/ModalItem";

const ReturnTheOrders = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [dataItems, setDataItems] = useState<any>([]);
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openItems, setOpenItems] = useState(false);
  const [refresh, refecth] = useRefresh();
  const [searchParams, setSearchParams] = useState<any>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { currency } = useCurrency();
  const onClose = () => {
    form.resetFields();
    setOpenType("");
    setOpen(false);
    setDataDetail({});
    setSelectedRows([]);
    setSelectedRowKeys([]);
    setTotalPrice(0);
  };
  const onCloseModalDetail = () => {
    setOpenItems(false);
    setDataItems([]);
  };
  const onCloseModalChangeStatus = () => {
    setOpenDetail(false);
    setDataItems([]);
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
      title: <TranslateTing text="Name customer" />,
      dataIndex: "customer",
      key: "customer",
      width: 200,
      align: "left",
      render: (text) => <>{text.name}</>,
    },
    {
      title: <TranslateTing text="Phone number customer" />,
      dataIndex: "phone",
      key: "phone",
      width: 100,
      align: "center",
    },
    // {
    //   title: <TranslateTing text="Note customer" />,
    //   dataIndex: "note",
    //   key: "email",
    //   width: 250,
    //   align: "left",
    // },
    {
      title: <TranslateTing text="Order location" />,
      dataIndex: "orderLocation",
      key: "email",
      width: 250,
      align: "center",
    },
    {
      title: <TranslateTing text="Status" />,
      dataIndex: "orderStatus",
      align: "center" as "center",
      width: 150,
      render: (value: any) => TagsOrder(value),
    },
    {
      title: <TranslateTing text="Total Price" />,
      dataIndex: "totalPrice",
      align: "center" as "center",
      width: 100,
      render: (_, record: any) => (
        <>{formatPrice(record.totalPrice, currency)}</>
      ),
    },

    {
      title: <TranslateTing text="Order creator" />,
      dataIndex: "user",
      align: "center" as "center",
      width: 100,
      render: (value: any) => <p>{value.name}</p>,
    },
    {
      title: "",
      align: "center" as "center",
      width: 100,
      render: (_: any, record: any, index: number) => {
        let keyC = "";
        if (record.orderStatus === "Processing") {
          keyC = "Delivering";
        }
        if (record.orderStatus === "Delivering") {
          keyC = "Successful delivery";
        }
        return (
          <Space size="middle">
            <Button
              icon={<FaEye />}
              onClick={() => {
                setOpenItems(true);
                // setDetail(record);
                setDataItems(record.orderItems);
              }}
            />
            <Button
              icon={<TbEdit />}
              onClick={() => {
                setOpenDetail(true);
                setDataItems(record);
              }}
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
        const response = await getOrdersAdmin(searchParams);
        if (response.status) {
          // console.log(response)
          const updatedProducts: any = response.result.orders.map(
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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Card
        title={<TranslateTing text="Orders" />}
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
      <ModalItem
        open={openItems}
        data={dataItems}
        onClose={onCloseModalDetail}
      />
      <ModalChangeStatusOrder
        open={openDetail}
        data={dataItems}
        refecth={refecth}
        onClose={onCloseModalChangeStatus}
      />
    </div>
  );
};
export default ReturnTheOrders;
