import React from "react";
import { Drawer, Image, Descriptions, Collapse } from "antd";

const { Panel } = Collapse;

const NewsViewDetail = (props) => {
    const { viewDetailBlog, closeDrawer, blogData } = props;

    return (
        <>
            <>
                <Drawer
                    title="Xem Chi Tiết Tin Tức"
                    width="80%"
                    onClose={closeDrawer}
                    visible={viewDetailBlog}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Descriptions layout="vertical" bordered>
                        <Descriptions.Item label={<h4>Tiêu Đề Tin Tức</h4>} span={3}>
                            {blogData.ten_tin_tuc}
                        </Descriptions.Item>
                        <Descriptions.Item label={<h4>Mã Tin Tức</h4>} span={3}>
                            {blogData.ma_tin_tuc}
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
        </>
    );
};

export default NewsViewDetail;
