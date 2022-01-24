import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../../../firebase/index";
import { Drawer, Form, Button, Input, Space, Modal, message, Select, Divider } from "antd";

import Loader from "../../Loader/Loader";
import { saveGallery } from "../../../api/gallery";

const jwt = require("jsonwebtoken");
const { Option } = Select;

const AddNewGallery = (props) => {
    const history = useNavigate();
    const { viewAddNewFarm, closeDrawer, fetchData, userCurrent } = props;
    const [viewLoader, setViewLoader] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const [image, setImage] = useState("");
    const [errorMessgae, setErrorMessage] = useState("");
    const [url, setUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [gallery, setGallery] = useState({ imageName: "", imageType: "", imageUrl: "", whoEntered: "" });
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
                    setGallery({ ...gallery, imageUrl: res });
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

    const handleSaveGallery = () => {
        if (gallery) {
            if (gallery.imageName !== "" && gallery.imageType !== "" && gallery.imageUrl !== "" && userCurrent !== "") {
                let obj = {
                    ten_anh: gallery.imageName,
                    the_loai: gallery.imageType,
                    hinh_anh: gallery.imageUrl,
                    nguoi_nhap: userCurrent,
                };
                saveGalleryAPI(obj);
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

    const saveGalleryAPI = async (gallery) => {
        await saveGallery(gallery)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Lưu ảnh trình chiếu thành công");
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

    const getUserCurrent = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let objJwt = jwt.decode(token);
            let user = objJwt.sub;
            setGallery({ ...gallery, whoEntered: user });
        }
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    useEffect(() => {
        getUserCurrent();
    }, []);

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
                    title="Thêm Ảnh Trình Chiếu"
                    width="60%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewFarm}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button onClick={handleSaveGallery} disabled={disabledSave} onClose={() => handleCloseConfirm()} type="primary">
                                Lưu
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Divider orientation="left" plain>
                            Tên Ảnh
                        </Divider>
                        <Form.Item name="image-name" rules={[{ required: true, message: "Xin vui lòng nhập tên ảnh!" }]}>
                            <Input
                                autoComplete="off"
                                onChange={(e) => setGallery({ ...gallery, imageName: e.target.value })}
                                placeholder="VD: Ảnh nghiên cứu lợn móng cái"
                            />
                        </Form.Item>
                        <Divider orientation="left" plain>
                            Thể Loại
                        </Divider>
                        <Form.Item name="image-type" rules={[{ required: true, message: "Xin vui lòng nhập thể loại!" }]}>
                            <Select
                                placeholder="Chọn Thể Loại"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                filterSort={(optionA, optionB) =>
                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                                onChange={(value) => setGallery({ ...gallery, imageType: value })}
                            >
                                <Option value="Nhóm Nghiên Cứu">Nhóm Nghiên Cứu</Option>
                                <Option value="Cá Thể">Cá Thể</Option>
                                <Option value="Trang Trại">Trang Trại</Option>
                            </Select>
                        </Form.Item>
                        <Divider orientation="left" plain>
                            Hình Ảnh
                        </Divider>
                        <Form.Item name="image-url" rules={[{ required: true, message: "Xin vui lòng nhập ảnh trình chiếu!" }]}>
                            {url !== "" ? (
                                <>
                                    <span>Xem trước ảnh</span>
                                    <div
                                        style={{
                                            verticalAlign: "middle",
                                            textAlign: "center",
                                            border: "solid 1px",
                                            height: "300px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            style={{
                                                marginTop: "auto",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                height: "300px",
                                                width: "100%",
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
                                            height: "300px",
                                            width: "100%",
                                        }}
                                    >
                                        <img
                                            style={{
                                                height: "300px",
                                                width: "100%",
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

export default AddNewGallery;
