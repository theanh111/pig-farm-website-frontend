import { useState, useEffect } from "react";
import { List, Typography, Divider, Table } from "antd";

import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllBlog } from "../../api/blog";

// const data = [
//     "Racing car sprays burning fuel into crowd.",
//     "Japanese princess to wed commoner.",
//     "Australian walks 100km after outback crash.",
//     "Man charged over missing wedding girl.",
//     "Los Angeles battles huge wildfires.",
// ];

const Blog = () => {
    const [data, setData] = useState([]);
    const [blogName, setBlogName] = useState([]);
    const getAllBlogAPI = async () => {
        await getAllBlog()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setData(result);
                    }
                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].ten_blog) {
                            arr.push(result[i].ten_blog);
                        }
                    }
                    setBlogName(arr);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
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
            title: "Hoạt Động",
            key: "ma_blog",
            render: (record) => {
                <>
                    <Link to={"/blog/" + record.ma_blog} style={{ color: "black" }}>
                        <Typography.Text>
                            <FileTextOutlined />
                        </Typography.Text>{" "}
                        {record.ten_blog}
                    </Link>
                </>;
            },
        },
    ];
    useEffect(() => {
        getAllBlogAPI();
    }, []);

    return (
        <>
            {/* <Divider orientation="center">Hoạt Động</Divider> */}
            <Table
                scroll={{ y: 240 }}
                size="medium"
                style={{ border: "1px solid black", height: 300 }}
                bordered
                pagination={false}
                dataSource={dataSource}
                columns={columns}
            />
            {/* <List
                header={<div style={{ fontWeight: 500, fontSize: 16 }}>Hoạt Động</div>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{ cursor: "pointer" }}>
                        <Link to={"/blog/" + item.ma_blog} style={{ color: "black" }}>
                            <Typography.Text>
                                <FileTextOutlined />
                            </Typography.Text>{" "}
                            {item.ten_blog}
                        </Link>
                    </List.Item>
                )} */}
            {/* /> */}
        </>
    );
};

export default Blog;
