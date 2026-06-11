const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/pedidos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pedidos ORDER BY criado_em DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET /api/pedidos/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM pedidos WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/pedidos
router.post('/', async (req, res) => {
  try {
    const { descricao, cliente } = req.body;
    if (!descricao) {
      return res.status(400).json({ error: 'Descrição é obrigatória' });
    }
    const result = await pool.query(
      'INSERT INTO pedidos (descricao, cliente) VALUES ($1, $2) RETURNING *',
      [descricao, cliente || 'Anônimo']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar pedido:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT /api/pedidos/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE pedidos SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE /api/pedidos/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pedidos WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
