import React from "react";
import { Row, Col, Divider } from "antd";
import News from "../News/News";
import Blog from "../Blog/Blog";
import { GalleryImage } from "../Gallery/GalleryImage";

export const Header = (props) => {
    return (
        <>
            <GalleryImage />
            <Row justify="center" gutter={[20, 20]} style={{ paddingTop: 40 }}>
                <Col xs={7}>
                    <News></News>
                </Col>
                <Col xs={7}>
                    <Blog></Blog>
                </Col>
            </Row>
        </>
    );
};
