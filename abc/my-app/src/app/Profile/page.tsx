"use client";
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import {
  Layout,
  Tabs,
  Card,
  Form,
  Input,
  Button,
  List,
  Avatar,
  message,
  Modal,
  Space,
} from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TabPane } = Tabs;

interface User {
  id: number;
  name: string;
  email: string;
}

interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  symbol: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingCollection, setIsEditingCollection] = useState(false);
  const [form] = Form.useForm();
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );

  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  useEffect(() => {
    // Fetch user information
    axios
      .get(`http://localhost:3333/users/${userID}`)
      .then((response) => {
        setUser(response.data);
        form.setFieldsValue(response.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch user information");
      });

    // Fetch user collections
    axios
      .get(`http://localhost:3333/tokens/${userID}`)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch collections");
      });
  }, [userID, form]);

  const handleEditUser = () => {
    setIsEditingUser(true);
  };


  const handleSaveUser = (values: User) => {
    axios
      .put(`http://localhost:3333/users/${userID}`, values)
      .then(() => {
        setUser(values);
        setIsEditingUser(false);
        message.success("User information updated successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update user information");
      });
  };


  const handleEditCollection = (collection: Collection) => {
    setEditingCollection(collection);
    form.setFieldsValue(collection);
    setIsEditingCollection(true);
  };

  const handleDeleteCollection = (collectionId: number) => {
    axios
      .delete(`http://localhost:3333/tokens/${collectionId}`)
      .then(() => {
        setCollections(
          collections.filter((collection) => collection.id !== collectionId)
        );
        message.success("Collection deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to delete collection");
      });
  };

  const handleSaveCollection = (values: Collection) => {
    if (editingCollection) {
      axios
        .put(
          `http://localhost:3333/tokens/${editingCollection.id}`,
          values
        )
        .then(() => {
          setCollections(
            collections.map((collection) =>
              collection.id === editingCollection.id
                ? { ...collection, ...values }
                : collection
            )
          );
          setEditingCollection(null);
          setIsEditingCollection(false);
          message.success("Collection updated successfully");
        })
        .catch((error) => {
          console.error(error);
          message.error("Failed to update collection");
        });
    }
  };

  const handleFormFinish = (values: any) => {
    if (isEditingUser) {
      handleSaveUser(values as User);
    } else if (isEditingCollection) {
      handleSaveCollection(values as Collection);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: "50px" }}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Collections" key="1">
              <List
                itemLayout="horizontal"
                dataSource={collections}
                renderItem={(collection) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditCollection(collection)}
                      >
                        Edit
                      </Button>,
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteCollection(collection.id)}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={collection.image} />}
                      title={collection.name}
                      description={collection.price}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="User Info" key="2">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleFormFinish}
                initialValues={user || undefined}
              >
                <Form.Item
                  name="fullName"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input disabled={!isEditingUser} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input disabled={!isEditingUser} />
                </Form.Item>
                <Form.Item>
                  {isEditingUser ? (
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button onClick={() => setIsEditingUser(false)}>
                        Cancel
                      </Button>
                    </Space>
                  ) : (
                    <Button
                      type="primary"
                      onClick={handleEditUser}
                      style={{ marginRight: "8px" }}
                    >
                      Edit
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Content>
      <Modal
        title="Edit Collection"
        visible={isEditingCollection}
        onCancel={() => setIsEditingCollection(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveCollection}
          initialValues={editingCollection || undefined}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input collection name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input collection price!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="symbol"
            label="Symbol"
            rules={[
              {
                required: true,
                message: "Please input collection symbol!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => setIsEditingCollection(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
