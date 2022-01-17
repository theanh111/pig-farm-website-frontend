import React, { useState } from "react";
import { Drawer, Button, Space, Table, Modal, message, Divider } from "antd";
import { EyeOutlined, PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { savePigImport } from "../../../api/pig";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

const AddNewPigImport = (props) => {
    const { fetchData } = props;
    const history = useNavigate();
    const [viewLoader, setViewLoader] = useState(false);
    // on change states
    const [excelFile, setExcelFile] = useState(null);
    const [viewSendButton, setViewSendButton] = useState(true);
    const [viewSaveButton, setViewSaveButton] = useState(true);
    const [excelFileError, setExcelFileError] = useState(null);

    // submit
    const [excelData, setExcelData] = useState(null);
    // it will contain array of objects

    // handle File
    const fileType = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                    setViewSendButton(false);
                };
            } else {
                setExcelFileError("Vui lòng chọn file excel!");
                setExcelFile(null);
            }
        } else {
            console.log("plz select your file");
        }
    };

    // submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: "buffer" });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    };
    const { viewAddNewPigImport, closeDrawer } = props;
    const onCloseDrawer = () => {
        closeDrawer();
    };

    const handleCloseConfirm = () => {
        showModal();
    };

    const handleCloseDrawer = () => {
        showModal();
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const handleSaveDataImport = async () => {
        if (excelData) {
            if (excelData.length > 0) {
                let obj = { data: excelData };
                await savePigImport(obj)
                    .then((res) => {
                        if (res) {
                            if (res.status == 200) {
                                if (res.data.data.dataFailed) {
                                    let dataFailed = res.data.data.dataFailed;
                                    if (dataFailed.length > 0) {
                                        message.error("Danh sách mã cá thể lỗi: " + dataFailed);
                                    } else {
                                        message.success("Lưu file thành công");
                                    }
                                }
                                setViewLoader(true);
                                sleep(500).then(() => {
                                    setViewLoader(false);
                                    closeDrawer();
                                    fetchData();
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
                        if (err.response) {
                            // Request made and server responded
                            // console.log(err.response.data);
                            // alert(err.response.data.message);
                            console.log(err.response.data.message);
                        } else if (err.request) {
                            // The request was made but no response was received
                            console.log(err.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log(err);
                        }
                    });
            }
        }
    };

    const columns = [
        {
            title: (record) => <span style={{ fontSize: 12 }}>Dấu Thời Gian</span>,
            dataIndex: "dau_thoi_gian",
            width: "100px",
            height: "100px",
            fixed: "left",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mã Số Cá Thể</span>,
            key: "ma_so_ca_the",
            width: "100px",
            render: (record) => (
                <div
                    style={{ cursor: "pointer", fontWeight: 700, color: "#f95d01" }}
                    dangerouslySetInnerHTML={{ __html: record.ma_so_ca_the }}
                ></div>
            ),
            fixed: "left",
            height: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Tuổi</span>,
            dataIndex: "tuoi",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Người Đánh Giá</span>,
            dataIndex: "nguoi_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Địa Điểm Đánh Giá</span>,
            dataIndex: "dia_diem_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Ngày Đánh Giá</span>,
            dataIndex: "ngay_danh_gia",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Giới Tính</span>,
            dataIndex: "gioi_tinh",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Nhân Trung Trắng</span>,
            dataIndex: "nhan_trung_trang",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Tai Mèo</span>,
            dataIndex: "tai_meo",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mõm</span>,
            dataIndex: "mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Vành Trắng Quanh Mõm</span>,
            dataIndex: "vanh_trang_quanh_mom",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Mắt</span>,
            dataIndex: "mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Da Có Khoang Đen</span>,
            dataIndex: "da_co_khoang_den",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Khoang Đen Phụ</span>,
            dataIndex: "khoang_den_phu",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Kiểu Lưng Bụng</span>,
            dataIndex: "kieu_lung_bung",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chân</span>,
            dataIndex: "chan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Da Mắt</span>,
            dataIndex: "da_mat",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Kiểu Đuổi</span>,
            dataIndex: "kieu_duoi",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Kiểu Tai</span>,
            dataIndex: "kieu_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hướng Tai</span>,
            dataIndex: "huong_tai",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Lông</span>,
            dataIndex: "long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Loại Màu Lông</span>,
            dataIndex: "loai_mau_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Dạng Đầu</span>,
            dataIndex: "hinh_dang_dau",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Trọng Lượng Cơ Thể (kg)</span>,
            dataIndex: "trong_luong_co_the_kg",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Dài Đầu (cm)</span>,
            dataIndex: "chieu_dai_dau_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Dài Đuôi (cm)</span>,
            dataIndex: "chieu_dai_duoi_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Rộng Ngực (cm)</span>,
            dataIndex: "chieu_rong_nguc_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Cao Thân Tại Chân Trước (cm)</span>,
            dataIndex: "chieu_cao_than_tai_chan_truoc_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Dài Cơ Thể (cm)</span>,
            dataIndex: "chieu_dai_co_the_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Dài Tai (cm)</span>,
            dataIndex: "chieu_dai_tai_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chiều Rộng Thân Tại Xương Chậu (cm)</span>,
            dataIndex: "chieu_rong_than_tai_xuong_chau_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Chu Vi Cổ Chân (cm)</span>,
            dataIndex: "chu_vi_co_chan_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Độ Rộng Dải Trắng Vắt Vai (cm)</span>,
            dataIndex: "do_rong_dai_trang_vat_vai_cm",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Số Bầu Vú</span>,
            dataIndex: "so_bau_vu",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Loại Con Giống</span>,
            dataIndex: "loai_con_giong",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Số Con Trong Đàn</span>,
            dataIndex: "so_con_trong_dan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Số Con Đực Trong Đàn</span>,
            dataIndex: "so_con_duc_trong_dan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Số Con Cái Trong Đàn</span>,
            dataIndex: "so_con_cai_trong_dan",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Ảnh 1</span>,
            dataIndex: "hinh_anh_1",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Ảnh 2</span>,
            dataIndex: "hinh_anh_2",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Hình Dạng Lông</span>,
            dataIndex: "hinh_dang_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Độ Dài Lông</span>,
            dataIndex: "do_dai_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Độ Dày Lông</span>,
            dataIndex: "do_day_long",
            height: "100px",
            width: "100px",
        },
        {
            title: (record) => <span style={{ fontSize: 12 }}>Phả Hệ</span>,
            dataIndex: "pha_he",
            height: "100px",
            width: "100px",
        },
    ];

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        onCloseDrawer();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <>
                {viewLoader ? <Loader /> : null}
                <Modal
                    centered
                    okType="danger"
                    style={{ zIndex: 9 }}
                    title="Thông Báo"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Hủy"
                    okText="Đóng"
                >
                    <p style={{ fontSize: 18 }}>Bạn có chắc muốn thoát?</p>
                </Modal>
                <Drawer
                    title="Thêm Cá Thể Import Excel"
                    width="90%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewPigImport}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Link to="/file/mongcaipig-mau-import.xlsx" target="_blank" download>
                                <Button style={{ marginTop: 5 + "px" }}>
                                    <DownloadOutlined />
                                    Tải Xuống Mẫu Import
                                </Button>
                            </Link>
                            <Button
                                disabled={viewSaveButton}
                                onClick={handleSaveDataImport}
                                onClose={() => handleCloseConfirm()}
                                type="primary"
                            >
                                <PlusOutlined /> Import Dữ Liệu
                            </Button>
                        </Space>
                    }
                >
                    {/* upload file section */}

                    <div className="form" style={{ paddingBottom: 10 }}>
                        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
                            <Divider orientation="left" plain>
                                Tải Lên File
                            </Divider>
                            <input
                                type="file"
                                className="form-control"
                                style={{ cursor: "pointer" }}
                                style={{ marginRight: 90, border: "none", boxShadow: "none", cursor: "pointer" }}
                                onChange={handleFile}
                                required
                            ></input>
                            {excelFileError && (
                                <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                                    {excelFileError}
                                </div>
                            )}
                            <button
                                onClick={() => setViewSaveButton(false)}
                                disabled={viewSendButton}
                                type="submit"
                                className="btn btn-primary"
                                style={{ marginTop: 5 + "px" }}
                            >
                                <EyeOutlined /> Xem trước dữ liệu
                            </button>
                        </form>
                    </div>

                    {/* view file section */}
                    <Divider orientation="left" plain>
                        Xem trước dữ liệu tải lên
                    </Divider>
                    <div className="viewer">
                        {excelData === null && <>Chưa có file</>}
                        {excelData !== null && (
                            <>
                                <Table
                                    size="small"
                                    className="table-view-data"
                                    bordered
                                    scroll={{ x: "calc(700px + 50%)" }}
                                    columns={columns}
                                    dataSource={excelData}
                                ></Table>
                            </>
                        )}
                    </div>
                </Drawer>
            </>
        </>
    );
};

export default AddNewPigImport;
