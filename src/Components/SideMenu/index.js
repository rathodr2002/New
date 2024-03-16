import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Perosnal Information",
            key: "/inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Test",
            key: "/orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Table of Exams",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Statistics",
            key: "/statistics",
            icon: <UserOutlined />,
          },
          {
            label: "Historical Data",
            key: "/HistoricData",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
