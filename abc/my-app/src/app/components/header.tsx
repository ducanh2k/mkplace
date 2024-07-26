/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import {
  LoginOutlined,
  UserOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  CreditCardFilled,
  UsergroupAddOutlined,
  DeleteOutlined,
  BankOutlined,
  CheckCircleOutlined,
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
  Modal,
  Avatar,
  InputNumber,
  Form,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import "../../css/login.css";
import "../../css/wallet.css";
import "../../css/menu.css";
import axios from "axios";

const { Search } = Input;
const { Title } = Typography;

interface SubToken {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  token_id: number;
}

interface Transaction {
  id: number;
  price: number;
  amount: number;
  createdAt: Date;
}

const onSearch = (value: string) => {
  console.log(value);
};
let check = true;
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
  const [addFundsModalVisible, setAddFundsModalVisible] = useState(false);
  const [addFundsAmount, setAddFundsAmount] = useState<number>(0.01); // default value to avoid null

  // state for modal
  const [modal2Open, setModal2Open] = useState(false);
  const [transaction, setTransaction] = useState<Transaction[] | []>([]);
  const [loading, setLoading] = useState(true);

  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;
  const ownerID = localStorage.getItem("ownerID");

  useEffect(() => {
    // Fetch transactions from the API
    axios
      .get(`http://localhost:3333/transaction/${userID}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch transactions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userID]);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(isLogin);
    setIsAdmin(adminStatus);
    router.push("/");
    if (isLogin) {
      connectMetaMask();
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = () => {
    axios
      .get(`http://localhost:3333/cart/${userID}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch cart items");
      });
  };

  const showDrawer = () => {
    fetchCartItems();
    setOpen(true);
  };

  const hidePopover = () => {
    setOpenPopover(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen);
  };

  const onClose = () => {
    setOpen(false);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(4);
  };

  const updateQuantity = (item: SubToken, quantity: number | null) => {
    const updatedQuantity = quantity ?? 1; // Set default quantity to 1
    axios
      .put(`http://localhost:3333/cart/${item.id}`, {
        quantity: updatedQuantity,
      })
      .then((response) => {
        setCartItems((prevCartItems) =>
          prevCartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: updatedQuantity }
              : cartItem
          )
        );
        message.success(`${item.name} quantity updated!`);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update quantity");
      });
  };

  const removeFromCart = (item: SubToken) => {
    axios
      .delete(`http://localhost:3333/cart/${item.id}`)
      .then((response) => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((cartItem) => cartItem.id !== item.id)
        );
        message.success(`${item.name} is removed from cart!`);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to remove item from cart");
      });
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const account = await (await signer).getAddress();
        setAccount(account);
        setIsLoggedIn(true);
        check = false;
        const balance = await provider.getBalance(account);
        const balanceInEth = ethers.formatEther(balance);
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

  const handleLogoutClick = () => {
    localStorage.removeItem("isLogin");
    setIsLoggedIn(false);
    setAccount(null);
    setBalance("0");
    check = true;
  };

  const handleProfileClick = () => {
    router.push("/Profile");
  };

  const addFundsWithMetaMask = async (amount: number) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const transactionParameters = {
          to: account, // Recipient's wallet address
          value: ethers.parseUnits(amount.toString(), "ether"), // Amount of MATIC to send
        };

        try {
          const tx = await (
            await signer
          ).sendTransaction(transactionParameters);
          message.success("Funds added! Check your wallet.");
        } catch (error) {
          console.error("Error sending transaction: ", error);
          message.error("Failed to add funds.");
        }
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

  const completePurchase = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const transactionParameters = {
          to: account, // Recipient's wallet address
          value: ethers.parseUnits(calculateTotal(), "ether"), // Total amount of MATIC to send
        };

        try {
          const tx = await (
            await signer
          ).sendTransaction(transactionParameters);
          message.success("Transaction sent! Check your wallet.");
          setModal2Open(false);

          // Save transaction information to the API
          await axios.post(`http://localhost:3333/transaction/`, {
            buyerId: userID,
            sellerId: ownerID,
            amount: cartItems.length,
            price: calculateTotal(),
          });
        } catch (error) {
          console.error("Error sending transaction: ", error);
          message.error("Failed to send transaction.");
        }
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

  const items2 = [
    {
      label: "Logout",
      key: "1",
      icon: <UserOutlined />,
      onClick: handleLogoutClick,
    },
    {
      label: "Your assets",
      key: "2",
      icon: <BankOutlined />,
      onClick: handleProfileClick,
    },
  ];

  const menuProps = {
    items: items2,
  };

  const items = [
    isAdmin
      ? {
          label: (
            <Link
              className="hover:bg-gray-700 active:bg-gray-700"
              href={"/users"}
            >
              Users
            </Link>
          ),
          key: "users",
          icon: <UsergroupAddOutlined />,
        }
      : null,
    {
      label: <Link href={"/Create_Layout"}>Create</Link>,
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
                  <Button
                    className="add-wallet"
                    type="primary"
                    onClick={() => setAddFundsModalVisible(true)}
                  >
                    +
                  </Button>
                  <br />
                  <br />
                  <h2>Transaction</h2>
                  <div style={{ maxHeight: "50vh", overflowY: "scroll" }}>
                    <List
                      itemLayout="horizontal"
                      dataSource={transaction}
                      loading={loading}
                      renderItem={(transaction) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                icon={<CheckCircleOutlined />}
                                style={{ backgroundColor: "#4CAF50" }}
                              />
                            }
                            title={
                              <div style={{ color: "#fff" }}>
                                {transaction.id}{" "}
                                <span style={{ fontWeight: "normal" }}>
                                  ({transaction.price} MATIC)
                                </span>
                              </div>
                            }
                            description={
                              <div style={{ color: "#aaa" }}>
                                Amount: {transaction.amount} | Price:{" "}
                                {transaction.price}
                                <br />
                                {new Date(
                                  transaction.createdAt
                                ).toLocaleString()}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
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
                            <InputNumber
                              min={1}
                              max={99}
                              value={item.quantity}
                              onChange={(value) =>
                                updateQuantity(item, value ?? 1)
                              }
                            />,
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
                            description={<p>Price: {item.price} MATIC</p>}
                          />
                        </List.Item>
                      )}
                    />
                    <div style={{ marginTop: "16px" }}>
                      <Title level={4}>
                        Total price: {calculateTotal()} MATIC
                      </Title>
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={() => setModal2Open(true)}
                      >
                        Complete Purchase
                      </Button>
                      <Modal
                        title="Complete Purchase"
                        centered
                        open={modal2Open}
                        onOk={completePurchase}
                        onCancel={() => setModal2Open(false)}
                      >
                        <p>Do you want to complete the purchase?</p>
                        <p>Total price: {calculateTotal()} MATIC</p>
                      </Modal>
                    </div>
                  </>
                )}
              </Drawer>
            </>
          ),
          key: "cart",
        }
      : null,
  ].filter(Boolean);

  const onClick = (e: { key: string }) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="menu"
      />
      <Modal
        title="Add Funds"
        centered
        open={addFundsModalVisible}
        onOk={() => {
          addFundsWithMetaMask(addFundsAmount);
          setAddFundsModalVisible(false);
        }}
        onCancel={() => setAddFundsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Amount (MATIC)">
            <InputNumber
              min={0.01}
              value={addFundsAmount}
              onChange={(value) => setAddFundsAmount(value ?? 0.01)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Header;
