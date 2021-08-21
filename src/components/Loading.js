import React from  'react';
import Spinner from 'react-bootstrap/Spinner';
const Loading = () => {
    return (
        <div className="loading-spinner">
            <Spinner animation="border" role="status"></Spinner>
        </div>
    );
}

export default Loading;