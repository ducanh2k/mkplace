/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Layout, Card, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import Router, { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title, Text } = Typography;

const CreatePage = () => {
  const router = useRouter();
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <LeftOutlined style={{ fontSize: "24px", color: "#fff" }} />
          <Title level={1} style={{ color: "#fff" }}>
            Create
          </Title>
          <Card
            hoverable
            style={{
              width: "80%",
              marginBottom: "20px",
              backgroundColor: "#333",
              borderRadius: "10px",
            }}
            bodyStyle={{ color: "#fff" }}
          >
            <Title level={3} style={{ color: "#fff" }}>
              Drop
            </Title>
            <Text style={{ color: "#fff" }}>
              A drop is the release of a new project. This usually happens on a
              specified date and time. Items will be revealed after they have
              been purchased.
            </Text>
          </Card>
          <Card
            hoverable
            style={{
              width: "80%",
              backgroundColor: "#333",
              borderRadius: "10px",
            }}
            bodyStyle={{ color: "#fff" }}
            onClick={() => {
              router.push("/CreateNFT");
            }}
          >
            <Title level={3} style={{ color: "#fff" }}>
              Collection or item
            </Title>
            <Text style={{ color: "#fff" }}>
              Create a new NFT collection or add an NFT to an existing one. Your
              items will display immediately. List for sale when you're ready.
            </Text>
          </Card>
        </div>
        <div style={{ width: "45%" }}>
          <img
            src="https://res.cloudinary.com/dhachayhw/image/upload/v1721191278/Faker_Legend_efxf0d.jpg"
            alt=""
            style={{
              width: "100%",
              height: "70%",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #fff",
              boxShadow: "0 0 10px #fff",
              marginTop: "70px",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default CreatePage;
