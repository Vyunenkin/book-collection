import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Radio, Select, Switch } from 'antd';
import { ThemeContext } from '../context/ThemeProvider';
import { DefaultTextSettingsContext } from '../context/DefaultTextSettingsContext';
import { AppContext } from '../context/AppContext';
import './Book.css';

const { Option } = Select;

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { textSettings } = useContext(DefaultTextSettingsContext);
  const { books, favorites, toggleFavorite } = useContext(AppContext);

  const book = books.find((b) => b.id === Number(id));

  useEffect(() => {
    if (!book) {
      navigate('/Error404');
    }
  }, [book, navigate]);

  const [textColor, setTextColor] = useState(textSettings.textColor);
  const [textSize, setTextSize] = useState(textSettings.textSize);
  const [bold, setBold] = useState(textSettings.bold);

  if (!book) {
    return null;
  }

  const isFavorite = favorites.includes(book.id);

  const coverContent = book.cover ? (
    <img
      src={book.cover}
      alt={`Обложка ${book.title}`}
      className="book-cover-image"
    />
  ) : (
    <div className="book-cover">Обложка</div>
  );

  return (
    <div className={`book-container ${theme}`}>
      <Button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </Button>

      <div className="book-main">
        {coverContent}

        <div className="book-info">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <p>
            <b>Год:</b> {book.year} <br />
            <b>ISBN:</b> {book.isbn}
          </p>
          <p>{book.description}</p>
          <Button
            type={isFavorite ? 'primary' : 'default'}
            onClick={() => toggleFavorite(book.id)}
            className="favorite-button"
          >
            {isFavorite ? 'В избранном' : 'В избранное'}
          </Button>

          <div className="text-settings">
            <h3>Настройки текста</h3>

            <div className="setting-row">
              <span>Цвет текста: </span>
              <Radio.Group
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              >
                <Radio value="black">Black</Radio>
                <Radio value="sepia">Sepia</Radio>
                <Radio value="darkblue">Dark Blue</Radio>
              </Radio.Group>
            </div>

            <div className="setting-row">
              <span>Размер: </span>
              <Select
                value={textSize}
                onChange={(value) => setTextSize(value)}
                style={{ width: 120 }}
                classNames={
                  theme === 'dark'
                    ? { popup: { root: 'dark-select-dropdown' } }
                    : undefined
                }
              >
                <Option value="small">Small</Option>
                <Option value="medium">Medium</Option>
                <Option value="large">Large</Option>
              </Select>
            </div>

            <div className="setting-row bold-switch">
              <span>Жирный шрифт: </span>
              <Switch checked={bold} onChange={(checked) => setBold(checked)} />
            </div>
          </div>
        </div>
      </div>

      <div className={`book-text ${textColor} ${textSize} ${bold ? 'bold' : ''}`}>
        {book.text}
      </div>
    </div>
  );
}
