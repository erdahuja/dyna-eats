import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import Container from "../../components/data-overview/data-overview.container";
import Chef from "../../components/chef-data/chef-data.container";
import { fetchCollectionsStartAsync } from "../../redux/dashboard/dashboard.actions";
import { fetchCollectionsChefStartAsync } from "../../redux/chef/chef.actions";

class Dashboard extends React.Component {
  componentDidMount() {
    const { currentUser, fetchCollectionsStartAsync, fetchCollectionsChefStartAsync } = this.props;
    const { type } = currentUser;
    if (type === "manager") {
      fetchCollectionsStartAsync("supplies");
    } else if (type.includes("chef")) {
      const chefType = type.split(":")[1];
      fetchCollectionsChefStartAsync("supplies", chefType);
    }
  }
  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return null;
    }
    const { type } = currentUser;
    if (!type) {
      return null;
    }
    if (type === "manager") {
      return <Container />;
    } else if (type.includes("chef")) {
      const chefType = type.split(":")[1];
      return <Chef chefType={chefType}/>;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: name => dispatch(fetchCollectionsStartAsync(name)),
  fetchCollectionsChefStartAsync: (name, type) => dispatch(fetchCollectionsChefStartAsync(name, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
