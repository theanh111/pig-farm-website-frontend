import React from "react";
import { Image, Card } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

export const PigImage = ({ title, age, id, smallImage }) => {
    const handleClickImage = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <>
            <Link onClick={handleClickImage} to={"/ca-the/" + id}>
                <div className="container">
                    <Image
                        className="image"
                        preview={false}
                        src={smallImage}
                        style={{ width: "389px", height: "260px", objectFit: "cover", display: "inline-block" }}
                        alt={title}
                    />
                    <div className="middle">
                        <Card hoverable size="small" style={{ borderRadius: "5px" }}>
                            <Meta
                                style={{ height: "50%" }}
                                description={
                                    <>
                                        <span style={{ fontSize: 25, color: "black" }}>{title}</span>
                                        {age ? <p style={{ fontSize: 15, fontWeight: 500, color: "grey" }}>{age}</p> : null}
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
