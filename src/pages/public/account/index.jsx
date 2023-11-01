import {
  Button,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Spin,
  Tabs,
  Upload,
} from "antd";
import { Fragment, useState } from "react";
import {
  useEditAccountMutation,
  useGetAccountQuery,
  useUploadPhotoMutation,
} from "../../../redux/queries/account";
import { changeDate, getUsersImage } from "../../../utils";
import "./style.scss";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

const AccountPage = () => {
  const [tabActive, setTabActive] = useState("1");
  const [photo, setPhoto] = useState(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [uploadPhoto] = useUploadPhotoMutation();
  const [editAccount] = useEditAccountMutation();
  const [form] = Form.useForm();

  const { data = {}, isFetching, refetch } = useGetAccountQuery();
  const birthday = dayjs(data?.birthday);
  const newData = { ...data, birthday };
  const handleChangeTab = (tab) => {
    setTabActive(tab);
  };
  setPhoto(newData?.photo);
  form.setFieldsValue(newData);

  const handlePhoto = async (e) => {
    setLoadingPhoto(true);
    const formData = new FormData();
    formData.append("file", e.file.originFileObj);
    const { data } = await uploadPhoto(formData);
    setLoadingPhoto(false);
    setPhoto(data);
  };

  const handleValue = async () => {
    const data = await form.validateFields();
    const birthday = data?.birthday.toISOString().split("T")[0];
    const fields = data?.fields?.split(",");
    const newData = { ...data, birthday, fields, photo };
    console.log(newData);
    // await editAccount(newData);
    refetch();
  };

  return (
    <Fragment>
      <section>
        <div className="container">
          <Tabs
            centered
            defaultActiveKey="1"
            activeKey={tabActive}
            items={[
              {
                label: "Account",
                key: "1",
                children: (
                  <Fragment>
                    <Spin spinning={isFetching}>
                      <Flex gap={36}>
                        <div className="image__box">
                          <Image src={getUsersImage(data?.photo)} />
                        </div>
                        <div className="info__box">
                          <div>
                            <h4>Firstname: </h4>
                            <h3>{data?.firstName}</h3>
                          </div>
                          <div>
                            <h4>Lastname: </h4>
                            <h3>{data?.lastName}</h3>
                          </div>
                          <div>
                            <h4>Phone Number: </h4>
                            <h3>{data?.phoneNumber}</h3>
                          </div>
                          <div>
                            <h4>Birthday: </h4>
                            <h3>{changeDate(data?.birthday)}</h3>
                          </div>
                          <div>
                            <h4>Address: </h4>
                            <h3>{data?.address}</h3>
                          </div>
                          <div>
                            <h4>Username:</h4>
                            <h3> {data?.username}</h3>
                          </div>
                          <div>
                            <h4>Email:</h4>
                            <h3> {data?.email}</h3>
                          </div>
                          <div>
                            <h4> Info:</h4>
                            <h3 className="info__text"> {data?.info}</h3>
                          </div>
                        </div>
                      </Flex>
                    </Spin>
                  </Fragment>
                ),
              },
              {
                label: "Edit Account",
                key: "2",
                children: (
                  <Fragment>
                    <section>
                      <div className="account__form__box">
                        <div>
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader upload__photo"
                            showUploadList={false}
                            onChange={handlePhoto}
                          >
                            {photo ? (
                              <img
                                src={getUsersImage(photo)}
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              <div>
                                {loadingPhoto ? (
                                  <LoadingOutlined />
                                ) : (
                                  <PlusOutlined />
                                )}
                                <div style={{ marginTop: 8 }}>Upload</div>
                              </div>
                            )}
                          </Upload>
                        </div>
                        <Form
                          onSubmitCapture={handleValue}
                          className="account__form"
                          name="account"
                          autoComplete="off"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          form={form}
                        >
                          <Form.Item
                            label="First name"
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Last name"
                            name="lastName"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
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
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Fields"
                            name="fields"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Phone number"
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="Birthday"
                            name="birthday"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <DatePicker />
                          </Form.Item>
                          <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <TextArea />
                          </Form.Item>
                          <Form.Item
                            label="Info"
                            name="info"
                            rules={[
                              {
                                required: true,
                                message: "Please fill!",
                              },
                            ]}
                          >
                            <TextArea />
                          </Form.Item>
                          <Button htmlType="submit">Send</Button>
                        </Form>
                      </div>
                    </section>
                  </Fragment>
                ),
              },
              {
                label: "Change password",
                key: "3",
                children: "Tab 3",
              },
            ]}
            onChange={(key) => {
              handleChangeTab(key);
            }}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default AccountPage;
