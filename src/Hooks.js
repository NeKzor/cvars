import React from 'react';

export const useIsMounted = () => {
    const ref = React.useRef(false);
    React.useEffect(() => {
        ref.current = true;
        return () => (ref.current = false);
    }, []);
    return ref;
};

export const useRenders = (debug) => {
    const ref = React.useRef(0);
    console.log(debug + ' renders: ', ++ref.current);
};

export const useTitle = (title) => {
    React.useEffect(() => {
        document.title = title + ' - ' + document.location.host;
    }, [title]);
};
