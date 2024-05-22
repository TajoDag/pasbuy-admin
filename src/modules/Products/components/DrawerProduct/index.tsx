import {
  Button,
  Col,
  Drawer,
  Form,
  FormInstance,
  Image,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAllCategory } from "../../../Categories/utils/services";
import { showNotification } from "../../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { getAllProductType } from "../../../ProductType/utils/services";
import { getAllBrand } from "../../../Brand/utils/services";
import { IProduct } from "../../interfaces";
type Props = {
  title: string;
  onClose: () => void;
  open: boolean;
  width?: string | number;
  onSubmit?: any;
  form: FormInstance<any>;
  oldImages?: string[];
  setOldImages?: Dispatch<SetStateAction<any[]>> | undefined;
  setImages?: Dispatch<SetStateAction<any[]>> | undefined;
  images?: string[];
  setImagesPreview?: Dispatch<SetStateAction<any[]>> | undefined | any;
  imagesPreview?: string[];
  createProductImagesChange?: (e: any) => void;
  dataDetail?: IProduct;
};
const DrawerProduct = (props: Props) => {
  const {
    title,
    onClose,
    open,
    width,
    onSubmit,
    form,
    oldImages,
    setOldImages,
    setImages,
    images,
    setImagesPreview,
    imagesPreview,
    createProductImagesChange,
    dataDetail,
  } = props;
  const dispatch = useDispatch();
  const [listCate, setListCate] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listProductType, setListProductType] = useState([]);

  let newTitle = "";
  if (title === "add") {
    newTitle = "Add product";
  } else if (title === "update") {
    newTitle = "Update product";
  }

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const getListCategories = async () => {
      try {
        const res = await getAllCategory();
        if (res.status) {
          const formattedCategories = res.result.map((category: any) => ({
            value: category?._id,
            label: category?.name,
          }));
          setListCate(formattedCategories);
        } else {
          setListCate([]);
          dispatch(
            showNotification({
              message: "Lấy dữ liệu thất bại.",
              type: "error",
            })
          );
        }
      } catch (err) {
        setListCate([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      }
    };
    const getListProductType = async () => {
      try {
        const res = await getAllProductType();
        if (res.status) {
          const formatted = res.result.map((item: any) => ({
            value: item?._id,
            label: item?.name,
          }));
          setListProductType(formatted);
        } else {
          setListProductType([]);
          dispatch(
            showNotification({
              message: "Lấy dữ liệu thất bại.",
              type: "error",
            })
          );
        }
      } catch (err) {
        setListProductType([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      }
    };
    const getListBrand = async () => {
      try {
        const res = await getAllBrand();
        if (res.status) {
          const formatted = res.result.map((item: any) => ({
            value: item?._id,
            label: item?.name,
          }));
          setListBrand(formatted);
        } else {
          setListBrand([]);
          dispatch(
            showNotification({
              message: "Lấy dữ liệu thất bại.",
              type: "error",
            })
          );
        }
      } catch (err) {
        setListBrand([]);
        dispatch(
          showNotification({
            message: "Lấy dữ liệu thất bại.",
            type: "error",
          })
        );
      }
    };
    getListBrand();
    getListProductType();
    getListCategories();
  }, []);

  useEffect(() => {
    if (title === "update" && dataDetail) {
      form.setFieldsValue({
        name: dataDetail.name,
        category: dataDetail.category?._id,
        brand: dataDetail.brand?._id,
        price: dataDetail.price,
        importPrice: dataDetail.importPrice,
        Stock: dataDetail.Stock,
        description: dataDetail.description,
        featured: dataDetail.featured,
        todayDeal: dataDetail.todayDeal,
        flashDeal: dataDetail.flashDeal,
      });

      if (dataDetail.images && setImagesPreview) {
        const imagesURLs = dataDetail.images.map((image: any) => image.url);
        setImagesPreview(imagesURLs);
      }
    }
  }, [title, dataDetail, form, setImagesPreview]);

  console.log(dataDetail);

  return (
    <div>
      <Drawer
        width={width}
        title={newTitle}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          // initialValues={dataDetail}
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Space>
                <Form.Item
                  name="featured"
                  label="Featured"
                  initialValue={false}
                >
                  <Switch defaultChecked />
                </Form.Item>
                <Form.Item
                  name="todayDeal"
                  label="Today Deal"
                  initialValue={false}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
                <Form.Item
                  name="flashDeal"
                  label="Flash Deal"
                  initialValue={false}
                >
                  <Switch defaultChecked={false} />
                </Form.Item>
              </Space>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={listCate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true, message: "Please choose the brand" }]}
              >
                <Select
                  showSearch
                  placeholder="Select the brand"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={listBrand}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input placeholder="Please enter price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="importPrice"
                label="Import price"
                rules={[
                  { required: true, message: "Please center import price" },
                ]}
              >
                <Input placeholder="Please enter import price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Stock"
                label="Stock"
                rules={[{ required: true, message: "Please enter stock" }]}
              >
                <Input placeholder="Please enter stock" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    form.setFieldsValue({ description: editor.getData() });
                  }}
                  data={dataDetail ? dataDetail.description : ""}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            overflowX: "auto",
            padding: "10px",
          }}
        >
          {imagesPreview &&
            imagesPreview.map((image, index) => (
              <div
                key={index}
                style={{
                  padding: 5,
                  border: "0.5px solid #D9D9D9",
                  marginRight: 10,
                }}
              >
                <Image
                  src={image}
                  alt="Product Preview"
                  width={100}
                  style={{ marginRight: "10px" }}
                />
              </div>
            ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <input
            type="file"
            name="images"
            className="inputImageProduct"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          />
        </div>
      </Drawer>
    </div>
  );
};
export default DrawerProduct;
