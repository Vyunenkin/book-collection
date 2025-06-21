import { useContext } from 'react';
import { Row, Col, Typography } from 'antd';
import { ThemeContext } from '../context/ThemeProvider';
import './Error404.css';
import '../App.css';

const { Title, Text } = Typography;

export default function Error404() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}`}>
      <Row
        justify="center"
        align="middle"
        className="error404-container"
        gutter={48}
      >
        <Col xs={24} md={12} className="error404-text">
          <Title level={1} className="error404-title">
            УВЫ
          </Title>
          <Text className="error404-subtitle">
            Страница не найдена
          </Text>
        </Col>
        <Col xs={24} md={12} className="error404-image">
          <img src="/images/404.jpg" alt="УВЫ даже картинка не найдена" />
        </Col>
      </Row>
    </div>
  );
}
