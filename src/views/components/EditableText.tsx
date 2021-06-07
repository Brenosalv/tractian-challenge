import { FC, useState } from 'react';
import { Typography } from 'antd';

import '../../styles/components/EditableText.css';

const { Paragraph } = Typography;

interface EditableTextProps {
  text: string | string[] | number;
  type: string;
}

const EditableText: FC<EditableTextProps> = (props) => {
  const [editableStr, setEditableStr] = useState(props.text.toString());

  return (
    <Paragraph
      id="editable-text"
      editable={{
        onChange: setEditableStr,
        tooltip: `Editar ${props.type}`,
      }}
    >
      {editableStr}
    </Paragraph>
  );
};

export default EditableText;