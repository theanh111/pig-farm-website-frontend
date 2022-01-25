import { useState, useEffect } from "react";
import { List, Typography, Divider, Table } from "antd";

import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllBlog } from "../../api/blog";
import Loader from "../Loader/Loader";

const BlogENG = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [data, setData] = useState([]);
    const [blogName, setBlogName] = useState([]);
    const getAllBlogAPI = async () => {
        setViewLoader(true);
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
        setViewLoader(false);
    };

    const columns = [
        {
            title: (
                <>
                    <Link className="blog-text" to="/project-information" style={{ cursor: "pointer" }}>
                        <span style={{ color: "green", fontWeight: 700, fontSize: 28 }}>Activities</span>
                    </Link>
                </>
            ),
            key: "ma_blog",
            render: (record) => {
                return (
                    <>
                        <Link to={"/project-information/" + record.ma_blog} style={{ color: "black", fontSize: 24, fontWeight: 500 }}>
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
            {viewLoader ? (
                <Loader />
            ) : (
                <div class="w3-half  ">
                    <div
                        style={{
                            overflowX: "hidden",
                            overflowY: "auto",
                            height: 380,
                        }}
                    >
                        <Table scroll={{ y: 300 }} size="small" pagination={false} dataSource={data} columns={columns} />
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogENG;
