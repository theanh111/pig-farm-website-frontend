import React, { useEffect, useState } from "react";
import { Image } from "../farmimage";
import { getPigLimit12 } from "../../api/pig";
import { Navigation } from "../Navigation/navigation";
import { Contact } from "../Contact/contact";
import JsonData from "../../data/data.json";
import { getAllFarm } from "../../api/farm";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

export const Farm = (props) => {
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
            <Content style={{ padding: "10px 300px 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item className="txt">
                        <Link to="/">Trang Chủ</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item className="txt">
                        <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div id="farm" className="text-center">
                    <div className="container">
                        <div className="section-title">
                            <h2>Danh Sách Trang Trại</h2>
                            <p>Các trang trại lợn móng cái</p>
                        </div>
                        <div className="row">
                            <div className="portfolio-items">
                                {pig
                                    ? pig.map((d, i) => (
                                          <div key={`${d.id}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                                              <Image title={d.ten_trang_trai} age={d.tuoi} id={d.id} smallImage={d.hinh_anh} />
                                          </div>
                                      ))
                                    : "Loading..."}
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

            <Contact data={landingPageData.Contact} />
        </>
    );
};
