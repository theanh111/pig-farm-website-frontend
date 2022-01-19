import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Col, Row } from "antd";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import Loader from "../Loader/Loader";
import { getAllGallery } from "../../api/gallery";

export const GalleryImage = (props) => {
    const [firstGallery, setFirstGallery] = useState([]);
    const [secondGallery, setSecondGallery] = useState([]);
    const [thirdGallery, setThirdGallery] = useState([]);
    const [viewLoader, setViewLoader] = useState(false);

    const getAllGalleryAPI = async () => {
        setViewLoader(true);
        await getAllGallery()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    if (result.length > 0) {
                        let firstArr = [];
                        let secondArr = [];
                        let thirdArr = [];
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].the_loai) {
                                if (result[i].the_loai === "Nhóm Nghiên Cứu") {
                                    let obj = { original: result[i].hinh_anh };
                                    firstArr.push(obj);
                                }
                                if (result[i].the_loai === "Cá Thể") {
                                    let obj = { original: result[i].hinh_anh };
                                    secondArr.push(obj);
                                }
                                if (result[i].the_loai === "Trang Trại") {
                                    let obj = { original: result[i].hinh_anh };
                                    thirdArr.push(obj);
                                }
                            }
                        }
                        setFirstGallery(firstArr);
                        setSecondGallery(secondArr);
                        setThirdGallery(thirdArr);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setViewLoader(false);
    };

    useEffect(() => {
        getAllGalleryAPI();
    }, []);

    return (
        <>
            <Row justify="center" gutter={[5, 5]} style={{ paddingTop: 10 }}>
                {viewLoader ? (
                    <Loader />
                ) : (
                    <>
                        <Col xs={8}>
                            <ImageGallery
                                renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                                renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                                slideDuration={6000}
                                autoPlay={true}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showThumbnails={false}
                                showBullets={true}
                                onErrorImageURL="/images/user/imageerror.png"
                                items={firstGallery}
                            />
                        </Col>
                        <Col xs={8}>
                            <ImageGallery
                                renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                                renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                                slideDuration={6000}
                                autoPlay={true}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showThumbnails={false}
                                showBullets={true}
                                onErrorImageURL="/images/user/imageerror.png"
                                items={secondGallery}
                            />
                        </Col>
                        <Col xs={8}>
                            <ImageGallery
                                renderRightNav={(onClick, disabled) => <RightNav onClick={onClick} disabled={disabled} />}
                                renderLeftNav={(onClick, disabled) => <LeftNav onClick={onClick} disabled={disabled} />}
                                slideDuration={6000}
                                autoPlay={true}
                                showPlayButton={false}
                                showFullscreenButton={false}
                                showThumbnails={false}
                                showBullets={true}
                                onErrorImageURL="/images/user/imageerror.png"
                                items={thirdGallery}
                            />
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
};
