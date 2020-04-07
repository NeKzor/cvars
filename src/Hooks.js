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

export const useScroll = () => {
    const timeout = React.useRef(undefined);
    const [state, setState] = React.useState({ x: 0, y: 0 });

    const onScroll = React.useCallback(() => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setState({ x: window.scrollX, y: window.scrollY });
        }, 100);
    }, [setState]);

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            clearTimeout(timeout.current);
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    return state;
};
