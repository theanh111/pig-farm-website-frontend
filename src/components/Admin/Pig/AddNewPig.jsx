import React, { useState, useEffect } from "react";
import { Popover, Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Modal } from "antd";

const { Option } = Select;

const AddNewPig = (props) => {
    const { viewAddNewPig, closeDrawer } = props;
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

    return (
        <>
            <>
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
                    title="Thêm Cá Thể"
                    width="80%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewPig}
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
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Mã Số Cá Thể"
                                    rules={[{ required: true, message: "Xin vui lòng nhập mã số cá thể" }]}
                                >
                                    <Input placeholder="Nhập mã số cá thể" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Người Đánh Giá"
                                    rules={[{ required: true, message: "Xin vui lòng nhập tên người đánh giá" }]}
                                >
                                    <Input placeholder="Nhập người đánh giá" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="owner" label="Owner" rules={[{ required: true, message: "Please select an owner" }]}>
                                    <Select placeholder="Please select an owner">
                                        <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="type" label="Type" rules={[{ required: true, message: "Please choose the type" }]}>
                                    <Select placeholder="Please choose the type">
                                        <Option value="private">Private</Option>
                                        <Option value="public">Public</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="approver"
                                    label="Approver"
                                    rules={[{ required: true, message: "Please choose the approver" }]}
                                >
                                    <Select placeholder="Please choose the approver">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[{ required: true, message: "Please choose the dateTime" }]}
                                >
                                    <DatePicker.RangePicker
                                        style={{ width: "100%" }}
                                        getPopupContainer={(trigger) => trigger.parentElement}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[
                                        {
                                            required: true,
                                            message: "please enter url description",
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter url description" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default AddNewPig;
