import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { obterVotos, calcularResultado, zerarVotos } from '../services/votacaoService';

export default function Resultado() {
 
  const [votos, setVotos] = useState(() => obterVotos());

 
  const totalVotos = Object.values(votos).reduce((acc, curr) => acc + curr, 0);

  
  function handleZerar() {
    const confirmar = window.confirm("Tem certeza que deseja zerar toda a votação?");
    if (confirmar) {
      zerarVotos();      
      setVotos(obterVotos()); 
    }
  }

  
  if (totalVotos === 0) {
    return (
      <div className="container-resultado sem-votos">
        <h2>Nenhum voto registrado até o momento.</h2>
        <p>Seja o primeiro a deixar seu voto!</p>
        <Link to="/votacao" className="btn-votar-agora">Ir para Votação</Link>
      </div>
    );
  }

  return (
    <div className="container-resultado">
      <h1>Resultado Parcial</h1>
      <p className="total-votos">
        Total de {totalVotos} {totalVotos === 1 ? 'voto computado' : 'votos computados'}
      </p>

      <div className="placar-container">
        {ranking.map((participante, indice) => {
         
          const ehLiderEliminacao = indice === 0;

          
          const percentualFormatado = participante.percentual.toLocaleString('pt-BR', {
            maximumFractionDigits: 1
          });

          return (
            <div 
              key={participante.id} 
              className={`placar-item ${ehLiderEliminacao ? 'placar-lider' : ''}`}
            >
              <div className="placar-info">
                <span className="participante-nome">{participante.nome}</span>
                {ehLiderEliminacao && <span className="selo-sairia">Sairia hoje</span>}
                <span className="participante-dados">
                  {participante.votos} {participante.votos === 1 ? 'voto' : 'votos'} ({percentualFormatado}%)
                </span>
              </div>

             
              <div className="barra-progresso-fundo">
                <div 
                  className="barra-progresso-preenchimento" 
                  style={{ width: `${participante.percentual}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleZerar} className="btn-zerar-votacao">
        Zerar Votação
      </button>
    </div>
  );
}