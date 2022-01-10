import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, notification, Card, Modal, message, Divider } from "antd";

const BlogViewDetail = (props) => {
    const history = useNavigate();
    const [dataSubmit, setDataSubmit] = useState({});
    const { viewEditFarm, closeDrawer, fetchData, blogData } = props;
    const [disabledSave, setDisabledSave] = useState(true);
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

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    useEffect(() => {
        console.log(blogData);
    }, []);

    return (
        <>
            <>
                <Modal
                    centered
                    okType="danger"
                    style={{ zIndex: 900 }}
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
                    title="Sửa Cơ Sở Chăn Nuôi"
                    width="40%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewEditFarm}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={() => handleCloseDrawer()}>Hủy</Button>

                            <Button onClose={() => handleCloseConfirm()} type="primary">
                                Lưu
                            </Button>
                        </Space>
                    }
                >
                    <div dangerouslySetInnerHTML={{ __html: blogData.noi_dung }} />
                    <Divider plain>Code</Divider>
                    <div>{blogData.noi_dung} </div>
                </Drawer>
            </>
        </>
    );
};

export default BlogViewDetail;
