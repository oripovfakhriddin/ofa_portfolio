import { Fragment, useEffect, useState } from "react";
import "./style.scss";
import {
  Space,
  Table,
  Form,
  Flex,
  Input,
  Button,
  Pagination,
  Modal,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  deleteEducation,
  editEducation,
  educationName,
  getEducation,
  getEducations,
} from "../../../redux/slice/education";
import { EDUCATIONS_LIMIT } from "../../../constants";
import { changeDate } from "../../../utils";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const EducationPage = () => {
  const { educations, total, loading, isModalLoading } = useSelector(
    (state) => state[educationName]
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callBack, setCallBack] = useState();

  const reFetch = () => {
    setCallBack(!callBack);
  };

  useEffect(() => {
    dispatch(getEducations({ search, page }));
  }, [dispatch, search, page, callBack]);
  const newEducations = educations.map((el) => ({ ...el, key: el?._id }));

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setSelected(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const end = values.endDate.toISOString().split("T")[0];
    const start = values.startDate.toISOString().split("T")[0];
    const newValues = { ...values, endDate: end, startDate: start };
    if (selected === null) {
      await dispatch(addEducation(newValues));
    } else {
      await dispatch(editEducation({ id: selected, newValues }));
    }
    reFetch();
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEducation(id));
    reFetch();
  };

  const handleEdit = async (id) => {
    setIsModalOpen(true);
    setSelected(id);
    const { payload } = await dispatch(getEducation(id));
    const start = dayjs(payload?.startDate);
    const end = dayjs(payload?.endDate);
    const newPayload = { ...payload, endDate: end, startDate: start };
    form.setFieldsValue(newPayload);
  };

  const columns = [
    {
      title: "Full name",
      dataIndex: "user",
      key: "name",
      render: (data) => (
        <p>
          {data?.firstName} {data?.lastName}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => <time>{changeDate(date)}</time>,
    },
    {
      title: "Finish date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => <time>{changeDate(date)}</time>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button
            onClick={() => {
              handleEdit(data?._id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(data?._id);
            }}
            danger
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Flex justify="space-between" gap={36} align="center">
        <h1>Education ({total})</h1>
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button onClick={showModal} type="dashed">
          Add education
        </Button>
      </Flex>
      <Table
        pagination={false}
        columns={columns}
        loading={loading}
        dataSource={newEducations}
        scroll={{ x: 1000 }}
      />
      {total > EDUCATIONS_LIMIT ? (
        <Pagination
          total={total}
          pageSize={EDUCATIONS_LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title={selected === null ? `Add new skill` : "Save skill"}
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="category"
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
            label="Leve"
            name="level"
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
