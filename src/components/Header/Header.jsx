import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';

import { observer } from 'mobx-react-lite';
import UserComponent from './../common/User/User';
import Select from '../common/Select/Select';
import { useStore } from './../../hooks/useStore';

const Header = () => {
  const { boards, users } = useStore();
  const [selected, setSelected] = useState(
    localStorage.getItem('active-board') || boards.active
  );

  const setActiveBoard = (id) => {
    setSelected(id);
    boards.setActiveBoard(id);
    localStorage.setItem('active-board', id);
  };

  const options = boards.list;
  return (
    <header>
      <h1 className={styles.headerTitle}>rapsody boards</h1>

      <Select
        options={options}
        selected={selected}
        setSelected={setActiveBoard}
      />
      {users?.me && (
        <div className={styles.userComponent}>
          <UserComponent user={users?.me} withPhoto={true} />
        </div>
      )}
    </header>
  );
};

export default observer(Header);
