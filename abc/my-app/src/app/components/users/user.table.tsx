"use client";
import React from "react";
import { Space, Table, Pagination, Tag } from "antd";
import type { PaginationProps } from "antd";
import type { TableProps } from "antd";
import { ColumnType } from "antd/es/table";
import { IUser } from "@/types/backend";
interface IProps {
  users: IUser[] | [];
}
const UserTable = (props: IProps) => {
  const { users } = props;

  const columns: ColumnType<IUser>[] = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "FullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    
  ];

  const data: IUser[] = [];

  const App: React.FC = () => (
    <Table
      className="hover:bg-gray-700"
      key={"id"}
      bordered
      columns={columns}
      dataSource={users}
      pagination={{
        size: "small",
        position: ["bottomCenter"],
        defaultPageSize: 5,
      }}
    />
    // <Pagination align="center" defaultCurrent={1} total={5}/>
  );

  return (
    <div>
      <App />
    </div>
  );
};

export default UserTable;
