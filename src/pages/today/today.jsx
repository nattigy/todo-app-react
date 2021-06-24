import React from "react";
import {connect} from "react-redux";

const Today = (props) => {
  const {user} = props;

  return(
    <div>today</div>
  )
}

const mapStateToProps = status => {
  return{
    user: status.auth.user
  }
}

export default connect(mapStateToProps)(Today)