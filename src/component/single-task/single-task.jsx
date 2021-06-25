import React from "react";
import {Link} from "react-router-dom";

const SingleTask = (props) => {
  const {task, handleUpdateStatus} = props;

  return (
    <div className="bg-dark p-3 text-white mb-2 rounded-lg max-width">
      <Link to={`/detail/${task._id}`} className="max-width text-white">
        <div className="d-flex">
          <p className="w-100 font-20 text-uppercase">{task.title}</p>
          <div className="w-100 text-right">
            {handleUpdateStatus && <p className="mb-2">Due date: {task.dueDate.split("T")[0]}</p>}
            <p className="mb-2">Remind me at: {task.reminderTime}</p>
          </div>
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
            <button onClick={() => handleUpdateStatus(task._id, "STARTED")}
                    className="button-style">Mark as Started</button> :
            task.status === "STARTED" ?
              <button onClick={() => handleUpdateStatus(task._id, "DONE")}
                      className="button-style">Mark as Done</button> :
              <></>)
          }
        </div>
      </div>
    </div>
  )
}

export default SingleTask