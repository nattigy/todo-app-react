import React, {useEffect} from "react";
import {useLazyQuery} from "@apollo/client";
import {GET_DAILY_TASKS} from "../../apollo/queries/task-queries";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import SingleTask from "../../component/single-task/single-task";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Daily = ({user}) => {
  const classes = useStyles();

  const [getTaskDaily, {loading, data}] = useLazyQuery(GET_DAILY_TASKS, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    getTaskDaily({
      variables: {
        owner: user._id
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-3 vh-100">
      <h3 className="mb-3">Daily Tasks</h3>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      {data && data["taskMany"] ? data["taskMany"].map(task => (
          <SingleTask task={task} key={task._id}/>
        )) :
        <div className="text-center vh-100 pt-5 mt-5">
          <p className="pt-5">no tasks for today</p>
          <Link to="/add_task">Add task here</Link>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Daily);