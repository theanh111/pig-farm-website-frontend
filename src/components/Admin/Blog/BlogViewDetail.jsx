import React from "react";
import { Drawer, Image, Descriptions, Collapse } from "antd";

const { Panel } = Collapse;

const BlogViewDetail = (props) => {
    const { viewDetailBlog, closeDrawer, blogData } = props;

    return (
        <>
            {blogData ? (
                <>
                    <Drawer
                        title={
                            <>
                                <span>Xem Chi Tiết Thông Tin Dự Án: </span> <span style={{ fontWeight: 500 }}>{blogData.ten_blog}</span>
                            </>
                        }
                        width="80%"
                        onClose={closeDrawer}
                        visible={viewDetailBlog}
                        bodyStyle={{ paddingBottom: 80 }}
                    >
                        <Descriptions layout="vertical" bordered>
                            <Descriptions.Item label={<h4>Tiêu Đề Thông Tin Dự Án</h4>} span={3}>
                                {blogData.ten_blog}
                            </Descriptions.Item>
                            <Descriptions.Item label={<h4>Mã Thông Tin Dự Án</h4>} span={3}>
                                {blogData.ma_blog}
                            </Descriptions.Item>
                            <Descriptions.Item label={<h4>Hình Ảnh</h4>} span={3}>
                                <Image
                                    style={{ width: "200px", height: "200px", objectFit: "cover", display: "inline-block" }}
                                    src={blogData.hinh_anh}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item label={<h4>Nội Dung</h4>} span={3}>
                                <div dangerouslySetInnerHTML={{ __html: blogData.noi_dung }} />
                            </Descriptions.Item>
                        </Descriptions>
                        <Collapse>
                            <Panel header="Code">
                                <div>{blogData.noi_dung} </div>
                            </Panel>
                        </Collapse>
                    </Drawer>
                </>
            ) : null}
        </>
    );
};

export default BlogViewDetail;
