import React from 'react';
import Card from './Card';

const NewsList = ({ newsData }) => {
    return (
        <>
            {newsData.length > 0 ? (
                <Card data={newsData} />
            ) : (
                <p>No hay resultados disponibles.</p>
            )}
        </>
    );
};

export default NewsList;
