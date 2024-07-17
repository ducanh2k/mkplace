"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Row, Col, Card, Button, Layout, Menu, theme, message } from "antd";
import "../../../css/SubToken.css";
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

interface SubToken {
  id: number;
  name: string;
  image: string;
  price: number;
  token_id: number;
}

const App: React.FC = (props: any) => {
  const { params } = props;
  const router = useRouter();
  const id = params.id;
  const [subToken, setSubToken] = useState<SubToken[]>([]);
  const [cart, setCart] = useState<SubToken[]>([]);

  useEffect(() => {
    if (id) {
      const fetchSubToken = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3333/sub-tokens/" + id
          );
          setSubToken(response.data);
        } catch (error) {
          console.error("Error fetching sub-token:", error);
        }
      };
      fetchSubToken();
    }
  }, [id]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const addToCart = (item: SubToken) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(
      (cartItem: SubToken) => cartItem.id === item.id
    );
    if (existingItem) {
      message.warning(`${item.name} is already in your cart!`);
    } else {
      setCart([...cart, item]);
      const updateCart = [...cart, item];
      message.success(`${item.name} is added to your cart!`);
      localStorage.setItem("cart", JSON.stringify(updateCart));
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          
        >
          <div style={{ padding: "30px" }}>
            <Row gutter={[16, 16]}>
              {subToken.map((sub_token, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <Card
                    hoverable
                    cover={<img alt={sub_token.name} src={sub_token.image} />}
                    className="hover-card"
                    onClick={() => router.push('/InfoSubToken/' + sub_token.id)}
                  >
                    <Meta
                      title={sub_token.name}
                      description={
                        <>
                          <div>Price: {sub_token.price} MATIC</div>
                        </>
                      }
                    />
                    <Button
                      className="add-to-cart"
                      onClick={() => addToCart(sub_token)}
                    >
                      Add to cart
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
