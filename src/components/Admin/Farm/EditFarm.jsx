import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../../../firebase/index";
import { Drawer, Form, Button, Input, Space, Modal, message } from "antd";

import Loader from "../../Loader/Loader";
import { updateFarm } from "../../../api/farm";

const EditFarm = (props) => {
    const history = useNavigate();
    const [dataSubmit, setDataSubmit] = useState({});
    const { viewEditFarm, closeDrawer, fetchData, id, ma_trang_trai, ten_trang_trai, hinh_anh, userCurrent } = props;
    const [viewLoader, setViewLoader] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const [image, setImage] = useState("");
    const [errorMessgae, setErrorMessage] = useState("");
    const [url, setUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onCloseDrawer = () => {
        closeDrawer();
    };

    const handleCloseConfirm = () => {
        showModal();
    };

    const handleCloseDrawer = () => {
        showModal();
    };

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

    const upload = async () => {
        setViewLoader(true);
        if (image == null) return;

        const imageRef = storage.ref(`/images/${image.name}`);
        imageRef.child(`/images/${image.name}`).getDownloadURL();
        // .then((res) => console.log(res));

        await imageRef
            .put(image)
            .then(() => {})
            .catch((error) => {
                setErrorMessage(error);
                throw error;
            });

        const url = await imageRef
            .getDownloadURL()
            .then((res) => {
                if (res) {
                    setDataSubmit({ ...dataSubmit, farmImage: res });
                    setUrl(res);
                    setUploadBtn(false);
                    setDisabledSave(false);
                    setViewLoader(false);
                }
            })
            .catch((error) => {
                setErrorMessage(error);
                throw error;
            });
    };

    const handleSaveFarm = () => {
        if (dataSubmit) {
            if (dataSubmit.farmId !== null && dataSubmit.farmCode !== "" && dataSubmit.farmName !== "" && dataSubmit.farmImage !== "") {
                let obj = {
                    id: dataSubmit.farmId,
                    ma_trang_trai: dataSubmit.farmCode,
                    ten_trang_trai: dataSubmit.farmName,
                    hinh_anh: dataSubmit.farmImage,
                    nguoi_cap_nhat: userCurrent,
                };
                updateFarmAPI(obj);
            }
        }
    };

    const handleChangeUploadFile = (e) => {
        setViewLoader(true);
        if (e.target.files[0].type.indexOf("image") == -1) {
            setErrorMessage("Định dạng file không đúng xin thử lại!");
            setViewLoader(false);
        } else {
            setErrorMessage("");
            setUploadBtn(true);
            setImage(e.target.files[0]);
            setViewLoader(false);
        }
    };

    const updateFarmAPI = async (farm) => {
        await updateFarm(farm)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật cơ sở chăn nuôi thành công");
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
                alert("Hết phiên đăng nhập");
                history("/dang-nhap");
            });
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    useEffect(() => {
        const fetchData2 = () => {
            setDataSubmit({
                farmId: id,
                farmCode: ma_trang_trai,
                farmName: ten_trang_trai,
                farmImage: hinh_anh,
            });
        };
        fetchData2();
    }, [id, ma_trang_trai, ten_trang_trai, hinh_anh]);

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
                    title="Cập Nhật Cơ Sở Chăn Nuôi"
                    width="60%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewEditFarm}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button onClick={handleSaveFarm} disabled={disabledSave} onClose={() => handleCloseConfirm()} type="primary">
                                Lưu
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item
                            name="farm-code"
                            label={<h4>Mã Cở Sở Chăn Nuôi</h4>}
                            rules={[{ required: true, message: "Xin vui lòng nhập mã cơ sở chăn nuôi" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={({ target: { value } }) => {
                                    setDisabledSave(false);
                                    setDataSubmit({ ...dataSubmit, farmCode: value });
                                }}
                                placeholder="Nhập mã cơ sở chăn nuôi ..."
                                value={dataSubmit.farmCode}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.farmCode}</span>
                        </Form.Item>
                        <Form.Item
                            name="farm-name"
                            label={<h4>Tên Cở Sở Chăn Nuôi</h4>}
                            rules={[{ required: true, message: "Xin vui lòng nhập tên cơ sở chăn nuôi" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={({ target: { value } }) => {
                                    setDisabledSave(false);
                                    setDataSubmit({ ...dataSubmit, farmName: value });
                                }}
                                placeholder="Nhập tên cơ sở chăn nuôi ..."
                                value={dataSubmit.farmName}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.farmName}</span>
                        </Form.Item>
                        <h4>Hình Ảnh</h4>
                        <Form.Item name="farm-image" rules={[{ required: true, message: "Xin vui lòng nhập ảnh cơ sở" }]}>
                            <span>Xem trước ảnh</span>
                            <div
                                style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                    border: "solid 1px",
                                    height: "400px",
                                    width: "100%",
                                }}
                            >
                                <img
                                    style={{
                                        marginTop: "auto",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        height: "400px",
                                        width: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                    src={dataSubmit.farmImage}
                                />
                            </div>

                            <input
                                id="input-file-btn"
                                accept="image/png, image/gif, image/jpeg"
                                type="file"
                                onChange={(e) => {
                                    handleChangeUploadFile(e);
                                }}
                            />
                            {errorMessgae !== "" ? (
                                <>
                                    <div style={{ color: "red" }}>{errorMessgae}</div>
                                </>
                            ) : null}

                            {uploadBtn ? <Button onClick={upload}>Tải Hình Ảnh</Button> : null}
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default EditFarm;
