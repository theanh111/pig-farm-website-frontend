import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Lỗi";
    }, []);

    return (
        <div className="main">
            <div className="fof">
                <h1>Error 404</h1>
                <Link to="/" className="link-home">
                    Về Trang Chủ
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
