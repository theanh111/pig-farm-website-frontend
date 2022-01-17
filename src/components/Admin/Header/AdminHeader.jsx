import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getUserByUsername } from "../../../api/user";

const jwt = require("jsonwebtoken");

const { Header } = Layout;

const AdminHeader = (props) => {
    const [userData, setUserData] = useState({
        username: "",
        avatar: "",
        firstName: "",
        lastName: "",
    });
    const history = useNavigate();

    const handleClose = () => {
        localStorage.removeItem("token");
        history("/dang-nhap");
    };

    const getDataUser = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let decode = jwt.decode(token);
            if (decode) {
                if (decode.sub !== null) {
                    getUser(decode.sub);
                }
            } else {
                localStorage.removeItem("token");
                history("/dang-nhap");
            }
        } else {
            localStorage.removeItem("token");
            history("/dang-nhap");
        }
    };

    const getUser = async (user_name) => {
        let obj = { username: user_name };
        if (obj) {
            await getUserByUsername(obj)
                .then((res) => {
                    if (res) {
                        let result = res.data.data;
                        if (result.length > 0) {
                            let data = result[0];
                            let user_name = data.username;
                            let first_name = data.first_name;
                            let last_name = data.last_name;
                            let imageUrl = data.avatar;
                            setUserData({ avatar: imageUrl, firstName: first_name, lastName: last_name, username: user_name });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem("token");
                    history("/dang-nhap");
                });
        }
    };

    useEffect(() => {
        getDataUser();
    }, []);

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/admin/profile">
                    <span style={{ fontSize: 14 }}>{userData.username}</span>
                </Link>
            </Menu.Item>
            <Menu.Item onClick={handleClose}>
                <span style={{ color: "red" }}>
                    Log Out
                    <ImportOutlined style={{ paddingLeft: 12 }} />
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Header className="header-layout-background" style={{ padding: 0 }}>
                <div style={{ float: "right", paddingRight: 20, paddingTop: 10 }}>
                    <img
                        style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: "cover", display: "inline-block" }}
                        src={userData.avatar ? userData.avatar : "/images/user/imageerror.png"}
                    ></img>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button type="text" style={{ color: "white", fontWeight: 400, fontSize: 18 }} onClick={(e) => e.preventDefault()}>
                            {userData.firstName && userData.lastName ? userData.firstName + " " + userData.lastName : "Default"}
                        </Button>
                    </Dropdown>
                </div>
            </Header>
        </>
    );
};

export default AdminHeader;
