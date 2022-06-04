import { observer } from 'mobx-react-lite';

import Dashboard from '../components/Dashboard/Dashboard';

const MainPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default observer(MainPage);
