import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPigLimit12 } from "../../api/pig";

export const PigGalleryParam = (props) => {
    const { title, desc, data } = props;
    const [pig, setPig] = useState([]);

    const getData = async () => {
        await getPigLimit12()
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
                <h1 style={{ textAlign: "center" }}>{title}</h1>
                <h4 style={{ textAlign: "center" }}>{desc}</h4>
            </div>
            <div class="w3-row-padding w3-padding-16">
                {data ? (
                    data.map((item, index) => (
                        <div class="w3-third w3-margin-bottom" style={{ cursor: "pointer" }}>
                            <Link to={"/ca-the/" + item.id}>
                                <img
                                    className="pig-image"
                                    src={item.hinh_anh_1 ? item.hinh_anh_1 : "/images/user/preview.png"}
                                    alt={item.ma_so_ca_the}
                                    style={{ width: "100%", height: "350px", objectFit: "cover", display: "inline-block" }}
                                />
                                <div class="w3-container w3-green">
                                    <h2 style={{ textAlign: "center", color: "white" }}>{item.ma_so_ca_the}</h2>
                                    <h4 style={{ textAlign: "center", color: "white" }}>{item.tuoi ? item.tuoi : "Chưa Có Dữ Liệu"}</h4>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <>
                        <Empty description="No Data" />
                    </>
                )}
                {data.length == 0 ? (
                    <>
                        <Empty description="No Data" />
                    </>
                ) : null}
            </div>
        </div>
    );
};
