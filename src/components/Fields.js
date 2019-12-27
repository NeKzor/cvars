import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const shrink = { shrink: true };

export const SelectField = ({ menuItems, ...props }) => (
    <TextField select margin="dense" {...props}>
        {menuItems.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>
                {item.label}
            </MenuItem>
        ))}
    </TextField>
);

export const NumberField = (props) => <TextField type="number" InputLabelProps={shrink} margin="dense" {...props} />;

export const DateField = (props) => <TextField type="date" InputLabelProps={shrink} margin="dense" {...props} />;
