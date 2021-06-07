import {
  FC,
  useEffect,
} from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import axios from 'axios';

import '../../styles/components/Header.css';

const Header: FC = () => {
  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/tractian/fake-api/companies')
      .then(response => {
        sessionStorage.setItem("companyName", response.data[0].name);
      }, error => {
        console.log(error);
      })
  }, []);

  const companyName = sessionStorage.getItem("companyName");

  const handleLogoutClick = () => {
    window.location.href = "https://tractian.com/";
  }

  return (
    <header className="header">
      <h1 id="company-name">{companyName}</h1>

      <Tooltip title="Sair" placement="left">
        <LogoutOutlined id="logout-icon" onClick={handleLogoutClick} />
      </Tooltip>
    </header>
  );
}

export default Header;