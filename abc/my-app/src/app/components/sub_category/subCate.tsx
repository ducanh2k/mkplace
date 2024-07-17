"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ISubCategory } from "@/types/sub_category";

const { Content } = Layout;

interface ISubCategoryProp {
  sub_category: ISubCategory[] | [];
}

const ListSubCategories: React.FC<ISubCategoryProp> = ({ sub_category }) => {
  const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{ padding: "0 48px", display: "flex" }}
    >
      <Breadcrumb
        style={{ margin: "16px 0", cursor: "pointer" }}
        className="hover:bg-gray-700"
      >
        All &nbsp; &nbsp;
      </Breadcrumb>
      <Breadcrumb style={{ margin: "16px 0", cursor: "pointer" }}>
        {sub_category
          .slice()
          .reverse()
          .map((cate) => (
            <Breadcrumb.Item key={cate.id}>{cate.name}</Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </Content>
  );
};

const ParentComponent: React.FC = () => {
  const [sub_categories, setSubCategories] = useState<ISubCategory[]>([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch("http://localhost:3333/sub-category");
        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error("Error fetching sub-categories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <div>
      <ListSubCategories sub_category={sub_categories} />
    </div>
  );
};

export default ParentComponent;
