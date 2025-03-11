import React, { useState } from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
import { LuUsers2 } from "react-icons/lu";
import { GrCircleInformation } from "react-icons/gr";
import { TbUsersGroup, TbTopologyComplex } from "react-icons/tb";
import { RiSkull2Fill } from "react-icons/ri";
import { GrDocumentPerformance } from "react-icons/gr";
import logo from "../assets/logoIcon.jpeg";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineAddChart } from "react-icons/md";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("SearchPayload");
    localStorage.removeItem("user");
    localStorage.removeItem("team");
    Swal.fire({
      icon: "success",
      title: "",
      text: "Logged Out",
    });
    navigate("/login");
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <img src={logo} alt="logo" />

          <Menu theme="dark" mode="inline" style={{ flex: 1 }}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/requirement">Requirements</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              <Link to="/add-employee">Add Employee</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LuUsers2 />}>
              <Link to="/view-employee">View Employees</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<GrDocumentPerformance />}>
              <Link to="/view-KPI">View KPI</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GrCircleInformation />}>
              <Link to="/skill">Skill Info</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<MdOutlineAddChart />}>
              <Link to="/crud">Add Skills</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<TbUsersGroup />}>
              <Link to="/team">Team</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TbTopologyComplex />}>
              <Link to="/complexity">Complexity</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<RiSkull2Fill />}>
              <Link to="/risk-type">Risk Type</Link>
            </Menu.Item>
          </Menu>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              padding: 10,
            }}
          >
            <div>
              <div className="flex justify-center items-center flex-row gap-3">
                <div>
                  <CgProfile />
                </div>
                <div className="flex flex-col">
                  <div className="text-md">Admin</div>
                  <div className="text-[10px]">Project Manager</div>
                </div>
              </div>
              <div>
                {localStorage.getItem("user") === "true" ? (
                  <Button
                    type="primary"
                    className="mt-5 cursor-pointer"
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                ) : (
                  <div className="flex flex-row gap-3">
                    <Button
                      type="primary"
                      className="mt-5 cursor-pointer"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      type="primary"
                      className="mt-5 cursor-pointer"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Footer>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
