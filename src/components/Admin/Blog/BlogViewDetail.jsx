import React from "react";
import { Drawer, Image, Descriptions, Collapse, Card } from "antd";

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
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-small">
                                <Card>
                                    <h3>Tiêu Đề Thông Tin Dự Án</h3>
                                </Card>
                                <Card>{blogData.ten_blog}</Card>
                            </div>
                        </div>
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-small">
                                <Card>
                                    <h3>Mã Thông Tin Dự Án</h3>
                                </Card>
                                <Card> {blogData.ma_blog}</Card>
                            </div>
                        </div>
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-small">
                                <Card>
                                    <h3>Hình Ảnh</h3>
                                </Card>
                                <Card>
                                    <Image
                                        style={{ width: "200px", height: "200px", objectFit: "cover", display: "inline-block" }}
                                        src={blogData.hinh_anh}
                                    />
                                </Card>
                            </div>
                        </div>
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-small">
                                <Card>
                                    <h3>Nội Dung</h3>
                                </Card>
                                <Card>
                                    <div dangerouslySetInnerHTML={{ __html: blogData.noi_dung }} />
                                </Card>
                            </div>
                        </div>
                        <div class="w3-content" style={{ maxWidth: "1532px" }}>
                            <div class="w3-row-padding w3-padding-small">
                                <Collapse>
                                    <Panel header="Code">
                                        <div>{blogData.noi_dung} </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </Drawer>
                </>
            ) : null}
        </>
    );
};

export default BlogViewDetail;
