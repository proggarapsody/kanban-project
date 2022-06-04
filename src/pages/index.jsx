import { observer } from 'mobx-react-lite';
import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import { useStore } from './../hooks/useStore';

const MainPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default observer(MainPage);
