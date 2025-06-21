import { useContext, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeProvider';
import './bookCard.css';

const { Title, Text } = Typography;

const BookCard = memo(({ book, onFavoriteClick }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick();
  };

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <Card
      className={`${theme} book-card`}
      hoverable
      onClick={handleCardClick}
      cover={
        book.cover ? (
          <img src={book.cover} alt="Обложка книги" style={{ height: 200, objectFit: 'cover' }} />
        ) : (
          <div className="cover">Обложка</div>
        )
      }
      actions={[
        <div onClick={handleHeartClick} style={{ cursor: 'pointer' }} key="favorite">
          {book.favorite ? (
            <HeartFilled className="anticon-heart-filled" />
          ) : (
            <HeartOutlined className="anticon-heart" />
          )}
        </div>,
      ]}
    >
      <Title level={5}>{book.title}</Title>
      <Text type="secondary">{book.author}</Text>
      <br />
      <Text>{book.year}</Text>
    </Card>
  );
});

export default BookCard;