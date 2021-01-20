import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./index.css";

const useStyles = makeStyles({});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Hamza", 27),
  createData("Umer", 22),
  createData("Fayez", 17),
  createData("People", 12),
  createData("Poepl1", 11)
];

const Result = () => {
  const classes = useStyles();

  return (
    <div>
      <h2>Results</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b className="color">Name</b>
              </TableCell>
              <TableCell align="right">
                <b className="color">Result</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className="color" component="th" scope="row">
                  <p className="color">{row.name}</p>
                </TableCell>
                <TableCell className="color" align="right">
                  <p className="color">{row.calories}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Result;
