"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  List,
  Menu,
  theme,
  Image,
  Flex,
  Divider,
  Input,
} from "antd";
import "../../css/infoToken.css";
import type { DescriptionsProps, ConfigProviderProps } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
type SizeType = ConfigProviderProps["componentSize"];
const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

const InfoToken: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [size, setSize] = useState<SizeType>("large"); // default is 'middle'
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
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="col-md-6 item-image">
              <Image
                className="item-image"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <div>
              <div>
                <h1 className="d-flex d-name">
                  Product Name: <strong>Wood</strong>
                </h1>
              </div>
              <div className="col-md-6 item-details">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="d-flex">
                    {" "}
                    <strong>Owner: Duc Anh</strong>
                  </p>
                  <div
                    className="d-flex flex-column"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>Price: &nbsp; &nbsp;</span>
                    <h2>0,0069 MATIC</h2>
                  </div>
                  Max price per listing: <Input style={{ width: 200 }} placeholder="" />
                </div>
                <Button type="primary" icon={<ShoppingOutlined />} size={size}>
                  Buy now
                </Button>
                &nbsp;&nbsp;
                <Button size={size}>Make Offer</Button>
                {/* <div className="price-history mt-4">
                  <h3>Price History</h3>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default InfoToken;
