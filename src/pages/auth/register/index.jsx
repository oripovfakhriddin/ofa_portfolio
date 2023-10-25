import { Fragment } from "react";
import "./style.scss";
import { Button, Flex, Form, Input } from "antd";
const RegisterPage = () => {
  const onFinish = () => {};

  return (
    <Fragment>
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

export default RegisterPage;
