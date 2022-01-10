import React, { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col, Button } from "antd";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import News from "../News/News";

const images = [
    {
        original: "dhttps://picsum.photos/id/1018/1000/600/",
        thumbnail: "shttps://picsum.photos/id/1018/250/150/",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?export=view&id=1yDS1uhrkM_vbU547DAA02Z2BJckrcLi0",
        thumbnail: "https://drive.google.com/uc?export=view&id=1yDS1uhrkM_vbU547DAA02Z2BJckrcLi0",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?export=view&id=1fiKk2zg1OdFXf8oKi2NoCit669dPdYW-",
        thumbnail: "https://drive.google.com/uc?export=view&id=1fiKk2zg1OdFXf8oKi2NoCit669dPdYW-",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
    {
        original: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        thumbnail: "https://drive.google.com/uc?id=1zxfKsXL_M4_YcflW96bsMJtZFIiDVHAi",
        originalHeight: 300,
        originalWidth: 200,
        thumbnailHeight: 55,
        thumbnailWidth: 55,
    },
];

export const Header = (props) => {
    return (
        <>
            <Row justify="center" gutter={[20, 20]}>
                <Col xs={6}>
                    <div>Nhóm Nghiên Cứu</div>
                    <ImageGallery
                        renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                        slideDuration={800}
                        autoPlay={true}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onErrorImageURL="/images/user/imageerror.png"
                        items={images}
                    />
                </Col>
                <Col xs={6}>
                    <div>Cá Thể</div>
                    <ImageGallery
                        renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                        slideDuration={800}
                        autoPlay={true}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onErrorImageURL="/images/user/imageerror.png"
                        items={images}
                    />
                </Col>
                <Col xs={6}>
                    <div>Cơ Sở Chăn Nuôi</div>
                    <ImageGallery
                        renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                        renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                        slideDuration={800}
                        autoPlay={true}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onErrorImageURL="/images/user/imageerror.png"
                        items={images}
                    />
                </Col>
            </Row>
            <Row justify="center" gutter={[20, 20]}>
                <Col xs={8}>
                    <News></News>
                </Col>
                <Col xs={8}>
                    <News></News>
                </Col>
            </Row>
        </>
        // <header id="header">
        //     <div className="intro">
        //         <div className="overlay">
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-md-8 col-md-offset-2 intro-text">
        //                         <h1>
        //                             {props.data ? props.data.title : "Loading"}
        //                             <span></span>
        //                         </h1>
        //                         <p>{props.data ? props.data.paragraph : "Loading"}</p>
        //                         <a href="/tim-hieu-ngay" className="btn btn-custom btn-lg page-scroll">
        //                             TÌM HIỂU NGAY
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </header>
    );
};
