// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library as FA } from '@fortawesome/fontawesome-svg-core';
import { faWindows, faLinux } from '@fortawesome/free-brands-svg-icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { styled, useTheme } from '@mui/material/styles';
import { stableSort } from '../utils/stableSort';
import TableFooter from '@mui/material/TableFooter';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

FA.add(faWindows);
FA.add(faLinux);

const rows = [
    { id: 'name', numeric: false, sortable: true, label: 'Name', disablePadding: false },
    { id: 'default', numeric: false, sortable: true, label: 'Default', disablePadding: false },
    { id: 'flags', numeric: false, sortable: true, label: 'Flags', disablePadding: false },
    { id: 'system', numeric: false, sortable: true, label: 'System', disablePadding: false },
    { id: 'help', numeric: false, sortable: false, label: 'Help Text', disablePadding: false },
];

const CvarsTableHead = ({ onRequestSort, order, orderBy }: any) => {
    const createSortHandler = (property: any) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {rows.map(
                    (row) => (
                        <TableCell
                            key={row.id}
                            align={row.numeric ? 'center' : 'left'}
                            padding={row.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === row.id ? order : false}
                        >
                            {row.sortable === true && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                            {row.sortable === false && row.label}
                        </TableCell>
                    ),
                    this,
                )}
            </TableRow>
        </TableHead>
    );
};

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

const PREFIX = 'CvarsTable';
const classes = {
  root: `${PREFIX}-root`,
};
const Root = styled('div')(() => ({
    [`&.${classes.root}`]: {
        overflowX: 'auto',
    },
}));

const CvarsTable = ({ data }: any) => {
    const [{ order, orderBy, rowsPerPage, page }, setState] = React.useState({
        order: 'asc',
        orderBy: 'name',
        page: 0,
        rowsPerPage: 100,
    });

    React.useEffect(() => {
        window.scroll(0, document.body.scrollHeight);
    }, [page]);

    const handleRequestSort = (_: any, property: string) => {
        const newOrderBy = property;
        let newOrder = 'desc';

        if (orderBy === property && order === 'desc') {
            newOrder = 'asc';
        }

        setState((s) => ({ ...s, order: newOrder, orderBy: newOrderBy }));
    };

    const handleChangePage = (_: any, page: number) => {
        setState((s) => ({ ...s, page }));
    };

    const handleChangeRowsPerPage = (ev: any) => {
        setState((s) => ({ ...s, rowsPerPage: ev.target.value }));
    };

    return (
        <Root className={classes.root}>
            <Table>
                <CvarsTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                />
                <TableBody>
                    {stableSort(data, order, orderBy)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((cvar: any) => {
                            const flags = cvar.getFlags();
                            const os = cvar.getOs();
                            return (
                                <TableRow hover tabIndex={-1} key={cvar.name + cvar.flags}>
                                    <TableCell>{cvar.name}</TableCell>
                                    <TableCell>{cvar.default}</TableCell>
                                    <TableCell title={cvar.flags}>
                                        {flags.map((flag: any, idx: number) => (
                                            <React.Fragment key={idx}>
                                                {flag}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {os !== 'Both' ? (
                                            <FontAwesomeIcon title={os} icon={['fab', os.toLowerCase()]} size="lg" />
                                        ) : (
                                            <>
                                                <FontAwesomeIcon title="Windows" icon={['fab', 'windows']} size="lg" />
                                                &nbsp;&nbsp;&nbsp;
                                                <FontAwesomeIcon title="Linux" icon={['fab', 'linux']} size="lg" />
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell>{cvar.help}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 100, 500, 1000]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelDisplayedRows={() => ''}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </Root>
    );
};

export default CvarsTable;
