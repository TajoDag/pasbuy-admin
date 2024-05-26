import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  Popconfirm,
  Select,
} from "antd";
import {
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { splitText } from "../../../utils";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IProductTable, ISearchProduct } from "../../Products/interfaces";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { getListProducts } from "../../Products/apis";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { getListUserAll } from "../../Accounts/api";

type Props = {
  title: string;
  onClose?: any;
  open: boolean;
  width?: string | number;
  onSubmit?: any;
  form: FormInstance<any>;
  dataDetail?: any;
  selectedRows?: any;
  setSelectedRows?: any;
  selectedRowKeys?: any;
  setSelectedRowKeys?: any;
  totalPrice?: any;
  setTotalPrice?: any;
};

const ModalOrder = (props: Props) => {
  const {
    title,
    onClose,
    open,
    width,
    onSubmit,
    form,
    dataDetail,
    selectedRows,
    setSelectedRows,
    selectedRowKeys,
    setSelectedRowKeys,
    totalPrice,
    setTotalPrice,
  } = props;
  const dispatch = useDispatch();
  const [searchProduct, setSearchProduct] = useState({ name: "" });
  const [searchParams, setSearchParams] = useState<ISearchProduct>({
    page: 0,
    size: 10,
    name: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any[]>([]);
  let newTitle = "";
  if (title === "add") {
    newTitle = "Add order";
  } else if (title === "update") {
    newTitle = "Update status of order";
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSearchProduct((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSearch = () => {
    setSearchParams({ ...searchParams, name: searchProduct.name });
  };
  const handleRefresh = () => {
    setSearchProduct({ name: "" });
    setSearchParams({ ...searchParams, name: "" });
  };
  const handleQuantityChange = (record: any, value: number) => {
    const updatedRows = selectedRows.map((row: any) => {
      if (row.key === record.key) {
        const totalAmount = value * row.price;
        return { ...row, quantity: value, totalAmount };
      }
      return row;
    });
    setSelectedRows(updatedRows);
  };
  const handlePriceChange = (record: any, value: number) => {
    const updatedRows = selectedRows.map((row: any) => {
      if (row.key === record.key) {
        const totalAmount = row.quantity * value;
        return { ...row, price: value, totalAmount };
      }
      return row;
    });
    setSelectedRows(updatedRows);
  };

  const handleDelete = (record: any) => {
    const updatedRows = selectedRows.filter(
      (row: any) => row.key !== record.key
    );
    const updatedRowKeys = selectedRowKeys.filter(
      (key: any) => key !== record.key
    );
    setSelectedRows(updatedRows);
    setSelectedRowKeys(updatedRowKeys);
  };

  const columnProducts: any = [
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 90,
      align: "center",

      render: (images: any) => (
        <img
          key={images[0].public_id}
          src={images[0].url}
          alt="Product"
          style={{ width: 50 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string) => <a>{text}</a>,
    },
  ];
  const columnItems: any = [
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 90,
      align: "center",

      render: (images: any) => (
        <img
          key={images[0].public_id}
          src={images[0].url}
          alt="Product"
          style={{ width: 50 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "left",
      render: (_: any, record: any) => {
        return <p>{splitText(record.name, 70)}</p>;
      },
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
    },
    // {
    //     title: "Price",
    //     dataIndex: "price",
    //     key: "price",
    //     width: 120,
    //     align: "center",
    //     render: (_: any, record: any) => (
    //       <Input
    //         type="number"
    //         min={0}
    //         value={record.price}
    //         onChange={(e) =>
    //           handlePriceChange(record, parseFloat(e.target.value))
    //         }
    //       />
    //     ),
    //   },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      align: "center",
      render: (_: any, record: any) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) =>
            handleQuantityChange(record, parseInt(e.target.value, 10))
          }
        />
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete the Brand"
              description="Are you sure to delete this Brand?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record)}
            >
              <RiDeleteBin5Line style={{ color: "red", fontSize: 20 }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      const updatedRows = selectedRows.map((row, index) => ({
        ...row,
        stt: index + 1,
        quantity: row.quantity || 1,
        totalAmount: (row.quantity || 1) * row.price,
      }));
      setSelectedRows(updatedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  useEffect(() => {
    const total = selectedRows?.reduce(
      (acc: any, row: any) => acc + row.totalAmount,
      0
    );
    setTotalPrice(total);
  }, [selectedRows]);
  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      try {
        const response = await getListProducts(searchParams);
        if (response.status) {
          const updatedProducts: any = response.result.products.map(
            (item, i) => ({
              ...item,
              key: item._id,
            })
          );
          setDataProduct(updatedProducts);
          setPagination((prev) => ({
            ...prev,
            total: response.result.pagination?.total,
          }));
        }
      } catch (err) {
        setDataProduct([]);
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
    const getListUser = async () => {
      try {
        const response: any = await getListUserAll();
        if (response.status) {
          const users = response.result.map((user: any) => ({
            label: user.name,
            value: user._id,
          }));
          setDataUser(users);
        }
      } catch (err) {
        setDataUser([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      }
    };
    getListUser();
    getList();
  }, [searchParams]);
  const handleTableChange = (pagination: any) => {
    setSearchParams({
      ...searchParams,
      page: pagination.current - 1,
      size: pagination.pageSize,
    });
    setPagination(pagination);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onFinish = (values: any) => {
    onSubmit(values, selectedRows, totalPrice);
  };
  console.log(dataUser);
  return (
    <div>
      <Modal
        title={newTitle}
        // centered
        open={open}
        onCancel={onClose}
        footer={null}
        width="80%"
      >
        {" "}
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={14}>
            <Col span={16}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Customer"
                    name="customer"
                    rules={[
                      {
                        required: true,
                        message: "Please input your customer!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      filterOption={filterOption}
                      options={dataUser}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Note" name="note">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label=" ">
                    <div style={{ fontWeight: 550, fontSize: 20 }}>
                      Total Price: <span>$ {totalPrice}</span>
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              <Table columns={columnItems} dataSource={selectedRows} />
            </Col>
            <Col span={8}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <p style={{ marginBottom: -5 }}>Search for name</p>
                  <Input
                    placeholder="Search for name"
                    name="name"
                    value={searchProduct.name}
                    onChange={handleInputChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      gap: 10,
                    }}
                  >
                    <Button onClick={handleRefresh} icon={<CloseOutlined />}>
                      Refresh
                    </Button>
                    <Button
                      onClick={handleSearch}
                      type="primary"
                      icon={<SearchOutlined />}
                    >
                      Search
                    </Button>
                  </div>
                </div>
                <div className="table_page">
                  <Table
                    rowSelection={{
                      ...rowSelection,
                    }}
                    bordered
                    columns={columnProducts}
                    dataSource={dataProduct}
                    pagination={{
                      current: pagination.current,
                      pageSize: pagination.pageSize,
                      total: pagination.total,
                    }}
                    onChange={handleTableChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button htmlType="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => form.submit()}
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalOrder;
