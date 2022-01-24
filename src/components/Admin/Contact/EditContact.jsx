import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message } from "antd";

import Loader from "../../Loader/Loader";
import { updateContact } from "../../../api/contact";

const EditContact = (props) => {
    const history = useNavigate();
    const { viewEditContact, closeDrawer, fetchData, id, ten_lien_he, email, sdt, dia_chi, userCurrent } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewLoader, setViewLoader] = useState(false);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [dataSubmit, setDataSubmit] = useState({});

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

    const handleSaveBlog = () => {
        if (dataSubmit) {
            if (
                dataSubmit.contactId !== "" &&
                dataSubmit.contactName !== "" &&
                dataSubmit.contactAddress !== "" &&
                dataSubmit.contactEmail !== "" &&
                dataSubmit.contactPhone !== "" &&
                userCurrent !== ""
            ) {
                setErrorMessage(null);
                let obj = {
                    id: dataSubmit.contactId,
                    ten_lien_he: dataSubmit.contactName,
                    dia_chi: dataSubmit.contactAddress,
                    email: dataSubmit.contactEmail,
                    sdt: dataSubmit.contactPhone,
                    nguoi_cap_nhat: userCurrent,
                };
                updateContactAPI(obj);
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const updateContactAPI = async (contact) => {
        await updateContact(contact)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật thông tin liên hệ thành công");
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
                contactId: id,
                contactName: ten_lien_he,
                contactAddress: dia_chi,
                contactPhone: sdt,
                contactEmail: email,
            });
        };
        fetchData2();
    }, [id, ten_lien_he, dia_chi, sdt, email]);

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
                    title="Cập Nhật Thông Tin Liên Hệ"
                    width="60%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewEditContact}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button onClick={handleSaveBlog} onClose={() => handleCloseConfirm()} type="primary">
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, contactName: e.target.value })}
                                placeholder="VD: Văn Phòng Chính"
                                value={dataSubmit.contactName}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.contactName}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, contactAddress: e.target.value })}
                                placeholder="VD: 123 Lý Thánh Tông, Trâu Quỳ, Gia Lâm, Hà Nội"
                                value={dataSubmit.contactAddress}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.contactAddress}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, contactPhone: e.target.value })}
                                placeholder="VD: 091.827.3645 / 091.827.3645"
                                value={dataSubmit.contactPhone}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.contactPhone}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, contactEmail: e.target.value })}
                                placeholder="VD: auto@gmail.com / contact@gmail.com"
                                value={dataSubmit.contactEmail}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.contactEmail}</span>
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default EditContact;
