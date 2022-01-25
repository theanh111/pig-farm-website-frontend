import { NavigationENG } from "../Navigation/NavigationENG";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FooterENG } from "../Footer/FooterENG";
import { getPigById } from "../../api/pig";
import { Breadcrumb, Layout } from "antd";
import Loader from "../Loader/Loader";

const { Content } = Layout;

export const PigDetailENG = (props) => {
    const [viewLoader, setViewLoader] = useState(false);
    const [pigDetail, setPigDetail] = useState({});
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);

    const getDataPigById = async (id) => {
        setViewLoader(true);
        setItems([]);
        setData([]);
        await getPigById(id)
            .then((res) => {
                let result = res.data.data;
                if (result.length > 0) {
                    setPigDetail(result[0]);
                    setTitle(result[0].ma_so_ca_the);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };
    const params = useParams();

    useEffect(() => {
        getDataPigById(params.id);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Individual Code: " + title;
    }, [title]);

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
                                                    <Link to="/pig-indivuduals">Pig Indivuduals</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item className="txt">
                                                    <Link to="/pig-indivuduals/">{pigDetail.ma_so_ca_the}</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Content>
                                    </div>
                                </div>
                            </div>
                            <div class="w3-content" style={{ maxWidth: "1200px" }}>
                                <div class="w3-row-padding w3-padding-16" id="about">
                                    <div class="w3-col l4">
                                        <div id="galleryPig1" class="carousel slide" data-ride="carousel">
                                            <ol class="carousel-indicators">
                                                {pigDetail.hinh_anh_1 ? (
                                                    <li data-target="#galleryPig1" data-slide-to={0} class="active"></li>
                                                ) : (
                                                    <li data-target="#galleryPig1" data-slide-to={0} class="active"></li>
                                                )}
                                                {pigDetail.hinh_anh_2 ? (
                                                    <li data-target="#galleryPig1" data-slide-to={1}></li>
                                                ) : (
                                                    <li data-target="#galleryPig1" data-slide-to={1}></li>
                                                )}
                                            </ol>
                                            <div class="carousel-inner">
                                                <div class="item active">
                                                    {pigDetail && pigDetail.hinh_anh_1 ? (
                                                        <img
                                                            title={pigDetail.ma_so_ca_the}
                                                            src={pigDetail.hinh_anh_1}
                                                            alt={pigDetail.ma_so_ca_the}
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "450px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            title="Không Có Ảnh"
                                                            src="/images/user/preview.png"
                                                            alt="Không Có Ảnh"
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "450px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div class="item">
                                                    {pigDetail && pigDetail.hinh_anh_1 ? (
                                                        <img
                                                            title={pigDetail.ma_so_ca_the}
                                                            src={pigDetail.hinh_anh_2}
                                                            alt={pigDetail.ma_so_ca_the}
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "450px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    ) : (
                                                        <img
                                                            title="Không Có Ảnh"
                                                            src="/images/user/preview.png"
                                                            alt="Không Có Ảnh"
                                                            style={{
                                                                cursor: "pointer",
                                                                width: "100%",
                                                                height: "450px",
                                                                objectFit: "cover",
                                                                display: "inline-block",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <a title="Ảnh Trước" class="left carousel-control" href="#galleryPig1" data-slide="prev">
                                                <span class="glyphicon glyphicon-chevron-left"></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a title="Ảnh Sau" class="right carousel-control" href="#galleryPig1" data-slide="next">
                                                <span class="glyphicon glyphicon-chevron-right"></span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="w3-col l8" style={{ border: "1px solid black", borderRadius: "5px" }}>
                                        <h4 style={{ margin: 5, padding: 5, fontSize: 23 }}>Individual Code: {pigDetail.ma_so_ca_the}</h4>
                                        <hr style={{ margin: 3, padding: 3 }}></hr>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Age: {pigDetail.tuoi}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Sex: {pigDetail.gioi_tinh}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>
                                            - Weight (kg): {pigDetail.trong_luong_co_the_kg}
                                        </p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Farm: {pigDetail.dia_diem_danh_gia}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Assessor: {pigDetail.nguoi_danh_gia}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>
                                            - White Spot In Forehead: {pigDetail.nhan_trung_trang}
                                        </p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Cat Ear: {pigDetail.tai_meo}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Snout: {pigDetail.mom}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>
                                            - White Band Around Snout: {pigDetail.vanh_trang_quanh_mom}
                                        </p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>
                                            - Additional Black Spotted: {pigDetail.khoang_den_phu}
                                        </p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Back Form: {pigDetail.kieu_lung_bung}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Leg: {pigDetail.chan}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Tail Form: {pigDetail.kieu_duoi}</p>
                                        <p style={{ margin: 0, padding: 0, fontSize: 18 }}>- Evaluation Date: {pigDetail.ngay_danh_gia}</p>
                                    </div>
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
