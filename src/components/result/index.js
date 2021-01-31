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
        datas.sort(
          (a, b) =>
            b.totalCorrectAnswers - a.totalCorrectAnswers || a.score - b.score
        );

        setData(datas);
        props.result(datas);
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
    return (
      <>
        <TableRow key={result.id}>
          <TableCell>
            <b className="color">{index + 1}</b>
          </TableCell>

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
                {props.limit === 50 && (
                  <TableCell>
                    <b className="color">Id</b>
                  </TableCell>
                )}

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
      {props.isAdmin ? (
        <button
          onClick={showResultDb}
          style={{ marginTop: "10%" }}
          color="white"
        >
          {!props.appState.showResult ? "Show result" : "Hide result"}
        </button>
      ) : (
        !props.appState.showResult && (
          <p style={{ marginTop: 10, fontSize: 12 }}>
            Top 15 Results will be shown after each category
          </p>
        )
      )}
    </div>
  );
};
export default Result;
