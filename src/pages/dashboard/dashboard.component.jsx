import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import Container from "../../components/data-overview/data-overview.container";
import Chef from "../../components/chef-data/chef-data.container";
import { fetchCollectionsStartAsync } from "../../redux/dashboard/dashboard.actions";

class Dashboard extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync("supplies");
  }
  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return null;
    }
    const { type } = currentUser;
    if (true) {
      return <Container />;
    } else if (type.includes("chef")) {
      const chefType = type.split(":")[1];
      return <Chef chefType={chefType} />;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: name => dispatch(fetchCollectionsStartAsync(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
