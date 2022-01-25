import { useState, useEffect } from "react";
import { Typography, Table } from "antd";

import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllNews } from "../../api/news";
import Loader from "../Loader/Loader";

const NewsENG = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [data, setData] = useState([]);
    const getAllNewsAPI = async () => {
        setViewLoader(true);
        setData([]);
        await getAllNews()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setData(result);
                    }
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
                    <Link className="news-text" to="/news" style={{ cursor: "pointer" }}>
                        <span style={{ color: "brown", fontWeight: 700, fontSize: 28 }}>News</span>
                    </Link>
                </>
            ),
            key: "ma_tin_tuc",
            render: (record) => {
                return (
                    <>
                        <Link to={"/news/" + record.ma_tin_tuc} style={{ color: "black", fontSize: 24, fontWeight: 500 }}>
                            <Typography.Text>
                                <NotificationOutlined />
                            </Typography.Text>
                            <span className="title-text">{record.ten_tin_tuc}</span>
                        </Link>
                    </>
                );
            },
        },
    ];
    useEffect(() => {
        getAllNewsAPI();
    }, []);

    return (
        <>
            {viewLoader ? (
                <Loader />
            ) : (
                <div class="w3-half ">
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

export default NewsENG;
