import { flow, getParent, onSnapshot, types } from 'mobx-state-tree';
import api from '../api';
import { User } from './users.store';

const Task = types.model('Task', {
  id: types.identifier,
  title: types.string,
  description: types.string,
  assignee: types.safeReference(User),
});

const Column = types
  .model('Column', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task),
  })
  .actions((self) => {
    return {
      load: flow(function* () {
        const { id: boardId } = getParent(self, 2);
        const { id: columnId } = self;

        const { tasks } = yield api.get(`boards/${boardId}/tasks/${columnId}`);

        self.tasks = tasks;

        onSnapshot(self, self.save);
      }),
      save: flow(function* (snapshot) {
        const { id: boardId } = getParent(self, 2);
        const { id: columnId } = self;

        yield api.put(`boards/${boardId}/tasks/${columnId}`, {
          tasks: snapshot.tasks,
        });
      }),
      afterCreate() {
        self.load();
      },
    };
  });

const Board = types
  .model('Board', {
    id: types.identifier,
    title: types.string,
    columns: types.array(Column),
  })
  .actions((self) => ({
    moveTask(id, source, destination) {
      if (!destination || !source) {
        return;
      }
      const fromColumn = self.columns.find(
        (column) => column.id === source.droppableId
      );
      const toColumn = self.columns.find(
        (column) => column.id === destination.droppableId
      );

      const taskToMoveIndex = fromColumn.tasks.findIndex(
        (task) => task.id === id
      );
      const [task] = fromColumn.tasks.splice(taskToMoveIndex, 1);

      toColumn.tasks.splice(destination.index, 0, task.toJSON());
    },
    addTask(task, columnId) {
      const column = self.columns.find((column) => column.id === columnId);
      column.tasks.push(task);
    },
    deleteTask(taskId, columnId) {
      const column = self.columns.find((column) => column.id === columnId);
      if (!column) {
        return;
      }
      column.tasks = column.tasks.filter((el) => el.id != taskId);
    },
  }));

const BoardsStore = types
  .model('BoardsStore', {
    boards: types.array(Board),
    active: types.safeReference(Board),
  })
  .views((self) => ({
    get list() {
      return self.boards.map(({ id, title }) => ({ id, title }));
    },
  }))
  .actions((self) => {
    return {
      load: flow(function* () {
        self.boards = yield api.get('boards');
        self.active = localStorage.getItem('active-board') || 'MAIN';
      }),
      afterCreate() {
        self.load();
      },
      setActiveBoard(id) {
        self.active = id;
      },
    };
  });

export default BoardsStore;
