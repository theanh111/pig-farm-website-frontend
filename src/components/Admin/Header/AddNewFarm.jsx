import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../../../firebase/index";
import { Drawer, Form, Button, Input, Space, notification, Card, Modal, message } from "antd";

import Loader from "../../Loader/Loader";
import { saveFarm } from "../../../api/farm";

const AddNewFarm = (props) => {
    const history = useNavigate();
    const { viewAddNewFarm, closeDrawer, fetchData } = props;
    const [viewEndOfSession, setViewEndOfSession] = useState(false);
    const [viewLoader, setViewLoader] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const [farm, setFarm] = useState({ farmName: "", farmImage: "" });
    const onCloseDrawer = () => {
        closeDrawer();
    };

    const handleCloseConfirm = () => {
        showModal();
    };

    const handleCloseDrawer = () => {
        showModal();
    };

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

    const [image, setImage] = useState("");
    const [errorMessgae, setErrorMessage] = useState("");
    const [url, setUrl] = useState("");

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
                    setFarm({ ...farm, farmImage: res });
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
        if (farm) {
            if (farm.farmName !== "" && farm.farmImage !== "") {
                let obj = { ten_trang_trai: farm.farmName, hinh_anh: farm.farmImage };
                saveFarmAPI(obj);
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

    const saveFarmAPI = async (farm) => {
        await saveFarm(farm)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Lưu cơ sở chăn nuôi thành công");
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
                    title="Thêm Cơ Sở Chăn Nuôi"
                    width="40%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewFarm}
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
                            name="farm-name"
                            label="Tên Cở Sở Chăn Nuôi"
                            rules={[{ required: true, message: "Xin vui lòng nhập tên cơ sở chăn nuôi" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setFarm({ ...farm, farmName: e.target.value })}
                                placeholder="Nhập tên cơ sở chăn nuôi ..."
                            />
                        </Form.Item>
                        <h4>Hình Ảnh</h4>
                        <Form.Item name="farm-image" rules={[{ required: true, message: "Xin vui lòng nhập ảnh cơ sở" }]}>
                            {url !== "" ? (
                                <>
                                    <span>Xem trước ảnh</span>
                                    <div
                                        style={{
                                            verticalAlign: "middle",
                                            textAlign: "center",
                                            border: "solid 1px",
                                            height: "400px",
                                            width: "700px",
                                        }}
                                    >
                                        <img
                                            style={{
                                                marginTop: "auto",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                            src={url}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span>Xem trước ảnh</span>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            border: "solid 1px",
                                            align: "center",
                                            height: "400px",
                                            width: "700px",
                                        }}
                                    >
                                        <img
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "100%",
                                                objectFit: "cover",
                                                display: "inline-block",
                                            }}
                                            src={"/images/user/preview.png"}
                                        />
                                    </div>
                                </>
                            )}

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

export default AddNewFarm;
