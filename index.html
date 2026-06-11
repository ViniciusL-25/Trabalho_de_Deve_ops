import { useEffect, useState } from 'react';

// CORREÇÃO: usar variável de ambiente, não localhost hardcoded
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const STATUS_LABELS = {
  pendente:   { label: 'Pendente',    color: '#f59e0b' },
  em_preparo: { label: 'Em preparo',  color: '#3b82f6' },
  entregue:   { label: 'Entregue',    color: '#10b981' },
  cancelado:  { label: 'Cancelado',   color: '#ef4444' },
};

export default function App() {
  const [pedidos, setPedidos]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [erro, setErro]           = useState(null);
  const [descricao, setDescricao] = useState('');
  const [cliente, setCliente]     = useState('');
  const [enviando, setEnviando]   = useState(false);

  const buscarPedidos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pedidos`);
      if (!res.ok) throw new Error('Falha ao buscar pedidos');
      const data = await res.json();
      setPedidos(data);
      setErro(null);
    } catch (err) {
      setErro('Não foi possível conectar à API. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { buscarPedidos(); }, []);

  const criarPedido = async () => {
    if (!descricao.trim()) return;
    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao, cliente }),
      });
      if (!res.ok) throw new Error('Erro ao criar pedido');
      setDescricao('');
      setCliente('');
      await buscarPedidos();
    } catch (err) {
      setErro('Erro ao criar pedido.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🍔 QuickBite</h1>
        <p style={styles.subtitle}>Sistema de Pedidos Online</p>
      </header>

      {/* Formulário */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Novo Pedido</h2>
        <input
          style={styles.input}
          placeholder="Descrição do pedido *"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Nome do cliente (opcional)"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
        <button
          style={{ ...styles.btn, opacity: enviando ? 0.7 : 1 }}
          onClick={criarPedido}
          disabled={enviando || !descricao.trim()}
        >
          {enviando ? 'Enviando...' : '+ Criar Pedido'}
        </button>
      </div>

      {/* Erro */}
      {erro && <div style={styles.erro}>{erro}</div>}

      {/* Lista */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>
          Pedidos {pedidos.length > 0 && <span style={styles.badge}>{pedidos.length}</span>}
        </h2>

        {loading && <p style={styles.info}>Carregando pedidos...</p>}
        {!loading && pedidos.length === 0 && (
          <p style={styles.info}>Nenhum pedido ainda. Crie o primeiro!</p>
        )}

        {pedidos.map(p => {
          const s = STATUS_LABELS[p.status] || { label: p.status, color: '#6b7280' };
          return (
            <div key={p.id} style={styles.pedidoItem}>
              <div>
                <strong>#{p.id}</strong> — {p.descricao}
                <div style={styles.pedidoMeta}>👤 {p.cliente}</div>
              </div>
              <span style={{ ...styles.statusTag, background: s.color }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container:  { maxWidth: 640, margin: '0 auto', padding: '24px 16px', fontFamily: 'system-ui, sans-serif' },
  header:     { textAlign: 'center', marginBottom: 24 },
  logo:       { fontSize: 32, margin: 0 },
  subtitle:   { color: '#6b7280', margin: '4px 0 0' },
  card:       { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  cardTitle:  { margin: '0 0 16px', fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 },
  input:      { display: 'block', width: '100%', padding: '10px 12px', marginBottom: 10, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' },
  btn:        { width: '100%', padding: '11px', background: '#f97316', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  erro:       { background: '#fee2e2', color: '#dc2626', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  info:       { color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: '16px 0' },
  pedidoItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f3f4f6' },
  pedidoMeta: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  statusTag:  { fontSize: 12, color: '#fff', padding: '3px 10px', borderRadius: 20, fontWeight: 500, whiteSpace: 'nowrap' },
  badge:      { background: '#f97316', color: '#fff', borderRadius: 20, padding: '2px 8px', fontSize: 13 },
};
