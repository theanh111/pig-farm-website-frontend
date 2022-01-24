import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message, Divider } from "antd";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
import Loader from "../../Loader/Loader";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { updateBlog } from "../../../api/blog";

const EditBlog = (props) => {
    const history = useNavigate();
    const { viewEditBlog, closeDrawer, fetchData, id, ma_blog, ten_blog, noi_dung, hinh_anh, userCurrent } = props;
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
                dataSubmit.blogCode !== "" &&
                dataSubmit.blogName !== "" &&
                dataSubmit.blogContent !== "" &&
                dataSubmit.blogImage !== "" &&
                // dataSubmit.blogImage1 !== "" &&
                // dataSubmit.blogImage2 !== "" &&
                dataSubmit.blogId !== null &&
                userCurrent !== ""
            ) {
                let obj = {
                    id: dataSubmit.blogId,
                    ma_blog: dataSubmit.blogCode,
                    ten_blog: dataSubmit.blogName,
                    noi_dung: dataSubmit.blogContent,
                    hinh_anh: dataSubmit.blogImage,
                    // hinh_anh_1: dataSubmit.blogImage1,
                    // hinh_anh_2: dataSubmit.blogImage2,
                    nguoi_cap_nhat: userCurrent,
                };
                updateBlogAPI(obj);
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const updateBlogAPI = async (blog) => {
        await updateBlog(blog)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Cập nhật thông tin dự án thành công");
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
                    setDataSubmit({ ...dataSubmit, blogContent: "" });
                } else {
                    let contentConvert = draftToHtml(content);
                    setContent(contentConvert);
                    setDataSubmit({ ...dataSubmit, blogContent: contentConvert });
                }
            }
        }
    };

    useEffect(() => {
        const fetchData2 = () => {
            setDataSubmit({
                blogId: id,
                blogCode: ma_blog,
                blogName: ten_blog,
                blogContent: noi_dung,
                blogImage: hinh_anh,
                // blogImage1: hinh_anh_1,
                // blogImage2: hinh_anh_2,
            });
        };
        fetchData2();
    }, [id, ma_blog, ten_blog, hinh_anh, noi_dung]);

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
                    visible={viewEditBlog}
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
                                    <span>Mã Thông Tin Dự Án </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập mã thông tin dự án" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setDataSubmit({ ...dataSubmit, blogCode: e.target.value })}
                                placeholder="VD: ma-thong-tin-du-an-se-hien-thi-nhu-nay"
                                value={dataSubmit.blogCode}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.blogCode}</span>
                        </Form.Item>
                        <Form.Item
                            name="ten-blog"
                            label={
                                <>
                                    <span>Tên Thông Tin Dự Án </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập tên thông tin dự án" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setDataSubmit({ ...dataSubmit, blogName: e.target.value })}
                                placeholder="VD: Tên Thông Tin Dự Án Sẽ Hiển Thị Như Này"
                                value={dataSubmit.blogName}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.blogName}</span>
                        </Form.Item>
                        <Form.Item
                            name="hinh-anh"
                            label={
                                <>
                                    <span>Hình Ảnh Bài Viết</span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập hình ảnh" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setDataSubmit({ ...dataSubmit, blogImage: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.blogImage}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.blogImage}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, blogImage1: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.blogImage1}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.blogName1}</span>
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
                                onChange={(e) => setDataSubmit({ ...dataSubmit, blogImage2: e.target.value })}
                                placeholder="VD: https://drive.google.com/uc?id=145QK2GHn1JZ0j8XftTvqXicHYru_UbE8"
                                value={dataSubmit.blogImage2}
                            />
                            <span style={{ visibility: "hidden" }}>{dataSubmit.blogName1}</span>
                        </Form.Item> */}
                        <Form.Item
                            name="noi-dung"
                            label={
                                <>
                                    <span>Nội Dung Thông Tin Dự Án </span> <span style={{ color: "red" }}> *</span>
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

export default EditBlog;
