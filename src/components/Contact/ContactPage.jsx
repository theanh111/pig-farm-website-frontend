import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { Navigation } from "../Navigation/navigation";
import { Contact } from "../Contact/contact";
import JsonData from "../../data/data.json";
import { getAllFarm } from "../../api/farm";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";

const { Content } = Layout;

export const ContactPage = (props) => {
    const [pig, setPig] = useState([]);
    const [landingPageData, setLandingPageData] = useState({});
    const getData = async () => {
        await getAllFarm()
            .then((res) => {
                let result = res.data.data;
                setPig(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
        setLandingPageData(JsonData);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Cơ Sở Chăn Nuôi";
    }, []);

    return (
        <>
            <Navigation />
            <Content style={{ padding: "10px 300px 20px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item className="txt">
                        <Link to="/">Trang Chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="txt">
                        <Link to="/lien-he">Liên Hệ</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    Địa chỉ:{" "}
                    <span>
                        Đường 1234 Phan Văn Trị
                        <br />
                        Quận Gò Vấp,
                        <br />
                        Thành Phố Hồ Chí Minh
                    </span>
                </div>
                <div>
                    <Link to="/dang-nhap" className="page-scroll">
                        <ExportOutlined />
                    </Link>
                </div>
            </Content>

            <Contact data={landingPageData.Contact} />
        </>
    );
};
