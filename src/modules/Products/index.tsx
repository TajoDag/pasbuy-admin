import {
  Button,
  Card,
  Form,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { TableProps } from "antd";
import { IProduct, IProductTable, ISearchProduct } from "./interfaces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import {
  changeProductStatus,
  createProduct,
  deleteProduct,
  getListProducts,
  getProductDetail,
  updateProduct,
} from "./apis";
import DrawerProduct from "./components/DrawerProduct";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import useRefresh from "../../hooks/useRefresh";
import { splitText } from "../../utils";
type Props = {};
const Products = (props: Props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [searchParams, setSearchParams] = useState<ISearchProduct>({
    page: 0,
    size: 10,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [dataTable, setDataTable] = useState<IProductTable[]>([]);
  const [dataDetail, setDataDetail] = useState<IProduct | any>({});
  const [idDataDetail, setIdDataDetail] = useState<string>("");
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [oldImages, setOldImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [refresh, refecth] = useRefresh();

  const onClose = () => {
    form.resetFields();
    setImages([]);
    setImagesPreview([]);
    setOpenType("");
    setOpen(false);
    setDataDetail({});
    setIdDataDetail("");
  };

  const onUpdate = async (id: string) => {
    setOpenType("update");

    try {
      dispatch(startLoading());
      const rp = await getProductDetail(id);
      if (rp.status) {
        setDataDetail(rp.result);
        setOpen(true);
        setIdDataDetail(id);
      } else {
        setOpen(false);
        setOpenType("");
        setIdDataDetail("");
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      setOpen(false);
      setOpenType("");
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDelete = async (id: string) => {
    dispatch(startLoading());
    await deleteProduct(id)
      .then((res) => {
        if (res.status) {
          dispatch(
            showNotification({
              message: `${res.message}`,
              type: "success",
            })
          );
          refecth();
        }
      })
      .catch((err: any) => {
        dispatch(
          showNotification({
            message: `Có lỗi xảy ra`,
            type: "error",
          })
        );
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };
  const onChangeIsNew = async (status: any, id: string) => {
    const url = `is-new`;
    let payload = {
      isNew: status,
    };
    try {
      dispatch(startLoading());
      const rp = await changeProductStatus(id, url, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  const onChangeTodayDeal = async (status: any, id: string) => {
    const url = `today-deal`;
    let payload = {
      todayDeal: status,
    };
    try {
      dispatch(startLoading());
      const rp = await changeProductStatus(id, url, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  const onChangeFeatured = async (status: any, id: string) => {
    const url = `featured`;
    let payload = {
      featured: status,
    };
    try {
      dispatch(startLoading());
      const rp = await changeProductStatus(id, url, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  const onChangeFlashDeal = async (status: any, id: string) => {
    const url = `flash-deal`;
    let payload = {
      flashDeal: status,
    };
    try {
      dispatch(startLoading());
      const rp = await changeProductStatus(id, url, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  const onChangeStatus = async (status: any, id: string) => {
    const url = `status`;
    let payload = {
      status: status,
    };
    try {
      dispatch(startLoading());
      const rp = await changeProductStatus(id, url, payload);
      if (rp.status) {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "success",
          })
        );
        refecth();
      } else {
        dispatch(
          showNotification({
            message: `${rp.message}`,
            type: "error",
          })
        );
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Vui lòng thử lại.",
          type: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
  const columns: TableProps<IProductTable>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
      fixed: "left",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: 90,
      align: "center",

      render: (images) => (
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
      render: (_, record: any) => {
        return <p>{splitText(record.name, 70)}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 100,
      align: "center",
      render: (text) => <>{text.name}</>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      align: "center",
      render: (text) => <>{text.name}</>,
    },
    // {
    //   title: "Product Type",
    //   dataIndex: "productType",
    //   key: "productType",
    //   width: "10%",
    //   align: "center",
    //   render: (text) => <>{text.name}</>,
    // },
    {
      title: "Stock",
      dataIndex: "Stock",
      key: "Stock",
      width: 100,
      align: "center",
    },
    {
      title: "New product",
      dataIndex: "isNew",
      key: "isNew",
      width: 100,
      align: "center",
      render: (_, record: any) => {
        return (
          <Switch
            value={record.isNew}
            onChange={(e) => onChangeIsNew(e, record._id)}
          />
        );
      },
    },
    {
      title: "Todays Deal",
      dataIndex: "todayDeal",
      key: "todayDeal",
      width: 100,
      align: "center",
      render: (_, record: any) => {
        console.log(record.todayDeal);
        return (
          <Switch
            value={record.todayDeal}
            onChange={(e) => onChangeTodayDeal(e, record._id)}
          />
        );
      },
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: 100,
      align: "center",
      render: (_, record: any) => {
        return (
          <Switch
            value={record.featured}
            onChange={(e) => onChangeFeatured(e, record._id)}
          />
        );
      },
    },
    {
      title: "Flash deal",
      dataIndex: "flashDeal",
      key: "flashDeal",
      width: 100,
      align: "center",
      render: (_, record: any) => {
        return (
          <Switch
            value={record.flashDeal}
            onChange={(e) => onChangeFlashDeal(e, record._id)}
          />
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: (_, record: any) => {
        return (
          <Switch
            value={record.status}
            onChange={(e) => onChangeStatus(e, record._id)}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record: any) => (
        <Space>
          <EditOutlined
            style={{ fontSize: 20 }}
            onClick={() => onUpdate(record._id)}
          />
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete the Brand"
              description="Are you sure to delete this Brand?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record._id)}
            >
              <RiDeleteBin5Line style={{ color: "red", fontSize: 20 }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onAdd = () => {
    setOpenType("add");
    setOpen(true);
  };

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader: any = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old: any) => [...old, reader.result]);
          setImages((old: any) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const handleAddProduct = async (values: any) => {
    dispatch(startLoading());
    if (images.length < 1) {
      dispatch(
        showNotification({
          message: "Vui lòng chọn ảnh.",
          type: "error",
        })
      );
    } else {
      values.images = images;
      await createProduct(values)
        .then((res: any) => {
          if (res.status) {
            dispatch(
              showNotification({
                message: `${res.message}`,
                type: "success",
              })
            );
            onClose();
            refecth();
          }
        })
        .catch((err) => {
          dispatch(
            showNotification({
              message: "Oop! Something wrong, try later!",
              type: "error",
            })
          );
        })
        .finally(() => {
          dispatch(stopLoading());
        });
    }
  };
  const handleUpdateProduct = async (values: any) => {
    dispatch(startLoading());
    if (images.length < 1) {
      dispatch(
        showNotification({
          message: "Vui lòng chọn ảnh.",
          type: "error",
        })
      );
    } else {
      values.images = images;
      await updateProduct(idDataDetail, values)
        .then((res: any) => {
          if (res.status) {
            dispatch(
              showNotification({
                message: `${res.message}`,
                type: "success",
              })
            );
            onClose();
            refecth();
          }
        })
        .catch((err) => {
          dispatch(
            showNotification({
              message: "Oop! Something wrong, try later!",
              type: "error",
            })
          );
        })
        .finally(() => {
          dispatch(stopLoading());
          setIdDataDetail("");
        });
    }
  };
  useEffect(() => {
    const getList = async () => {
      dispatch(startLoading());
      try {
        const response = await getListProducts(searchParams);
        if (response.status) {
          // console.log(response)
          const updatedProducts: any = response.result.products.map(
            (item, i) => ({
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
        title="Products"
        extra={<Button onClick={onAdd}>Add Product</Button>}
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
      <DrawerProduct
        width={700}
        title={openType}
        onClose={onClose}
        open={open}
        form={form}
        onSubmit={
          openType === "add"
            ? handleAddProduct
            : openType === "update"
            ? handleUpdateProduct
            : null
        }
        oldImages={oldImages}
        setOldImages={setOldImages}
        setImages={setImages}
        images={images}
        setImagesPreview={setImagesPreview}
        imagesPreview={imagesPreview}
        createProductImagesChange={createProductImagesChange}
        dataDetail={dataDetail && dataDetail}
      />
    </div>
  );
};
export default Products;
