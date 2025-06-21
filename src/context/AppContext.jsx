import { createContext, useState, useCallback, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const initialBooks = [
  {
    id: 1,
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    isbn: 'ISBN-0001',
    description: 'Эпический роман о судьбах русского общества.',
    cover: '/images/1.jpg',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. 
          Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.`
  },
  {
    id: 2,
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    year: 1866,
    isbn: 'ISBN-0002',
    description: 'Роман о моральных терзаниях и искуплении.',
    cover: '/images/2.jpg',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. 
          Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.`
  },
  {
    id: 3,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    isbn: 'ISBN-0003',
    description: 'Фантастический роман с элементами сатиры.',
    cover: null,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. 
          Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.`
  },
];

export default function AppContextProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    authors: [],
    yearRange: [1800, 2025],
    onlyFavorites: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      const filtered = books
        .filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map(book => ({
          value: book.id.toString(),
          label: (
            <div>
              <b>{book.title}</b> — <i>{book.author}</i>
            </div>
          )
        }));

      if (filtered.length === 0) {
        setSearchResults([
          {
            value: 'no-results',
            label: 'Нет результатов',
            disabled: true,
          }
        ]);
      } else {
        setSearchResults(filtered);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, books]);

  const addBook = useCallback(
    (book) => setBooks((prev) => [...prev, book]),
    []
  );

  const removeBook = useCallback(
    (id) => setBooks((prev) => prev.filter((b) => b.id !== id)),
    []
  );

  const toggleFavorite = useCallback(
    (id) =>
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      ),
    []
  );

  const setAuthors = useCallback(
    (authors) => setFilters((prev) => ({ ...prev, authors })),
    []
  );

  const setYearRange = useCallback(
    (yearRange) => setFilters((prev) => ({ ...prev, yearRange })),
    []
  );

  const setOnlyFavorites = useCallback(
    (onlyFavorites) => setFilters((prev) => ({ ...prev, onlyFavorites })),
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      authors: [],
      yearRange: [1800, 2025],
      onlyFavorites: false,
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        books,
        favorites,
        setFavorites,
        searchQuery,
        setSearchQuery,
        searchResults,
        filters,
        addBook,
        removeBook,
        toggleFavorite,
        setFilters,
        setAuthors,
        setYearRange,
        setOnlyFavorites,
        resetFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
