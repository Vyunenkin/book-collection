import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { DefaultTextSettingsContext } from '../context/DefaultTextSettingsContext';
import { Form, Switch, Radio, Select, Button, Typography, Row, Col, Card, Space } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import MiniBookCard from '../components/MiniBookCard';
import { AppContext } from '../context/AppContext';
import '../App.css';
import './Settings.css';

const { Title } = Typography;
const { Option } = Select;

const sampleBooks = [
  { id: 1, title: 'Книга 1', author: 'Автор A' },
  { id: 2, title: 'Книга 2', author: 'Автор B' },
  { id: 3, title: 'Книга 3', author: 'Автор C' },
];

export default function Settings() {
  const { setFavorites } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { textSettings, setTextSettings } = useContext(DefaultTextSettingsContext);

  const handleSettingChange = (key, value) => {
    setTextSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`app-container settings-page ${theme}`}>
      <Title level={1} className="settings-title">Настройки</Title>

      <Row gutter={[24, 24]} justify="center" className="settings-layout">
        <Col xs={24} md={12}>
          <Card title="Тема" className={theme}>
            <Form layout="vertical">
              <Form.Item label="Темная тема">
                <Switch
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                />
              </Form.Item>

              <Form.Item label="Превью">
                <div className="preview-row">
                  {sampleBooks.map(book => (
                    <MiniBookCard key={book.id} book={book} />
                  ))}
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Card title="Настройки текста" className={theme}>
              <Form layout="vertical">
                <Form.Item label="Цвет текста">
                  <Radio.Group
                    value={textSettings.textColor}
                    onChange={e => handleSettingChange('textColor', e.target.value)}
                  >
                    <Radio value="black">Black</Radio>
                    <Radio value="sepia">Sepia</Radio>
                    <Radio value="darkblue">Dark Blue</Radio>
                  </Radio.Group>
                </Form.Item>

                <Row gutter={16}>
                  <Col flex="auto">
                    <Form.Item label="Размер текста" style={{ marginBottom: 0 }}>
                      <Select
                        value={textSettings.textSize}
                        onChange={value => handleSettingChange('textSize', value)}
                        classNames={{
                          popup: {
                            root: theme === 'dark' ? 'dark-select-dropdown' : '',
                          },
                        }}
                      >
                        <Option value="small">Small</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="large">Large</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Жирный шрифт" style={{ marginBottom: 0 }}>
                      <Switch
                        checked={textSettings.bold}
                        onChange={checked => handleSettingChange('bold', checked)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>

            <Card title="Управление данными" className={theme}>
              <Form layout="vertical">
                <Form.Item>
                  <Button danger block onClick={() => setFavorites([])}>
                    Сбросить все избранное
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
