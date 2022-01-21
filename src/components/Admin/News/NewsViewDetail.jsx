import React from "react";
import { Drawer, Image, Descriptions, Collapse, Card } from "antd";

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
                    <div class="w3-content" style={{ maxWidth: "1532px" }}>
                        <div class="w3-row-padding w3-padding-small">
                            <Card>
                                <h3>Tiêu Đề Tin Tức</h3>
                            </Card>
                            <Card> {blogData.ten_tin_tuc}</Card>
                        </div>
                    </div>
                    <div class="w3-content" style={{ maxWidth: "1532px" }}>
                        <div class="w3-row-padding w3-padding-small">
                            <Card>
                                <h3>Mã Tin Tức</h3>
                            </Card>
                            <Card>{blogData.ma_tin_tuc}</Card>
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
        </>
    );
};

export default NewsViewDetail;
