import React from 'react';

export const AppContext = React.createContext();

export const withContext = (Component) => (props) => (
    <AppContext.Consumer>
        {context => <Component {...context} {...props} />}
    </AppContext.Consumer>
);
