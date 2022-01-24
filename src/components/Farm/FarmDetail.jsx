import { Navigation } from "../Navigation/Navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFarmByFarmCode } from "../../api/farm";
import { Breadcrumb, Layout } from "antd";
import { getPigByFarmName } from "../../api/pig";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Footer } from "../Footer/Footer";
import { PigGalleryParam } from "../Gallery/PigGalleryParam";

const { Content } = Layout;

export const FarmDetail = () => {
    const params = useParams();
    const [viewLoader, setViewLoader] = useState(false);
    const [pigByFarmName, setPigByFarmName] = useState([]);
    const [farmDetail, setFarmDetail] = useState({});

    const getDataFarmByFarmCode = async (farmcode) => {
        setViewLoader(true);
        await getFarmByFarmCode(farmcode)
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
        setViewLoader(false);
    };

    const getPigByFarmNameAPI = async (farmName) => {
        setViewLoader(true);
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
        setViewLoader(false);
    };

    useEffect(() => {
        getDataFarmByFarmCode(params.farmcode);
    }, []);

    return (
        <>
            <Navigation />
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
                                                    <Link to="/">Trang Chủ</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to={"/co-so-chan-nuoi/" + farmDetail.ten_trang_trai}>
                                                        {farmDetail.ten_trang_trai}
                                                    </Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1500px" }}>
                                <div class="w3-row-padding w3-padding-20" id="about" style={{ textAlign: "center" }}>
                                    <h1>{farmDetail.ten_trang_trai}</h1>
                                    <div class="w3-col l12">
                                        <div class="item active">
                                            <img
                                                src={farmDetail.hinh_anh}
                                                style={{
                                                    cursor: "pointer",
                                                    width: "100%",
                                                    height: "450px",
                                                    objectFit: "cover",
                                                    display: "inline-block",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <PigGalleryParam title={"Danh Sách Cá Thể Tại Trại"} desc={"Các cá thể tại trại"} data={pigByFarmName} />
                            </div>
                            <Footer />
                        </div>
                    </div>
                    {/* <div id="wrapper">
                        <div id="content-fix">
                            <Content style={{ padding: "0px 400px 0px" }}>
                                <Breadcrumb style={{ margin: "8px 0" }}>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/">Trang Chủ</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to="/co-so-chan-nuoi">Cơ Sở Chăn Nuôi</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item className="txt">
                                        <Link to={"/co-so-chan-nuoi/" + farmDetail.ma_trang_trai}>{farmDetail.ten_trang_trai}</Link>
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Content>
                            <Row style={{ paddingBottom: 50, paddingTop: 5 }}>
                                <Col align="middle" span={12} offset={6}>
                                    <h1 style={{ color: "#0a233e", fontFamily: "Open Sans", fontWeight: 600, fontSize: 30 }}>
                                        {farmDetail.ten_trang_trai}
                                    </h1>
                                </Col>
                                <Col align="middle" span={12} offset={6}>
                                    <Image
                                        style={{ height: 400, width: 600, objectFit: "cover", display: "inline-block" }}
                                        src={farmDetail.hinh_anh}
                                        alt={farmDetail.ten_trang_trai}
                                    ></Image>
                                </Col>
                            </Row>
                            <Row align="middle" justify="center">
                                <Col xs={15}>
                                    <div style={{ textAlign: "center", paddingBottom: 50 }}>
                                        <Row align="middle" justify="center">
                                            <Col>
                                                <h3 style={{ fontFamily: "Open Sans" }}>Danh Sách Cá Thể Tại Trại</h3>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: 0 }} align="middle" justify="center">
                                            <Col>
                                                <hr className="line"></hr>
                                            </Col>
                                        </Row>

                                        <Row align="middle" justify="center">
                                            {pigByFarmName
                                                ? pigByFarmName.map((d, i) => (
                                                      <Col span={8}>
                                                          <PigImage
                                                              title={d.ma_so_ca_the}
                                                              age={d.tuoi}
                                                              id={d.id}
                                                              smallImage={d.hinh_anh_1}
                                                          />
                                                      </Col>
                                                  ))
                                                : "Loading..."}
                                            {pigByFarmName?.length === 0 ? (
                                                <>
                                                    <Empty description="Chưa Có Cá Thể" />
                                                </>
                                            ) : null}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Contact />
                    </div> */}
                </>
            )}
        </>
    );
};
