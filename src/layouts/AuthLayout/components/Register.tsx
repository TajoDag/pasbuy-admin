import { Form, FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";

type FieldType = {
  username?: string;
  fullName?: string;
  password?: string;
  confirmPassword?: string;
  usernameTelegram?: string;
  phoneNumber?: string;
  email?: string;
  zalo?: string;
  facebook?: string;
  bankName?: string;
  bankAccount?: string;
  cardName?: string;
  securityCode?: string;
};
const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    usernameTelegram: "",
    phoneNumber: "",
    email: "",
    zalo: "",
    facebook: "",
    bankName: "",
    bankAccount: "",
    cardName: "",
    securityCode: "",
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onChangeLogin = () => {
    navigate("/login");
  };
  return (
    <div className="login">
      <div className="login-title">
        <h1>Tạo tài khoản</h1>
        <p>
          Đã có tài khoản? <span onClick={onChangeLogin}>Đăng nhập ngay</span>
        </p>
        <p>Chọn loại tài khoản muốn tạo</p>
      </div>
      <div className="register-form">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group-radio">
                <div role="group" aria-labelledby="my-radio-group">
                  {/* <label className="radio-option">
                    <Field type="radio" name="picked" value="One" checked className="radio-input"/>
                    <span className="radio-custom"></span>Đối Tác
                  </label> */}

                  <label className="radio-option">
                    <Field
                      type="radio"
                      name="userType"
                      value="partner"
                      className="radio-input"
                      checked
                    />
                    <span className="custom-radio" />{" "}
                    {/* Thêm span này để tạo custom radio */}
                    Đối Tác
                  </label>
                </div>
              </div>
              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="username">Tên đăng nhập</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên</label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Tên đăng nhập"
                  />
                </div>
              </div>
              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Nhập lại mật khẩu</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              </div>
              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="usernameTelegram">Username Telegram</label>
                  <Field
                    type="text"
                    name="usernameTelegram"
                    placeholder="Username Telegram"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <Field
                    type="number"
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Email" />
              </div>
              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="zalo">Zalo</label>
                  <Field type="number" name="zalo" placeholder="Zalo" />
                </div>
                <div className="form-group">
                  <label htmlFor="facebook">Facebook</label>
                  <Field type="text" name="facebook" placeholder="Facebook" />
                </div>
              </div>
              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="bankName">Chọn ngân hàng</label>
                  <Field
                    as="select"
                    // type="text"
                    name="bankName"
                    placeholder="Chọn ngân hàng"
                  >
                    <option value="">Chọn ngân hàng</option>
                    <option value="vcb">Vietcombank</option>
                    <option value="tech">Techcombank</option>
                    <option value="mb">MB Bank</option>
                  </Field>
                </div>
                <div className="form-group">
                  <label htmlFor="bankAccount">Số tài khoản ngân hàng</label>
                  <Field
                    type="text"
                    name="bankAccount"
                    placeholder="Số tài khoản ngân hàng"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Tên trên thẻ ngân hàng</label>
                <Field
                  type="text"
                  name="cardName"
                  placeholder="Tên trên thẻ ngân hàng"
                />
              </div>

              <div className="form-group-grid">
                <div className="form-group">
                  <label htmlFor="securityCode">Mã bảo mật</label>
                  <Field
                    type="text"
                    name="securityCode"
                    placeholder="Mã bảo mật"
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="code"></label>
                  <Field
                    type="text"
                    name="facebook"
                    placeholder="Facebook"
                  /> */}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                ĐĂNG KÝ NGAY
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Register;
