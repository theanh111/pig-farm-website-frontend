import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Button, Input, Space, notification, Card, Modal, message, Divider } from "antd";

const BlogViewDetail = (props) => {
    const history = useNavigate();
    const [dataSubmit, setDataSubmit] = useState({});
    const { viewDetailBlog, closeDrawer, fetchData, blogData } = props;
    const [disabledSave, setDisabledSave] = useState(true);

    return (
        <>
            <>
                <Drawer
                    title="Xem Chi Tiết Blog"
                    width="40%"
                    onClose={closeDrawer}
                    visible={viewDetailBlog}
                    bodyStyle={{ paddingBottom: 80 }}
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
