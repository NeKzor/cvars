// Copyright (c) 2019-2024, NeKz
// SPDX-License-Identifier: MIT

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const shrink = { shrink: true };

export const SelectField = ({ menuItems, ...props }: any) => (
    <TextField select margin="dense" {...props}>
        {menuItems.map((item: any, idx: number) => (
            <MenuItem key={idx} value={item.value}>
                {item.label}
            </MenuItem>
        ))}
    </TextField>
);

export const NumberField = (props: any) => <TextField type="number" InputLabelProps={shrink} margin="dense" {...props} />;

export const DateField = (props: any) => <TextField type="date" InputLabelProps={shrink} margin="dense" {...props} />;
