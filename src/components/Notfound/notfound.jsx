import React, { useEffect } from "react";
import { Result, Button } from "antd";

const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Lỗi";
    }, []);

    return (
        <>
            <div className="site-layout-content">
                <Result
                    status="404"
                    title="404"
                    subTitle="Xin lỗi, trang bạn nhập không tồn tại."
                    extra={
                        <a href="/">
                            <Button type="primary">Về Trang Chủ</Button>
                        </a>
                    }
                />
            </div>
        </>
    );
};

export default NotFound;
