import { Field, Formik, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../../api/utils/auth";
import { ILogin } from "../../../interfaces/auth";
import { setAuthenticated, setUser } from "../../../redux/reducers/userReducer";
import { showNotification } from "../../../redux/reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../../utils";
import TranslateTing from "../../../components/Common/TranslateTing";
import { useIntl } from "react-intl";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setValue: setToken } = useLocalStorage("user_token", "");
  const { setValue: setIsLogin } = useLocalStorage("isLogin", "");
  const { setValue: setUserData } = useLocalStorage("userData", "");
  const intl = useIntl();
  const placeholderUsername = intl.formatMessage({
    id: "Please input your username!",
  });
  const placeholderPassword = intl.formatMessage({
    id: "Please input your password!",
  });
  const placeholderError1 = intl.formatMessage({
    id: "Wrong username or password",
  });
  const placeholderError2 = intl.formatMessage({
    id: "Login failed, please try again.",
  });
  const placeholderError3 = intl.formatMessage({
    id: "Your account does not have access rights",
  });
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(placeholderUsername),
    password: Yup.string().required(placeholderPassword),
  });
  const onFinish = async (values: any) => {
    try {
      const response = await loginUser(values);
      if (response.status) {
        setToken(response.result.token);
        setIsLogin(true);
        setUserData(response.result.user);
        // dispatch(
        //   showNotification({ message: response.message, type: "success" })
        // );
        navigate("/dashboard");
        // if (response.result.user.role !== "admin") {
        //   dispatch(
        //     showNotification({
        //       message: placeholderError3,
        //       type: "error",
        //     })
        //   );
        // }
      } else {
        setIsLogin(false);
        dispatch(
          showNotification({
            message: placeholderError1,
            type: "error",
          })
        );
      }
    } catch (err) {
      setIsLogin(false);
      // dispatch(
      //   showNotification({
      //     message: placeholderError2,
      //     type: "error",
      //   })
      // );
    }
  };

  const onChangeRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="login-title">
        <h1>
          <TranslateTing text="SIGN IN" />
        </h1>
        {/* <p>
          Chưa có tài khoản?{" "}
          <span onClick={onChangeRegister}>Đăng ký ngay</span>
        </p> */}
      </div>
      <div className="login-form">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onFinish(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">
                  <TranslateTing text="Username" />
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder={placeholderUsername}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <TranslateTing text="Password" />
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder={placeholderPassword}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-container">
                  <Field type="checkbox" name="remember" />
                  <TranslateTing text="Save account" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                <TranslateTing text="SIGN IN" />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Login;
