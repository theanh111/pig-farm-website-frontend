import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message, Divider } from "antd";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "../../Loader/Loader";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { saveNews } from "../../../api/news";

const jwt = require("jsonwebtoken");

const AddNewNews = (props) => {
    const history = useNavigate();
    const { viewAddNewFarm, closeDrawer, fetchData, userCurrent } = props;
    const [viewEndOfSession, setViewEndOfSession] = useState(false);
    const [viewLoader, setViewLoader] = useState(false);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [news, setNews] = useState({
        newsCode: "",
        newsImage: "",
        // newsImage1: "",
        // newsImage2: "",
        newsName: "",
        newsContent: "",
        whoEntered: "",
    });
    const [editorState, setEditorState] = useState(null);
    const [content, setContent] = useState(null);
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

    const handleSaveBlog = () => {
        if (news) {
            if (
                news.newsImage !== "" &&
                // news.newsImage1 !== "" &&
                // news.newsImage2 !== "" &&
                news.newsCode !== "" &&
                news.newsName !== "" &&
                news.newsContent !== "" &&
                userCurrent !== ""
            ) {
                setErrorMessage(null);
                let obj = {
                    ma_tin_tuc: news.newsCode,
                    hinh_anh: news.newsImage,
                    // hinh_anh_1: news.newsImage1,
                    // hinh_anh_2: news.newsImage2,
                    ten_tin_tuc: news.newsName,
                    noi_dung: news.newsContent,
                    nguoi_nhap: userCurrent,
                };
                saveNewsAPI(obj);
                getUserCurrent();
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const saveNewsAPI = async (news) => {
        await saveNews(news)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Lưu tin tức thành công");
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

    const onEditorStateChange = (content) => {
        setErrorMessage(null);
        setEditorState(content);
    };

    const onContentStateChange = (content) => {
        setErrorMessage(null);
        if (content.blocks) {
            if (content.blocks.length > 0) {
                let text = content.blocks[0].text;
                if (text === "") {
                    setNews({ ...news, newsContent: "" });
                } else {
                    let contentConvert = draftToHtml(content);
                    setContent(contentConvert);
                    setNews({ ...news, newsContent: contentConvert });
                    // console.log("as HTML:", draftToHtml(content));
                }
            }
        }
    };

    const getUserCurrent = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let objJwt = jwt.decode(token);
            if (objJwt) {
                let user = objJwt.sub;
                if (user) {
                    setNews({ ...news, whoEntered: user });
                }
            }
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
                    title="Thêm Tin Tức Mới"
                    width="85%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewAddNewFarm}
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
                            name="ma-blog"
                            label={
                                <>
                                    <span>Mã Tin Tức </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập mã tin tức" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setNews({ ...news, newsCode: e.target.value })}
                                placeholder="VD: ma-tin-tuc-se-hien-thi-nhu-nay-123"
                            />
                        </Form.Item>
                        <Form.Item
                            name="ten-blog"
                            label={
                                <>
                                    <span>Tiêu Đề Tin Tức </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập tiêu đề tin tức" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setNews({ ...news, newsName: e.target.value })}
                                placeholder="VD: Tiêu Đề Tin Tức Sẽ Hiển Thị Như Này"
                            />
                        </Form.Item>
                        <Form.Item
                            name="hinh-anh"
                            label={
                                <>
                                    <span>Hình Ảnh Bài Viết</span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh bài viết" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setNews({ ...news, newsImage: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                            />
                        </Form.Item>
                        {/* <Form.Item
                            name="hinh-anh-1"
                            label={
                                <>
                                    <span>Hình Ảnh Nội Dung 1</span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh nội dung 1" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setNews({ ...news, newsImage1: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                            />
                        </Form.Item>
                        <Form.Item
                            name="hinh-anh-2"
                            label={
                                <>
                                    <span>Hình Ảnh Nội Dung 2</span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh nội dung 2" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setNews({ ...news, newsImage2: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                            />
                        </Form.Item> */}
                        <Form.Item
                            name="noi-dung"
                            label={
                                <>
                                    <span>Nội Dung Tin Tức </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                        >
                            <div style={errorMessgae == null ? { border: "1px solid black" } : { border: "1px solid red" }}>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={onEditorStateChange}
                                    onContentStateChange={onContentStateChange}
                                />
                            </div>
                            {errorMessgae !== null ? (
                                <>
                                    <span style={{ color: "red" }}>{errorMessgae}</span>
                                </>
                            ) : null}
                        </Form.Item>
                        <Divider plain>Code</Divider>
                        <textarea style={{ width: "100%" }} disabled value={content} />
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default AddNewNews;
