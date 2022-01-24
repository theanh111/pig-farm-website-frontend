import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message, Divider } from "antd";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "../../Loader/Loader";
import { saveContact } from "../../../api/contact";

const jwt = require("jsonwebtoken");

const AddNewContact = (props) => {
    const history = useNavigate();
    const { viewAddNewFarm, closeDrawer, fetchData, userCurrent } = props;
    const [viewLoader, setViewLoader] = useState(false);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [contact, setContact] = useState({ contactName: "", contactAddress: "", contactPhone: "", contactEmail: "", whoEntered: "" });
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

    const handleSaveContact = () => {
        if (contact) {
            if (
                contact.contactName !== "" &&
                contact.contactAddress !== "" &&
                contact.contactPhone !== "" &&
                contact.contactEmail !== "" &&
                userCurrent !== ""
            ) {
                setErrorMessage(null);
                let obj = {
                    ten_lien_he: contact.contactName,
                    dia_chi: contact.contactAddress,
                    sdt: contact.contactPhone,
                    email: contact.contactEmail,
                    nguoi_nhap: userCurrent,
                };
                saveContactAPI(obj);
                getUserCurrent();
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const saveContactAPI = async (contact) => {
        await saveContact(contact)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Lưu thông tin liên hệ thành công");
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

    const getUserCurrent = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let objJwt = jwt.decode(token);
            let user = objJwt.sub;
            setContact({ ...contact, whoEntered: user });
        }
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
                    title="Thêm Thông Tin Liên Hệ Mới"
                    width="60%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewFarm}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button onClick={handleSaveContact} onClose={() => handleCloseConfirm()} type="primary">
                                Lưu
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item
                            name="ten-lien-he"
                            label={
                                <>
                                    <span>Tiêu đề liên hệ </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập tiêu đề liên hệ!" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setContact({ ...contact, contactName: e.target.value })}
                                placeholder="VD: Văn Phòng Chính"
                            />
                        </Form.Item>
                        <Form.Item
                            name="dia-chi"
                            label={
                                <>
                                    <span>Địa Chỉ </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập địa chỉ!" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setContact({ ...contact, contactAddress: e.target.value })}
                                placeholder="VD: 123 Lý Thánh Tông, Trâu Quỳ, Gia Lâm, Hà Nội"
                            />
                        </Form.Item>
                        <Form.Item
                            name="sdt"
                            label={
                                <>
                                    <span>Số Điện Thoại </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập số điện thoại!" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setContact({ ...contact, contactPhone: e.target.value })}
                                placeholder="VD: 091.827.3645 / 091.827.3645"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={
                                <>
                                    <span>Email </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập số email!" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })}
                                placeholder="VD: auto@gmail.com / contact@gmail.com"
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default AddNewContact;
