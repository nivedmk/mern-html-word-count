import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import applicationAPI from "../../apis/applicationAPI";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function History() {
  const classes = useStyles();
  const [tableData, settableData] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("tkn")) {
      applicationAPI
        .get("/webcounter", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tkn")}`,
          },
        })
        .then((res) => {
          settableData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onFavClick = async (id, previosData) => {
    console.log(id, " + ", previosData);
    const body = { isfavourite: !previosData };
    await applicationAPI
      .patch(`/webcounter/update/${id}`, body, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("tkn")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteURL = async (id) => {
    const response = await applicationAPI.delete(`/webcounter/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("tkn")}`,
      },
    });
    console.log(response);
  };

  const renderTable = () => {
    if (tableData.length == 0) {
      return <h6>No Data</h6>;
    } else {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell align="right">Word Count</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.url}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">
                    <i
                      style={{ backgroundColor: "yellow" }}
                      className="fa fa-star-o"
                      aria-hidden="true"
                      style={{ marginRight: "10px" }}
                      onClick={(e) => onFavClick(row._id, row.isfavourite)}
                    ></i>
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => onDeleteURL(row._id)}
                    ></i>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return (
    <div>
      <h3>Word count history</h3>
      {renderTable()}
    </div>
  );
}
