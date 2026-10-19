import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import DesignSystemPage from '../design-system/DesignSystemPage.jsx';
import './index.css';

// Kiểm tra nếu người dùng truy cập qua path cụ thể: /design-system
const isDesignSystemRoute = 
  window.location.pathname.toLowerCase().includes('design-system') ||
  window.location.search.toLowerCase().includes('design-system') ||
  window.location.hash.toLowerCase().includes('design-system');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isDesignSystemRoute ? <DesignSystemPage /> : <App />}
  </React.StrictMode>
);
