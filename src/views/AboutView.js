import React from 'react';
import moment from 'moment';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { useTitle, useIsMounted } from '../Hooks';
import AppState from '../AppState';

const useStyles = makeStyles((theme) => ({
    aboutBox: {
        padding: theme.spacing(3),
    },
}));

const qa = [
    [
        'Q: What are "New" commands?',
        'A: Commands that have been added in an updated engine version. This only applies for games that derive from other games e.g. INFRA is based on Portal 2 engine.',
    ],
    '',
    [
        'Q: How about showing the exact arguments of a console command?',
        'A: Unfortunately the engine does not provide useful information about passing arguments.',
    ],
    '',
    [
        'Q: What about commands like restart_level or impulse?',
        'A: These commands are not registered by the ICvar interface and only exist hard-coded in ClientCommand functions of entities.',
    ],
    '',
    ['Q: How did you gather all that data?', "A: Mostly used SourceAutoRecord's dumping features."],
];

const noWrap = { whiteSpace: 'nowrap' };
const MinTableCell = (props) => <TableCell size="small" {...props} />;
const Padding = () => <div style={{ paddingTop: '50px' }} />;

const branches = ['master', 'api', 'gh-pages'];

const AboutView = () => {
    const isMounted = useIsMounted();

    useTitle('About');

    const {
        state: { darkMode },
        dispatch,
    } = React.useContext(AppState);

    const [gitHub, setGitHub] = React.useState([]);

    React.useEffect(() => {
        const anyErrors = (err) => {
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
                                    author: branch.author,
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

    const toggleDarkMode = () => {
        dispatch({ action: 'toggleDarkMode' });
    };

    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={false} sm={false} md={2} lg={3} xl={3} />
            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                <Fade in={true} timeout={500}>
                    <Paper className={classes.aboutBox}>
                        <Typography component="h2" variant="h5">
                            Source Engine Console Commands & Variables
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            The largest console command database of various Source Engine games. We list hidden
                            developer commands, expose OS specifics differences and highlight commands between similar
                            engines.
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
                            <CircularProgress className={classes.progress} />
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="default">
                                                <Typography variant="body1">Branch</Typography>
                                            </TableCell>
                                            <TableCell padding="default">
                                                <Typography variant="body1">Date</Typography>
                                            </TableCell>
                                            <TableCell padding="default">
                                                <Typography variant="body1">Author</Typography>
                                            </TableCell>
                                            <TableCell padding="default">
                                                <Typography variant="body1">Commit</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gitHub.map((commit, idx) => {
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
                                                        <Tooltip title={moment(commit.date).toString()}>
                                                            <span>{moment(commit.date).from()}</span>
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
                                                                href={
                                                                    'https://github.com/NeKzor/lp/commit/' + commit.sha
                                                                }
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

                        <Padding />

                        <Typography variant="h5">Theme Settings</Typography>
                        <br />
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch checked={darkMode.enabled} onChange={toggleDarkMode} color="primary" />
                                }
                                label="Dark Mode"
                            />
                        </FormGroup>

                        <Padding />

                        <Tooltip title="Source Code">
                            <Link rel="noopener" href="https://github.com/NeKzor/cvars">
                                github.com/NeKzor/cvars
                            </Link>
                        </Tooltip>
                    </Paper>
                </Fade>
            </Grid>
        </Grid>
    );
};

export default AboutView;
