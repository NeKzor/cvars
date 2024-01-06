// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT  

import Grid from '@mui/material/Grid';

const ViewContent = ({ children }: any) => {
    return (
        <Grid style={{marginBottom: 30}} container>
            <Grid item xs={false} md={1} lg={2} />
            <Grid item xs={12} md={10} lg={9}>
                {children}
            </Grid>
        </Grid>
    );
};

export default ViewContent;
