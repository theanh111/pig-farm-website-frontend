import React, { useEffect, useState } from "react";
import { getAllPig, getPigByFilter } from "../../api/pig";
import { Row, Col, Breadcrumb, Layout, Select, Image, Table, Tooltip } from "antd";
import { NavigationENG } from "../Navigation/NavigationENG";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { FooterENG } from "../Footer/FooterENG";
import { PigFilterENG } from "./PigFilterENG";

const { Option } = Select;
const { Content } = Layout;

export const PigPageENG = () => {
    const [pig, setPig] = useState([]);
    const [pigSearch, setPigSearch] = useState([]);
    const [viewLoader, setViewLoader] = useState(false);

    const getAllPigAPI = async () => {
        setViewLoader(true);
        await getAllPig()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    setPig(result);
                    setPigSearch(result);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    const fetchDataSearchAPI = (pig) => {
        getAllPigByFilterAPI(pig);
    };

    const getAllPigByFilterAPI = async (pig) => {
        setViewLoader(true);
        await getPigByFilter(pig)
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
        setViewLoader(false);
    };

    const handleDataSearchByFilter = (arr) => {
        setViewLoader(true);
        setPigSearch([]);
        setPigSearch(arr);
        setViewLoader(false);
    };

    const fetchData = () => {
        getAllPigAPI();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Pig Indivuduals";
        fetchData();
    }, []);

    const columns = [
        {
            title: (record) => <span style={{ fontSize: 12 }}>Individual Code</span>,
            key: "ma_so_ca_the",
            width: "100px",
            render: (record) => (
                <>
                    <Link to={"/pig-indivuduals/" + record.id}>
                        <Tooltip title="Click To See Detail">
                            <div style={{ cursor: "pointer", fontWeight: 700, color: "#34568B" }}>{record.ma_so_ca_the}</div>
                        </Tooltip>
                    </Link>
                </>
            ),
            fixed: "left",
            height: "100px",
            align: "center",
        },

        // {
        //     title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Hình Ảnh 1</span>,
        //     key: "hinh_anh_1",
        //     height: "100px",
        //     width: "100px",
        //     render: (record) => {
        //         return (
        //             <Image style={{ width: "70px", height: "70px", objectFit: "cover", display: "inline-block" }} src={record.hinh_anh_1} />
        //         );
        //     },
        //     fixed: "left",
        //     align: "center",
        // },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Sex</span>,
            dataIndex: "gioi_tinh",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>White Spot In Forehead</span>,
            dataIndex: "nhan_trung_trang",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Cat Ear</span>,
            dataIndex: "tai_meo",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Snout</span>,
            dataIndex: "mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>White Band Around Snout</span>,
            dataIndex: "vanh_trang_quanh_mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Eyes</span>,
            dataIndex: "mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Black Patch On Body</span>,
            dataIndex: "da_co_khoang_den",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Additional Black Spotted</span>,
            dataIndex: "khoang_den_phu",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Back Form</span>,
            dataIndex: "kieu_lung_bung",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Leg</span>,
            dataIndex: "chan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Face</span>,
            dataIndex: "da_mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Tail Form</span>,
            dataIndex: "kieu_duoi",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Ear Form</span>,
            dataIndex: "kieu_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Ear Direction</span>,
            dataIndex: "huong_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Fur Structure</span>,
            dataIndex: "kieu_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Fur Color</span>,
            dataIndex: "loai_mau_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12, alignContent: "center" }}>Head Form</span>,
            dataIndex: "hinh_dang_dau",
            height: "100px",
            width: "100px",
        },
    ];

    return (
        <>
            <NavigationENG />
            <>
                <div id="wrapper">
                    <div id="content-fix">
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-22">
                                <div class="w3-col m12">
                                    <Content style={{ padding: 10 }}>
                                        <Breadcrumb>
                                            <Breadcrumb.Item className="txt">
                                                <Link to="/homepage">Homepage</Link>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item className="txt">
                                                <Link to="/pig-indivuduals">Pig Indivuduals ({pigSearch ? pigSearch.length : 0})</Link>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </Content>
                                </div>
                            </div>
                        </div>

                        <Row align="middle" justify="center">
                            <Col xs={20}>
                                <div>
                                    <>
                                        <PigFilterENG
                                            fetchData={() => fetchData()}
                                            handleDataSearchByFilter={(arr) => handleDataSearchByFilter(arr)}
                                            pig={pig}
                                            pigSearch={pigSearch}
                                            fetchDataSearchAPI={(pig) => fetchDataSearchAPI(pig)}
                                        />
                                    </>
                                </div>
                                {viewLoader ? (
                                    <Loader />
                                ) : (
                                    <Table
                                        scroll={{ x: 800 }}
                                        className="table-view-data"
                                        size="small"
                                        bordered
                                        dataSource={pigSearch}
                                        columns={columns}
                                        pagination={{
                                            pageSizeOptions: [5, 10, 20],
                                        }}
                                    />
                                )}
                            </Col>
                        </Row>
                    </div>
                    <FooterENG />
                </div>
            </>
        </>
    );
};
