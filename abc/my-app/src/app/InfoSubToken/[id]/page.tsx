/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  List,
  Menu,
  theme,
  Image,
  Divider,
  Input,
  message,
  Modal,
} from "antd";
import { ethers } from "ethers"; // Chú ý cách import này
import "../../../css/infoToken.css";
import type { ConfigProviderProps } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Content, Footer } = Layout;
type SizeType = ConfigProviderProps["componentSize"];

interface SubToken {
  id: number;
  name: string;
  image: string;
  price: number;
  tokenId: number;
  user_id: string; // Địa chỉ ví của người dùng
}

const InfoToken: React.FC = (props: any) => {
  const [modal2Open, setModal2Open] = useState(false);
  const { params } = props;
  const id = params.id;
  const [subToken, setSubToken] = useState<SubToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [ownerName, setOwenerName] = useState("");

  const userID = localStorage.getItem("userID");
  const ownerID = localStorage.getItem("ownerID");
  useEffect(() => {
    if (id) {
      const getOwnerName = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3333/users/${ownerID}`
          );
          setOwenerName(response.data.fullName);
        } catch (error) {
          message.error("Error fetching sub-token");
        }
      };
      getOwnerName();
      const fetchSubToken = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3333/sub-tokens/${id}`
          );
          setSubToken(response.data[0]);
        } catch (error) {
          message.error("Error fetching sub-token");
        } finally {
          setLoading(false);
        }
      };
      fetchSubToken();
    } else {
      setLoading(false);
    }
  }, [id]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>("large");

  const handlePurchase = async () => {
    if (!subToken) return;

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // get address of user's wallet
      const address = await (await signer).getAddress();
      setWalletAddress(address);
      const transactionParameters = {
        to: address, // Địa chỉ ví nhận MATIC
        value: ethers.parseUnits(subToken.price.toString(), "ether"), // Số MATIC cần gửi
      };

      try {
        const tx = await (await signer).sendTransaction(transactionParameters);
        message.success("Transaction sent! Check your wallet.");
        setModal2Open(false);
        message.success(subToken.price + " MATIC purchased successfully!");
        const transactionData = {
          buyerId: userID,
          sellerId: ownerID,
          tokenId: subToken.tokenId,
          amount: 1,
          price: subToken.price,
        };

        await axios.post("http://localhost:3333/transaction/", transactionData);
      } catch (error) {
        console.error("Error sending transaction: ", error);
        message.error("Failed to send transaction.");
      }
    } else {
      message.error(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };

  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : subToken ? (
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="col-md-6 item-image">
                <Image className="item-image" src={subToken.image} />
              </div>
              <div>
                <div>
                  <h1 className="d-flex d-name">
                    Product Name: <strong>{subToken.name}</strong>
                  </h1>
                </div>
                <div className="col-md-6 item-details">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="d-flex">
                      <strong>Owner: {ownerName}</strong>
                    </p>
                    <div
                      className="d-flex flex-column"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span>Price: &nbsp; &nbsp;</span>
                      <h2>{subToken.price} MATIC</h2>
                    </div>
                    Max price per listing:{" "}
                    <Input style={{ width: 200 }} placeholder="" />
                  </div>
                  <Button
                    type="primary"
                    icon={<ShoppingOutlined />}
                    size={size}
                    onClick={() => setModal2Open(true)}
                  >
                    Buy now
                  </Button>
                  <Modal
                    footer={[
                      <Button key="back" onClick={handlePurchase}>
                        <strong>Purchase</strong>
                      </Button>,
                      <Button key="back" onClick={() => setModal2Open(false)}>
                        Close
                      </Button>,
                    ]}
                    title="Approval Purchase"
                    centered
                    open={modal2Open}
                  >
                    <div style={{ display: "flex" }}>
                      <Image
                        width={100}
                        className="item-image"
                        src={subToken.image}
                      />
                      <div style={{ marginLeft: 20 }}>
                        <br />
                        <h1>
                          <strong>{subToken.name}</strong>
                        </h1>
                        <h1>{subToken.price} MATIC</h1>
                      </div>
                    </div>
                    <p>Go to your wallet</p>
                    <p>
                      You'll be asked to approve this purchase from your wallet.
                    </p>
                  </Modal>
                  &nbsp;&nbsp;
                  <Button size={size}>Make Offer</Button>
                </div>
              </div>
            </div>
          ) : (
            <p>Không tìm thấy dữ liệu.</p>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default InfoToken;
