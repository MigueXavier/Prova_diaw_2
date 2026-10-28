import React from 'react';

export default function ParticipanteCard({ participante, onVotar }) {
  
  const { nome, imagem, naRoca } = participante;

  return (
    <div className={`card-participante ${naRoca ? 'destaque-roca' : ''}`}>
      <img src={imagem} alt={nome} className="imagem-participante" />
      <h3>{nome}</h3>
      
      {naRoca && <span className="selo-roca">Na Roça</span>}

      
      {onVotar && (
        <button onClick={() => onVotar(participante)} className="botao-votar">
          Votar
        </button>
      )}
    </div>
  );
}
