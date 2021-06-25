import React, {useEffect} from "react";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TASK_DETAIL} from "../../apollo/queries/task-queries";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {DeleteForeverRounded} from '@material-ui/icons';
import {DELETE_TASK} from "../../apollo/mutations/task-mutations";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const TaskDetail = (props) => {
  const classes = useStyles();

  const [getTaskDetail, {loading, data}] = useLazyQuery(GET_TASK_DETAIL);
  const [deleteTask, {loading: deleting}] = useMutation(DELETE_TASK);

  const handleDelete = (taskId) => {
    deleteTask({
      variables: {
        task_id: taskId
      }
    }).then(res => {
      window.location.href = "/"
    })
  }

  useEffect(()=>{
    getTaskDetail({
      variables:{
        task_id: props.match.params.id
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <div className="p-3">
      <Backdrop className={classes.backdrop} open={loading || deleting}>
        <CircularProgress color="inherit"/>
      </Backdrop>
      <div className="p-3 bg-dark rounded-lg">
        {data && <div>
          <div className="d-flex">
            <h3 className="w-100">{data["taskById"].title}</h3>
            <div className="w-100 text-right">
              <IconButton onClick={() => handleDelete(data["taskById"]._id)}>
                <DeleteForeverRounded color="secondary"/>
              </IconButton>
            </div>
          </div>
          <div>
            Notes:
            <p className="w-100 border border-secondary p-2">{data["taskById"].notes}</p>
          </div>
          <div className="row">
            <div className="col-6 col-md-4">Due Date: {data["taskById"].dueDate.split("T")[0]}</div>
            <div className="col-6 col-md-4">Remind me at: {data["taskById"].reminderTime}</div>
            <div className="col-6 col-md-4">Status: {data["taskById"].status}</div>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default TaskDetail;