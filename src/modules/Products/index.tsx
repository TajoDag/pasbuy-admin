import {
  Button,
  Card,
  Form,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import type { TableProps } from "antd";
import { IProduct, IProductTable, ISearchProduct } from "./interfaces";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { createProduct, deleteProduct, getListProducts } from "./apis";
import DrawerProduct from "./components/DrawerProduct";
import { startLoading, stopLoading } from "../../redux/reducers/loadingReducer";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import useRefresh from "../../hooks/useRefresh";
type Props = {};
const Products = (props: Props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<any>();
  const [searchParams, setSearchParams] = useState<ISearchProduct>({
    page: 0,
    size: 10,
  });
  const [dataTable, setDataTable] = useState<IProductTable[]>([]);
  const [openType, setOpenType] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [oldImages, setOldImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [refresh, refecth] = useRefresh();

  const handleDelete = async (id: string) => {
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
      });
  };
  const columns: TableProps<IProductTable>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "3%",
      align: "center",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      width: "10%",
      align: "center",
      render: (images) =>
        images.map((image: any) => (
          <img
            key={image.public_id}
            src={image.url}
            alt="Product"
            style={{ width: 50 }}
          />
        )),
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   width: "20%",
    //   align: "center",
    // },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "7%",
      align: "center",
    },
    // {
    //   title: "Brand",
    //   dataIndex: "brand",
    //   key: "brand",
    //   width: "10%",
    //   align: "center",
    //   render: (text) => <>{text.name}</>,
    // },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   width: "10%",
    //   align: "center",
    //   render: (text) => <>{text.name}</>,
    // },
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
      width: "6%",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (text) => (
        <Tag color={text ? "green" : "volcano"}>
          {text ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      align: "center",
      render: (_, record: any) => (
        <Tooltip title="Delete">
          <Popconfirm
            title="Delete the Brand"
            description="Are you sure to delete this Brand?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<RiDeleteBin5Line />} />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];
  const onClose = () => {
    form.resetFields();
    setImages([]);
    setImagesPreview([]);
    setOpenType("");
    setOpen(false);
  };
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
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await getListProducts(searchParams);
        if (response.status) {
            // console.log(response)
          const updatedProducts: any = response.result.products.map(
            (item, i) => ({
              ...item,
              stt: i + 1,
            })
          );
          setDataTable(updatedProducts);
        }
      } catch (err) {
        setDataTable([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      }
    };
    getList();
  }, [searchParams, refresh]);
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
        scroll={{ x: 1000 }}
      />
      <DrawerProduct
        width={700}
        title={openType}
        onClose={onClose}
        open={open}
        form={form}
        onSubmit={handleAddProduct}
        oldImages={oldImages}
        setOldImages={setOldImages}
        setImages={setImages}
        images={images}
        setImagesPreview={setImagesPreview}
        imagesPreview={imagesPreview}
        createProductImagesChange={createProductImagesChange}
      />
    </div>
  );
};
export default Products;
