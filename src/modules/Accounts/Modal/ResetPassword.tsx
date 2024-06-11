import { useDispatch } from "react-redux";
import TranslateTing from "../../../components/Common/TranslateTing";
import {
  startLoading,
  stopLoading,
} from "../../../redux/reducers/loadingReducer";
import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { resetPassword } from "../api";
import { useEffect, useState } from "react";
import { SOCKET_URL } from "../../../api/endpoint";
import { io } from "socket.io-client";

const ResetPassword = (props: any) => {
  const { typeBtn, open, onClose, dataUpdate, width, refecth } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [socket, setSocket] = useState<any>(null);
  let title: any = "";
  if (typeBtn === "resetPassword") {
    title = <TranslateTing text="Reset Password" />;
  }
  const isAuthenticatedStr = localStorage.getItem("isLogin");
  const isAuthenticated: any = isAuthenticatedStr
    ? JSON.parse(isAuthenticatedStr)
    : null;
    useEffect(() => {
      if (isAuthenticated) {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);
  
        return () => {
          newSocket.disconnect();
        };
      }
    }, [isAuthenticated]);
  const onFinish = async (values: any) => {
    let payload = {
      userId: dataUpdate._id,
      newPassword: values.newPassword,
    };
    const userId = dataUpdate._id;
    try {
      dispatch(startLoading());
      const rp = await resetPassword(payload);
      if (rp.status) {
        onClose();
        form.resetFields();
        refecth();
        socket.emit("forceLogout", { userId });
      }
    } catch (err) {
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    if (typeBtn === "resetPassword" && dataUpdate) {
      form.setFieldsValue({
        username: dataUpdate.username,
      });
    }
  }, [title, dataUpdate, form]);
  return (
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
            <Form.Item
              label={<TranslateTing text="New password" />}
              name="newPassword"
            >
              <Input />
            </Form.Item>{" "}
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: 15, display: "flex", justifyContent: "center" }}>
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
  );
};
export default ResetPassword;
