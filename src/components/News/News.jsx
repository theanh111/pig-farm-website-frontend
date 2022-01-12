import { useState, useEffect } from "react";
import { List, Typography, Divider } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
];

const News = () => {
    return (
        <>
            {/* <Divider orientation="center">Tin Tức</Divider> */}
            <List
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
            />
        </>
    );
};

export default News;
