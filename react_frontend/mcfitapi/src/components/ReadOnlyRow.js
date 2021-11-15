import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const ReadOnlyRow = ({ row, handleEditClick,handleDeleteClick }) => {
  return (
    <TableRow
        tabIndex={-1}
        key={row.name}
    >
        <TableCell component="th" scope="row" align = "right">
        {row.name}
        </TableCell>
        <TableCell align="right">{row.muscle}</TableCell>
        <TableCell align="right">{row.equipment}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.benefits}</TableCell>
        <TableCell align="right">{row.instructions}</TableCell>
        <TableCell align="right">{row.video}</TableCell>
        <TableCell align="right">
        <button type="button" onClick={(event)=> handleEditClick(event,row)}>Edit</button>
        <button type="button" onClick={(event)=> handleDeleteClick(event,row)}>Delete</button>
        </TableCell>
    </TableRow> )}

export default ReadOnlyRow;