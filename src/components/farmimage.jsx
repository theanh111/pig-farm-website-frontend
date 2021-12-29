import { Link } from "react-router-dom";
export const Image = ({ title, age, id, smallImage }) => {
    const handleClickImage = () => {
        return window.scrollTo(0, 0);
    };

    return (
        <div className="portfolio-item">
            <div className="hover-bg">
                <Link onClick={handleClickImage} to={"/co-so/" + id}>
                    <div className="hover-text">
                        <h4>{title}</h4>
                        <p>{age}</p>
                    </div>

                    <img
                        style={{ width: "584px", height: "389px", objectFit: "cover", display: "inline-block" }}
                        src={smallImage}
                        className="img-responsive-gallery"
                        alt={title}
                    />
                </Link>
            </div>
        </div>
    );
};
