import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
                        <span className="webtitle-text">MONGCAIPIG</span>
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
                    <Menu.Item icon={<FolderOutlined />}>
                        Quản Lý Blog
                        <Link to="/admin/quan-ly-blog" />
                    </Menu.Item>
                    <Menu.Item icon={<FolderOutlined />}>
                        Quản Lý Tin Tức
                        <Link to="/admin/quan-ly-tin-tuc" />
                    </Menu.Item>
                    <Menu.Item icon={<FolderOutlined />}>
                        Thông Tin Liên Hệ
                        <Link to="/admin/quan-ly-lien-he" />
                    </Menu.Item>
                    <Menu.Item icon={<FolderOutlined />}>
                        Ảnh trình chiếu
                        <Link to="/admin/anh-trinh-chieu" />
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    );
};

export default AdminNavbar;
