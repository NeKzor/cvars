import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    floatRight: {
        [theme.breakpoints.up('md')]: {
            float: 'right',
            paddingRight: 20,
        },
        paddingTop: 3,
    },
});

class CvarsFilter extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        searchFilter: PropTypes.func.isRequired,
        newCheckbox: PropTypes.bool,
    };

    state = {
        searchTerm: '',
        name: true,
        defaultValue: false,
        flags: false,
        system: false,
        help: false,
        newOnly: false,
    };

    static searchTimeout = undefined;

    setSearchTerm = (ev) => {
        const searchTerm = ev.target.value;
        clearTimeout(CvarsFilter.searchTimeout);
        CvarsFilter.searchTimeout = setTimeout(() => this.setState({ searchTerm }, () => this.applyFilter()), 200);
    };

    applyFilter = () => {
        this.props.searchFilter((cvar) => {
            const { searchTerm, name, defaultValue, flags, system, help, newOnly } = this.state;

            if (newOnly === true && cvar.new === false) {
                return false;
            }

            if (searchTerm === '' || (!name && !defaultValue && !flags && !help && !newOnly)) {
                return true;
            }

            const terms = searchTerm.split(' ').filter(t => t);
            if (terms.length === 0) {
                return true;
            }

            return (name && terms.some(term => cvar.name.includes(term)))
                || (defaultValue && terms.some(term => cvar.default.includes(term)))
                || (flags && terms.some(term => cvar.getFlags().some(flag => term.includes(flag))))
                || (system && terms.some(term => cvar.getOs().includes(term)))
                || (help && terms.some(term => cvar.help.includes(term)));
        });
    };

    handleChecked = (name) => (event) => {
        this.setState({ [name]: event.target.checked }, () => this.applyFilter());
    };

    render() {
        const { classes, newCheckbox } = this.props;
        const { name, defaultValue, flags, system, help, newOnly } = this.state;

        return (
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={5} xl={6}>
                    <FormGroup row style={{ paddingTop: '15px', paddingRight: '10px' }}>
                        <Input
                            title="Separate multiple search terms with spaces in between."
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'Description' }}
                            onChange={this.setSearchTerm}
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
                                        onChange={this.handleChecked('name')}
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
                                        onChange={this.handleChecked('defaultValue')}
                                        value="defaultValue"
                                        color="primary"
                                    />
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={flags}
                                        onChange={this.handleChecked('flags')}
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
                                        onChange={this.handleChecked('system')}
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
                                        onChange={this.handleChecked('help')}
                                        value="help"
                                        color="primary"
                                    />
                                }
                            />
                            {newCheckbox &&
                                <FormControlLabel
                                    label="New"
                                    control={
                                        <Checkbox
                                            checked={newOnly}
                                            onChange={this.handleChecked('newOnly')}
                                            value="newOnly"
                                            color="primary"
                                        />
                                    }
                                />
                            }
                        </FormGroup>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(CvarsFilter);