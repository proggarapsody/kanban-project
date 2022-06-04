import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { useStore } from '../../hooks/useStore';
import Column from './Column';
import styles from './dashboard.module.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Modal from '../common/Modal/Modal';
import NewTaskForm from './NewTaskForm';

const getListStyle = () => {
  return {};
};

const Dashboard = () => {
  const { boards, users } = useStore();
  const [modalActive, setModalActive] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState('');

  const onCLick = (id) => {
    setTargetColumnId(id);
    setModalActive(true);
  };

  const onDragEnd = useCallback(
    (e) => {
      const { source, destination, draggableId: taskId } = e;

      boards.active.moveTask(taskId, source, destination);
    },
    [boards]
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.boardContainer}>
          {boards.active?.columns?.map((column) => {
            return (
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Column
                      {...column}
                      onClick={onCLick}
                      activeBoard={boards.active}
                      key={column.id}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
      {users.me && (
        <Modal active={modalActive} setActive={setModalActive}>
          <NewTaskForm
            handleClose={setModalActive}
            users={users}
            boards={boards}
            columnId={targetColumnId}
          />
        </Modal>
      )}
    </>
  );
};

export default observer(Dashboard);
