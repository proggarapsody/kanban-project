import React, { useCallback, useState } from 'react';
import styles from './task.module.scss';
import Icon from './../common/Icon/Icon';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
  const { id, title, index, description, assignee, deleteTask } = props;

  const [isEdit, setIsEdit] = useState(false);

  const handleDoubleClick = useCallback(
    (e) => {
      setIsEdit(!isEdit);
    },
    [isEdit]
  );

  const handleDeleteBtn = () => {
    deleteTask(id);
  };
  const getItemStyles = (draggableStyles) => {
    return {
      margin: 10,
      ...draggableStyles,
    };
  };
  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyles(provided.draggableProps.style)}
        >
          <div
            className={styles.taskContainer}
            onDoubleClick={handleDoubleClick}
          >
            {isEdit && (
              <button className={styles.deleteBtn} onClick={handleDeleteBtn}>
                <Icon
                  className={styles.deleteBtnIcon}
                  size={20}
                  name={'close-task'}
                />
              </button>
            )}
            <p className={styles.taskTitle}>{title}</p>
            <p className={styles.taskDescription}>{description}</p>
            <p className={styles.taskAuthor}>resolver: {assignee?.name}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
