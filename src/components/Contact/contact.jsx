import { Row, Col } from "antd";

export const Contact = (props) => {
    return (
        <>
            <div id="footer-fix">
                <Row align="middle" justify="center" gutter={[20, 20]}>
                    <Col xs={12}>
                        <div style={{ alignContent: "center", color: "white" }}>
                            <span>&copy; 2021 </span>
                            <a href="/" rel="nofollow">
                                Mong Cai Pig.
                            </a>
                            <br></br>
                            <p>
                                Website giới thiệu kết quả đề tài đánh giá đa dạng di truyền giống lợn Móng Cái ở thành phố Móng Cái
                                2021-2023
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};
