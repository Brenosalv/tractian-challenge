import {
  FC,
  MouseEventHandler,
  ReactNode
} from 'react';
import { Link } from 'react-router-dom';

import '../../styles/components/Box.css';

interface BoxProps {
  name: string | ReactNode;
  icon: string;
  to: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const Box: FC<BoxProps> = (props) => {
  return (
    <Link
      to={props.to}
      className="box-container"
      onClick={props.onClick}
    >
      <img src={props.icon} alt="Box icon" />
      <h1>{props.name}</h1>
    </Link>
  );
}

export default Box;