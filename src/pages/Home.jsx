import { useContext, useEffect, useMemo } from 'react';
import { Row, Col, Empty } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import BookFilters from '../components/BookFilters';
import { ThemeContext } from '../context/ThemeProvider';
import { AppContext } from '../context/AppContext';

function Home() {
  const { theme } = useContext(ThemeContext);
  const {
    books,
    favorites,
    filters,
    toggleFavorite,
    setAuthors,
    setYearRange,
    setOnlyFavorites,
    setSearchQuery,
  } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const authorsFromUrl = searchParams.getAll('author');
    const yearMin = parseInt(searchParams.get('yearMin'), 10);
    const yearMax = parseInt(searchParams.get('yearMax'), 10);
    const favoritesParam = searchParams.get('favorites');
    const onlyFavoritesFromUrl = favoritesParam === 'true';

    setSearchQuery(search);
    setAuthors(authorsFromUrl);
    setYearRange([
      !isNaN(yearMin) ? yearMin : 1800,
      !isNaN(yearMax) ? yearMax : 2025,
    ]);
    setOnlyFavorites(onlyFavoritesFromUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.authors.length > 0) {
      filters.authors.forEach((author) => params.append('author', author));
    }

    if (filters.yearRange[0] !== 1800) {
      params.set('yearMin', filters.yearRange[0]);
    }

    if (filters.yearRange[1] !== 2025) {
      params.set('yearMax', filters.yearRange[1]);
    }

    if (filters.onlyFavorites) {
      params.set('favorites', 'true');
    }

    if (searchParams.get('search')) {
      params.set('search', searchParams.get('search'));
    }

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams, searchParams]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchAuthor =
        filters.authors.length === 0 || filters.authors.includes(book.author);
      const matchYear = book.year >= filters.yearRange[0] && book.year <= filters.yearRange[1];
      const matchFavorite = !filters.onlyFavorites || favorites.includes(book.id);
      return matchAuthor && matchYear && matchFavorite;
    });
  }, [books, filters, favorites]);

  return (
    <Row gutter={[16, 16]} className={`app-container ${theme}`}>
      <Col xs={24} md={6}>
        <BookFilters theme={theme} />
      </Col>
      <Col xs={24} md={18}>
        {filteredBooks.length === 0 ? (
          <Empty description="Книги не найдены" style={{ marginTop: '2rem' }} />
        ) : (
          <Row gutter={[16, 16]} className="book-grid">
            {filteredBooks.map((book) => {
              const bookWithFavorite = {
                ...book,
                favorite: favorites.includes(book.id),
              };

              const onFavoriteClick = () => toggleFavorite(book.id);

              return (
                <Col key={book.id} xs={24} sm={12} md={12} lg={6} xl={6}>
                  <Link to={`/book/${book.id}`}>
                    <BookCard
                      book={bookWithFavorite}
                      onFavoriteClick={onFavoriteClick}
                    />
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default Home;
