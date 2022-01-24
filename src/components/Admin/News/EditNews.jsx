import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message, Divider } from "antd";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import Loader from "../../Loader/Loader";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { updateNews } from "../../../api/news";

const EditNews = (props) => {
    const history = useNavigate();
    const { viewEditNews, closeDrawer, fetchData, id, ma_tin_tuc, ten_tin_tuc, noi_dung, hinh_anh, userCurrent } = props;
    const [dataSubmit, setDataSubmit] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewLoader, setViewLoader] = useState(false);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [editorState, setEditorState] = useState(null);
    const [content, setContent] = useState(null);

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
                dataSubmit.newsCode !== "" &&
                dataSubmit.newsName !== "" &&
                dataSubmit.newsContent !== "" &&
                dataSubmit.newsImage !== "" &&
                // dataSubmit.newsImage1 !== "" &&
                // dataSubmit.newsImage2 !== "" &&
                dataSubmit.newsId !== null &&
                userCurrent !== ""
            ) {
                let obj = {
                    id: dataSubmit.newsId,
                    ma_tin_tuc: dataSubmit.newsCode,
                    ten_tin_tuc: dataSubmit.newsName,
                    noi_dung: dataSubmit.newsContent,
                    hinh_anh: dataSubmit.newsImage,
                    // hinh_anh_1: dataSubmit.newsImage1,
                    // hinh_anh_2: dataSubmit.newsImage2,
                    nguoi_cap_nhat: userCurrent,
                };
                updateNewsAPI(obj);
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const updateNewsAPI = async (news) => {
        await updateNews(news)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật tin tức thành công");
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
                    setDataSubmit({ ...dataSubmit, newsContent: "" });
                } else {
                    let contentConvert = draftToHtml(content);
                    setContent(contentConvert);
                    setDataSubmit({ ...dataSubmit, newsContent: contentConvert });
                }
            }
        }
    };

    useEffect(() => {
        const fetchData2 = () => {
            setDataSubmit({
                newsId: id,
                newsCode: ma_tin_tuc,
                newsName: ten_tin_tuc,
                newsContent: noi_dung,
                newsImage: hinh_anh,
                // newsImage1: hinh_anh_1,
                // newsImage2: hinh_anh_2,
            });
        };
        fetchData2();
    }, [id, ma_tin_tuc, ten_tin_tuc, hinh_anh, noi_dung]);

    useEffect(() => {
        const fetchData3 = () => {
            setContent(noi_dung);
            const blocksFromHtml = htmlToDraft(noi_dung);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        };
        fetchData3();
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
                    title="Cập Nhật Thông Tin Dự Án"
                    width="85%"
                    onClose={() => handleCloseDrawer()}
                    visible={viewEditNews}
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
                    {errorMessgae !== null ? (
                        <>
                            <span style={{ color: "red", textAlign: "center", fontWeight: 500 }}>{errorMessgae}</span>
                        </>
                    ) : null}
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item
                            name="ma-blog"
                            label={
                                <>
                                    <span>Mã Tin Tức: </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập mã tin tức" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setDataSubmit({ ...dataSubmit, newsCode: e.target.value })}
                                placeholder="VD: ma-blog-se-hien-thi-nhu-nay"
                                value={dataSubmit.newsCode}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.newsCode}</span>
                        </Form.Item>
                        <Form.Item
                            name="ten-blog"
                            label={
                                <>
                                    <span>Tiêu Đề Tin Tức: </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập tiêu đề tin tức" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setDataSubmit({ ...dataSubmit, newsName: e.target.value })}
                                placeholder="VD: Tiêu Đề Tin Tức Sẽ Hiển Thị Như Này"
                                value={dataSubmit.newsName}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.newsName}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, newsImage: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.newsImage}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.newsImage}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, newsImage1: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.newsImage1}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.newsImage1}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, newsImage2: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.newsImage2}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.newsImage2}</span>
                        </Form.Item> */}
                        <Form.Item
                            name="noi-dung"
                            label={
                                <>
                                    <span>Nội Dung Tin Tức: </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                        >
                            <div style={{ border: "1px solid black" }}>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={onEditorStateChange}
                                    onContentStateChange={onContentStateChange}
                                />
                            </div>
                        </Form.Item>
                        <Divider plain>Code</Divider>
                        <textarea style={{ width: "100%" }} disabled value={content} />
                    </Form>
                </Drawer>
            </>
        </>
    );
};

export default EditNews;
