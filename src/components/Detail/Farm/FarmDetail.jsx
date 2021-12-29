import { Navigation } from "../../Navigation/navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JsonData from "../../../data/data.json";
import { Contact } from "../../Contact/contact";
import { getFarmById } from "../../../api/farm";
import { Image, Col, Row, Space } from "antd";
import { getPigByFarmName } from "../../../api/pig";
import { PigImage } from "../../image";

export const FarmDetail = () => {
    const [pigByFarmName, setPigByFarmName] = useState([]);
    const [farmDetail, setFarmDetail] = useState({});
    const getDataFarmById = async (id) => {
        await getFarmById(id)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    setFarmDetail(result[0]);
                    let obj = { dia_diem_danh_gia: result[0].ten_trang_trai };
                    getPigByFarmNameAPI(obj);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const params = useParams();
    const [landingPageData, setLandingPageData] = useState({});

    const getPigByFarmNameAPI = async (farmName) => {
        await getPigByFarmName(farmName)
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setPigByFarmName(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getDataFarmById(params.id);
        setLandingPageData(JsonData);
    }, []);

    return (
        <>
            <Navigation />
            <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
                <Col align="middle" span={12} offset={6}>
                    <h1 style={{ color: "#0a233e", fontFamily: "Times New Roman", fontWeight: 800, fontSize: 50 }}>
                        {farmDetail.ten_trang_trai}
                    </h1>
                </Col>
                <Col align="middle" span={12} offset={6}>
                    <Image height={500} width={800} src={farmDetail.hinh_anh} alt={farmDetail.ten_trang_trai}></Image>
                </Col>
            </Row>

            <div id="portfolio" className="text-center">
                <div className="container">
                    <div className="section-title">
                        <h2>Danh Sách Cá Thể</h2>
                        {/* <p>Các loại lợn móng cái A...</p> */}
                    </div>
                    <div className="row">
                        <div className="portfolio-items">
                            {pigByFarmName
                                ? pigByFarmName.map((d, i) => (
                                      <div key={`${d.id}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                                          <PigImage title={d.ma_so_ca_the} age={d.tuoi} id={d.id} smallImage={d.hinh_anh_1} />
                                      </div>
                                  ))
                                : "Loading..."}
                        </div>
                    </div>
                </div>
            </div>

            {/* <main className="container-detail">
                <div className="left-column-detail">
                    <div style={{ width: "584px", height: "389px", objectFit: "cover", display: "inline-block" }}>
                        <a href={farmDetail.hinh_anh} target="_blank">
                            <img
                                style={{ borderRadius: "5%" }}
                                data-image="red"
                                className="active"
                                src={farmDetail.hinh_anh}
                                alt={farmDetail.ten_trang_trai}
                            />
                        </a>
                    </div>
                </div>

                <div className="right-column-detail">
                    <div className="product-description-detail">
                        <div className="site-card-border-less-wrapper">
                            <div className="detail-box">
                                <div style={{ paddingLeft: 10, paddingTop: 5 }}>
                                    <span className="product-description-detail-span">Cơ Sở Chăn Nuôi: </span>
                                    <br />
                                    <h1>{farmDetail.ten_trang_trai}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main> */}
            {/* <ContentDetail data={pigDetail} /> */}
            <Contact data={landingPageData.Contact} />
            {/* <About data={landingPageData.About} /> */}
        </>
    );
};
