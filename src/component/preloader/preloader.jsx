import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const PreLoader = () => {
    return (
        <div className="preloading">
            <CircularProgress/>
        </div>
    );
};

export default PreLoader;