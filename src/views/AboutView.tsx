// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import Fade from '@mui/material/Fade';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { useTitle, useIsMounted } from '../Hooks';
import AppState from '../AppState';
import ViewContent from './ViewContent';

const PREFIX = 'AboutView';
const classes = {
    aboutBox: `${PREFIX}-aboutBox`,
};
const Root = styled(Paper)(({ theme }) => ({
    [`&.${classes.aboutBox}`]: {
        padding: theme.spacing(3),
    },
}));

const qa = [
    [
        'Q: What are "New" commands?',
        'A: Commands that have been added in an updated engine version. This only applies for games that derive from ' +
            'other games e.g. INFRA is based on Portal 2 engine.',
    ],
    '',
    [
        'Q: How about showing the exact arguments of a console command?',
        'A: Unfortunately the engine does not provide useful information about passing arguments.',
    ],
    '',
    [
        'Q: What about commands like restart_level or impulse?',
        'A: These commands are not registered by the ICvar interface and only exist hard-coded in ClientCommand ' +
            'functions of entities.',
    ],
    '',
    [
        'Q: How did you gather all that data?',
        'A: A generic and injectable dumping module has been written, inspired by SourceAutoRecord.',
    ],
];

const noWrap = { whiteSpace: 'nowrap' };
const MinTableCell = (props: any) => <TableCell size="small" {...props} />;
const Padding = () => <div style={{ paddingTop: '50px' }} />;

const branches = ['main', 'api'];

const AboutView = () => {
    const isMounted = useIsMounted();

    useTitle('About');

    const [gitHub, setGitHub] = React.useState<any>([]);

    React.useEffect(() => {
        const anyErrors = (err: any) => {
            console.error(err);
            if (isMounted.current) {
                setGitHub(undefined);
            }
        };

        Promise.all(branches.map((branch) => fetch('https://api.github.com/repos/NeKzor/cvars/commits/' + branch)))
            .then((results) => {
                Promise.all(results.map((res) => res.json()))
                    .then((branches) => {
                        if (isMounted.current) {
                            setGitHub(
                                branches.map((branch) => ({
                                    sha: branch.sha,
                                    author: branch.author ? branch.author : branch.commit.author,
                                    message: branch.commit.message,
                                    date: branch.commit.author.date,
                                })),
                            );
                        }
                    })
                    .catch(anyErrors);
            })
            .catch(anyErrors);
    }, [isMounted]);

    return (
        <ViewContent>
            <Fade in={true} timeout={500}>
                <Root className={classes.aboutBox}>
                    <Typography component="h2" variant="h5">
                        Source Engine Console Commands & Variables
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        The largest console command database of various Source Engine games. We list hidden developer
                        commands, expose OS specifics differences and highlight commands between similar engines.
                    </Typography>

                    <Padding />

                    <Typography component="h2" variant="h5">
                        Q/A
                    </Typography>
                    <br />
                    {qa.map((text, idx) => (
                        <ListItem key={idx}>
                            <Typography variant="body1">
                                {Array.isArray(text)
                                    ? text.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            {item}
                                            <br />
                                        </React.Fragment>
                                    ))
                                    : text}
                            </Typography>
                        </ListItem>
                    ))}

                    <Padding />

                    <Typography variant="h5">Last Update</Typography>
                    <br />
                    {gitHub === undefined ? (
                        <Typography variant="body1">Unable to fetch status from GitHub.</Typography>
                    ) : gitHub.length === 0 ? (
                        <CircularProgress />
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="normal">
                                            <Typography variant="body1">Branch</Typography>
                                        </TableCell>
                                        <TableCell padding="normal">
                                            <Typography variant="body1">Date</Typography>
                                        </TableCell>
                                        <TableCell padding="normal">
                                            <Typography variant="body1">Author</Typography>
                                        </TableCell>
                                        <TableCell padding="normal">
                                            <Typography variant="body1">Commit</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gitHub.map((commit: any, idx: number) => {
                                        const branch = branches[idx];
                                        return (
                                            <TableRow tabIndex={-1} key={idx} style={noWrap}>
                                                <MinTableCell align="left">
                                                    <Link
                                                        color="inherit"
                                                        rel="noopener"
                                                        href={'https://github.com/NeKzor/cvars/tree/' + branch}
                                                    >
                                                        {branch}
                                                    </Link>
                                                </MinTableCell>
                                                <MinTableCell align="left" style={noWrap}>
                                                    <Tooltip title={new Date(commit.date).toISOString().replace('T', ' ').slice(0, 16)}>
                                                        <span>{new Date(commit.date).toISOString().replace('T', ' ').slice(0, 10)}</span>
                                                    </Tooltip>
                                                </MinTableCell>
                                                <MinTableCell align="left">
                                                    {commit.author ? (
                                                        <Link
                                                            color="inherit"
                                                            rel="noopener"
                                                            href={commit.author.html_url}
                                                        >
                                                            {commit.author.login}
                                                        </Link>
                                                    ) : (
                                                        'n/a'
                                                    )}
                                                </MinTableCell>
                                                <MinTableCell align="left" style={noWrap}>
                                                    <Tooltip title={commit.message}>
                                                        <Link
                                                            color="inherit"
                                                            rel="noopener"
                                                            href={'https://github.com/NeKzor/cvars/commit/' + commit.sha}
                                                        >
                                                            {commit.sha}
                                                        </Link>
                                                    </Tooltip>
                                                </MinTableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </Root>
            </Fade>
        </ViewContent>
    );
};

export default AboutView;
