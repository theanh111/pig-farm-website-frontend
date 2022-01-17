import React, { useEffect, useState } from "react";
import { PigImage } from "../Pig/PigImage";
import { getPigLimit12 } from "../../api/pig";
import { Row, Col } from "antd";

export const Gallery = () => {
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
        <Row align="middle" justify="center">
            <Col xs={15}>
                <div style={{ textAlign: "center", paddingTop: 30, paddingBottom: 50 }}>
                    <Row align="middle" justify="center">
                        <Col>
                            <h1>Lợn Móng Cái</h1>
                            <p>Lợn Móng Cái</p>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 0 }} align="middle" justify="center">
                        <Col>
                            <hr className="line"></hr>
                        </Col>
                    </Row>

                    <Row align="middle" justify="center">
                        {pig
                            ? pig.map((d, i) => (
                                  <>
                                      <Col span={8}>
                                          <PigImage title={d.ma_so_ca_the} age={d.tuoi} id={d.id} smallImage={d.hinh_anh_1} />
                                      </Col>
                                  </>
                              ))
                            : "Loading..."}
                    </Row>
                </div>
            </Col>
        </Row>
    );
};
