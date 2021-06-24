import React from "react";
import {connect} from "react-redux";

const TaskDetail = (props) => {
  const {user} = props;

  return(
    <div>TaskDetail</div>
  )
}

const mapStateToProps = status => {
  return{
    user: status.auth.user
  }
}

export default connect(mapStateToProps)(TaskDetail)