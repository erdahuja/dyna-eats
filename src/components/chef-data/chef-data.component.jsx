import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { selectData } from "../../redux/chef/chef.selectors";
import EnhancedTable from "../table/table.component";
import { fetchCollectionsStartAsync } from "../../redux/chef/chef.actions";

const headCells = [
  { id: "title", numeric: false, label: "Type" },
  { id: "name", numeric: false, label: "Name" },
  { id: "received", numeric: true, label: "Received" }
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

class Chef extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync, chefType } = this.props;
    fetchCollectionsStartAsync("supplies", chefType);
  }

  render() {
    const { data, classes } = this.props;
    console.log({
      data
    })
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <CssBaseline />
          <Paper className={classes.paper}>
            {/* <EnhancedTable
              data={data}
              headCells={headCells}
              title={"Supplies"}
            /> */}
          </Paper>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectData
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: (name, type) => dispatch(fetchCollectionsStartAsync(name, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chef));
