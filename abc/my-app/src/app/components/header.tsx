/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import {
  LoginOutlined,
  AppstoreOutlined,
  TrademarkOutlined,
  UserOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  CreditCardFilled,
  UsergroupAddOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  message,
  Menu,
  Input,
  Space,
  Dropdown,
  Drawer,
  Button,
  List,
  Typography,
  Popover,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import "../../css/login.css";
import "../../css/wallet.css";
import "../../css/menu.css";

const { Search } = Input;
const { Title } = Typography;

interface SubToken {
  id: number;
  name: string;
  image: string;
  price: number;
  token_id: number;
}

const onSearch = (value: string) => {
  console.log(value);
};
var check = true;
const Header: React.FC = () => {
  const [current, setCurrent] = useState("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItems, setCartItems] = useState<SubToken[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(isLogin);
    setIsAdmin(adminStatus);
    router.push("/");
    if (isLogin) {
      connectMetaMask();
    }
  }, []);

  // Lấy giỏ hàng từ localStorage khi mở Drawer
  const showDrawer = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setOpen(true);
  };

  // close Popover
  const hidePopover = () => {
    setOpenPopover(false);
  };

  // handle Open event
  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(4);
  };

  // Remove from cart
  const removeFromCart = (item: SubToken) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    message.success(`${item.name} is removed from cart!`);
  };

  // MetaMask login
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setAccount(account);
        // localStorage.setItem("isLogin", "true");
        setIsLoggedIn(true);
        check = false;
        const balance = await provider.getBalance(account);
        const balanceInEth = Number(ethers.formatEther(balance)).toFixed(4);
        setBalance(balanceInEth);

        message.success("Connected to MetaMask successfully!");
      } catch (error) {
        console.error(error);
        message.error("Failed to connect to MetaMask.");
      }
    } else {
      message.error(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };

  // Logout
  const handleLogoutClick = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
    setAccount(null);
    setBalance("0");
    check = true;
  };

  //Items of menu
  const items2 = [
    {
      label: "Logout",
      key: "1",
      icon: <UserOutlined />,
      onClick: handleLogoutClick,
    },
  ];

  const menuProps = {
    items: items2,
  };

  //Items of menu
  const items = [
    isAdmin
      ? {
          label: <Link href={"/users"}>Users</Link>,
          key: "users",
          icon: <UsergroupAddOutlined />,
        }
      : null,
    {
      label: <Link href={"/Tokens"}>Tokens</Link>,
      key: "tokens",
      icon: <TrademarkOutlined />,
    },
    {
      label: <Link href={"/NFTs"}>NFTs</Link>,
      key: "nft",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link href={"/addnew"}>Create</Link>,
      key: "addnew",
      icon: <CreditCardFilled />,
    },
    {
      label: (
        <Space direction="horizontal" style={{ display: "flex" }}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200, marginTop: 10, marginRight: 10 }}
          />
        </Space>
      ),
      key: "search",
      className: "search-menu-item",
    },
    isLoggedIn
      ? {
          label: (
            <Popover
              content={
                <div className="wallet-menu-item">
                  <a onClick={hidePopover}>{balance} MATIC</a>
                  <Button className="add-wallet" type="primary">
                    +
                  </Button>
                </div>
              }
              title="Your balance"
              trigger="click"
              open={openPopover}
              onOpenChange={handleOpenChange}
            >
              {balance} MATIC
            </Popover>
          ),
          key: "wallet",
          icon: <WalletOutlined />,
        }
      : null,
    isLoggedIn && check === true
      ? {
          label: (
            <Button type="primary" onClick={connectMetaMask}>
              Connect MetaMask
            </Button>
          ),
          key: "connect-metamask",
          icon: <LoginOutlined />,
          className: "login-menu-item",
        }
      : null,
    !isLoggedIn
      ? {
          label: <Link href={"/Login"}>Login</Link>,
          key: "login",
          icon: <LoginOutlined />,
          className: "login-menu-item",
        }
      : null,
    isLoggedIn
      ? {
          label: (
            <Dropdown.Button
              menu={menuProps}
              placement="bottom"
              icon={<UserOutlined />}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              Your Profile
            </Dropdown.Button>
          ),
          key: "avatar",
        }
      : null,
    isLoggedIn
      ? {
          label: (
            <>
              <Button type="primary" onClick={showDrawer}>
                <ShoppingCartOutlined />
              </Button>
              <Drawer
                title="Your shopping cart"
                placement="right"
                onClose={onClose}
                open={open}
              >
                {cartItems.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    <List
                      itemLayout="horizontal"
                      dataSource={cartItems}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Button
                              type="link"
                              icon={<DeleteOutlined />}
                              onClick={() => removeFromCart(item)}
                            />,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "50px" }}
                              />
                            }
                            title={item.name}
                            description={<p>Price: {item.price} ETH</p>}
                          />
                        </List.Item>
                      )}
                    />
                    <div style={{ marginTop: "16px" }}>
                      <Title level={4}>
                        Total price: {calculateTotal()} ETH
                      </Title>
                      <Button type="primary" style={{ width: "100%" }}>
                        Complete Purchase
                      </Button>
                    </div>
                  </>
                )}
              </Drawer>
            </>
          ),
          key: "cart",
        }
      : null,
  ].filter(Boolean); // Loại bỏ các phần tử null khỏi mảng

  const onClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      className="menu"
    />
  );
};

export default Header;
