import React, { useState, useEffect } from "react";
import { Navigation } from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";

export const SignUp = () => {
    const [viewConfirmEmail, setViewConfirmEmail] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null,
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
        const check = isEmail(values.email);
        if (!check) {
            setErrorMessage("Định dạng email không hợp lệ!");
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage("Mật khẩu chưa trùng khớp!");
        }
        const payload = {
            username: values.username,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };
        if (payload.username && payload.password && payload.email && payload.confirmPassword) {
            console.log(payload);
            setLoginSuccess(true);
            setViewConfirmEmail(true);
        }
    };

    const onFinish = (values) => {
        handleSubmitClick(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const isEmail = (email) => {
        const regexp =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    };

    useEffect(() => {
        document.title = "Đăng Ký";
    }, []);

    return (
        <>
            <Navigation />
            {viewConfirmEmail ? (
                <>
                    <Card title="Xác nhận email" style={{ width: 500, margin: "0 auto" }}>
                        <p>Vui lòng truy cập email của bạn để xác nhận đăng ký tài khoản</p>
                        <div style={{ margin: "0 auto" }} className="registerMessage">
                            <span>Quay lại đăng nhập? </span>
                            <Link to="/dang-nhap">Đăng Nhập</Link>
                        </div>
                    </Card>
                </>
            ) : (
                <>
                    <Card style={{ width: 500, margin: "0 auto" }}>
                        {errorMessage ? <div style={{ color: "red" }}>{errorMessage}</div> : null}
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
                                <Input autoComplete="on" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Xin vui lòng nhập email!" }]}>
                                <Input autoComplete="off" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                label="Mật Khẩu"
                                name="password"
                                rules={[{ required: true, message: "Xin vui lòng nhập mật khẩu!" }]}
                            >
                                <Input.Password autoComplete="off" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item
                                label="Nhập Lại Mật Khẩu"
                                name="confirmPassword"
                                rules={[{ required: true, message: "Xin vui lòng nhập lại mật khẩu!" }]}
                            >
                                <Input.Password autoComplete="off" onChange={handleChange} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button disabled={loginSuccess} type="primary" htmlType="submit">
                                    Đăng Nhập
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="mt-2">
                            <span>Bạn đã có tài khoản? </span>
                            <Link to="/dang-nhap">Đăng Nhập</Link>
                        </div>
                    </Card>
                </>
            )}
        </>
    );
};
