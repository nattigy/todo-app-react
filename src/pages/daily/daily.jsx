import React from "react";
import {connect} from "react-redux";

const Daily = (props) => {
  const {user} = props;

  return(
    <div>Daily</div>
  )
}

const mapStateToProps = status => {
  return{
    user: status.auth.user
  }
}

export default connect(mapStateToProps)(Daily)