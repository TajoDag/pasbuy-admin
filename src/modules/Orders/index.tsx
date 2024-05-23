import {
  Button,
  Card,
  Form,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { IProductTable } from "../Products/interfaces";
import useRefresh from "../../hooks/useRefresh";
import ModalOrder from "./components/ModalOrder";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { createOrder, getOrders, updateStatusOrders } from "./apis";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { TagsOrder } from "./components/TagsOrder";
import { TbEdit } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import ModalItem from "./components/ModalItem";

const Orders = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [dataItems, setDataItems] = useState<any>([]);
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
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
  const onAdd = () => {
    setOpenType("add");
    setOpen(true);
  };

  const handleAddProduct = async (
    values: any,
    selectedRows: any,
    totalPrice: any
  ) => {
    const orderItems = selectedRows.map((row: any) => ({
      name: row.name,
      price: row.price,
      quantity: row.quantity,
      product: row.key,
    }));

    const newOrder = {
      ...values,
      orderItems,
      totalPrice: totalPrice,
    };
    try {
      const rp = await createOrder(newOrder);
      if (rp.status) {
        dispatch(
          showNotification({
            message: rp.message || "Order created successfully",
            type: "success",
          })
        );
        setSelectedRows([]);
        setSelectedRowKeys([]);
        setTotalPrice(0);
        refecth();
      } else {
        dispatch(
          showNotification({
            message: rp.message || "Failed to create order",
            type: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: "Failed to create order",
          type: "error",
        })
      );
    }
  };
  const handleUpdateProduct = async (id: any, status: string) => {
    try {
      let payload = {
        status: status,
      };
      const rp = await updateStatusOrders(id, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: rp.message || "Order update successfully",
            type: "success",
          })
        );
        refecth();
      }
    } catch (error) {}
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      fixed: "left",
    },
    {
      title: "Name customer",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "left",
    },
    {
      title: "Phone number customer",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      align: "center",
    },
    {
      title: "Email customer",
      dataIndex: "email",
      key: "email",
      width: 100,
      align: "left",
    },
    {
      title: "Note customer",
      dataIndex: "note",
      key: "email",
      width: 250,
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      align: "center" as "center",
      width: 100,
      render: (value: any) => TagsOrder(value),
    },
    {
      title: "Total Price ($)",
      dataIndex: "totalPrice",
      align: "center" as "center",
      width: 100,
    },

    {
      title: "Order creator",
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
            <Tooltip title="Delete">
              <Popconfirm
                title="Change order status"
                description={`Do you want to change order status to ${keyC}?`}
                onConfirm={() => handleUpdateProduct(record._id, keyC)}
              >
                <Button icon={<TbEdit />} />
              </Popconfirm>
            </Tooltip>
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
        const response = await getOrders(searchParams);
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
        title="Orders"
        extra={<Button onClick={onAdd}>Add Orders</Button>}
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
      <ModalOrder
        title={openType}
        open={open}
        form={form}
        onClose={onClose}
        onSubmit={
          openType === "add"
            ? handleAddProduct
            : openType === "update"
            ? handleUpdateProduct
            : null
        }
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        dataDetail={dataDetail && dataDetail}
      />
      <ModalItem
        open={openItems}
        data={dataItems}
        onClose={onCloseModalDetail}
      />
    </div>
  );
};

export default Orders;
