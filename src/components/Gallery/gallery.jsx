import React, { useEffect, useState } from "react";
import { PigImage } from "../image";
import { getPigLimit12 } from "../../api/pig";
import { Row, Col } from "antd";
const style = { background: "#0092ff", padding: "8px 0" };
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
                    <Row justify="center">
                        <Col>
                            <h1>Lợn Móng Cái</h1>
                            <p>Lợn Móng Cái</p>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 0 }} justify="center">
                        <Col>
                            <hr className="line"></hr>
                        </Col>
                    </Row>

                    <Row>
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

        // <Row justify="center" gutter={[20, 20]}>
        //     {pig
        //         ? pig.map((d, i) => (
        //               //   <div key={`${d.id}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
        //               <Col>
        //                   <PigImage title={d.ma_so_ca_the} age={d.tuoi} id={d.id} smallImage={d.hinh_anh_1} />
        //               </Col>
        //               //   </div>
        //           ))
        //         : "Loading..."}
        // </Row>
        // <div id="portfolio" className="text-center">
        //     <div className="container">
        //         <div className="section-title">
        //             <h2>Lợn Móng Cái A</h2>
        //             <p>Các loại lợn móng cái A...</p>
        //         </div>
        //         <div className="row">
        //             <div className="portfolio-items">
        //                 {pig
        //                     ? pig.map((d, i) => (
        //                           <div key={`${d.id}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
        //                               <PigImage title={d.ma_so_ca_the} age={d.tuoi} id={d.id} smallImage={d.hinh_anh_1} />
        //                           </div>
        //                       ))
        //                     : "Loading..."}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
