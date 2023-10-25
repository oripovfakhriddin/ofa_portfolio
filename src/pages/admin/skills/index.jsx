import { Fragment, useEffect, useState } from "react";
import "./style.scss";
import Column from "antd/es/table/Column";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  deleteSkill,
  editSkill,
  getSkill,
  getSkills,
  skillName,
} from "../../../redux/slice/skill";
import { SKILLS_LIMIT } from "../../../constants";
const SkillsPage = () => {
  const { skills, total, loading, isModalLoading } = useSelector(
    (state) => state[skillName]
  );
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callBack, setCallBack] = useState();

  const dispatch = useDispatch();

  const reFetch = () => {
    setCallBack(!callBack);
  };

  useEffect(() => {
    dispatch(getSkills({ search, page }));
  }, [dispatch, search, page, callBack]);
  const newSkills = skills?.map((el) => ({ ...el, key: el?._id }));

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const showModal = () => {
    setIsModalOpen(true);
    setSelected(null);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (selected === null) {
      await dispatch(addSkill(values));
    } else {
      await dispatch(editSkill({ id: selected, values }));
    }
    reFetch();
    setIsModalOpen(false);
    form.resetFields();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (id) => {
    setSelected(id);
    setIsModalOpen(true);
    const { payload } = await dispatch(getSkill(id));
    form.setFieldsValue(payload);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteSkill(id));
    setPage(1);
    reFetch();
  };

  return (
    <Fragment>
      <Flex justify="space-between" gap={36} align="center">
        <h1>Skills ({total})</h1>
        <Input
          value={search}
          name="search"
          onChange={handleSearch}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button onClick={showModal} type="dashed">
          Add skill
        </Button>
      </Flex>
      <Table
        scroll={{ x: 800 }}
        loading={loading}
        pagination={false}
        dataSource={newSkills}
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
        <Column title="Skill" dataIndex="name" key="name" />
        <Column title="Percent" dataIndex="percent" key="percent" />

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
      {total > SKILLS_LIMIT ? (
        <Pagination
          total={total}
          pageSize={SKILLS_LIMIT}
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
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
