import {
  Switch,
  Route,
} from 'react-router-dom';

import AreaOfCustomer from './views/pages/AreaOfCustomer';
import Unit from './views/pages/Unit';
import Users from './views/pages/Users';
import Assets from './views/pages/Assets';

const Routes = () => {
  return (
    <Switch>
      <Route key={1} exact path="/" component={AreaOfCustomer} />
      <Route key={2} exact path="/unit" component={Unit} />
      <Route key={3} exact path="/users" component={Users} />
      <Route key={4} exact path="/assets" component={Assets} />
      <Route key={5} path="*" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
};

export default Routes;