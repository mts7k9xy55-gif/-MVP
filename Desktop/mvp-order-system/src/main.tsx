import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Admin from './Admin'
import './index.css'

// アプリケーションのエントリーポイント
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 注文ページ (/) */}
        <Route path="/" element={<App />} />
        
        {/* 管理ページ (/admin) */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
