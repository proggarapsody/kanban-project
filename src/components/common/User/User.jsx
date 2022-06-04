import React from 'react';
import styles from './user.module.scss';

const UserComponent = ({ user, withPhoto }) => {
  return (
    <div className={styles.userContainer}>
      <p className={styles.userName}>{user?.name}</p>
      {withPhoto && <img src={user?.avatar} alt={`user ${user?.name}`} />}
    </div>
  );
};

export default UserComponent;
