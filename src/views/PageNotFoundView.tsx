// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useTitle } from '../Hooks';
import ViewContent from './ViewContent';

const PREFIX = 'PageNotFoundView';
const classes = {
    infoBox: `${PREFIX}-infoBox`,
};
const Root = styled(Paper)(({ theme }) => ({
    [`&.${classes.infoBox}`]: {
        padding: theme.spacing(3),
    },
}));

const PageNotFoundView = () => {
    useTitle('404');

    return (
        <ViewContent>
            <Fade in={true} timeout={500}>
                <Root>
                    <List dense>
                        <ListItem>
                            <Typography component="h2" variant="h1">
                                404
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography component="h2" variant="h5">
                                Page Not Found
                            </Typography>
                        </ListItem>
                    </List>
                </Root>
            </Fade>
        </ViewContent>
    );
};

export default PageNotFoundView;
