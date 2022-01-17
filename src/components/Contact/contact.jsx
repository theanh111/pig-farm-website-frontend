import { useState } from "react";
import { Descriptions, Row, Col, Form, Input, Button, Table } from "antd";

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
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];
    return (
        <>
            <div id="footer-fix">
                <Row align="middle" justify="center" gutter={[20, 20]}>
                    <Col xs={12}>
                        {/* <Table dataSource={dataSource} columns={columns} /> */}
                        {/* <Descriptions title="Thông Tin Liên Hệ" style={{ color: "white" }}>
                        <Descriptions.Item label="SĐT">0123456789</Descriptions.Item>
                        <Descriptions.Item label="Địa Chỉ">Trâu Quỳ, Gia Lâm, Hà Nội</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    </Descriptions> */}
                        <div style={{ alignContent: "center", color: "white" }}>
                            <span>&copy; 2021 </span>
                            <a href="/" rel="nofollow">
                                Mong Cai Pig.
                            </a>
                            <br></br>
                            <p>
                                Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái
                                2021-2023
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
