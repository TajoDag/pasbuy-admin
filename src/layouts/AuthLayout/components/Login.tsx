import { Field, Formik, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../../api/utils/auth";
import { ILogin } from "../../../interfaces/auth";
import { setAuthenticated, setUser } from "../../../redux/reducers/userReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../../utils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setValue: setToken } = useLocalStorage("user_token", "");
  const { setValue: setIsLogin } = useLocalStorage("isLogin", "");
  const { setValue: setUserData } = useLocalStorage("userData", "");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });
  const onFinish = async (values: ILogin) => {
    try {
      const response = await loginUser(values);
      if (response.status) {
        setToken(response.result.token);
        setIsLogin(true);
        setUserData(response.result.user);
        dispatch(
          showNotification({ message: response.message, type: "success" })
        );
        if(response.result.user.role !== "admin"){
          dispatch(
            showNotification({
              message: "Tài khoản của bạn không có quyền truy cập",
              type: "error",
            })
          );
        }
        navigate("/dashboard");
      } else {
        setIsLogin(false);
        dispatch(
          showNotification({ message: response.message, type: "error" })
        );
      }
    } catch (err) {
      setIsLogin(false);
      dispatch(
        showNotification({
          message: "Đăng nhập thất bại, vui lòng thử lại.",
          type: "error",
        })
      );
    }
  };

  const onChangeRegister = () => {
    navigate("/register");
  };
  return (
    <div className="login">
      <div className="login-title">
        <h1>Đăng nhập</h1>
        {/* <p>
          Chưa có tài khoản?{" "}
          <span onClick={onChangeRegister}>Đăng ký ngay</span>
        </p> */}
      </div>
      <div className="login-form">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onFinish(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Tên đăng nhập</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email đăng nhập"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <Field type="password" name="password" placeholder="Mật khẩu" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
                {/* <a href="#" className="forgot-password">
                  Quên mật khẩu?
                </a> */}
              </div>
              <div className="form-group">
                <label className="checkbox-container">
                  <Field type="checkbox" name="remember" />
                  Nhớ tài khoản
                  <span className="checkmark"></span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                ĐĂNG NHẬP
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
