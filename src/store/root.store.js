import { types } from 'mobx-state-tree';
import BoardsStore from './boards.store';
import UsersStore from './users.store';

const RootStore = types.model('RootStore', {
  users: types.optional(UsersStore, {}),
  boards: types.optional(BoardsStore, {}),
});

export default RootStore;
