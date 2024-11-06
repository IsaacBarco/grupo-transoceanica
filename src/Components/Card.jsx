import React from "react";
import PropTypes from 'prop-types';

const Card = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No hay datos disponibles.</p>;
    }

    const readMore = (url) => {
        if (url) {
            window.open(url, "_blank");
        } else {
            console.warn("Invalid URL");
        }
    };

    return (
        <div className="cardContainer">
            {data.map((curItem, index) => (
                <div className="card" key={curItem.id || index}>
                    {curItem.urlToImage && (
                        <img
                            src={curItem.urlToImage}
                            alt={curItem.title || "News Image"}
                            className="card-image"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'default-image-url.jpg'; 
                            }}
                        />
                    )}
                    <div className="content">
                        <h3 className="title">{curItem.title || "Sin título"}</h3>
                        <p>{curItem.description || "Descripción no disponible."}</p>
                        <button
                            className="read-more-button"
                            onClick={() => readMore(curItem.url || "#")}
                            disabled={!curItem.url}
                            aria-label={curItem.url ? `Read more about ${curItem.title}` : "No link available"}
                        >
                            {curItem.url ? "Read More" : "No Link Available"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Validación de PropTypes
Card.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        urlToImage: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
    })).isRequired,
};

export default Card;
