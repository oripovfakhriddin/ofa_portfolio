import { Fragment, useState } from "react";

import "./style.scss";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import { EXPERIENCES_LIMIT } from "../../../constants";
import TextArea from "antd/es/input/TextArea";
import {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useEditExperienceMutation,
  useGetExperienceMutation,
  useGetExperiencesQuery,
} from "../../../redux/queries/experiences";
import { changeDate } from "../../../utils";
import dayjs from "dayjs";
const ExperiencesPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const {
    data: { experiences, total } = { experiences: [], total: 0 },
    isFetching,
    refetch,
  } = useGetExperiencesQuery({ page, search });

  const [getExperience] = useGetExperienceMutation();
  const [addExperience] = useAddExperienceMutation();
  const [editExperience] = useEditExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const showModal = () => {
    setSelected(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      setIsModalLoading(true);
      const values = await form.validateFields();
      const start = values?.startDate.toISOString().split("T")[0];
      const end = values?.endDate.toISOString().split("T")[0];
      const newValues = { ...values, endDate: end, startDate: start };
      if (selected === null) {
        await addExperience(newValues);
      } else {
        await editExperience({ id: selected, body: newValues });
      }
      refetch();
      setIsModalOpen(false);
      form.resetFields();
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setSelected(id);
    const { data } = await getExperience(id);
    setIsModalOpen(true);
    const end = dayjs(data?.endDate);
    const start = dayjs(data?.startDate);
    const newData = { ...data, startDate: start, endDate: end };
    form.setFieldsValue(newData);
  };

  const handleDelete = async (id) => {
    await deleteExperience(id);
    refetch();
    setPage(1);
  };

  return (
    <Fragment>
      <Flex
        justify="space-between"
        gap={36}
        className="experience__header__box"
        align="center"
      >
        <h1 className="experience__title">Experiences</h1>
        <Input
          className="search__experience"
          type="text"
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button onClick={showModal} type="primary">
          Add experiences
        </Button>
      </Flex>
      <Flex className="experience__search__box">
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "100%", flexGrow: 1 }}
          placeholder="Searching..."
        />
      </Flex>
      <Flex className="experience__count__box">
        <p>All Experiences count: {total}</p>
      </Flex>

      <Table
        scroll={{ x: 1020 }}
        loading={isFetching}
        pagination={false}
        dataSource={experiences}
      >
        <ColumnGroup title="Full name">
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
        <Column title="Work name" dataIndex="workName" key="workName" />
        <Column
          title="Company name"
          dataIndex="companyName"
          key="companyName"
        />
        <Column
          title="Start date"
          dataIndex="startDate"
          key="startDate"
          render={(data) => {
            return <time>{changeDate(data)}</time>;
          }}
        />
        <Column
          title="End date"
          dataIndex="endDate"
          key="endDate"
          render={(data) => {
            return <time>{changeDate(data)}</time>;
          }}
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
                    Modal.confirm({
                      title: "Do you want to delete this experiences?",
                      onOk: () => {
                        handleDelete(data?._id);
                      },
                    });
                  }}
                >
                  Delete
                </Button>
              </Space>
            );
          }}
        />
      </Table>

      {total > EXPERIENCES_LIMIT ? (
        <Pagination
          total={total}
          pageSize={EXPERIENCES_LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}

      <Modal
        title={selected === null ? `Add new experiences` : "Save experiences"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experiences" : "Save experiences"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="Experiences"
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
            label="Work name"
            name="workName"
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
            label="Company name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Flex justify="space-between" gap={36} align="center">
            <Form.Item
              label="Start date"
              name="startDate"
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
              label="Finish date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Flex>
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

export default ExperiencesPage;
