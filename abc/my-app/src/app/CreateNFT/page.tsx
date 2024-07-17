/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  Upload,
  Select,
  Input,
  Button,
  Typography,
  Card,
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

interface Token {
  id: number;
  name: string;
  image: string;
  subCategoryId: number;
}

const CreateNFTPage = () => {
  const [collection, setCollection] = useState("");
  const [name, setName] = useState("");
  const [supply, setSupply] = useState("");
  const [description, setDescription] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [dataToken, setDataToken] = useState<Token[]>([]);
  const router = useRouter();
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:3333/tokens/${userID}`)
        .then((response) => {
          setDataToken(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userID]);

  useEffect(() => {
    if (collection && name && supply && description && file) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [collection, name, supply, description, file]);

  const handleFileChange = (info: any) => {
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  const handleSubmit = () => {
    if (!file) {
      message.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("token_id", collection);
    formData.append("name", name);
    formData.append("total_supply", supply);
    formData.append("description", description);
    formData.append("image", file.name);
    axios
      .post(`http://localhost:3333/sub-tokens/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message.success("Token created successfully!");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to create token.");
      });
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "45%", height: "60vh" }}>
          <Title level={1} style={{ color: "#fff" }}>
            Create an NFT
          </Title>
          <Text
            style={{ color: "#fff", display: "block", marginBottom: "20px" }}
          >
            Once your item is minted you will not be able to change any of its
            information.
          </Text>
          <Upload.Dragger
            name="files"
            multiple={false}
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              padding: "20px",
              border: "1px dashed #fff",
              marginBottom: "20px",
            }}
            onChange={handleFileChange}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ color: "#fff", fontSize: "24px" }} />
            </p>
            <p className="ant-upload-text" style={{ color: "#fff" }}>
              Drag and drop media
            </p>
            <p className="ant-upload-hint" style={{ color: "#fff" }}>
              JPG, PNG, GIF, SVG, MP4. Max size: 50MB
            </p>
          </Upload.Dragger>
        </div>
        <div style={{ width: "50%", height: "70%" }}>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            bodyStyle={{ color: "#fff" }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              Collection
            </Title>
            <Select
              placeholder="Choose a collection"
              style={{ width: "100%" }}
              onChange={(value) => setCollection(value)}
              options={dataToken.map((token) => ({
                label: token.name,
                value: token.id,
              }))}
            />
            <Button
              type="primary"
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#555",
                border: "none",
              }}
              icon={<PlusOutlined />}
              onClick={() => router.push("/CreateNewToken")}
            >
              Create a new collection
            </Button>
          </Card>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            bodyStyle={{ color: "#fff" }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              Name
            </Title>
            <Input
              placeholder="Name your NFT"
              style={{ width: "100%" }}
              onChange={(e) => setName(e.target.value)}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            bodyStyle={{ color: "#fff" }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              Supply
            </Title>
            <Input
              placeholder="1"
              style={{ width: "100%" }}
              onChange={(e) => setSupply(e.target.value)}
            />
          </Card>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
            bodyStyle={{ color: "#fff" }}
          >
            <Title level={4} style={{ color: "#fff" }}>
              Description
            </Title>
            <TextArea
              placeholder="Enter a description"
              rows={4}
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Card>
          <Button
            type="primary"
            style={{ width: "30%" }}
            disabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateNFTPage;
