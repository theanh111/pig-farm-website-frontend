import React, { useState } from "react";
import { Select, Input, Button } from "antd";

const { Option } = Select;
const { Search } = Input;

export const PigFilterENG = (props) => {
    const { fetchDataSearchAPI, pig, pigSearch, handleDataSearchByFilter } = props;
    const [filterData, setFilterData] = useState({
        gioi_tinh: null,
        nhan_trung_trang: null,
        tai_meo: null,
    });

    const handleSearch = () => {
        let arr = pig.filter(
            (el) =>
                (filterData.gioi_tinh && el.gioi_tinh ? el.gioi_tinh.toLowerCase() == filterData.gioi_tinh.toLowerCase() : 1 == 1) &&
                (filterData.nhan_trung_trang && el.nhan_trung_trang
                    ? el.nhan_trung_trang.toLowerCase() == filterData.nhan_trung_trang.toLowerCase()
                    : 1 == 1) &&
                (filterData.tai_meo && el.tai_meo ? el.tai_meo.toLowerCase() == filterData.tai_meo.toLowerCase() : 1 == 1) &&
                (filterData.mom && el.mom ? el.mom.toLowerCase() == filterData.mom.toLowerCase() : 1 == 1) &&
                (filterData.vanh_trang_quanh_mom && el.vanh_trang_quanh_mom
                    ? el.vanh_trang_quanh_mom.toLowerCase() == filterData.vanh_trang_quanh_mom.toLowerCase()
                    : 1 == 1) &&
                (filterData.mat && el.mat ? el.mat.toLowerCase() == filterData.mat.toLowerCase() : 1 == 1) &&
                (filterData.da_co_khoang_den && el.da_co_khoang_den
                    ? el.da_co_khoang_den.toLowerCase() == filterData.da_co_khoang_den.toLowerCase()
                    : 1 == 1) &&
                (filterData.khoang_den_phu && el.khoang_den_phu
                    ? el.khoang_den_phu.toLowerCase() == filterData.khoang_den_phu.toLowerCase()
                    : 1 == 1) &&
                (filterData.chan && el.chan ? el.chan.toLowerCase() == filterData.chan.toLowerCase() : 1 == 1) &&
                (filterData.da_mat && el.da_mat ? el.da_mat.toLowerCase() == filterData.da_mat.toLowerCase() : 1 == 1) &&
                (filterData.kieu_duoi && el.kieu_duoi ? el.kieu_duoi.toLowerCase() == filterData.kieu_duoi.toLowerCase() : 1 == 1) &&
                (filterData.kieu_tai && el.kieu_tai ? el.kieu_tai.toLowerCase() == filterData.kieu_tai.toLowerCase() : 1 == 1) &&
                (filterData.huong_tai && el.huong_tai ? el.huong_tai.toLowerCase() == filterData.huong_tai.toLowerCase() : 1 == 1) &&
                (filterData.kieu_long && el.kieu_long ? el.kieu_long.toLowerCase() == filterData.kieu_long.toLowerCase() : 1 == 1) &&
                (filterData.loai_mau_long && el.loai_mau_long
                    ? el.loai_mau_long.toLowerCase() == filterData.loai_mau_long.toLowerCase()
                    : 1 == 1) &&
                (filterData.hinh_dang_dau && el.hinh_dang_dau
                    ? el.hinh_dang_dau.toLowerCase() == filterData.hinh_dang_dau.toLowerCase()
                    : 1 == 1) &&
                (filterData.kieu_lung_bung && el.kieu_lung_bung
                    ? el.kieu_lung_bung.toLowerCase() == filterData.kieu_lung_bung.toLowerCase()
                    : 1 == 1)
        );
        fetchDataSearchByFilter(arr);
    };

    const fetchDataSearchByFilter = (arr) => {
        handleDataSearchByFilter(arr);
    };

    const fetchDataSearch = (pig) => {
        fetchDataSearchAPI(pig);
    };

    const handleSearchInput = (value) => {
        let obj = { tu_khoa: value };
        fetchDataSearch(obj);
    };

    return (
        <>
            <div class="w3-content" style={{ maxWidth: "1532px" }}>
                <div class="w3-row-padding w3-padding-22">
                    <div class="w3-col m12">
                        <Search
                            style={{ width: "100%" }}
                            class="w3-input w3-border"
                            placeholder="Individual code, Pig Types, Farms"
                            allowClear
                            onSearch={handleSearchInput}
                        />
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Sex...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, gioi_tinh: value })}
                        >
                            <Option value="đực">Male</Option>
                            <Option value="cái">Female</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>White spot in forehead...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, nhan_trung_trang: value })}
                        >
                            <Option value="to">Large</Option>
                            <Option value="nhỏ">Small</Option>
                            <Option value="không">Absent</Option>
                        </Select>
                    </div>

                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Cat ear...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, tai_meo: value })}
                        >
                            <Option value="có">Existed</Option>
                            <Option value="không">Absent</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Snout...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, mom: value })}
                        >
                            <Option value="dài nhỏ">Long, small</Option>
                            <Option value="ngắn tròn">Short, round</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>White band around snout...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, vanh_trang_quanh_mom: value })}
                        >
                            <Option value="mỏng">Thin</Option>
                            <Option value="dày (>5cm)">
                                <span>{"Thick (>5cm)"}</span>
                            </Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Eyes...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, mat: value })}
                        >
                            <Option value="khôn, sáng, linh hoạt">Wise, active</Option>
                            <Option value="mắt không khôn, chậm">Unwise, slow</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Black patch on body...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, da_co_khoang_den: value })}
                        >
                            <Option value="có">Present</Option>
                            <Option value="có, dạng yên ngựa">Present, horse saddle form</Option>
                            <Option value="không">Absent</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Additional black spotted...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, khoang_den_phu: value })}
                        >
                            <Option value="có">Present</Option>
                            <Option value="không">Absent</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Leg...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, chan: value })}
                        >
                            <Option value="to">Big</Option>
                            <Option value="nhỏ">Small</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Face...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, da_mat: value })}
                        >
                            <Option value="không nhăn">No wrinkles</Option>
                            <Option value="nhăn ít">Few wrinkles</Option>
                            <Option value="nhăn nhiều">Wrinkles</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Tail form...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_duoi: value })}
                        >
                            <Option value="thẳng">Straight</Option>
                            <Option value="xoăn">Curly</Option>
                            <Option value="đuôi trâu">Buffalo tail</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Ear form...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_tai: value })}
                        >
                            <Option value="cụp (rũ xuống)">Floppy</Option>
                            <Option value="hơi cụp">Slightly floppy</Option>
                            <Option value="vểnh">Upright</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Ear direction...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, huong_tai: value })}
                        >
                            <Option value="phía trước">Forward</Option>
                            <Option value="phía sau">Backward</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Fur structure...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_long: value })}
                        >
                            <Option value="xoăn - thẳng">Curly – Straight</Option>
                            <Option value="ngắn - dài">Short – Long</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Fur color...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, loai_mau_long: value })}
                        >
                            <Option value="trắng">White</Option>
                            <Option value="đen">Black</Option>
                            <Option value="đỏ đậm">Dark red</Option>
                            <Option value="đỏ nhạt">Light red</Option>
                            <Option value="nâu vàng">Brownish</Option>
                            <Option value="xám">Grey</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Head form...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, hinh_dang_dau: value })}
                        >
                            <Option value="dài">Long</Option>
                            <Option value="ngắn, không gãy">Short, straight</Option>
                            <Option value="gãy">Concave</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Back form...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_lung_bung: value })}
                        >
                            <Option value="thẳng">Straight</Option>
                            <Option value="võng vừa">Moderately curved</Option>
                            <Option value="võng nhiều">Hightly curved</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Button onClick={handleSearch}>Search</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
