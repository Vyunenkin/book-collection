import { Card, Select, Slider, Button, Checkbox, Space } from 'antd';
import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import './BookFilters.css';

const { Option } = Select;

function BookFilters({ theme }) {
  const {
    books,
    filters,
    setAuthors,
    setYearRange,
    setOnlyFavorites,
    resetFilters,
  } = useContext(AppContext);

  const authorOptions = useMemo(() => {
    const authorsSet = new Set(books.map((book) => book.author));
    return Array.from(authorsSet);
  }, [books]);

  return (
    <Card className={`filters-card ${theme}`} title="Фильтры">
      <Space direction="vertical" className="filters-space" size="large">
        <div>
          <label>Авторы:</label>
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите авторов"
            value={filters.authors}
            onChange={setAuthors}
            className={theme}
            classNames={{ popup: { root: `${theme}-select-dropdown` } }}
          >
            {authorOptions.map((author) => (
              <Option key={author} value={author}>
                {author}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label>Год издания:</label>
          <Slider
            range
            min={1800}
            max={2025}
            value={filters.yearRange}
            onChange={setYearRange}
            className={theme}
          />
        </div>
        <div>
          <Checkbox
            checked={filters.onlyFavorites}
            onChange={(e) => setOnlyFavorites(e.target.checked)}
            className={theme}
          >
            Только избранные
          </Checkbox>
        </div>
        <Button onClick={resetFilters} block className={theme}>
          Сбросить фильтры
        </Button>
      </Space>
    </Card>
  );
}

export default BookFilters;
