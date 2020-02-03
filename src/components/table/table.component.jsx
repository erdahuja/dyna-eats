import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

function EnhanceTableHead(props) {
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhanceTableHead.propTypes = {
  headCells: PropTypes.array.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { title, CustomForm } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
      <Typography
        className={classes.title}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
        {title}
      </Typography>
        <CustomForm />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  CustomForm: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    padding: 16,
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  pos: {
    color: "#06f106"
  },
  neg: {
    color: "red"
  }
}));

export default function EnhanceTable({ data: rows, headCells, title, CustomForm }) {
  const classes = useStyles();
console.log(rows)
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title={title} CustomForm={CustomForm} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhanceTableHead headCells={headCells} />
            <TableBody>
              {rows.map((_row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return Object.values(_row)[0].map(row => (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Chip label={Object.keys(_row)[0]} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.qtyRequired}</TableCell>
                    <TableCell align="right">{row.vendorOne}</TableCell>
                    <TableCell align="right">{row.vendorTwo}</TableCell>
                    <TableCell align="right">
                      {row.vendorOne + row.vendorTwo}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={
                        row.vendorOne + row.vendorTwo
                          ? classes.pos
                          : classes.neg
                      }
                    >
                      {row.vendorOne + row.vendorTwo ? "OK" : "Insufficient"}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={row.bakery ? classes.pos : classes.neg}
                    >
                      {row.bakery ? "Y" : "N"}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={row.italian ? classes.pos : classes.neg}
                    >
                      {row.italian ? "Y" : "N"}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={row.indian ? classes.pos : classes.neg}
                    >
                      {row.indian ? "Y" : "N"}
                    </TableCell>
                  </TableRow>
                ));
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
