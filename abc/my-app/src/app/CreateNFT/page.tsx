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
  Modal,
  Steps,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ethers } from "ethers";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

interface SubToken {
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
  const [dataToken, setDataToken] = useState<SubToken[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file.");
      return;
    }

    setIsModalVisible(true);
    setCurrentStep(0);

    try {
      // Step 1: Uploading to decentralized server
      setCurrentStep(1);

      if (window.ethereum) {
        // Step 2: Go to your wallet to approve this transaction
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        const tx = await (
          await signer
        ).sendTransaction({
          to: address, // Replace with your contract address
          value: ethers.parseEther("0.0000"), // Transaction value
        });
        await tx.wait();
        setCurrentStep(2);

        // Step 3: Minting your item (Saving token to the API)
        const formData = new FormData();
        formData.append("token_id", collection);
        formData.append("name", name);
        formData.append("total_supply", supply);
        formData.append("description", description);
        formData.append("image", file);

        await axios.post(`http://localhost:3333/sub-tokens/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setCurrentStep(3);
        message.success("Token created successfully!");
      } else {
        message.error("MetaMask not detected.");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to create token or send transaction.");
    }
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
      <Modal
        title="Creating your item"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Steps current={currentStep} direction="vertical">
          <Step title="Uploading to decentralized server" />
          <Step title="Go to your wallet to approve this transaction" />
          <Step title="Minting your item" />
        </Steps>
      </Modal>
    </Layout>
  );
};

export default CreateNFTPage;
