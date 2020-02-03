import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { selectData } from "../../redux/chef/chef.selectors";
import EnhancedTable from "../table-chef/table.component";

const headCells = [
  { id: "title", numeric: false, label: "Type" },
  { id: "name", numeric: false, label: "Name" },
  { id: "required", numeric: true, label: "Required" },
  { id: "received", numeric: true, label: "Received" },
  { id: "status", numeric: true, label: "Status" },
];

const styles = {
  root: {
    display: "flex"
  },
  container: {
    paddingTop: 4,
    paddingBottom: 4
  },
  paper: {
    padding: 2,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    backgroundColor: "#f5f5f5"
  },
  fixedHeight: {
    height: 240
  }
};

const Chef = ({ data, classes, chefType }) => {
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <EnhancedTable
              data={data}
              headCells={headCells}
              title={chefType.toUpperCase()}
            />
        </Paper>
      </Grid>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectData
});

export default connect(mapStateToProps)(withStyles(styles)(Chef));
