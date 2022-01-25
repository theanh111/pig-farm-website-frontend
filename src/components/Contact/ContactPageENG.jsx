import React, { useEffect, useState } from "react";
import { NavigationENG } from "../Navigation/NavigationENG";
import { FooterENG } from "../Footer/FooterENG";
import { Link } from "react-router-dom";
import { Breadcrumb, Layout, Empty } from "antd";
import { HomeOutlined, WhatsAppOutlined, MailOutlined } from "@ant-design/icons";
import { getAllContact } from "../../api/contact";
import Loader from "../Loader/Loader";

const { Content } = Layout;

export const ContactPageENG = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        getAllContactAPI();
        window.scrollTo(0, 0);
        document.title = "Contact";
    }, []);

    const getAllContactAPI = async () => {
        setViewLoader(true);
        await getAllContact()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setListData(result);
                        setViewLoader(false);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    return (
        <>
            <NavigationENG />
            {viewLoader ? (
                <Loader />
            ) : (
                <>
                    <div id="wrapper">
                        <div id="content-fix">
                            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                                <div class="w3-row-padding">
                                    <div class="w3-col m12">
                                        <Content style={{ padding: 10 }}>
                                            <Breadcrumb>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/homepage">Homepage</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/contact">Contact</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "500px" }}>
                                <div class="w3-row-padding w3-padding-small">
                                    {listData ? (
                                        listData.map((item, index) => (
                                            <>
                                                <div class="w3-row-padding w3-padding-small" id="about">
                                                    <div class="w3-col l12">
                                                        <span
                                                            className="blog-list"
                                                            style={{
                                                                fontWeight: 600,
                                                                fontSize: 18,
                                                                fontFamily: "Open Sans",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {item.ten_lien_he}
                                                        </span>
                                                        <br></br>
                                                        <span style={{ color: "black", fontSize: 14, fontFamily: "Open Sans" }}>
                                                            <HomeOutlined /> Address: {item.dia_chi}
                                                        </span>
                                                        <br></br>
                                                        <span style={{ color: "black", fontSize: 14, fontFamily: "Open Sans" }}>
                                                            <WhatsAppOutlined /> Phone: {item.sdt}
                                                        </span>
                                                        <br></br>
                                                        <span style={{ color: "black", fontSize: 14, fontFamily: "Open Sans" }}>
                                                            <MailOutlined /> Email: {item.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <hr style={{ width: "100%" }}></hr>
                                            </>
                                        ))
                                    ) : (
                                        <Empty description="No Data" />
                                    )}
                                    {listData.length == 0 ? <Empty description="No Data" /> : null}
                                </div>
                            </div>
                        </div>
                        <FooterENG />
                    </div>
                </>
            )}
        </>
    );
};
