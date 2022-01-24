import React from "react";

import { Input } from "antd";

const { Search } = Input;

const AdminPigFilter = (props) => {
    const { fetchDataSearch } = props;

    const handleSearchInput = (value) => {
        let obj = { tu_khoa: value.toLowerCase() };
        fetchDataSearch(obj);
    };

    return (
        <>
            <div class="w3-content" style={{ maxWidth: "2500px" }}>
                <div class="w3-col m3">
                    <Search
                        style={{ width: "100%" }}
                        placeholder="Mã số cá thể, Loại con giống, Địa điểm đánh giá"
                        onSearch={handleSearchInput}
                        allowClear
                    />
                </div>
            </div>
        </>
    );
};

export default AdminPigFilter;
