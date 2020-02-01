import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { selectData } from '../../redux/dashboard/dashboard.selectors';
import EnhancedTable from "../table/table.component";

const DashboardOverview = ({ data }) => {
  return (
    <EnhancedTable />
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectData
});

export default connect(mapStateToProps)(DashboardOverview);
