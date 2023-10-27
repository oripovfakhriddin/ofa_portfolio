import { Fragment } from "react";
import "./style.scss";
import { Button, Flex, Form, Input } from "antd";
import request from "../../../server/request";
import Cookies from "js-cookie";
import { PORT_TOKEN, PORT_USER } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slice/auth";
const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const {
      data: { token, user },
    } = await request.post("auth/register", values);

    Cookies.set(PORT_TOKEN, token);
    localStorage.setItem(PORT_USER, JSON.stringify(user));
    request.defaults.headers.Authorization = `Bearer ${token}`;
    navigate("/dashboard");
    dispatch(setAuth(user));
  };

  return (
    <Fragment>
      <h1 className="register__title">Register</h1>
      <Flex className="form__register__box" align="center" justify="center">
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
            label="Firstname"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Fragment>
  );
};

export default RegisterPage;
