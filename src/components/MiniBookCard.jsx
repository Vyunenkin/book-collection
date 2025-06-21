import { useContext, memo } from 'react';
import { Card, Typography } from 'antd';
import { ThemeContext } from '../context/ThemeProvider';
import './MiniBookCard.css';

const { Title, Text } = Typography;

const MiniBookCard = memo(({ book }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      className={`${theme} mini-book-card`}
      hoverable
      style={{
        width: 120,
        padding: 6,
        fontSize: '10px',
        marginRight: 12,
      }}
      cover={
        <div className="cover" style={{ height: 100, fontSize: 14 }}>
          Обложка
        </div>
      }
      actions={[]}
    >
      <Title level={5} style={{ fontSize: '10px', marginBottom: 4 }}>
        {book.title}
      </Title>
      <Text type="secondary" style={{ fontSize: '9px' }}>
        {book.author}
      </Text>
    </Card>
  );
});

export default MiniBookCard;

