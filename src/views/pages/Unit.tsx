import { FC } from 'react';

import '../../styles/pages/global.css';

import Content from '../components/Content';
import Header from '../components/Header';
import Box from '../components/Box';

const Unit: FC = () => {
  const unitName = sessionStorage.getItem("unitName");

  return (
    <div className="container">
      <Header />

      <main>
        <Content title={unitName !== null ? unitName : ""}>
          <div className="box-wrapper">
            <Box
              to="/users"
              name="Usuários"
              icon="users.svg"
            />
            <Box
              to="/assets"
              name="Ativos"
              icon="asset.svg"
            />
          </div>
        </Content>
      </main>
    </div>
  );
}

export default Unit;