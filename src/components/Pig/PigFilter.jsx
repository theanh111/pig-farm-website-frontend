import React, { useEffect, useState } from "react";
import { Row, Col, Select, Input, Space } from "antd";

const { Option } = Select;
const { Search } = Input;

export const PigFilter = () => {
    const [filterData, setFilterData] = useState({});

    const handleSearch = (value) => {
        setFilterData({ ...filterData, keyWord: value.trim() });
    };

    useEffect(() => {
        console.log(filterData);
    }, [filterData]);

    return (
        <>
            <Space direction="vertical">
                <Row justify="left">
                    <Col xs={24}>
                        <Space>
                            <Search
                                style={{ width: 500 }}
                                placeholder="Tìm kiếm với Mã số cá thể, Đặc điểm, Cơ Sở Chăn Nuôi ..."
                                allowClear
                                onSearch={handleSearch}
                            ></Search>
                        </Space>
                    </Col>
                </Row>
                <Row justify="left">
                    <Space>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Giới Tính</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, gioi_tinh: value })}
                                >
                                    <Option value="đực">Đực</Option>
                                    <Option value="cái">Cái</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Nhân Trung Trắng</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, nhan_trung_trang: value })}
                                >
                                    <Option value="to">To</Option>
                                    <Option value="nhỏ">Nhỏ</Option>
                                    <Option value="không">Không</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Tai Mèo</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, tai_meo: value })}
                                >
                                    <Option value="có">Có</Option>
                                    <Option value="không">Không</Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Mõm</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, mom: value })}
                                >
                                    <Option value="dài nhỏ">Dài nhỏ</Option>
                                    <Option value="ngắn tròn">Ngắn tròn</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Vành Trắng Quanh Mõm</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, vanh_trang_quanh_mom: value })}
                                >
                                    <Option value="mỏng">Mỏng</Option>
                                    <Option value="dày (>5cm)">
                                        <span>{"Dày (>5cm)"}</span>
                                    </Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Mắt</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, mat: value })}
                                >
                                    <Option value="khôn, sáng, linh hoạt">Khôn, sáng, linh hoạt</Option>
                                    <Option value="mắt không khôn, chậm">Mắt không khôn, chậm</Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Da Có Khoang Đen</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, da_co_khoang_den: value })}
                                >
                                    <Option value="có">Có</Option>
                                    <Option value="có, dạng yên ngựa">Có, dạng yên ngựa</Option>
                                    <Option value="không">Không</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Khoang Đen Phụ</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, khoang_den_phu: value })}
                                >
                                    <Option value="có">Có</Option>
                                    <Option value="không">Không</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Kiểu Lưng Bụng</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, kieu_lung_bung: value })}
                                >
                                    <Option value="thẳng">Thẳng</Option>
                                    <Option value="võng vừa">Võng vừa</Option>
                                    <Option value="võng nhiều">Võng nhiều</Option>
                                </Select>
                            </Space>
                        </Col>
                    </Space>
                </Row>
                <Row justify="left">
                    <Space>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Chân</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, chan: value })}
                                >
                                    <Option value="to">To</Option>
                                    <Option value="nhỏ">Nhỏ</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Da Mắt</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, da_mat: value })}
                                >
                                    <Option value="không nhăn">Không nhăn</Option>
                                    <Option value="nhăn ít">Nhăn ít</Option>
                                    <Option value="nhăn nhiều">Nhăn nhiều</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Kiểu Đuôi</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, kieu_duoi: value })}
                                >
                                    <Option value="thẳng">Thẳng</Option>
                                    <Option value="xoăn">Xoăn</Option>
                                    <Option value="đuôi trâu">Đuôi trâu</Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Kiểu Tai</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, kieu_tai: value })}
                                >
                                    <Option value="cụp (rũ xuống)">Cụp (rũ xuống)</Option>
                                    <Option value="hơi cụp">Hơi cụp</Option>
                                    <Option value="vểnh">Vểnh</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Hướng Tai</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, huong_tai: value })}
                                >
                                    <Option value="phía trước">Phía trước</Option>
                                    <Option value="phía sau">Phía sau</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Kiểu Lông</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, kieu_long: value })}
                                >
                                    <Option value="xoăn - thẳng">Xoăn - Thẳng</Option>
                                    <Option value="ngắn - dài">Ngắn - Dài</Option>
                                    <Option value="rậm - thưa">Rậm - Thưa</Option>
                                </Select>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Loại Màu Lông</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, loai_mau_long: value })}
                                >
                                    <Option value="trắng">Trắng</Option>
                                    <Option value="đen">Đen</Option>
                                    <Option value="đỏ đậm">Đổ đậm</Option>
                                    <Option value="đỏ nhạt">Đổ nhạt</Option>
                                    <Option value="nâu vàng">Nâu vàng</Option>
                                    <Option value="xám">Xám</Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col xs={12}>
                            <Space>
                                <Select
                                    allowClear
                                    showSearch
                                    style={{ width: 150 }}
                                    placeholder={<span style={{ fontSize: 12 }}>Hình Dạng Đầu</span>}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                    onChange={(value) => setFilterData({ ...filterData, hinh_dang_dau: value })}
                                >
                                    <Option value="dài">Dài</Option>
                                    <Option value="ngắn, không gãy">Ngắn, không gãy</Option>
                                    <Option value="gãy">Gãy</Option>
                                </Select>
                            </Space>
                        </Col>
                    </Space>
                </Row>
            </Space>
        </>
    );
};
