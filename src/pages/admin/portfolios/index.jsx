import { Fragment, useState } from "react";
import {
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useEditPortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUploadPhotoMutation,
} from "../../../redux/queries/portfolios";
import "./style.scss";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { PORTFOLIOS_LIMIT } from "../../../constants";
import TextArea from "antd/es/input/TextArea";
import { getImage } from "../../../utils";
const PortfoliosPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [urlProtocol, setUrlProtocol] = useState("http://");
  const [form] = Form.useForm();
  const {
    data: { portfolios, total } = { portfolios: [], total: 0 },
    isFetching,
    refetch,
  } = useGetPortfoliosQuery({ page, search });
  const [getPortfolio] = useGetPortfolioMutation();
  const [uploadPhoto] = useUploadPhotoMutation();
  const [addPortfolio] = useAddPortfolioMutation();
  const [editPortfolio] = useEditPortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showModal = () => {
    setPhoto(null);
    setSelected(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePhoto = async (e) => {
    setLoadingPhoto(true);
    const formData = new FormData();
    formData.append("file", e.file.originFileObj);
    const { data } = await uploadPhoto(formData);
    setLoadingPhoto(false);
    setPhoto(data);
  };

  const handleProtocol = (e) => {
    setUrlProtocol(e);
  };

  const handleOk = async () => {
    try {
      setIsModalLoading(true);
      const values = await form.validateFields();
      values.photo = photo?._id;
      const newValues = { ...values, url: urlProtocol + values?.url };
      if (selected === null) {
        await addPortfolio(newValues);
      } else {
        await editPortfolio({ id: selected, body: newValues });
      }
      refetch();
      setIsModalOpen(false);
      setPhoto(null);
      form.resetFields();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setSelected(id);
    const { data } = await getPortfolio(id);
    setPhoto(data?.photo);
    setIsModalOpen(true);
    const newData = { ...data, url: data?.url?.split("//")[1] || data?.url };
    form.setFieldsValue(newData);
  };

  const handleDelete = async (id) => {
    await deletePortfolio(id);
    refetch();
  };

  const selectBefore = (
    <Select onChange={handleProtocol} value={urlProtocol}>
      <Select.Option value="http://">http://</Select.Option>
      <Select.Option value="https://">https://</Select.Option>
    </Select>
  );

  return (
    <Fragment>
      <Flex justify="space-between" gap={36} align="center">
        <h1>Portfolios ({total})</h1>
        <Input
          type="text"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button onClick={showModal} type="dashed">
          Add porfolios
        </Button>
      </Flex>

      <Table
        scroll={{ x: 1000 }}
        loading={isFetching}
        pagination={false}
        dataSource={portfolios}
      >
        <ColumnGroup title="Name">
          <Column
            title="First Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.firstName}</p>;
            }}
          />
          <Column
            title="Last Name"
            dataIndex="user"
            key="user"
            render={(data) => {
              return <p>{data?.lastName}</p>;
            }}
          />
        </ColumnGroup>
        <Column title="Project name" dataIndex="name" key="name" />
        <Column
          title="URL"
          dataIndex="url"
          key="url"
          render={(data, { name }) => (
            <a href={data} target="_blank" rel="noreferrer">
              See {name} website
            </a>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_, data) => {
            return (
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() => {
                    handleEdit(data?._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    handleDelete(data?._id);
                  }}
                >
                  Delete
                </Button>
              </Space>
            );
          }}
        />
      </Table>

      {total > PORTFOLIOS_LIMIT ? (
        <Pagination
          total={total}
          pageSize={PORTFOLIOS_LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}

      <Modal
        title={selected === null ? `Add new portfolio` : "Save portfolio"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add portfolio" : "Save portfolio"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="Portfolios"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader upload__photo"
            showUploadList={false}
            onChange={handlePhoto}
          >
            {photo ? (
              <img
                src={getImage(photo)}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              <div>
                {loadingPhoto ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>

          <Form.Item
            label="Name"
            name="name"
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
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input addonBefore={selectBefore} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfoliosPage;
