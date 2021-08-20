import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCandidateAction} from '../../redux/actions/candidateAction';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(Position, L1ID, L1Name, L1VoteCount, L2ID, L2Name, L2VoteCount) {
  return { Position, L1ID, L1Name, L1VoteCount, L2ID, L2Name, L2VoteCount};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const ResultData = (props) => {
    const dispatch = useDispatch();
    const candidates = useSelector(state => state.candidates);

    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(getCandidateAction())
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    console.log(candidates);

  return(
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>L1ID</TableCell>
            <TableCell>L1Name</TableCell>
            <TableCell>L1VoteCount</TableCell>
            <TableCell>L2ID</TableCell>
            <TableCell>L2Name</TableCell>
            <TableCell>L2VoteCount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {
            candidates.candidates ? 
                candidates.candidates.map(can => {
                    return <TableRow>
                        <TableCell component="th" scope="row">{
                            can.L1.id.slice(2)    
                        }</TableCell>
                        <TableCell>{can.L1.id}</TableCell>
                        <TableCell>{can.L1.fullName}</TableCell>
                        <TableCell>{can.L1.voteCount}</TableCell>
                        <TableCell>{can.L2.id}</TableCell>
                        <TableCell>{can.L2.fullName}</TableCell>
                        <TableCell>{can.L2.voteCount}</TableCell>
                    </TableRow>
                })

            :

            <TableRow>
                <TableCell component="th" scope="row">
                    loading..
                </TableCell>
                <TableCell align="right">loading..</TableCell>
                <TableCell align="right">loading..</TableCell>
                <TableCell align="right">loading..</TableCell>
                <TableCell align="right">loading..</TableCell>
            </TableRow>
        }
      </TableBody>
    </Table>
  </TableContainer>
   )

 }