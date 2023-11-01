import { Fragment } from "react";
import "./style.scss";
import { Button, Flex, Form, Input, message } from "antd";
import { useChangePasswordMutation } from "../../../redux/queries/account";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();

  const onFinish = async ({
    confirmPassword,
    newPassword,
    currentPassword,
    username,
  }) => {
    if (confirmPassword === newPassword) {
      const data = { username, currentPassword, newPassword };
      await changePassword(data);
      message.success("Password changed succesfuly")
    } else {
      message.error("The confirmation password is incorrect");
    }
  };

  return (
    <Fragment>
      <h1 className="change__password__title">Change password</h1>
      <Flex className="form__box" align="center" justify="center">
        <Form
          name="change password"
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
            label="Current Password"
            name="currentPassword"
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
            label="New Password"
            name="newPassword"
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
            label="Confirm Password"
            name="confirmPassword"
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
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Fragment>
  );
};

export default ChangePassword;
