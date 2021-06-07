import {
  FC,
  useContext,
  useEffect,
  useState
} from 'react';
import { Empty } from 'antd';
import axios from 'axios';

import Box from '../components/Box';
import Content from '../components/Content';
import Header from '../components/Header';
import { UsersContext } from '../../contexts/UsersContext';
import { AssetsContext } from '../../contexts/AssetsContext';
import EditableText from '../components/EditableText';

import { GeneralContext } from "../../contexts/GeneralContext";

import '../../styles/pages/global.css';

export interface UnitsData {
  id: number;
  name: string;
  companyId: number;
}

const AreaOfCustomer: FC = () => {
  const [allUnits, setAllUnits] = useState<UnitsData[]>([]);

  const { allUsers } = useContext(UsersContext);
  const { allAssets } = useContext(AssetsContext);
  const { setLoading } = useContext(GeneralContext);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/tractian/fake-api/units')
      .then(response => {
        setAllUnits(response.data);
        setLoading(true);
      }, error => {
        console.error(error);
      });
  }, [setLoading]);

  const handleBoxClick = (unit: UnitsData) => () => {
    sessionStorage.setItem("unitName", unit.name);
    sessionStorage.setItem("unitUsers", JSON.stringify(allUsers.filter((user) => (user.unitId === unit.id))));
    sessionStorage.setItem("unitAssets", JSON.stringify(allAssets.filter((asset) => (asset.unitId === unit.id))));
  }

  return (
    <div className="container">
      <Header />

      <main>
        <Content title="Unidades da empresa">
          {allUnits !== null ? (
            allUnits.length === 0 ? (
              <div className="empty-container">
                <Empty description="Não há unidades registradas." />
              </div>
            ) : (
              <div className="box-wrapper">
                {allUnits.map((unit) => (
                  <Box
                    key={unit.id}
                    to="/unit"
                    name={<EditableText text={unit.name} type="nome da unidade" />}
                    icon="manufacturing.svg"
                    onClick={handleBoxClick(unit)}
                  />
                ))}
              </div>
            )
          ) : (<></>)}
        </Content>
      </main>
    </div>
  );
}

export default AreaOfCustomer;