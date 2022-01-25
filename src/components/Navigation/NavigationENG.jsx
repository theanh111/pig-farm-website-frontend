import { Divider, Input } from "antd";
import { Link } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const NavigationENG = (props) => {
    const history = useNavigate();
    const onSearch = (value) => {
        if (value) {
            if (value.trim().length > 0) {
                history("/search/" + value);
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
                    <span>PROJECT ON EVALUATION OF GENETIC DIVERSITY OF MONG CAI PIG IN MONG CAI CITY</span>
                </a>
            </div>
            <div class="w3-bar w3-green w3-small" style={{ backgroundColor: "#006544" }}>
                <Link to="/homepage" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Homepage
                </Link>

                <Link to="/pig-indivuduals" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Pig Indivuduals
                </Link>
                <Link to="/livestock-farms" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Livestock Farms
                </Link>
                <Link
                    to="/project-information"
                    style={{ fontSize: 20, fontWeight: 600 }}
                    class="w3-bar-item w3-button w3-mobile w3-hover-teal"
                >
                    Project Information
                </Link>
                <Link to="/news" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    News
                </Link>
                <Link to="/contact" style={{ fontSize: 20, fontWeight: 600 }} class="w3-bar-item w3-button w3-mobile w3-hover-teal">
                    Contact
                </Link>
                <Link to="/dang-nhap" className="login-button" class="w3-bar-item w3-button w3-right w3-green w3-mobile w3-hover-teal">
                    <ExportOutlined
                        title="Sign In"
                        className="login-icon"
                        style={{ cursor: "pointer", color: "white", fontSize: 28, paddingTop: 2 }}
                    />
                </Link>
                <span class="w3-bar-item w3-right w3-mobile">
                    <Link to="/" target="_blank">
                        <span className="vietnam-flag-button">
                            <img
                                title="Vietnamese"
                                className="vietnam-flag"
                                src="/images/vie.png"
                                style={{ cursor: "pointer", height: 32 }}
                            />
                        </span>
                    </Link>

                    <span> </span>
                    {/* <Link to="/homepage" target="_blank">
                        <span className="england-flag-button">
                            <img title="English" className="england-flag" src="/images/uk.png" style={{ cursor: "pointer", height: 32 }} />
                        </span>
                    </Link> */}
                </span>
                <span class="w3-bar-item w3-right w3-mobile">
                    <Search title="Search" placeholder="Search..." allowClear onSearch={onSearch} size="medium" />
                </span>
            </div>
        </>
    );
};
