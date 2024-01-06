// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';

const PREFIX = 'CvarsFilter';
const classes = {
    floatRight: `${PREFIX}-floatRight`,
};
const Root = styled('div')(({ theme }) => ({
    [`& .${classes.floatRight}`]: {
        [theme.breakpoints.up('md')]: {
            float: 'right',
            paddingRight: 20,
        },
        paddingTop: 3,
    },
}));

let searchTimeout: any = undefined;

const CvarsFilter = ({ defaultSearchTerm, newCheckbox, searchFilter }: any) => {
    const [state, setState] = React.useState({
        searchTerm: defaultSearchTerm || '',
        name: true,
        defaultValue: false,
        flags: false,
        system: false,
        help: false,
        newOnly: false,
    });

    const applyFilter = React.useCallback(() => {
        const { searchTerm, name, defaultValue, flags, system, help, newOnly } = state;

        searchFilter((cvar: any) => {
            if (newOnly === true && cvar.new === false) {
                return false;
            }

            if (searchTerm === '' || (!name && !defaultValue && !flags && !help && !newOnly)) {
                return true;
            }

            const terms = searchTerm.split(' ').filter((t: string) => t);
            if (terms.length === 0) {
                return true;
            }

            return (
                (name && terms.some((term: string) => cvar.name.includes(term))) ||
                (defaultValue && terms.some((term: string) => cvar.default.includes(term))) ||
                (flags && terms.some((term: string) => cvar.getFlags().some((flag: string) => term.includes(flag)))) ||
                (system && terms.some((term: string) => cvar.getOs().includes(term))) ||
                (help && terms.some((term: string) => cvar.help.includes(term)))
            );
        });
    }, [searchFilter, state]);

    React.useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const setSearchTerm = (ev: any) => {
        const searchTerm = ev.target.value;
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => setState((s) => ({ ...s, searchTerm })), 200);
    };

    const handleChecked = (name: string) => (event: any) => {
        setState((s) => ({ ...s, [name]: event.target.checked }));
    };

    return (
        <Root>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={5} xl={6}>
                    <FormGroup row style={{ paddingTop: '10px', paddingRight: '10px' }}>
                        <Input
                            title="Separate multiple search terms with spaces in between."
                            placeholder="Search"
                            onChange={setSearchTerm}
                            disableUnderline={true}
                            fullWidth
                            margin="dense"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={7} xl={6}>
                    <div className={classes.floatRight}>
                        <FormGroup row>
                            <FormControlLabel
                                label="Name"
                                control={
                                    <Checkbox
                                        checked={state.name}
                                        onChange={handleChecked('name')}
                                        value="name"
                                        color="primary"
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Default"
                                control={
                                    <Checkbox
                                        checked={state.defaultValue}
                                        onChange={handleChecked('defaultValue')}
                                        value="defaultValue"
                                        color="primary"
                                    />
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.flags}
                                        onChange={handleChecked('flags')}
                                        value="flags"
                                        color="primary"
                                    />
                                }
                                label="Flags"
                            />
                            <FormControlLabel
                                label="System"
                                control={
                                    <Checkbox
                                        checked={state.system}
                                        onChange={handleChecked('system')}
                                        value="system"
                                        color="primary"
                                    />
                                }
                            />
                            <FormControlLabel
                                label="Help Text"
                                control={
                                    <Checkbox
                                        checked={state.help}
                                        onChange={handleChecked('help')}
                                        value="help"
                                        color="primary"
                                    />
                                }
                            />
                            {newCheckbox && (
                                <FormControlLabel
                                    label="New"
                                    control={
                                        <Checkbox
                                            checked={state.newOnly}
                                            onChange={handleChecked('newOnly')}
                                            value="newOnly"
                                            color="primary"
                                        />
                                    }
                                />
                            )}
                        </FormGroup>
                    </div>
                </Grid>
            </Grid>
        </Root>
    );
};

export default CvarsFilter;
