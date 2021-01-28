import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import firebase from "firebase";
import "./index.css";

const Result = props => {
  console.log("Result1: " + props.appState);
  const [resultShown, isResultShown] = useState(false);
  const [data, setData] = useState([]);
  let datas = [];

  useEffect(() => {
    firebase
      .database()
      .ref("userResults")
      .orderByChild("totalCorrectAnswers")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          datas.push(data.val());
        });

        datas.sort((a, b) =>
          a.totalCorrectAnswers < b.totalCorrectAnswers
            ? 1
            : a.totalCorrectAnswers === b.totalCorrectAnswers
            ? a.score > b.score
              ? 1
              : -1
            : -1
        );

        setData(datas);
      });
  }, [props.appState]);

  const showResultDb = () => {
    firebase
      .database()
      .ref("appState")
      .orderByChild("showResult")
      .once("value", snapshot => {
        snapshot.forEach(function(data) {
          data.ref.child("showResult").set(!props.appState.showResult);
        });
      });
  };

  console.log(JSON.stringify(data));
  const showResultData = (result, index) => {
    if (index < 15) {
      return (
        <>
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
        </>
      );
    }
  };
  return (
    <div>
      <span
        style={{
          fontFamily: "arial, sans-serif",
          fontSize: "20px",
          margin: "20%"
        }}
      >
        Results
      </span>
      {props.appState.showResult && (
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
              {data.map((result, i) => {
                return showResultData(result, i);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <br />
      <button onClick={showResultDb} style={{ marginTop: "10%" }} color="white">
        {!props.appState.showResult ? "Show result" : "Hide result"}
      </button>
    </div>
  );
};
export default Result;
