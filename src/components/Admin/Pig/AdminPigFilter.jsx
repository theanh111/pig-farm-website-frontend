import React from "react";

import { Input } from "antd";

const { Search } = Input;

const AdminPigFilter = (props) => {
    const { fetchDataSearch } = props;

    const handleSearchInput = (value) => {
        let obj = { keyWord: value };
        fetchDataSearch(obj);
    };

    return (
        <>
            <Search
                style={{ width: 500 }}
                placeholder="Nhập Mã số cá thể, Người Đánh Giá, Địa Điểm Đánh Giá..."
                onSearch={handleSearchInput}
                allowClear
            />
        </>
    );
};

export default AdminPigFilter;
