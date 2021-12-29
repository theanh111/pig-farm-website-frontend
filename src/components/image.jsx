import { Link } from "react-router-dom";
export const PigImage = ({ title, age, id, smallImage }) => {
    const handleClickImage = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div className="portfolio-item">
            <div className="hover-bg">
                <Link onClick={handleClickImage} to={"/ca-the/" + id}>
                    <div className="hover-text">
                        <h4>{title}</h4>
                        <p>{age}</p>
                    </div>

                    <img
                        style={{ width: "389px", height: "260px", objectFit: "cover", display: "inline-block" }}
                        src={smallImage}
                        className="img-responsive-gallery"
                        alt={title}
                    />
                </Link>
            </div>
        </div>
    );
};
