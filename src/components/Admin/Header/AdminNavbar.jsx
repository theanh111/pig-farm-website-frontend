import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FolderOutlined, HomeOutlined } from "@ant-design/icons";
import { checkToken } from "../../../api/auth";

const { Sider } = Layout;

const AdminNavbar = () => {
    const history = useNavigate();
    const checkUser = () => {
        let token = localStorage.getItem("token");
        if (token) {
            checkTokenAPI(token);
        } else {
            alert("Hết phiên đăng nhập");
            history("/dang-nhap");
        }
    };

    const checkTokenAPI = async (token) => {
        await checkToken(token)
            .then((res) => {
                if (res.status == 400) {
                    alert("Hết phiên đăng nhập");
                    localStorage.removeItem("token");
                    history("/dang-nhap");
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
            });
    };

    return (
        <>
            <Sider collapsible>
                <div className="logo">
                    <a href="/" target="_blank">
                        <p style={{ cursor: "pointer", color: "white", fontSize: 20, fontWeight: 700 }}>MONGCAIPIG</p>
                    </a>
                </div>
                <Menu onClick={checkUser} theme="dark" mode="inline">
                    <Menu.Item icon={<HomeOutlined />}>
                        Trang Chủ
                        <Link to="/admin" />
                    </Menu.Item>
                    <Menu.Item icon={<FolderOutlined />}>
                        Danh Sách Cá Thể
                        <Link to="/admin/danh-sach-ca-the" />
                    </Menu.Item>
                    <Menu.Item icon={<FolderOutlined />}>
                        Cơ Sở Chăn Nuôi
                        <Link to="/admin/co-so-chan-nuoi" />
                    </Menu.Item>
                    {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu> */}
                    {/* <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item> */}
                </Menu>
            </Sider>
        </>
    );
};

export default AdminNavbar;
