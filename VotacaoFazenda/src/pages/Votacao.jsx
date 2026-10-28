import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';
import ParticipanteCard from '../components/ParticipanteCard';

export default function Votacao() {
  
  const [participantesNaRoca, setParticipantesNaRoca] = useState([]);
  const [participantesForaDaRoca, setParticipantesForaDaRoca] = useState([]);
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votoNaSessao, setVotoNaSessao] = useState(0);

    useEffect(() => {
    setParticipantesNaRoca(listarNaRoca());
    setParticipantesForaDaRoca(listarForaDaRoca());
  }, []);

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotoNaSessao((totalAtual) => totalAtual + 1);
  }

  return (
    <div className="container-votacao">
      <h1>Votação da Semana</h1>

     
      {ultimoVoto !== null && (
        <div className="mensagem-confirmacao">
          <p>
            Você votou em <strong>{ultimoVoto.nome}</strong>! 
            Você já votou {votoNaSessao} {votoNaSessao === 1 ? 'vez' : 'vezes'} nesta sessão.
          </p>
          <Link to="/resultado" className="link-resultado">Ver Resultados</Link>
        </div>
      )}

      
      <section className="secao-roca">
        <h2>Quem deve continuar na Roça?</h2>
        <div className="grid-participantes">
          {participantesNaRoca.map((p) => (
            <ParticipanteCard 
              key={p.id} 
              participante={p} 
              onVotar={handleVotar} 
            />
          ))}
        </div>
      </section>

      
      <section className="secao-salvos">
        <h2>Outros Peões</h2>
        <div className="grid-participantes">
          {participantesForaDaRoca.map((p) => (
            <ParticipanteCard 
              key={p.id} 
              participante={p} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
