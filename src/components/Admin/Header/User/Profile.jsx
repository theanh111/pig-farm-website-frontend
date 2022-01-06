import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar";
import { Layout, Breadcrumb, Descriptions, Badge, Card, Image, Col, Row } from "antd";
import AdminHeader from "../AdminHeader";
import Loader from "../../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../../../../api/user";

const jwt = require("jsonwebtoken");
const { Content } = Layout;

const Profile = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        avatar: "",
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        phone_number: "",
    });

    const getDataUser = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let decode = jwt.decode(token);
            getUser(decode.sub);
        } else {
            localStorage.removeItem("token");
            history("/dang-nhap");
        }
    };

    const getUser = async (user_name) => {
        setViewLoader(true);
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
                            let email = data.email;
                            let dob = data.dob;
                            let gender = data.gender;
                            let phone_number = data.phone_number;
                            setUserData({
                                avatar: imageUrl,
                                firstName: first_name,
                                lastName: last_name,
                                username: user_name,
                                email: email,
                                dob: dob,
                                gender: gender,
                                phone_number: phone_number,
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem("token");
                    history("/dang-nhap");
                });
        }
        setViewLoader(false);
    };

    useEffect(() => {
        getDataUser();
    }, []);

    useEffect(() => {
        document.title = "Profile - Admin";
    }, []);

    return (
        <div>
            {viewLoader ? <Loader /> : null}
            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    <AdminNavbar />
                    <Layout className="site-layout">
                        <AdminHeader />
                        <Content style={{ margin: "0 16px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>
                                    <Link to="/admin"> MONGCAIPIG</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Profile</Breadcrumb.Item>
                            </Breadcrumb>
                            <Card>
                                <Row gutter={[20, 20]}>
                                    <Col xs={5}>
                                        <Image src={userData.avatar} />
                                    </Col>
                                    <Col xs={10}>
                                        <Descriptions labelStyle={{ fontWeight: 500, fontSize: 15 }} layout="vertical" bordered>
                                            <Descriptions.Item label="Trạng Thái" span={3}>
                                                <Badge status="processing" text="Hoạt động" />
                                            </Descriptions.Item>

                                            <Descriptions.Item label="Tên Tài Khoản">{userData.username}</Descriptions.Item>
                                            <Descriptions.Item label="Họ">{userData.lastName}</Descriptions.Item>
                                            <Descriptions.Item label="Tên">{userData.firstName}</Descriptions.Item>
                                            <Descriptions.Item label="Ngày Sinh">{userData.dob}</Descriptions.Item>
                                            <Descriptions.Item label="Giới Tính">{userData.gender}</Descriptions.Item>
                                            <Descriptions.Item label="Số Điện Thoại">{userData.phone_number}</Descriptions.Item>
                                            <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                            </Card>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};

export default Profile;
