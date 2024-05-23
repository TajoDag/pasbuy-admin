import { Button, Card, Form, Table, TableProps } from "antd";
import React, { useState } from "react";
import { IProductTable } from "../Products/interfaces";
import useRefresh from "../../hooks/useRefresh";
import ModalOrder from "./components/ModalOrder";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { createOrder } from "./apis";

const Orders = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [dataTable, setDataTable] = useState<any[]>([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
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
  const handleUpdateProduct = async (values: any) => {};

  const columns: TableProps<any>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      fixed: "left",
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
    </div>
  );
};

export default Orders;
