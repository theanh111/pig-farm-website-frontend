import { useState } from "react";
import emailjs from "emailjs-com";
import { Descriptions, Row, Col, Form, Input, Button } from "antd";

const nodemailer = require("nodemailer");

const initialState = {
    name: "",
    email: "",
    message: "",
};
export const Contact = (props) => {
    const [{ name, email, message }, setState] = useState(initialState);
    const [sendEmail, setSendEmail] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    const clearState = () => setState({ ...initialState });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        // emailjs.sendForm("service_res98i9", "template_atr6yue", e.target, "user_QeOjZHxo2hH0Moa3kn41r").then(
        //     (result) => {
        //         // console.log(result.text);
        //         clearState();
        //         setSendEmail(true);
        //     },
        //     (error) => {
        //         console.log(error.text);
        //     }
        // );
    };
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const send = async () => {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: true, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <ducnamnguyen128@gmail.com>', // sender address
            to: "thedipper110@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    };

    return (
        <>
            <Row style={{ backgroundColor: "grey", height: 500 }} justify="center" gutter={[20, 20]}>
                <Col xs={8} style={{ paddingTop: 50 }}>
                    <span>Gửi Thông Tin</span>
                    {/* <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onSubmit={(e) => e.preventDefault()}
                        // onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Xin vui lòng nhập tên của bạn!" }]}>
                            <Input onChange={handleChange} />
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Xin vui lòng nhập email của bạn!" }]}>
                            <Input onChange={handleChange} />
                        </Form.Item>

                        <Form.Item
                            label="Tin Nhắn"
                            name="message"
                            rules={[{ required: true, message: "Xin vui lòng nhập tin nhắn của bạn!" }]}
                        >
                            <Input.TextArea onChange={handleChange} style={{ resize: "none", height: 200 }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            {sendEmail ? (
                                <Button disabled type="primary" htmlType="submit">
                                    Đã Gửi
                                </Button>
                            ) : (
                                <Button type="primary" htmlType="submit">
                                    Gửi
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                    <Button onClick={send}>Test</Button> */}
                    {/* <form name="sentMessage" validate onSubmit={handleSubmit}>
                        <span>Gửi Thông Tin</span>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Tên"
                                        required
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        required
                                        onChange={handleChange}
                                    />
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea
                                style={{ resize: "none" }}
                                name="message"
                                id="message"
                                className="form-control"
                                rows="4"
                                placeholder="Tin nhắn"
                                required
                                onChange={handleChange}
                            ></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div id="success"></div>
                        {sendEmail ? (
                            <button disabled className="btn btn-outline-success">
                                Đã Gửi
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-outline-primary">
                                <span style={{ color: "black" }}>Gửi</span>
                            </button>
                        )}
                    </form> */}
                </Col>
                <Col xs={8} style={{ paddingTop: 50 }}>
                    <Descriptions title="Thông Tin Liên Hệ">
                        <Descriptions.Item label="SĐT">0123456789</Descriptions.Item>
                        <Descriptions.Item label="Địa Chỉ">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Address">
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </>

        // <div style={{ display: "block", width: "100%", height: "200px" }}>
        //     <div id="contact">
        //         <div className="container">
        //             <div className="col-md-8">
        //                 <div className="row">
        //                     <div className="section-title">
        //                         <h2>Gửi Thông Tin</h2>
        //                         <p>Liên hệ với chúng tôi:</p>
        //                     </div>
        //                     <form name="sentMessage" validate onSubmit={handleSubmit}>
        //                         <div className="row">
        //                             <div className="col-md-6">
        //                                 <div className="form-group">
        //                                     <input
        //                                         type="text"
        //                                         id="name"
        //                                         name="name"
        //                                         className="form-control"
        //                                         placeholder="Tên"
        //                                         required
        //                                         onChange={handleChange}
        //                                     />
        //                                     <p className="help-block text-danger"></p>
        //                                 </div>
        //                             </div>
        //                             <div className="col-md-6">
        //                                 <div className="form-group">
        //                                     <input
        //                                         type="email"
        //                                         id="email"
        //                                         name="email"
        //                                         className="form-control"
        //                                         placeholder="Email"
        //                                         required
        //                                         onChange={handleChange}
        //                                     />
        //                                     <p className="help-block text-danger"></p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="form-group">
        //                             <textarea
        //                                 name="message"
        //                                 id="message"
        //                                 className="form-control"
        //                                 rows="4"
        //                                 placeholder="Tin nhắn"
        //                                 required
        //                                 onChange={handleChange}
        //                             ></textarea>
        //                             <p className="help-block text-danger"></p>
        //                         </div>
        //                         <div id="success"></div>
        //                         {sendEmail ? (
        //                             <button disabled className="btn btn-outline-success">
        //                                 Đã Gửi
        //                             </button>
        //                         ) : (
        //                             <button type="submit" className="btn btn-outline-primary">
        //                                 <span style={{ color: "black" }}>Gửi</span>
        //                             </button>
        //                         )}
        //                     </form>
        //                 </div>
        //             </div>
        //             <div className="col-md-3 col-md-offset-1 contact-info">
        //                 <div className="contact-item">
        //                     <h3>Liên Hệ</h3>
        //                     <p>
        //                         <span>
        //                             <i className="fa fa-map-marker"></i> Địa chỉ
        //                         </span>
        //                         {props.data ? props.data.address : "loading"}
        //                     </p>
        //                 </div>
        //                 <div className="contact-item">
        //                     <p>
        //                         <span>
        //                             <i className="fa fa-phone"></i> SĐT
        //                         </span>{" "}
        //                         {props.data ? props.data.phone : "loading"}
        //                     </p>
        //                 </div>
        //                 <div className="contact-item">
        //                     <p>
        //                         <span>
        //                             <i className="fa fa-envelope-o"></i> Email
        //                         </span>{" "}
        //                         {props.data ? props.data.email : "loading"}
        //                     </p>
        //                 </div>
        //             </div>
        //             <div className="col-md-12">
        //                 <div className="row">
        //                     <div className="social">
        //                         <ul>
        //                             <li>
        //                                 <a href={props.data ? props.data.facebook : "/"}>
        //                                     <i className="fa fa-facebook"></i>
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href={props.data ? props.data.twitter : "/"}>
        //                                     <i className="fa fa-twitter"></i>
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href={props.data ? props.data.youtube : "/"}>
        //                                     <i className="fa fa-youtube"></i>
        //                                 </a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div id="footer">
        //         <div className="container text-center">
        //             <p>
        //                 &copy; 2021{" "}
        //                 <a href="/" rel="nofollow">
        //                     Mong Cai Pig.
        //                 </a>
        //                 <br></br>
        //                 <p>
        //                     Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái 2021-2023
        //                 </p>
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
};
