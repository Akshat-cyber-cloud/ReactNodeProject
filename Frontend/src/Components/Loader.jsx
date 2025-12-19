import React from 'react';
import './Loader.css';

function Loader({ showLoader }) {
    if (!showLoader) return null;

    return (
        <div id="loader">
            <h1>CONNECT</h1>
            <h1>COLLABORATE</h1>
            <h1>SCALE</h1>
        </div>
    );
}

export default Loader;
