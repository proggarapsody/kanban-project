import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import Icon from '../common/Icon/Icon';
import Task from '../Task/Task';
import styles from './dashboard.module.scss';

const Column = (props) => {
  const { id, title, tasks, activeBoard } = props;

  const deleteTask = useCallback(
    (taskId) => {
      activeBoard.deleteTask(taskId, id);
    },
    [activeBoard, id]
  );

  return (
    <div className={styles.columnContainer}>
      <h3 className={styles.columnTitle}>{title}</h3>
      <button
        className={styles.newTaskButton}
        onClick={() => {
          props.onClick(id);
        }}
      >
        <Icon name={'plus'} size={26} />
      </button>

      {tasks?.map((task, index) => {
        return (
          <Task
            {...task}
            index={index}
            deleteTask={deleteTask}
            key={task.id}
          />
        );
      })}
    </div>
  );
};

export default observer(Column);
