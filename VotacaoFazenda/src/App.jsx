import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Supondo que o Header fornecido esteja nesta pasta
import Home from './pages/Resultado';         // Supondo que a página inicial esteja nesta pasta
import Votacao from './pages/Votacao';
import Resultado from './pages/Resultado';
import './App.css'; // Importação obrigatória do CSS global

export default function App() {
  return (
    <BrowserRouter>
      {/* O Header fica fora do Routes para aparecer em todas as páginas */}
      <Header />
      
      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/votacao" element={<Votacao />} />
          <Route path="/resultado" element={<Resultado />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}