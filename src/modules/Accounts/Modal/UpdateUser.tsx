import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd";
import React, { useEffect } from "react";
import TranslateTing from "../../../components/Common/TranslateTing";
import { useDispatch } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { updateDetailUser } from "../api";

const UpdateUser = (props: any) => {
  const { typeBtn, open, onClose, dataUpdate, width, refecth } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let title: any = "";
  if (typeBtn === "update") {
    title = <TranslateTing text="Update user" />;
  }
  const onFinish = async (values: any) => {
    try {
      dispatch(startLoading());
      const rp = await updateDetailUser(dataUpdate._id, values);
      if (rp.status) {
        onClose();
        form.resetFields();
        refecth();
      }
    } catch (err) {
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (typeBtn === "update" && dataUpdate) {
      form.setFieldsValue({
        username: dataUpdate.username,
        email: dataUpdate.email,
        name: dataUpdate.name,
        phone: dataUpdate.phone,
        role: dataUpdate.role,
        bankName: dataUpdate.bankName,
        owner: dataUpdate.owner,
        bankNumber: dataUpdate.bankNumber,
      });
    }
  }, [title, dataUpdate, form]);
  return (
    <div>
      {" "}
      <Modal
        width={width}
        title={title}
        open={open}
        footer={null}
        onCancel={onClose}
      >
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Username" />}
                name="username"
              >
                <Input disabled />
              </Form.Item>{" "}
            </Col>
            <Col span={12}>
              <Form.Item label={<TranslateTing text="Name" />} name="name">
                <Input />
              </Form.Item>{" "}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<TranslateTing text="Email" />} name="email">
                <Input disabled />
              </Form.Item>{" "}
            </Col>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Phone number" />}
                name="phone"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<TranslateTing text="Role" />} name="role">
                <Select
                  style={{ width: "100%" }}
                  options={[
                    { value: "user", label: "user" },
                    { value: "admin", label: "admin" },
                  ]}
                />
              </Form.Item>{" "}
            </Col>
            <Col span={12}>
              <Form.Item label={<TranslateTing text="Bank" />} name="bankName">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Bank account" />}
                name="owner"
              >
                <Input />
              </Form.Item>{" "}
            </Col>
            <Col span={12}>
              <Form.Item
                label={<TranslateTing text="Bank number" />}
                name="bankNumber"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
        >
          <Space>
            <div className="btn_cancel">
              <Button htmlType="button" onClick={onClose}>
                <TranslateTing text="Cancel" />
              </Button>
            </div>
            <div className="btn_submit">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
                style={{ background: "#e62e05" }}
              >
                <TranslateTing text="Update" />
              </Button>
            </div>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUser;
