import React, { useEffect, useState } from "react";
import { PigImage } from "../image";
import { getPigLimit12 } from "../../api/pig";

export const Gallery2 = () => {
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
    }, [pig]);
    return (
        <div id="portfolio" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>Lợn Móng Cái A</h2>
                    <p>Các loại lợn móng cái A...</p>
                </div>
                <div className="row">
                    <div className="portfolio-items">
                        {pig
                            ? pig.map((d, i) => (
                                  <div key={`${d.id}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                                      <PigImage title={d.ma_so_ca_the} age={d.tuoi} id={d.id} smallImage={d.hinh_anh_1} />
                                  </div>
                              ))
                            : "Loading..."}
                    </div>
                </div>
            </div>
        </div>
    );
};
