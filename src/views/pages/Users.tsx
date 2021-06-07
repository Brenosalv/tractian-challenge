import { FC, useState } from 'react';
import {
  Card,
  Select,
  Empty,
} from 'antd';

import Content from '../components/Content';
import Header from '../components/Header';

import { UsersData } from '../../contexts/UsersContext';
import EditableText from '../components/EditableText';

import '../../styles/pages/global.css';

const Users: FC = () => {
  const unitName = sessionStorage.getItem("unitName");
  const unitUsers: UsersData[] = JSON.parse(sessionStorage.getItem("unitUsers")!)

  const [unitResponsibleName, setUnitResponsibleName] = useState(sessionStorage.getItem(`${unitName}ResponsibleName`)!)

  const { Option } = Select;

  const handleResponsibleChange = (value: string) => {
    setUnitResponsibleName(value);
    sessionStorage.setItem(`${unitName}ResponsibleName`, value);
  }

  return (
    <div className="container">
      <Header />

      <main>
        <Content title={`${unitName} - Usuários`}>
          {unitUsers.length === 0 ? (
            <div className="empty-container">
              <Empty description="Não há usuários registrados." />
            </div>
          ) : (
            <div className="content-container">
              <h3 id="responsible-for-unit">
                Responsável pela unidade: {
                  <Select
                    style={{ width: "9rem" }}
                    defaultValue={
                      unitUsers.filter(unitUser => (unitUser.name === unitResponsibleName)).length > 0 ? unitResponsibleName : "Selecionar"
                    }
                    onChange={handleResponsibleChange}
                  >
                    <Option value="Nenhum">Nenhum</Option>

                    {unitUsers.map((user) => (
                      <Option key={user.id} value={user.name}>{user.name}</Option>
                    ))}
                  </Select>
                }
              </h3>

              <div className="site-card-wrapper">
                {unitUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="card"
                    style={unitResponsibleName === user.name ? { background: "var(--responsible)" } : {}}
                    title={
                      <div id="card-title">
                        {unitResponsibleName === user.name ? (
                          <img
                            width="36rem"
                            src="responsible.svg"
                            alt="Responsible user"
                          />
                        ) : (
                          <img
                            width="36rem"
                            src="worker.svg"
                            alt="Worker user"
                          />
                        )}

                        <EditableText text={user.name} type="nome" />
                      </div>
                    }
                    headStyle={{ fontWeight: 600, padding: "0 16px" }}
                    bordered={false}
                  >
                    <div id="card-content">
                      <strong>E-mail: </strong>
                      <EditableText text={user.email} type="e-mail" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Content>
      </main>
    </div>
  );
}

export default Users;