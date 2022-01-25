import React from "react";
import { Navigation } from "../Navigation/Navigation";
import { useState, useEffect } from "react";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Divider, Empty, Layout } from "antd";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import { getAllNews, getNewsByFilter } from "../../api/news";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { getPigByFilter } from "../../api/pig";
import { getBlogByFilter } from "../../api/blog";
import { getFarmByFilter } from "../../api/farm";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export const SearchPage = () => {
    const history = useNavigate();
    const params = useParams();
    const [viewLoader, setViewLoader] = useState(false);
    const [news, setNews] = useState([]);
    const [blog, setBlog] = useState([]);
    const [farm, setFarm] = useState([]);
    const [pig, setPig] = useState([]);
    const [pigSearch, setPigSearch] = useState([]);

    const getNewsByFilterAPI = async (keyword) => {
        let obj = { tu_khoa: keyword };
        setViewLoader(true);
        await getNewsByFilter(obj)
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setNews(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        sleep(500).then(() => {
            setViewLoader(false);
        });
    };

    const getBlogByFilterAPI = async (keyword) => {
        let obj = { tu_khoa: keyword };
        setViewLoader(true);
        await getBlogByFilter(obj)
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setBlog(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        sleep(500).then(() => {
            setViewLoader(false);
        });
    };

    const getFarmByFilterAPI = async (keyword) => {
        let obj = { tu_khoa: keyword };
        setViewLoader(true);

        await getFarmByFilter(obj)
            .then((res) => {
                console.log(res);
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setFarm(result);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        sleep(500).then(() => {
            setViewLoader(false);
        });
    };

    const getAllPigByFilterAPI = async (pig) => {
        let obj = { tu_khoa: pig };
        setViewLoader(true);
        await getPigByFilter(obj)
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    setPig(result);
                    setPigSearch(result);
                }
                if (res.status == 400) {
                    setPig([]);
                    setPigSearch([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        sleep(500).then(() => {
            setViewLoader(false);
        });
    };

    const extractContent = (s) => {
        var span = document.createElement("span");
        span.innerHTML = s;
        return span.textContent || span.innerText;
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    useEffect(() => {
        if (params.search == "") {
            history("/");
        } else {
            const fetchData = () => {
                setViewLoader(true);

                document.title = "Tìm kiếm: " + params.search;
                window.scrollTo(0, 0);
                getNewsByFilterAPI(params.search);
                getAllPigByFilterAPI(params.search);
                getFarmByFilterAPI(params.search);
                getBlogByFilterAPI(params.search);
                setViewLoader(false);
            };
            fetchData();
        }
    }, [params.search]);

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
                                    <Card size="small">
                                        <p style={{ fontSize: 18, margin: 0, padding: 0 }}>
                                            <SearchOutlined />
                                            Tìm kiếm: <span style={{ fontStyle: "italic" }}>"{params.search}"</span>
                                        </p>
                                    </Card>
                                    <div class="w3-col m12">
                                        <Content style={{ padding: 10 }}>
                                            <Breadcrumb>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/">Trang Chủ</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link>Tìm Kiếm </Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                    <div class="w3-col l3">
                                        <Divider orientation="left" plain>
                                            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, padding: 0 }}>Tin Tức</p>
                                        </Divider>
                                        {news
                                            ? news.map((item, index) => (
                                                  <>
                                                      <Link style={{ cursor: "pointer" }} to={"/tin-tuc/" + item.ma_tin_tuc}>
                                                          <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                              <div class="w3-col l12" style={{ height: "200px" }}>
                                                                  <h4
                                                                      className="title-text"
                                                                      style={{ cursor: "pointer", margin: 0, paddingBottom: 8 }}
                                                                  >
                                                                      {item.ten_tin_tuc}
                                                                  </h4>
                                                                  {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}

                                                                  <span
                                                                      style={{
                                                                          color: "grey",
                                                                          fontSize: 12,
                                                                          fontFamily: "Open Sans",
                                                                      }}
                                                                  >
                                                                      <CalendarOutlined /> {item.ngay_nhap}
                                                                  </span>
                                                                  <div
                                                                      className="text-content"
                                                                      style={{
                                                                          color: "black",
                                                                          fontFamily: "Open Sans",
                                                                          fontSize: 13,
                                                                      }}
                                                                  >
                                                                      {extractContent(item.noi_dung)}
                                                                  </div>
                                                              </div>
                                                              <div class="w3-col l12">
                                                                  <img
                                                                      src={item.hinh_anh}
                                                                      class="w3-image"
                                                                      style={{
                                                                          width: "100%",
                                                                          height: "150px",
                                                                          objectFit: "cover",
                                                                          display: "inline-block",
                                                                      }}
                                                                  />
                                                              </div>
                                                          </div>
                                                          <hr
                                                              style={{
                                                                  width: "100%",
                                                                  height: "1px",
                                                                  border: "none",
                                                                  color: "#333",
                                                                  backgroundColor: "#333",
                                                              }}
                                                          ></hr>
                                                      </Link>
                                                  </>
                                              ))
                                            : null}
                                        {news.length == 0 ? (
                                            <>
                                                <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                    <div class="w3-col l12">
                                                        <Empty description="No Data" />
                                                        {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div class="w3-col l3">
                                        <Divider orientation="left" plain>
                                            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, padding: 0 }}>Cá Thể</p>
                                        </Divider>
                                        {pig ? (
                                            pig.map((item, index) => (
                                                <>
                                                    <Link style={{ cursor: "pointer" }} to={"/ca-the/" + item.id}>
                                                        <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                            <div class="w3-col l12" style={{ height: "200px" }}>
                                                                <h4
                                                                    className="title-text"
                                                                    style={{ cursor: "pointer", margin: 0, paddingBottom: 8 }}
                                                                >
                                                                    {item.ma_so_ca_the}
                                                                </h4>
                                                                {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}

                                                                <span
                                                                    style={{
                                                                        color: "grey",
                                                                        fontSize: 12,
                                                                        fontFamily: "Open Sans",
                                                                    }}
                                                                >
                                                                    <CalendarOutlined /> {item.ngay_nhap}
                                                                </span>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    - Tuổi: {item.tuoi}
                                                                </div>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    - Địa điểm đánh giá: {item.dia_diem_danh_gia}
                                                                </div>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    - Giới tính: {item.gioi_tinh}
                                                                </div>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    - Nhân trung trắng: {item.nhan_trung_trang}
                                                                </div>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    - Tai mèo: {item.tai_meo}
                                                                </div>
                                                            </div>
                                                            <div class="w3-col l12">
                                                                <img
                                                                    src={item.hinh_anh_1}
                                                                    class="w3-image"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "150px",
                                                                        objectFit: "cover",
                                                                        display: "inline-block",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <hr
                                                            style={{
                                                                width: "100%",
                                                                height: "1px",
                                                                border: "none",
                                                                color: "#333",
                                                                backgroundColor: "#333",
                                                            }}
                                                        ></hr>
                                                    </Link>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <div class="w3-col l12">
                                                    <Empty description="Chưa Có Cá Thể" />
                                                </div>
                                            </>
                                        )}
                                        {pig.length == 0 ? (
                                            <>
                                                <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                    <div class="w3-col l12">
                                                        <Empty description="No Data" />
                                                        {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div class="w3-col l3">
                                        <Divider orientation="left" plain>
                                            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, padding: 0 }}>Thông Tin Dự Án</p>
                                        </Divider>
                                        {blog ? (
                                            blog.map((item, index) => (
                                                <>
                                                    <Link style={{ cursor: "pointer" }} to={"/thong-tin-du-an/" + item.ma_blog}>
                                                        <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                            <div class="w3-col l12" style={{ height: "200px" }}>
                                                                <h4
                                                                    className="title-text"
                                                                    style={{ cursor: "pointer", margin: 0, paddingBottom: 8 }}
                                                                >
                                                                    {item.ten_blog}
                                                                </h4>
                                                                {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                                <span
                                                                    style={{
                                                                        color: "grey",
                                                                        fontSize: 12,
                                                                        fontFamily: "Open Sans",
                                                                    }}
                                                                >
                                                                    <CalendarOutlined /> {item.ngay_nhap}
                                                                </span>
                                                                <div
                                                                    className="text-content"
                                                                    style={{
                                                                        color: "black",
                                                                        fontFamily: "Open Sans",
                                                                        fontSize: 13,
                                                                    }}
                                                                >
                                                                    {extractContent(item.noi_dung)}
                                                                </div>
                                                            </div>
                                                            <div class="w3-col l12">
                                                                <img
                                                                    src={item.hinh_anh}
                                                                    class="w3-image"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "150px",
                                                                        objectFit: "cover",
                                                                        display: "inline-block",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <hr
                                                            style={{
                                                                width: "100%",
                                                                height: "1px",
                                                                border: "none",
                                                                color: "#333",
                                                                backgroundColor: "#333",
                                                            }}
                                                        ></hr>
                                                    </Link>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <div class="w3-col l12">
                                                    <Empty description="Chưa Có Cá Thể" />
                                                </div>
                                            </>
                                        )}
                                        {blog.length == 0 ? (
                                            <>
                                                <div
                                                    class="w3-row-padding w3-padding-small"
                                                    id="about"
                                                    style={{ border: "0px solid grey" }}
                                                >
                                                    <div class="w3-col l12">
                                                        <Empty description="No Data" />
                                                        {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <div class="w3-col l3">
                                        <Divider orientation="left" plain>
                                            <p style={{ fontSize: 24, fontWeight: 700, margin: 0, padding: 0 }}>Cơ Sở Chăn Nuôi</p>
                                        </Divider>
                                        {farm ? (
                                            farm.map((item, index) => (
                                                <>
                                                    <Link style={{ cursor: "pointer" }} to={"/co-so-chan-nuoi/" + item.ma_trang_trai}>
                                                        <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                            <div class="w3-col l12" style={{ height: "200px" }}>
                                                                <h4
                                                                    className="title-text"
                                                                    style={{ cursor: "pointer", margin: 0, paddingBottom: 8 }}
                                                                >
                                                                    {item.ten_trang_trai}
                                                                </h4>
                                                                {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                                <span
                                                                    style={{
                                                                        color: "grey",
                                                                        fontSize: 12,
                                                                        fontFamily: "Open Sans",
                                                                    }}
                                                                >
                                                                    <CalendarOutlined /> {item.ngay_nhap}
                                                                </span>
                                                            </div>
                                                            <div class="w3-col l12">
                                                                <img
                                                                    src={item.hinh_anh}
                                                                    class="w3-image"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "150px",
                                                                        objectFit: "cover",
                                                                        display: "inline-block",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <hr
                                                            style={{
                                                                width: "100%",
                                                                height: "1px",
                                                                border: "none",
                                                                color: "#333",
                                                                backgroundColor: "#333",
                                                            }}
                                                        ></hr>
                                                    </Link>
                                                </>
                                            ))
                                        ) : (
                                            <>
                                                <div class="w3-col l12">
                                                    <Empty description="Chưa Có Cá Thể" />
                                                </div>
                                            </>
                                        )}
                                        {farm.length == 0 ? (
                                            <>
                                                <div class="w3-row-padding w3-padding-small" id="about" style={{ border: 0 }}>
                                                    <div class="w3-col l12">
                                                        <Empty description="No Data" />
                                                        {/* <hr style={{ margin: 0, paddingTop: 3, width: "100%" }}></hr> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </>
            )}
        </>
    );
};
