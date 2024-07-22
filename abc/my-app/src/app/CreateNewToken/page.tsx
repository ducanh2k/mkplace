/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
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
  Select,
  message,
  Modal,
  Steps,
} from "antd";
import { UploadOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import axios from "axios";
import { ethers } from "ethers";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;

const contractABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "get",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const contractBytecode =
  "0x6080604052348015600f57600080fd5b506101e88061001f6000396000f3fe608060405260043610603f5760003560e01c80632a1afcd914604457806360fe47b114606f575b600080fd5b348015604f57600080fd5b50605c60048036036020811015606457600080fd5b50356099565b604080519115158252519081900360200190f35b348015607a57600080fd5b50608160bd565b60408051918252519081900360200190f35b60005481565b60008054905090565b6000548156fea26469706673582212205f6d9e63f32719df0282ef1d6dd162ae09f1d5d32a4edfa70e774d5d7c98a1e264736f6c63430006020033";

interface SubCategory {
  id: number;
  name: string;
}

const CreateNFTPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [contractName, setContractName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [blockchain, setBlockchain] = useState("Polygon");
  const [isDeploying, setIsDeploying] = useState(false);

  const [dataSubCate, setDataSubCate] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[] | []>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [dataCategory, setDataCategory] = useState("");
  const [dataToken, setDataToken] = useState<SubCategory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories")
      .then((response) => {
        setDataToken(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (file && contractName && tokenSymbol && dataCategory && dataSubCate) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [file, contractName, tokenSymbol, dataCategory, dataSubCate]);

  const handleUpload = (info: UploadChangeParam) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setFile(info.file.originFileObj as File);
    }
  };

  const handleContractNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContractName(value);
    if (value) {
      const words = value.split(" ");
      const acronym = words.map((word) => word.charAt(0)).join("");
      setTokenSymbol(acronym.toUpperCase());
    } else {
      setTokenSymbol("");
    }
  };

  const onCategoryChange = async (value: string) => {
    setDataCategory(value);
    await axios
      .post(`http://localhost:3333/sub-categorys/${value}`)
      .then((response) => {
        setSubCategories(response.data);
        setIsSubCategoryVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async () => {
    if (!file) {
      message.error("Please upload a file.");
      return;
    }

    setIsModalVisible(true);
    setCurrentStep(0);
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        const tx = await (
          await signer
        ).sendTransaction({
          to: address,
          value: ethers.parseEther("0.0000"),
        });
        await tx.wait();

        // deploy an contract
        // setIsDeploying(true);
        // const factory = new ethers.ContractFactory(
        //   contractABI,
        //   contractBytecode,
        //   await signer
        // );
        // const contract = await factory.deploy(
        //   contractName,
        //   tokenSymbol,
        //   dataCategory
        // );
        // await contract.deploymentTransaction();
        // message.success(
        //   `Contract deployed at address: ${contract.getAddress()}`
        // );
        // setIsDeploying(false);

        setCurrentStep(1);

        const formData = new FormData();
        formData.append("sub_category_id", dataSubCate);
        formData.append("name", contractName);
        formData.append("symbol", tokenSymbol);
        formData.append("image", file);
        formData.append("user_id", String(userID));

        await axios.post(`http://localhost:3333/tokens/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setCurrentStep(2);
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
      <Content style={{ padding: "50px" }}>
        <Title level={1} style={{ color: "#fff" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              cursor: "pointer",
            }}
            onClick={() => window.history.back()}
          >
            <CaretLeftOutlined style={{ fontSize: "24px", color: "#fff" }} />
            Create an NFT
          </div>
        </Title>
        <Text style={{ color: "#fff", display: "block", marginBottom: "20px" }}>
          You'll need to deploy an ERC-1155 contract on the blockchain to create
          a collection for your NFT.
        </Text>
        <Text style={{ color: "#fff", display: "block", marginBottom: "40px" }}>
          Once your item is minted you will not be able to change any of its
          information.
        </Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
              color: "#fff",
              width: "40%",
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
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="logo"
                style={{ maxWidth: "100%", marginTop: "10px" }}
              />
            )}
          </Card>
          <div>
            <Card
              style={{
                backgroundColor: "#333",
                borderRadius: "10px",
                marginBottom: "20px",
                color: "#fff",
                width: "150%",
              }}
            >
              <Title level={4} style={{ color: "#fff" }}>
                Contract name
              </Title>
              <Input
                placeholder="Contract name"
                style={{ width: "100%" }}
                onChange={handleContractNameChange}
              />
            </Card>
            <Card
              style={{
                backgroundColor: "#333",
                borderRadius: "10px",
                marginBottom: "20px",
                color: "#fff",
                width: "150%",
              }}
            >
              <Title level={4} style={{ color: "#fff" }}>
                Token symbol
              </Title>
              <Input
                placeholder="Token symbol"
                style={{ width: "100%" }}
                value={tokenSymbol}
                readOnly
              />
            </Card>
          </div>
          <div>
            <Card
              style={{
                backgroundColor: "#333",
                borderRadius: "10px",
                marginBottom: "20px",
                width: "fit-content",
                height: "fit-content",
              }}
              bodyStyle={{ color: "#fff" }}
            >
              <Title level={4} style={{ color: "#fff" }}>
                Category
              </Title>
              <Select
                placeholder="Choose a Category"
                style={{ width: "100%" }}
                onChange={(value) => onCategoryChange(value)}
                options={dataToken.map((token) => ({
                  label: token.name,
                  value: token.id,
                }))}
              />
            </Card>
            {isSubCategoryVisible && (
              <Card
                style={{
                  backgroundColor: "#333",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  width: "fit-content",
                  height: "fit-content",
                }}
                bodyStyle={{ color: "#fff" }}
              >
                <Title level={4} style={{ color: "#fff" }}>
                  Sub-Category
                </Title>
                <Select
                  placeholder="Choose a sub-category"
                  style={{ width: "100%" }}
                  onChange={(value) => setDataSubCate(value)}
                  options={subCategories.map((token) => ({
                    label: token.name,
                    value: token.id,
                  }))}
                />
              </Card>
            )}
          </div>
        </div>
        <div>
          <Card
            style={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "20px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                    Estimated cost to deploy contract: 5,68 US$
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
            style={{
              width: "15%",
            }}
            disabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Continue
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
          <Step title="Go to your wallet to finish deploying your contract" />
          <Step title="Deploying your contract" />
        </Steps>
      </Modal>
    </Layout>
  );
};

export default CreateNFTPage;
