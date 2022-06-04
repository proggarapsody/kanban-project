import  {  useState } from 'react';
import styles from './dashboard.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from './../../hooks/useStore';

const NewTaskForm = ({ boards, columnId, handleClose }) => {
  const { users } = useStore();
  const [formState, setFormState] = useState({
    assignee: users.currentUser.id,
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value ? value.trim() : '' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    boards.active.addTask({ ...formState, id: uuidv4() }, columnId);
  };
  return (
    <form id="form" onSubmit={onSubmit} className={styles.newTaskForm}>
      <h1 className="title" onChange={onFormChange}>
        Create Task
      </h1>
      <input
        className={styles.input}
        type="text"
        name="title"
        onChange={onFormChange}
        minLength={3}
      />
      <textarea
        className={styles.textarea}
        type="text"
        name="description"
        onChange={onFormChange}
        minLength={10}
      />
      <select
        name="assignee"
        id="assignee"
        form="form"
        onChange={onFormChange}
      >
        {users?.list?.map((user, index) =>
          index === 0 ? (
            <option
              name="assignee"
              value={user.id}
              key={user.id}
              select="true"
            >
              {user.name}
            </option>
          ) : (
            <option name="assignee" value={user.id} key={user.id}>
              {user.name}
            </option>
          )
        )}
      </select>
      <button className={styles.addTaskBtb} type="submit">
        New task
      </button>
      <button
        className={styles.closeFormBtn}
        type="button"
        onClick={() => handleClose(false)}
      >
        Close
      </button>
    </form>
  );
};

export default NewTaskForm;
