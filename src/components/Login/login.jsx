import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "../Navigation/navigation";
import { loginAPI } from "../../api/auth";
import HeaderComponent from "../Admin/Header/AdminDashboard";
import { Form, Input, Button, Card } from "antd";

export const Login = () => {
    const history = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [error, setError] = useState({
        type: 0,
        status: false,
        msg: "",
    });
    const [state, setState] = useState({
        username: "",
        password: "",
        isSignIn: localStorage.getItem("token") != null,
    });
    const handleChange = (e) => {
        setLoginSuccess(false);
        setErrorMessage(null);
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmitClick = (values) => {
        const payload = {
            username: values.username,
            password: values.password,
        };
        if (payload.username && payload.password) {
            login(payload);
            setLoginSuccess(true);
        }
    };

    const logOutSuccess = () => {
        localStorage.removeItem("token");
        setState({ isSignIn: false });
        history.push("/dang-nhap");
    };

    const login = async (user) => {
        const checkToken = localStorage.getItem("token");
        if (checkToken) {
            console.log("logged already");
        } else {
            await loginAPI(user)
                .then((res) => {
                    let token = res.data.data;
                    if (token.length > 0) {
                        localStorage.setItem("token", token);
                        setState({ isSignIn: true });
                        history("/admin");
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        // Request made and server responded
                        // console.log(err.response.data);
                        // alert(err.response.data.message);
                        setErrorMessage(err.response.data.message);
                    } else if (err.request) {
                        // The request was made but no response was received
                        console.log(err.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log(err);
                    }
                });
        }
    };

    const onFinish = (values) => {
        handleSubmitClick(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        document.title = "Đăng Nhập";
    }, []);

    return (
        <>
            <Navigation />
            {state.isSignIn ? (
                <>
                    <Navigate to="/admin" />
                    <HeaderComponent key={state.isSignIn} logOutSuccess={logOutSuccess} />
                </>
            ) : (
                <>
                    <div style={{ paddingTop: 20 }}>
                        <Card style={{ width: 500, margin: "0 auto" }}>
                            <div style={{ paddingLeft: 150 }}>
                                {errorMessage ? <div style={{ color: "red" }}>{errorMessage}</div> : null}
                            </div>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Tên Đăng Nhập"
                                    name="username"
                                    rules={[{ required: true, message: "Xin vui lòng nhập tên tài khoản!" }]}
                                >
                                    <Input onChange={handleChange} />
                                </Form.Item>

                                <Form.Item
                                    label="Mật Khẩu"
                                    name="password"
                                    rules={[{ required: true, message: "Xin vui lòng nhập mật khẩu!" }]}
                                >
                                    <Input.Password onChange={handleChange} />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button disabled={loginSuccess} type="primary" htmlType="submit">
                                        Đăng Nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
};
