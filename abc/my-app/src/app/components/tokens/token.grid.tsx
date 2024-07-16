"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, message } from "antd";
import { IToken } from "@/types/tokens";
import axios from "axios";

const { Meta } = Card;

interface ITokenProps {
  tokens: IToken[] | [];
}

const TokenGrid = (props: ITokenProps) => {
  const {  tokens } = props;
  const [subCategories, setSubCategories] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const fetchSubCategories = async () => {
      const fetchedSubCategories: { [key: number]: string } = {};
      const promises = tokens.map(async (token) => {
        if (token.subCategoryId) {
          try {
            const response = await axios.get(
              `http://localhost:3333/sub-categorys/${token.subCategoryId}`
            );
            fetchedSubCategories[token.subCategoryId] = response.data.name;
          } catch (error) {
            console.error(
              `Error fetching sub-category ${token.subCategoryId}:`,
              error
            );
          }
        }
      });
      await Promise.all(promises);
      setSubCategories(fetchedSubCategories);
    };

    fetchSubCategories();
  }, [tokens]);

  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={[16, 16]}>
        {tokens.map((token, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card hoverable cover={<img alt={token.name} src={token.image} />}>
              <Meta
                title={token.name}
                description={
                  <>
                    <div>Price: {token.price}</div>
                    <div>
                      Sub-Category:{" "}
                      {subCategories[token.subCategoryId] || "Loading..."}
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TokenGrid;
