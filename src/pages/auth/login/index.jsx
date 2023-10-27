import { Fragment } from "react";
import "./style.scss";
import { Button, Flex, Form, Input } from "antd";
import request from "../../../server/request";
import { PORT_TOKEN, PORT_USER } from "../../../constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slice/auth";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const {
      data: { token, user },
    } = await request.post("auth/login", values);

    console.log(token, " va ", user);

    Cookies.set(PORT_TOKEN, token);
    localStorage.setItem(PORT_USER, JSON.stringify(user));
    request.defaults.headers.Authorization = `Bearer ${token}`;
    navigate("/dashboard");
    dispatch(setAuth(user));
  };

  return (
    <Fragment>
      <h1 className="login__title">Login</h1>
      <Flex className="form__box" align="center" justify="center">
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Fragment>
  );
};

export default LoginPage;
