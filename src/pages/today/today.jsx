import React, {useEffect, useState} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TODAYS_TASKS} from "../../apollo/queries/task-queries";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {CHANGE_TASK_STATUS} from "../../apollo/mutations/task-mutations";
import SingleTask from "../../component/single-task/single-task";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Today = ({user}) => {
  const classes = useStyles();

  const [today, setToday] = useState("");

  const [getTaskToday, {loading, data}] = useLazyQuery(GET_TODAYS_TASKS, {
    fetchPolicy: "network-only"
  });
  const [updateTaskStatus] = useMutation(CHANGE_TASK_STATUS, {
    fetchPolicy: "no-cache"
  });

  const handleUpdateStatus = (taskId, status) => {
    updateTaskStatus({
      variables: {
        status: status,
        task_id: taskId
      }
    }).then(res => {
      getTaskToday({
        variables: {
          dueDate: today,
          owner: user._id
        },
      })
    })
  }

  useEffect(() => {
    const year = (new Date()).getFullYear();
    const month = (new Date()).getUTCMonth() + 1;
    const date = (new Date()).getDate();
    setToday(`${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}T00:00:00.000Z`)
    getTaskToday({
      variables: {
        dueDate: `${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}T00:00:00.000Z`,
        owner: user._id
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-3 vh-100">
      <h3 className="mb-3">Today</h3>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      {data && data["taskMany"] ? data["taskMany"].map(task => (
          <SingleTask task={task} key={task._id} handleUpdateStatus={handleUpdateStatus}/>
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

export default connect(mapStateToProps)(Today);