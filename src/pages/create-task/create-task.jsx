import React, {useState} from "react";
import {connect} from "react-redux";

import "./create-task.style.css";
import Switch from "@material-ui/core/Switch";
import {useMutation} from "@apollo/client";
import {CREATE_TASK} from "../../apollo/mutations/task-mutations";
import {Typography} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const CreateTask = (props) => {
  const {user} = props;
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [isDaily, setIsDaily] = useState(false);

  const [createTask, {loading, error}] = useMutation(CREATE_TASK);

  const handleSubmit = e => {
    e.preventDefault();
    createTask({
      variables: {
        title: title,
        isDaily: isDaily,
        notes: notes,
        dueDate: dueDate,
        reminderTime: reminderTime,
        owner: user._id
      }
    }).then(
      res => {
        window.location.href = `/detail/${res.data["taskCreateOne"]["recordId"]}`
      }
    )
  }

  return (
    <div className="px-2">
      <div className="create-task-paper">
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="pt-3 row">
            <div className="col-12 col-md-6 p-2">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input"
                     placeholder="Title"/>
            </div>
            <div className="col-12 col-md-6 p-2">
              <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input"
                     placeholder="Notes"/>
            </div>
            <div className="col-12 col-md-6 p-2">
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-input"
                     placeholder="Due Date"/>
            </div>
            <div className="col-12 col-md-6 p-2">
              <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)}
                     className="form-input" placeholder="Reminder Time"/>
            </div>
            <div className="d-flex p-2">
              <p className="py-2 my-0">Is it a Daily task?</p>
              <Switch value={isDaily} onChange={() => setIsDaily(!isDaily)}/>
            </div>
          </div>
          <div className="text-right">
            <button type="submit">Add</button>
          </div>
          {error && (
            <Typography component="p" className="errorText small">
              {error.message}
            </Typography>
          )}
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = status => {
  return {
    user: status.auth.user
  }
}

export default connect(mapStateToProps)(CreateTask)