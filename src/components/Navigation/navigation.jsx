import { Divider, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const Navigation = (props) => {
    const { vietnamese } = props;
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
                    <span>{vietnamese ? vietnamese.web_title : null}</span>
                </a>
            </div>
            <div class="w3-bar w3-green w3-small" style={{ backgroundColor: "#006544" }}>
                <Link to="/" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.homepage : null}
                </Link>

                <Link to="/ca-the" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.pig : null}
                </Link>
                <Link to="/co-so-chan-nuoi" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.farm : null}
                </Link>
                <Link to="/thong-tin-du-an" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.blog : null}
                </Link>
                <Link to="/tin-tuc" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.news : null}
                </Link>
                <Link to="/lien-he" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    {vietnamese ? vietnamese.contact : null}
                </Link>
                <Link to="/dang-nhap" className="login-button" class="w3-bar-item w3-button w3-right w3-green w3-mobile w3-hover-teal">
                    <ExportOutlined
                        title={vietnamese ? vietnamese.login_title : null}
                        className="login-icon"
                        style={{ cursor: "pointer", color: "white", fontSize: 28, paddingTop: 2 }}
                    />
                </Link>
                <span class="w3-bar-item w3-right w3-mobile">
                    <span className="vietnam-flag-button">
                        <img
                            title={vietnamese ? vietnamese.vie_title : null}
                            className="vietnam-flag"
                            src="/images/vie.png"
                            style={{ cursor: "pointer", height: 32 }}
                        />
                    </span>
                    <span> </span>
                    <span className="england-flag-button">
                        <img
                            title={vietnamese ? vietnamese.eng_title : null}
                            className="england-flag"
                            src="/images/uk.png"
                            style={{ cursor: "pointer", height: 32 }}
                        />
                    </span>
                </span>
                <span class="w3-bar-item w3-right w3-mobile">
                    <Search
                        title={vietnamese ? vietnamese.search_title : null}
                        placeholder={vietnamese ? vietnamese.search_placeholder : null}
                        allowClear
                        onSearch={onSearch}
                        size="medium"
                    />
                </span>
            </div>
        </>
    );
};
