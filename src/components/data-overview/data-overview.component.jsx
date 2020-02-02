import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { selectData } from "../../redux/dashboard/dashboard.selectors";
import EnhancedTable from "../table/table.component";

const headCells = [
  { id: "title", numeric: false, label: "Type" },
  { id: "name", numeric: false, label: "Name" },
  { id: "required", numeric: true, label: "Required" },
  { id: "vendor1", numeric: true, label: "Vendor 1" },
  { id: "vendor2", numeric: true, label: "Vendor 2" },
  { id: "received", numeric: true, label: "Received" },
  { id: "status", numeric: true, label: "Status" },
  { id: "bakery", numeric: true, label: "Bakery" },
  { id: "italian", numeric: true, label: "Italian" },
  { id: "indian", numeric: true, label: "Indian" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "#f5f5f5"
  },
  fixedHeight: {
    height: 240
  }
}));

const DashboardOverview = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <EnhancedTable data={data} headCells={headCells} title={"Supplies"} />
        </Paper>
      </Grid>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectData
});

export default connect(mapStateToProps)(DashboardOverview);
