import { useState, useEffect } from "react";
import { List, Typography, Divider, Table } from "antd";

import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllBlog } from "../../api/blog";

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

    const columns = [
        {
            title: (
                <>
                    <Link className="blog-text" to="/thong-tin-du-an" style={{ cursor: "pointer" }}>
                        <span style={{ color: "green", fontWeight: 500, fontSize: 18 }}>Hoạt Động</span>
                    </Link>
                </>
            ),
            key: "ma_blog",
            render: (record) => {
                return (
                    <>
                        <Link to={"/thong-tin-du-an/" + record.ma_blog} style={{ color: "black", fontSize: 12 }}>
                            <Typography.Text>
                                <FileTextOutlined />
                            </Typography.Text>{" "}
                            <span className="title-text">{record.ten_blog}</span>
                        </Link>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        getAllBlogAPI();
    }, []);

    return (
        <>
            {/* <Divider orientation="center">Hoạt Động</Divider> */}
            <div
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    borderTop: "3px solid green",
                    borderLeft: "1px solid black",
                    borderRight: "1px solid black",
                    borderBottom: "1px solid black",
                    height: 300,
                }}
            >
                <Table scroll={{ y: 250 }} size="small" bordered pagination={false} dataSource={data} columns={columns} />
            </div>

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
