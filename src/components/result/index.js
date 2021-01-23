import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";
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
  const [data, setData] = useState([]);
  let datas = [];
  useEffect(() => {
    firebase
      .database()
      .ref("userResults")
      .orderByChild("totalCorrectAnswers")
      .limitToLast(15)
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          datas.push(data.val());
        });
        datas.sort((a, b) =>
          a.totalCorrectAnswers < b.totalCorrectAnswers
            ? 1
            : a.totalCorrectAnswers === b.totalCorrectAnswers
            ? a.score < b.score
              ? 1
              : -1
            : -1
        );

        setData(datas);
      });
  }, []);
  console.log(JSON.stringify(data));

  return (
    <div>
      <h2>Results</h2>
      <TableContainer className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b className="color">Name</b>
              </TableCell>
              <TableCell align="right">
                <b className="color">Correct Answers</b>
              </TableCell>
              <TableCell align="right">
                <b className="color">Score</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(result => (
              <TableRow key={result.id}>
                <TableCell className="color" component="th" scope="row">
                  <p className="color">{result.name}</p>
                </TableCell>
                <TableCell className="color" align="right">
                  <p className="color">{result.totalCorrectAnswers}</p>
                </TableCell>
                <TableCell className="color" align="right">
                  <p className="color">{result.score}</p>
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
