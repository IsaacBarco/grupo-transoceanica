import React from 'react';

const ErrorMessage = ({ message }) => (
    <p>{message}</p>
);

const ErrorDisplay = ({ error }) => {
    return <ErrorMessage message={error} />;
};

export default ErrorDisplay;