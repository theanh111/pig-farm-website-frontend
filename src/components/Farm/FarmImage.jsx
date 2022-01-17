import { Link } from "react-router-dom";
import { Image, Card } from "antd";
const { Meta } = Card;

export const FarmImage = ({ title, age, id, farmcode, smallImage }) => {
    const handleClickImage = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <>
            <Link onClick={handleClickImage} to={"/co-so-chan-nuoi/" + farmcode}>
                <div className="container">
                    <Image
                        className="image"
                        preview={false}
                        style={{ width: "389px", height: "260px", objectFit: "cover", display: "inline-block" }}
                        src={smallImage}
                        alt={title}
                    />
                    <div className="middle">
                        <Card hoverable size="small" style={{ borderRadius: "5px" }}>
                            <Meta
                                description={
                                    <>
                                        <span style={{ fontSize: 20, fontWeight: 400, color: "black" }}>{title}</span>
                                    </>
                                }
                            />
                        </Card>
                    </div>
                </div>
            </Link>
            <div style={{ height: "5px" }}></div>
        </>
    );
};
