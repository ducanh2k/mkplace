"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ICategory from "@/types/categories";
import { useRouter } from "next/navigation";

const { Content } = Layout;

interface ICategoryProp {
  category: ICategory[] | [];
}

const ListCategories: React.FC<ICategoryProp> = ({ category }) => {
  const router = useRouter();
  const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleCategoryClick = (id: number) => {
    router.push(`/SubCategory/${id}`);
  };
  return (
    <Content style={{ padding: "0 48px", display: "flex" }}>
      <Breadcrumb></Breadcrumb>
      <Breadcrumb style={{ margin: "16px 0", cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => router.push("/")}>
          All &nbsp; &nbsp;
        </Breadcrumb.Item>
        {category
          .slice()
          .reverse()
          .map((cate) => (
            <Breadcrumb.Item
              key={cate.id}
              onClick={() => handleCategoryClick(cate.id)}
            >
              {cate.name}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    </Content>
  );
};

const ParentComponent: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3333/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <ListCategories category={categories} />
    </div>
  );
};

export default ParentComponent;
