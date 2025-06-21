import { useContext } from 'react';
import {
  Layout,
  AutoComplete,
  Badge,
  Switch,
  Typography,
  Space,
} from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  SettingOutlined,
  SettingFilled,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './AppHeader.css';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    favorites,
    filters,
    resetFilters,
    setOnlyFavorites,
  } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isSettingsActive = location.pathname === '/settings';

  const onSelect = (value) => {
    navigate(`/book/${value}`);
    setSearchQuery('');
  };

  const handleFavoritesClick = () => {
    setOnlyFavorites(true);
    navigate('/');
  };

  const handleTitleClick = (e) => {
    e.preventDefault();
    resetFilters();
    navigate('/');
  };

  const isFavoriteActive = filters.onlyFavorites;

  return (
    <Header className={`app-header ${theme}`}>
      <Title
        level={4}
        className={`app-header-title ${theme} ${location.pathname === '/' ? 'home' : ''}`}
      >
        <a
          href="/"
          onClick={handleTitleClick}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Коллекция книг
        </a>
      </Title>

      <AutoComplete
        options={searchResults}
        className={`app-header-search ${theme}`}
        placeholder="Поиск"
        value={searchQuery}
        onChange={setSearchQuery}
        onSelect={onSelect}
        filterOption={false}
        popupRender={(menu) => (
          <div className={`autocomplete-dropdown ${theme}`}>
            {menu}
          </div>
        )}
      />

      <Space size="large" align="center">
        <Badge count={favorites.length} size="small" overflowCount={99}>
          {isFavoriteActive ? (
            <HeartFilled
              className="app-header-badge-heart"
              onClick={() => {
                setOnlyFavorites(false);
              }}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <HeartOutlined
              className="app-header-badge-heart"
              onClick={handleFavoritesClick}
              style={{ cursor: 'pointer' }}
            />
          )}
        </Badge>

        <a
          href="/settings"
          className={`app-header-settings-link ${theme}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/settings');
          }}
          aria-current={isSettingsActive ? 'page' : undefined}
        >
          {isSettingsActive ? <SettingFilled /> : <SettingOutlined />}
        </a>

        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </Space>
    </Header>
  );
};

export default AppHeader;
