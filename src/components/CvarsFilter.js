import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    floatRight: {
        [theme.breakpoints.up('md')]: {
            float: 'right',
            paddingRight: 20,
        },
        paddingTop: 3,
    },
}));

let searchTimeout = undefined;

const CvarsFilter = ({ defaultSearchTerm, newCheckbox, searchFilter }) => {
    const [state, setState] = React.useState({
        searchTerm: defaultSearchTerm || '',
        name: true,
        defaultValue: false,
        flags: false,
        system: false,
        help: false,
        newOnly: false,
    });

    React.useEffect(() => {
        applyFilter();
    }, [state]);

    const { searchTerm, name, defaultValue, flags, system, help, newOnly } = state;

    const setSearchTerm = (ev) => {
        const searchTerm = ev.target.value;
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => setState((s) => ({ ...s, searchTerm })), 200);
    };

    const applyFilter = () => {
        searchFilter((cvar) => {
            if (newOnly === true && cvar.new === false) {
                return false;
            }

            if (searchTerm === '' || (!name && !defaultValue && !flags && !help && !newOnly)) {
                return true;
            }

            const terms = searchTerm.split(' ').filter((t) => t);
            if (terms.length === 0) {
                return true;
            }

            return (
                (name && terms.some((term) => cvar.name.includes(term))) ||
                (defaultValue && terms.some((term) => cvar.default.includes(term))) ||
                (flags && terms.some((term) => cvar.getFlags().some((flag) => term.includes(flag)))) ||
                (system && terms.some((term) => cvar.getOs().includes(term))) ||
                (help && terms.some((term) => cvar.help.includes(term)))
            );
        });
    };

    const handleChecked = (name) => (event) => {
        setState((s) => ({ ...s, [name]: event.target.checked }));
    };

    const classes = useStyles();

    return (
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
                                    checked={name}
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
                                    checked={defaultValue}
                                    onChange={handleChecked('defaultValue')}
                                    value="defaultValue"
                                    color="primary"
                                />
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={flags}
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
                                    checked={system}
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
                                    checked={help}
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
                                        checked={newOnly}
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
    );
};

export default CvarsFilter;
