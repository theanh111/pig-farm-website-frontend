import React, { useState } from "react";
import { Select, Input, Button } from "antd";

const { Option } = Select;
const { Search } = Input;

export const PigFilter = (props) => {
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
                            placeholder="Mã số cá thể, Loại con giống, Địa điểm đánh giá"
                            allowClear
                            onSearch={handleSearchInput}
                        />
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Giới tính...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, gioi_tinh: value })}
                        >
                            <Option value="đực">Đực</Option>
                            <Option value="cái">Cái</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Nhân trung trắng...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, nhan_trung_trang: value })}
                        >
                            <Option value="to">To</Option>
                            <Option value="nhỏ">Nhỏ</Option>
                            <Option value="không">Không</Option>
                        </Select>
                    </div>

                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Tai mèo...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, tai_meo: value })}
                        >
                            <Option value="có">Có</Option>
                            <Option value="không">Không</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Mõm...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, mom: value })}
                        >
                            <Option value="dài nhỏ">Dài nhỏ</Option>
                            <Option value="ngắn tròn">Ngắn tròn</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Vành trắng quanh mõm...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, vanh_trang_quanh_mom: value })}
                        >
                            <Option value="mỏng">Mỏng</Option>
                            <Option value="dày (>5cm)">
                                <span>{"Dày (>5cm)"}</span>
                            </Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Mắt...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, mat: value })}
                        >
                            <Option value="khôn, sáng, linh hoạt">Khôn, sáng, linh hoạt</Option>
                            <Option value="mắt không khôn, chậm">Mắt không khôn, chậm</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Da có khoang đen...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, da_co_khoang_den: value })}
                        >
                            <Option value="có">Có</Option>
                            <Option value="có, dạng yên ngựa">Có, dạng yên ngựa</Option>
                            <Option value="không">Không</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            style={{ width: "100%" }}
                            allowClear
                            showSearch
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Khoang đen phụ...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, khoang_den_phu: value })}
                        >
                            <Option value="có">Có</Option>
                            <Option value="không">Không</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Chân...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, chan: value })}
                        >
                            <Option value="to">To</Option>
                            <Option value="nhỏ">Nhỏ</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Da mặt...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, da_mat: value })}
                        >
                            <Option value="không nhăn">Không nhăn</Option>
                            <Option value="nhăn ít">Nhăn ít</Option>
                            <Option value="nhăn nhiều">Nhăn nhiều</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Kiểu đuôi...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_duoi: value })}
                        >
                            <Option value="thẳng">Thẳng</Option>
                            <Option value="xoăn">Xoăn</Option>
                            <Option value="đuôi trâu">Đuôi trâu</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Kiểu tai...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_tai: value })}
                        >
                            <Option value="cụp (rũ xuống)">Cụp (rũ xuống)</Option>
                            <Option value="hơi cụp">Hơi cụp</Option>
                            <Option value="vểnh">Vểnh</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Hướng tai...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, huong_tai: value })}
                        >
                            <Option value="phía trước">Phía trước</Option>
                            <Option value="phía sau">Phía sau</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Kiểu lông...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_long: value })}
                        >
                            <Option value="xoăn - thẳng">Xoăn - Thẳng</Option>
                            <Option value="ngắn - dài">Ngắn - Dài</Option>
                            <Option value="rậm - thưa">Rậm - Thưa</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Loại màu lông...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, loai_mau_long: value })}
                        >
                            <Option value="trắng">Trắng</Option>
                            <Option value="đen">Đen</Option>
                            <Option value="đỏ đậm">Đỏ đậm</Option>
                            <Option value="đỏ nhạt">Đỏ nhạt</Option>
                            <Option value="nâu vàng">Nâu vàng</Option>
                            <Option value="xám">Xám</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Hình dạng đầu...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, hinh_dang_dau: value })}
                        >
                            <Option value="dài">Dài</Option>
                            <Option value="ngắn, không gãy">Ngắn, không gãy</Option>
                            <Option value="gãy">Gãy</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Select
                            allowClear
                            showSearch
                            style={{ width: "100%" }}
                            placeholder={<span style={{ fontSize: 12, color: "grey" }}>Kiểu lưng bụng...</span>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                            onChange={(value) => setFilterData({ ...filterData, kieu_lung_bung: value })}
                        >
                            <Option value="thẳng">Thẳng</Option>
                            <Option value="võng vừa">Võng vừa</Option>
                            <Option value="võng nhiều">Võng nhiều</Option>
                        </Select>
                    </div>
                    <div class="w3-col m3">
                        <Button onClick={handleSearch}>Tìm Kiếm</Button>
                    </div>
                </div>
            </div>
        </>
    );
};
