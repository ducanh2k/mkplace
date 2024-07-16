"use client";
import React, { useState, useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";






type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

type DecodedTokenType = {
  role?: string;
  // other fields
};

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    try {
      const response = await axios.post("http://localhost:3333/users", {
        email: values.email,
        password: values.password,
      });

      const token = response.data.token; // Assuming the token is in the response data
      setToken(token);
      localStorage.setItem("token", token); // Store the token in local storage
      localStorage.setItem("isLogin", true.toString());

      // Make a request to get user details
      const userResponse = await axios.get("http://localhost:3333/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userResponse.data.isAdmin === "true") {
        localStorage.setItem("isAdmin", "true");
      } else {
        localStorage.setItem("isAdmin", "false");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      localStorage.setItem("isLogin", false.toString());
      message.error("Authentication failed!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const fetchProtectedData = async () => {
    if (!token) {
      message.error("No token available");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3333/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected data:", response.data);
      message.success("Fetched protected data successfully!");
    } catch (error) {
      console.error("Error fetching protected data:", error);
      message.error("Failed to fetch protected data!");
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* {token && (
        <div>
          <Button type="primary" onClick={fetchProtectedData}>
            Fetch Protected Data
          </Button>
        </div>
      )} */}

      {isAdmin && (
        <div>
          <p>Welcome, Admin!</p>
          {/* Render admin-specific content here */}
        </div>
      )}
    </div>
  );
};

export default App;
