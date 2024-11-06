import React from 'react';

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="loader">
            {message}
        </div>
    );
};

export default Loader;