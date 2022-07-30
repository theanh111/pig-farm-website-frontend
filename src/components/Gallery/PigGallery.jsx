import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPigSpecial } from "../../api/pig";

export const PigGallery = (props) => {
    const { language } = props;

    const [pig, setPig] = useState([]);

    const getData = async () => {
        await getPigSpecial()
            .then((res) => {
                let result = res.data.data;
                if (result) {
                    setPig(result);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div class="w3-content" style={{ maxWidth: "1532px" }}>
            <div class="w3-container w3-margin-top" id="rooms">
                <h1 style={{ textAlign: "center" }}>Lợn Móng Cái</h1>
            </div>
            <div class="w3-row-padding w3-padding-16">
                {pig ? (
                    pig.map((item, index) => (
                        <div class="w3-third w3-margin-bottom" style={{ cursor: "pointer" }}>
                            <Link to={"/ca-the/" + item.id}>
                                <div class="img-hover-zoom">
                                    <img
                                        className="pig-image"
                                        src={item.hinh_anh_1 ? item.hinh_anh_1 : "/images/user/preview.png"}
                                        alt={item.ma_so_ca_the}
                                        style={{ width: "100%", height: "350px", objectFit: "cover", display: "inline-block" }}
                                    />
                                </div>

                                <div class="w3-container w3-green">
                                    <h2 style={{ textAlign: "center", color: "white" }}>{item.ma_so_ca_the}</h2>
                                    <h4 style={{ textAlign: "center", color: "white" }}>{item.tuoi ? item.tuoi : " "}</h4>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <Empty description="No Data" />
                )}
                {pig.length == 0 ? <Empty description="No Data" /> : null}
            </div>
        </div>
    );
};
