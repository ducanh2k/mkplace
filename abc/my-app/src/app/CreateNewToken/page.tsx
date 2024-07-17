/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState, useEffect } from "react";
import {
  Layout,
  Upload,
  Input,
  Button,
  Typography,
  Card,
  Radio,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

const { Content } = Layout;
const { Title, Text } = Typography;

const CreateNFTPage = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [contractName, setContractName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [blockchain, setBlockchain] = useState("Polygon");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (logo && contractName && tokenSymbol && blockchain) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [logo, contractName, tokenSymbol, blockchain]);

  const handleUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      //   setLogo(info.file.originFileObj);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Content
        style={{
          padding: "50px",
        }}
      >
        <Title level={1} style={{ color: "#fff" }}>
          Create an NFT
        </Title>
        <Text style={{ color: "#fff", display: "block", marginBottom: "20px" }}>
          You'll need to deploy an ERC-1155 contract on the blockchain to create
          a collection for your NFT.
        </Text>
        <Text style={{ color: "#fff", display: "block", marginBottom: "40px" }}>
          Once your item is minted you will not be able to change any of its
          information.
        </Text>

        <Card
          style={{
            backgroundColor: "#333",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <Title level={4} style={{ color: "#fff" }}>
            Logo image <UploadOutlined />
          </Title>
          <Upload.Dragger
            name="files"
            multiple={false}
            onChange={handleUpload}
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              padding: "20px",
              border: "1px dashed #fff",
              marginBottom: "20px",
              color: "#fff",
            }}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ color: "#fff", fontSize: "24px" }} />
            </p>
            <p className="ant-upload-text" style={{ color: "#fff" }}>
              Drag and drop or click to upload
            </p>
          </Upload.Dragger>
          {logo && (
            <img
              src={URL.createObjectURL(logo)}
              alt="logo"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </Card>

        <Card
          style={{
            backgroundColor: "#333",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <Title level={4} style={{ color: "#fff" }}>
            Contract name
          </Title>
          <Input
            placeholder="Contract name"
            style={{ width: "100%" }}
            onChange={(e) => setContractName(e.target.value)}
          />
        </Card>

        <Card
          style={{
            backgroundColor: "#333",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <Title level={4} style={{ color: "#fff" }}>
            Token symbol
          </Title>
          <Input
            placeholder="Token symbol"
            style={{ width: "100%" }}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </Card>

        <Card
          style={{
            backgroundColor: "#333",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          <Title level={4} style={{ color: "#fff" }}>
            Blockchain
          </Title>
          <Radio.Group
            onChange={(e) => setBlockchain(e.target.value)}
            value={blockchain}
            style={{ color: "#fff" }}
          >
            <Space direction="vertical">
              <Radio value="Ethereum" style={{ color: "#fff" }}>
                <Card
                  style={{
                    backgroundColor: "#444",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Ethereum <br />
                  Estimated cost to deploy contract: 12,68 US$
                </Card>
              </Radio>
              <Radio value="Base" style={{ color: "#fff" }}>
                <Card
                  style={{
                    backgroundColor: "#444",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Base <br />
                  Estimated cost to deploy contract: 0,02 US$
                </Card>
              </Radio>
              <Radio value="Polygon" style={{ color: "#fff" }}>
                <Card
                  style={{
                    backgroundColor: "#444",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  Polygon <br />
                  Estimated cost to deploy contract: 0,01 US$
                </Card>
              </Radio>
            </Space>
          </Radio.Group>
        </Card>

        <Button
          type="primary"
          style={{ width: "100%" }}
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </Content>
    </Layout>
  );
};

export default CreateNFTPage;
