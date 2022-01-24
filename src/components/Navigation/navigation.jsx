import { Divider, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const Navigation = () => {
    const history = useNavigate();
    const onSearch = (value) => {
        if (value) {
            if (value.trim().length > 0) {
                history("/tim-kiem/" + value);
            }
        }
    };

    return (
        <>
            <div class="w3-bar w3-large" style={{ backgroundColor: "#006544" }}>
                <a
                    href="/"
                    style={{ color: "white", fontSize: 28, fontWeight: 800, cursor: "pointer", backgroundColor: "#006544" }}
                    class="w3-bar-item w3-button w3-mobile w3-hover-teal"
                >
                    <img title="mongcaipig.vn" src="/images/icon-pig.jpg" style={{ height: 40, width: 40 }} />
                    <span>DỰ ÁN NGHIÊN CỨU NGUỒN GEN GIỐNG LỢN MÓNG CÁI</span>
                </a>
            </div>
            <div class="w3-bar w3-green w3-small" style={{ backgroundColor: "#006544" }}>
                <Link to="/" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Trang Chủ
                </Link>

                <Link to="/ca-the" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Cá Thể
                </Link>
                <Link to="/co-so-chan-nuoi" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Cơ Sở Chăn Nuôi
                </Link>
                <Link to="/thong-tin-du-an" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Thông Tin Dự Án
                </Link>
                <Link to="/tin-tuc" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Tin Tức
                </Link>
                <Link to="/lien-he" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Liên Hệ
                </Link>
                <Link to="/dang-nhap" className="login-button" class="w3-bar-item w3-button w3-right w3-green w3-mobile w3-hover-teal">
                    <ExportOutlined
                        title="Đăng Nhập"
                        className="login-icon"
                        style={{ cursor: "pointer", color: "white", fontSize: 28, paddingTop: 2 }}
                    />
                </Link>
                <span class="w3-bar-item w3-right w3-mobile">
                    <span className="vietnam-flag-button">
                        <img title="Vietnamese" className="vietnam-flag" src="/images/vie.png" style={{ cursor: "pointer", height: 32 }} />
                    </span>
                    <span> </span>
                    <span className="england-flag-button">
                        <img title="English" className="england-flag" src="/images/uk.png" style={{ cursor: "pointer", height: 32 }} />
                    </span>
                </span>
                <span class="w3-bar-item w3-right w3-mobile">
                    <Search title="Tìm kiếm" placeholder="Tìm kiếm..." allowClear onSearch={onSearch} size="medium" />
                </span>
            </div>
        </>
    );
};
