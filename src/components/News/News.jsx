import { useState, useEffect } from "react";
import { Typography, Table } from "antd";

import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllNews } from "../../api/news";

const News = () => {
    const [data, setData] = useState([]);
    const getAllNewsAPI = async () => {
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
    };

    const columns = [
        {
            title: (
                <>
                    <Link className="news-text" to="/tin-tuc" style={{ cursor: "pointer" }}>
                        <span style={{ color: "brown", fontWeight: 700, fontSize: 38 }}>Tin Tức</span>
                    </Link>
                </>
            ),
            key: "ma_tin_tuc",
            render: (record) => {
                return (
                    <>
                        <Link to={"/tin-tuc/" + record.ma_tin_tuc} style={{ color: "black", fontSize: 28, fontWeight: 500 }}>
                            <Typography.Text>
                                <NotificationOutlined />
                            </Typography.Text>{" "}
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
            <div
                style={{
                    overflowX: "hidden",
                    overflowY: "auto",
                    // borderTop: "3px solid brown",
                    // borderLeft: "1px solid black",
                    // borderRight: "1px solid black",
                    // borderBottom: "1px solid black",
                    height: 450,
                }}
            >
                <Table scroll={{ y: 300 }} size="small" pagination={false} dataSource={data} columns={columns} />
            </div>

            {/* <Divider orientation="center">Tin Tức</Divider> */}
            {/* <List
                header={<div style={{ fontWeight: 500, fontSize: 16 }}>Tin Tức</div>}
                bordered
                dataSource={data}
                renderItem={(item) => (
                    <List.Item style={{ cursor: "pointer" }}>
                        <Link to={"/blog/" + item} style={{ color: "black" }}>
                            <Typography.Text>
                                <FileTextOutlined />
                            </Typography.Text>{" "}
                            {item}
                        </Link>
                    </List.Item>
                )}
            /> */}
        </>
    );
};

export default News;
