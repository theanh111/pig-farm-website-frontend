import React, { useState, useEffect } from "react";
import AdminNavbar from "../Header/AdminNavbar";
import { Layout, Breadcrumb, Modal, message, Card, Select } from "antd";
import AdminHeader from "../Header/AdminHeader";
import { Link } from "react-router-dom";
import { getAllPig, getAllPigNotSpecial, getPigSpecial, updatePigSpecial } from "../../../api/pig";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../../api/auth";

const { Option } = Select;
const { Content } = Layout;

const jwt = require("jsonwebtoken");

const imageStyle = {
    height: "150px",
    width: "100%",
    objectFit: "cover",
    display: "inline-block",
};

const cardStyle = {
    cursor: "pointer",
    textAlign: "center",
    height: "200px",
    width: "33.3%",
};

const cellStyle = {
    fontSize: 20,
    border: "1px dashed #006544",
    height: "150px",
    paddingTop: 60,
};

const pigCode = {
    fontWeight: 600,
    position: "absolute",
    zIndex: 10,
}


const AdminPigsSpecial = (props) => {
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    const [viewConfirm, setViewConfirm] = useState(false);
    const [viewUpdatePigSpecial, setViewUpdatePigSpecial] = useState(false);
    const [positionNumber, setPositionNumber] = useState(null);
    const [viewPigDetail, setViewPigDetail] = useState(false);
    const [viewAddNewPigImport, setViewAddNewPigImport] = useState(false);
    const [data, setData] = useState([]);
    const [listPigSpecial, setListPigSpecial] = useState([]);
    const [listPigNotSpecial, setListPigNotSpecial] = useState([]);
    const [viewEditPig, setViewEditPig] = useState(false);
    const [dataEditPig, setDataEditPig] = useState({});
    const [dataDeletePig, setDataDeletePig] = useState({});
    const [userCurrent, setUserCurrent] = useState("");
    const [pigSpecialUpdate, setPigSpecialUpdate] = useState({
        id_new: null,
        id_old: null,
        vi_tri_cap_nhat: null,
    });
    const [pig1, setPig1] = useState({});
    const [pig2, setPig2] = useState({});
    const [pig3, setPig3] = useState({});
    const [pig4, setPig4] = useState({});
    const [pig5, setPig5] = useState({});
    const [pig6, setPig6] = useState({});
    const [pig7, setPig7] = useState({});
    const [pig8, setPig8] = useState({});
    const [pig9, setPig9] = useState({});
    const [pig10, setPig10] = useState({});
    const [pig11, setPig11] = useState({});
    const [pig12, setPig12] = useState({});

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const backToLogin = () => {
        localStorage.removeItem("token");
        history("/dang-nhap");
    };

    const fetchData = () => {
        getAllPigNotSpecialAPI();
        getPigSpecialAPI();
    };

    const getAllPigNotSpecialAPI = async () => {
        await getAllPigNotSpecial()
        .then((res) => {
            let result = res.data.data;
            if (result) {
                if (result.length > 0) {
                    setListPigNotSpecial(result);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getPigSpecialAPI = async () => {
        setPig1(null);
        setPig2(null);
        setPig3(null);
        setPig4(null);
        setPig5(null);
        setPig6(null);
        setPig7(null);
        setPig8(null);
        setPig9(null);
        setPig10(null);
        setPig11(null);
        setPig12(null);
        setViewLoader(true);
        await getPigSpecial()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        setData(result);
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].vi_tri_tieu_bieu === 1) {
                                setPig1(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 2) {
                                setPig2(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 3) {
                                setPig3(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 4) {
                                setPig4(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 5) {
                                setPig5(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 6) {
                                setPig6(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 7) {
                                setPig7(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 8) {
                                setPig8(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 9) {
                                setPig9(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 10) {
                                setPig10(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 11) {
                                setPig11(result[i]);
                            }
                            if (result[i].vi_tri_tieu_bieu === 12) {
                                setPig12(result[i]);
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    const checkTokenAPI = async () => {
        let token = localStorage.getItem("token");
        if (token) {
            await checkToken(token)
                .then((res) => {
                    if (res.status) {
                        if (res.status !== 200) {
                            backToLogin();
                        }
                    }
                })
                .catch((err) => {
                    backToLogin();
                    console.log(err);
                });
        } else {
            backToLogin();
        }
    };

    const getUserCurrent = () => {
        setUserCurrent("");
        let token = localStorage.getItem("token");
        if (token) {
            let objJwt = jwt.decode(token);
            let user = objJwt.sub;
            setUserCurrent(user);
        }
    };

    const getAllPigAPI = async () => {
        setData([]);
        setViewLoader(true);
        await getAllPig()
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
        setViewLoader(false);
    };

    const updatePigSpecialAPI = async (pig_special) => {
        setViewLoader(true);
        await updatePigSpecial(pig_special)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật cá thể tiêu biểu thành công!");
                        setViewConfirm(false);
                        sleep(500).then(() => {
                            setViewLoader(false);
                            setDataDeletePig({});
                            getPigSpecialAPI();
                        });
                    } else if (res.status == 400) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    } else if (res.status == 401) {
                        localStorage.removeItem("token");
                        alert("Hết phiên đăng nhập");
                        history("/dang-nhap");
                    }
                }
            })
            .catch((err) => {
                alert("Hết phiên đăng nhập");
                history("/dang-nhap");
            });
        setViewLoader(false);
    };

    useEffect(() => {
        document.title = "Danh Sách Cá Thể Tiêu Biểu - Admin";
        checkTokenAPI();
        getUserCurrent();
        getAllPigAPI();
        fetchData();
    }, []);

    const handleClickCard = (position) => {
        setViewUpdatePigSpecial(true);
        setPositionNumber(position)
        if (position) {
            let obj = eval("pig" + position);
            console.log(eval("pig" + position))
            if (obj) {
                setPigSpecialUpdate({ ...pigSpecialUpdate, vi_tri_cap_nhat: position, id_old: obj.id });
            
            } else {
                setPigSpecialUpdate({ ...pigSpecialUpdate, vi_tri_cap_nhat: position, id_new: pigSpecialUpdate.id_new });
            }
        }

    };

    const handleUpdatePigSpecial = () => {
        checkTokenAPI();
        setPigSpecialUpdate({ vi_tri_cap_nhat: null, id_new: null, id_old: null });
        setViewUpdatePigSpecial(false);
        setPositionNumber(null);
    };

    const handleUpdate = () => {
        updatePigSpecialAPI(pigSpecialUpdate)
        setViewUpdatePigSpecial(false);
    };

    return (
        <>
          
            {viewUpdatePigSpecial ? (
                <Modal
                    centered
                    okType="primary"
                    style={{ zIndex: 9 }}
                    title={<span style={{ color: "green" }}>Cập nhật cá thể ở vị trí: <strong style={{color: "black"}}>{positionNumber}</strong></span>}
                    visible={viewUpdatePigSpecial}
                    onOk={() => handleUpdate(pigSpecialUpdate)}
                    onCancel={() => handleUpdatePigSpecial()}
                    cancelText="Hủy"
                    okText="Cập Nhật"
                >
                    <p style={{ fontSize: 14, fontWeight: 500 }}>{dataDeletePig.ma_so_ca_the}</p>
                    <Select
                        allowClear
                        showSearch
                        style={{ width: "100%" }}
                        placeholder={<span style={{ fontSize: 12, color: "grey" }}>Chọn mã số cá thể...</span>}
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                        onChange={(value) => setPigSpecialUpdate({ ...pigSpecialUpdate, id_new: value })}
                    >
                        {listPigNotSpecial ? listPigNotSpecial.map((item, index) => <Option value={item.id}>{item.ma_so_ca_the}</Option>) : null}
                    </Select>
                </Modal>
            ) : null}

            <Layout style={{ minHeight: "100vh" }}>
                <AdminNavbar />
                <Layout className="site-layout">
                    <AdminHeader />
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>
                                <Link to="/admin"> MONGCAIPIG</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Danh Sách Cá Thể Tiêu Biểu ({data ? data.length : 0})</Breadcrumb.Item>
                        </Breadcrumb>

                        {viewLoader ? (
                            <Loader />
                        ) : (
                            <>
                                <div id="content-fix">
                                    <div class="w3-content" style={{ maxWidth: "1000px" }}>
                                        <div class="w3-row-padding">
                                            <div class="w3-col m12">
                                                <Card title="12 Cá Thể Hiển Thị" size="small">
                                                    <Card.Grid onClick={() => handleClickCard(1)} style={cardStyle}>
                                                        {pig1 ? (pig1.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig1.ma_so_ca_the} style={imageStyle} src={pig1.hinh_anh_1} />
                                                            <div style={pigCode}><p style={{textAlign: "center"}}>{pig1.ma_so_ca_the}</p></div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig1.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>1</h1>
                                                        )}   
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(2)} style={cardStyle}>
                                                        {pig2 ? (pig2.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig2.ma_so_ca_the} style={imageStyle} src={pig2.hinh_anh_1} />
                                                            <div style={pigCode}>{pig2.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig2.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>2</h1>
                                                        )}                                                       
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(3)} style={cardStyle}>
                                                        {pig3 ? (pig3.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig3.ma_so_ca_the} style={imageStyle} src={pig3.hinh_anh_1} />
                                                            <div style={pigCode}>{pig3.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig3.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>3</h1>
                                                        )}    
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(4)} style={cardStyle}>
                                                        {pig4 ? (pig4.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig4.ma_so_ca_the} style={imageStyle} src={pig4.hinh_anh_1} />
                                                            <div style={pigCode}>{pig4.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig4.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>4</h1>
                                                        )}  
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(5)} style={cardStyle}>
                                                        {pig5 ? (pig5.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig5.ma_so_ca_the} style={imageStyle} src={pig5.hinh_anh_1} />
                                                            <div style={pigCode}>{pig5.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig5.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>5</h1>
                                                        )}  
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(6)} style={cardStyle}>
                                                        {pig6 ? (pig6.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig6.ma_so_ca_the} style={imageStyle} src={pig6.hinh_anh_1} />
                                                            <div style={pigCode}>{pig6.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig6.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>6</h1>
                                                        )}  
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(7)} style={cardStyle}>
                                                        {pig7 ? (pig7.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig7.ma_so_ca_the} style={imageStyle} src={pig7.hinh_anh_1} />
                                                            <div style={pigCode}>{pig7.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig7.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>7</h1>
                                                        )} 
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(8)} style={cardStyle}>
                                                        {pig8 ? (pig8.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig8.ma_so_ca_the} style={imageStyle} src={pig8.hinh_anh_1} />
                                                            <div style={pigCode}>{pig8.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig8.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>8</h1>
                                                        )} 
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(9)} style={cardStyle}>
                                                        {pig9 ? (pig9.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig9.ma_so_ca_the} style={imageStyle} src={pig9.hinh_anh_1} />
                                                            <div style={pigCode}>{pig9.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig9.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>9</h1>
                                                        )} 
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(10)} style={cardStyle}>
                                                        {pig10 ? (pig10.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig10.ma_so_ca_the} style={imageStyle} src={pig10.hinh_anh_1} />
                                                            <div style={pigCode}>{pig10.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig10.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>10</h1>
                                                        )} 
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(11)} style={cardStyle}>
                                                        {pig11 ? (pig11.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig11.ma_so_ca_the} style={imageStyle} src={pig11.hinh_anh_1} />
                                                            <div style={pigCode}>{pig11.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig11.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>11</h1>
                                                        )} 
                                                    </Card.Grid>
                                                    <Card.Grid onClick={() => handleClickCard(12)} style={cardStyle}>
                                                        {pig12 ? (pig12.hinh_anh_1 ? (
                                                        <>
                                                            <img title={pig12.ma_so_ca_the} style={imageStyle} src={pig12.hinh_anh_1} />
                                                            <div style={pigCode}>{pig12.ma_so_ca_the}</div>
                                                        </>
                                                        ) : (
                                                            <h1 style={cellStyle}>{pig12.ma_so_ca_the}</h1>
                                                        )) : (
                                                            <h1 style={cellStyle}>12</h1>
                                                        )} 
                                                    </Card.Grid>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AdminPigsSpecial;
