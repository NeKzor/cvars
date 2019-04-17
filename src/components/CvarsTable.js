import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library as FA } from '@fortawesome/fontawesome-svg-core';
import { faWindows, faLinux } from '@fortawesome/free-brands-svg-icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { stableSort } from '../utils/stableSort';

FA.add(faWindows);
FA.add(faLinux);

const rows = [
    { id: 'name', numeric: false, sortable: true, label: 'Name' },
    { id: 'default', numeric: false, sortable: true, label: 'Default' },
    { id: 'flags', numeric: false, sortable: true, label: 'Flags' },
    { id: 'system', numeric: false, sortable: true, label: 'System' },
    { id: 'help', numeric: false, sortable: false, label: 'Help Text' },
];

class CvarsTableHead extends React.Component {
    static propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    createSortHandler = (property) => (event) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'center' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sortable === true &&
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                }
                                {row.sortable === false && row.label}
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

const styles = _ => ({
    root: {
        overflowX: 'auto',
    },
});

class CvarsTable extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
    };

    state = {
        order: 'asc',
        orderBy: 'name',
        page: 0,
        rowsPerPage: 100,
    };

    handleRequestSort = (_, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleChangePage = (_, page) => {
        this.setState({ page }, () => window.scroll(0, document.body.scrollHeight));
    };

    handleChangeRowsPerPage = (ev) => {
        this.setState({ rowsPerPage: ev.target.value });
    };

    render() {
        const { classes, data } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;

        return (
            <div className={classes.root}>
                <Table aria-labelledby="tableTitle">
                    <CvarsTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                        {stableSort(data, order, orderBy)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(cvar => {
                                const flags = cvar.getFlags()
                                const os = cvar.getOs();
                                return (
                                    <TableRow hover tabIndex={-1} key={cvar.name + cvar.flags}>
                                        <TableCell>{cvar.name}</TableCell>
                                        <TableCell>{cvar.default}</TableCell>
                                        <TableCell title={cvar.flags}>
                                            {flags.map((flag, idx) => (<React.Fragment key={idx}>{flag}<br /></React.Fragment>))}
                                        </TableCell>
                                        <TableCell>
                                            {os !== 'Both'
                                                ? <FontAwesomeIcon title={os} icon={['fab', os.toLowerCase()]} size="lg" />
                                                : <>
                                                    <FontAwesomeIcon title="Windows" icon={['fab', 'windows']} size="lg" />
                                                    &nbsp;&nbsp;&nbsp;
                                                    <FontAwesomeIcon title="Linux" icon={['fab', 'linux']} size="lg" />
                                                </>
                                            }
                                        </TableCell>
                                        <TableCell>{cvar.help}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 100, 500, 1000]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelDisplayedRows={() => ''}
                    backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                    nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CvarsTable);
