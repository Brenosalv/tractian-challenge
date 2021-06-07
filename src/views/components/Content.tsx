import { FC, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Divider,
  PageHeader,
  Spin
} from 'antd';

import { GeneralContext } from '../../contexts/GeneralContext';

import '../../styles/components/Content.css';

interface ContentProps {
  title: string;
  children: JSX.Element[] | JSX.Element;
}

const Content: FC<ContentProps> = (props) => {
  const location = useLocation();
  const history = useHistory();

  const { loading } = useContext(GeneralContext);

  return (
    <div className="content-container">
      {location.pathname === "/" ? (
        <PageHeader
          backIcon={false}
          title={props.title}
        />
      ) : (
        <PageHeader
          onBack={() => history.goBack()}
          title={props.title}
        />
      )}

      <Divider style={{ marginTop: '0' }} />

      <main id="content-main">
        {loading ? (
          props.children
        ) : (
          <div className="spin-container">
            <Spin size="large" />
          </div>
        )}
      </main>
    </div>
  );
}

export default Content;