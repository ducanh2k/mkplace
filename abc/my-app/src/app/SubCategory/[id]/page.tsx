"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Card,
  Col,
  Layout,
  message,
  Row,
  Divider,
  List,
  Typography,
} from "antd";
import Meta from "antd/es/card/Meta";
import "../../../css/SubCategoryPage.css";

const { Content } = Layout;

interface Token {
  id: number;
  name: string;
  price: string;
  image: string;
  subCategoryId: number;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  tokens: Token[];
}

const SubCategoryPage = (props: any) => {
  const { params } = props;
  const router = useRouter();
  const id = params.id;
  const [subCategory, setSubCategory] = useState<SubCategory[]>([]);

  useEffect(() => {
    if (id) {
      const fetchSubCategory = async () => {
        try {
          const response = await axios.post(
            `http://localhost:3333/sub-categorys/${id}`
          );
          setSubCategory(response.data);
        } catch (error) {
          console.error("Error fetching sub-category:", error);
        }
      };
      fetchSubCategory();
    }
  }, [id]);

  return (
    <Content
      style={{ padding: "0 48px", display: "flex", flexDirection: "column" }}
    >
      <List
        size="large"
        bordered
        dataSource={subCategory}
        renderItem={(itemSubCategory: SubCategory) => (
          <List.Item>
            {itemSubCategory.name}
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={itemSubCategory.tokens}
              renderItem={(item: Token) => (
                <List.Item>
                  <Card
                    onClick={() => router.push(`/SubToken/${item.id}`)}
                    style={{ cursor: "pointer" }}
                    cover={<img alt={item.name} src={item.image} />}
                    className="hover-card"
                  >
                    {item.name}
                  </Card>
                </List.Item>
              )}
            />
          </List.Item>
        )}
      />
    </Content>
  );
};

export default SubCategoryPage;
