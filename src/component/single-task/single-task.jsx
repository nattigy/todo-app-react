import React from "react";
import {Link} from "react-router-dom";

const SingleTask = (props) => {
  const {task, handleUpdateStatus} = props;

  return (
    <div className="bg-dark p-3 text-white mb-2 rounded-lg max-width">
      <Link to={`/detail/${task._id}`} className="max-width text-white">
        <div className="d-flex">
          <p className="w-100 font-20 text-uppercase">{task.title}</p>
          <p className="w-100 text-right">
            {handleUpdateStatus && <div>Due date: {task.dueDate.split("T")[0]}</div>}
            <div>Remind me at: {task.reminderTime}</div>
          </p>
        </div>
      </Link>
      <div className="d-flex">
        {handleUpdateStatus && <div className="w-100">Status: <span
          className={`font-italic small text-${
            task.status === "NOT_STARTED" ? "danger" :
              task.status === "STARTED" ? "white" : "success"}`
          }>{task.status}</span>
        </div>}
        <div className="text-right w-100">
          {handleUpdateStatus && (task.status === "NOT_STARTED" ?
            <button onClick={() => handleUpdateStatus(task._id, "STARTED")}>Mark as Started</button> :
            task.status === "STARTED" ?
              <button onClick={() => handleUpdateStatus(task._id, "DONE")}>Mark as Done</button> :
              <></>)
          }
        </div>
      </div>
    </div>
  )
}

export default SingleTask