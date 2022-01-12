import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

export const PigImage = ({ title, age, id, smallImage }) => {
    const [viewInfo, setViewInfo] = useState(false);
    const handleClickImage = () => {
        return window.scrollTo(0, 0);
    };

    const handleMouseOver = () => {
        console.log("ok");
    };

    return (
        <>
            <Link onClick={handleClickImage} to={"/ca-the/" + id}>
                <div className="container">
                    <Image
                        className="image"
                        onMouseOver={handleMouseOver}
                        preview={false}
                        src={smallImage}
                        style={{ width: "389px", height: "260px", objectFit: "cover", display: "inline-block" }}
                        alt={title}
                    />
                    <div className="middle">
                        <Card hoverable style={{ borderRadius: "5px" }}>
                            <Meta
                                description={
                                    <>
                                        <span style={{ fontSize: 30, color: "black" }}>{title}</span>
                                        {age ? <p style={{ fontSize: 16, fontWeight: 500, color: "grey" }}>{age}</p> : null}
                                    </>
                                }
                            />
                        </Card>
                    </div>
                </div>
            </Link>
            <div style={{ height: "5px" }}></div>
        </>
    );
};
