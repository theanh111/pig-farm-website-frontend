import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, Modal, message, Divider } from "antd";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import Loader from "../../Loader/Loader";
import { saveFarm } from "../../../api/farm";
import { Editor, convertToRaw } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { saveBlog } from "../../../api/blog";

const jwt = require("jsonwebtoken");

const EditBlog = (props) => {
    const history = useNavigate();
    const { viewEditBlog, closeDrawer, fetchData } = props;
    const [viewEndOfSession, setViewEndOfSession] = useState(false);
    const [viewLoader, setViewLoader] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    const [errorMessgae, setErrorMessage] = useState(null);
    const [blog, setBlog] = useState({ blogCode: "", blogName: "", blogContent: "", whoEntered: "" });
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

    const handleSaveBlog = () => {
        if (blog) {
            console.log(blog);
            if (blog.blogCode !== "" && blog.blogName !== "" && blog.blogContent !== "") {
                setErrorMessage(null);
                let obj = { ma_blog: blog.blogCode, ten_blog: blog.blogName, noi_dung: blog.blogContent, nguoi_nhap: blog.whoEntered };
                saveBlogAPI(obj);
                getUserCurrent();
            } else {
                setErrorMessage("Xin vui lòng nhập đầy đủ thông tin!");
            }
        }
    };

    const saveBlogAPI = async (blog) => {
        await saveBlog(blog)
            .then((res) => {
                if (res) {
                    if (res.status == 200) {
                        message.success("Lưu blog thành công");
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

    const [editorState, setEditorState] = useState(null);
    const [content, setContent] = useState(null);

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
                    setBlog({ ...blog, blogContent: "" });
                } else {
                    let contentConvert = draftToHtml(content);
                    setContent(contentConvert);
                    setBlog({ ...blog, blogContent: contentConvert });
                    // console.log("as HTML:", draftToHtml(content));
                }
            }
        }
    };

    const getUserCurrent = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let objJwt = jwt.decode(token);
            let user = objJwt.sub;
            setBlog({ ...blog, whoEntered: user });
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
                    title="Thêm Blog Mới"
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
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item
                            name="ma-blog"
                            label={
                                <>
                                    <span>Mã Blog </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập mã blog" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setBlog({ ...blog, blogCode: e.target.value })}
                                placeholder="VD: ma-blog-se-hien-thi-nhu-nay"
                            />
                        </Form.Item>
                        <Form.Item
                            name="ten-blog"
                            label={
                                <>
                                    <span>Tên Blog </span> <span style={{ color: "red" }}> *</span>
                                </>
                            }
                            rules={[{ required: true, message: "Xin vui lòng nhập tên blog" }]}
                        >
                            <Input
                                autoComplete="off"
                                onChange={(e) => setBlog({ ...blog, blogName: e.target.value })}
                                placeholder="VD: Tên Blog Sẽ Hiển Thị Như Này"
                            />
                        </Form.Item>
                        <Form.Item
                            name="noi-dung"
                            label={
                                <>
                                    <span>Nội Dung Blog </span> <span style={{ color: "red" }}> *</span>
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

export default EditBlog;
