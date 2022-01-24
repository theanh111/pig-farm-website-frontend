import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { getAllGallery } from "../../api/gallery";

export const ImageGallery = (props) => {
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
                                    let obj = { original: result[i].hinh_anh, title: result[i].ten_anh };
                                    firstArr.push(obj);
                                }
                                if (result[i].the_loai === "Cá Thể") {
                                    let obj = { original: result[i].hinh_anh, title: result[i].ten_anh };
                                    secondArr.push(obj);
                                }
                                if (result[i].the_loai === "Trang Trại") {
                                    let obj = { original: result[i].hinh_anh, title: result[i].ten_anh };
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
            {/* {viewLoader ? ( */}
            {/* <Loader /> */}
            {/* ) : ( */}
            {/* <> */}
            {/* <div class="container">
                        <h2>Carousel Example</h2>
                        <div id="myCarousel" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                                <li data-target="#myCarousel" data-slide-to="1"></li>
                                <li data-target="#myCarousel" data-slide-to="2"></li>
                            </ol>

                            <div class="carousel-inner">
                                <div class="item active">
                                    <img src="images/cosochannuoi.jpg" alt="Los Angeles" style={{
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        height: "400px",
                                                        objectFit: "cover",
                                                        display: "inline-block",
                                                    }} />
                                </div>

                                <div class="item">
                                    <img src="images/cosochannuoi2.jpg" alt="Chicago" style={{
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        height: "400px",
                                                        objectFit: "cover",
                                                        display: "inline-block",
                                                    }} />
                                </div>

                                <div class="item">
                                    <img src="images/cosochannuoi3.jpg" alt="New york" style={{
                                                        cursor: "pointer",
                                                        width: "100%",
                                                        height: "400px",
                                                        objectFit: "cover",
                                                        display: "inline-block",
                                                    }} />
                                </div>
                            </div>

                            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="right carousel-control" href="#myCarousel" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div> */}
            <div class="w3-content" style={{ maxWidth: "2000px" }}>
                <div class="w3-row-padding w3-padding-16">
                    <div class="w3-third w3-margin-bottom">
                        <div id="myCarousel1" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                {firstGallery[0] ? <li data-target="#myCarousel1" data-slide-to={0} class="active"></li> : null}
                                {firstGallery
                                    ? firstGallery.map((item, index) =>
                                          index > 0 ? <li data-target="#myCarousel1" data-slide-to={index}></li> : null
                                      )
                                    : null}
                            </ol>
                            <div class="carousel-inner">
                                <div class="item active">
                                    {firstGallery[0] ? (
                                        <img
                                            title={firstGallery[0].ten_anh}
                                            src={firstGallery[0].original}
                                            alt={firstGallery[0].ten_anh}
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                height: "400px",
                                                objectFit: "cover",
                                                display: "inline-block",
                                            }}
                                        />
                                    ) : null}
                                </div>
                                {firstGallery.map((item, index) =>
                                    index > 0 ? (
                                        <div class="item">
                                            <img
                                                title={item.ten_anh}
                                                alt={item.ten_anh}
                                                src={item.original}
                                                style={{
                                                    cursor: "pointer",
                                                    width: "100%",
                                                    height: "400px",
                                                    objectFit: "cover",
                                                    display: "inline-block",
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <a title="Ảnh Trước" class="left carousel-control" href="#myCarousel1" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a title="Ảnh Sau" class="right carousel-control" href="#myCarousel1" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>

                    <div class="w3-third w3-margin-bottom">
                        <div id="myCarousel2" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                {secondGallery[0] ? <li data-target="#myCarousel2" data-slide-to={0} class="active"></li> : null}
                                {secondGallery
                                    ? secondGallery.map((item, index) =>
                                          index > 0 ? <li data-target="#myCarousel2" data-slide-to={index}></li> : null
                                      )
                                    : null}
                            </ol>
                            <div class="carousel-inner">
                                <div class="item active">
                                    {secondGallery[0] ? (
                                        <img
                                            title={secondGallery[0].ten_anh}
                                            alt={secondGallery[0].ten_anh}
                                            src={secondGallery[0].original}
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                height: "400px",
                                                objectFit: "cover",
                                                display: "inline-block",
                                            }}
                                        />
                                    ) : null}
                                </div>
                                {secondGallery.map((item, index) =>
                                    index > 0 ? (
                                        <div class="item">
                                            <img
                                                title={item.ten_anh}
                                                alt={item.ten_anh}
                                                src={item.original}
                                                style={{
                                                    cursor: "pointer",
                                                    width: "100%",
                                                    height: "400px",
                                                    objectFit: "cover",
                                                    display: "inline-block",
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <a title="Ảnh Trước" class="left carousel-control" href="#myCarousel2" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a title="Ảnh Sau" class="right carousel-control" href="#myCarousel2" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>

                    <div class="w3-third w3-margin-bottom">
                        <div id="myCarousel3" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                {thirdGallery[0] ? <li data-target="#myCarousel3" data-slide-to={0} class="active"></li> : null}
                                {thirdGallery
                                    ? thirdGallery.map((item, index) =>
                                          index > 0 ? <li data-target="#myCarousel3" data-slide-to={index}></li> : null
                                      )
                                    : null}
                            </ol>
                            <div class="carousel-inner">
                                <div class="item active">
                                    {thirdGallery[0] ? (
                                        <img
                                            title={thirdGallery[0].ten_anh}
                                            alt={thirdGallery[0].ten_anh}
                                            src={thirdGallery[0].original}
                                            style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                height: "400px",
                                                objectFit: "cover",
                                                display: "inline-block",
                                            }}
                                        />
                                    ) : null}
                                </div>
                                {thirdGallery.map((item, index) =>
                                    index > 0 ? (
                                        <div class="item">
                                            <img
                                                title={item.ten_anh}
                                                alt={item.ten_anh}
                                                src={item.original}
                                                style={{
                                                    cursor: "pointer",
                                                    width: "100%",
                                                    height: "400px",
                                                    objectFit: "cover",
                                                    display: "inline-block",
                                                }}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>
                            <a title="Ảnh Trước" class="left carousel-control" href="#myCarousel3" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a title="Ảnh Sau" class="right carousel-control" href="#myCarousel3" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* </> */}
            {/* )} */}
        </>
    );
};
