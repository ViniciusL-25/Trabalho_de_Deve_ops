const request = require('supertest');
const app = require('../src/app');

// Mock do banco de dados para os testes não precisarem do PostgreSQL
jest.mock('../src/db', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return mockPool;
});

const pool = require('../src/db');

//  /health 
describe('GET /health', () => {
  it('deve retornar status 200 e status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('quickbite-backend');
  });
});

//  /api/pedidos 
describe('GET /api/pedidos', () => {
  it('deve retornar lista de pedidos', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        { id: 1, descricao: 'X-Burguer', cliente: 'João', status: 'pendente' },
        { id: 2, descricao: 'Pizza Margherita', cliente: 'Maria', status: 'entregue' },
      ],
    });

    const res = await request(app).get('/api/pedidos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].descricao).toBe('X-Burguer');
  });

  it('deve retornar 500 em caso de erro no banco', async () => {
    pool.query.mockRejectedValueOnce(new Error('DB Error'));
    const res = await request(app).get('/api/pedidos');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Erro interno do servidor');
  });
});

describe('POST /api/pedidos', () => {
  it('deve criar um pedido com sucesso', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 3, descricao: 'Hamburguer', cliente: 'Carlos', status: 'pendente' }],
    });

    const res = await request(app)
      .post('/api/pedidos')
      .send({ descricao: 'Hamburguer', cliente: 'Carlos' });

    expect(res.statusCode).toBe(201);
    expect(res.body.descricao).toBe('Hamburguer');
  });

  it('deve retornar 400 se descrição estiver ausente', async () => {
    const res = await request(app)
      .post('/api/pedidos')
      .send({ cliente: 'Carlos' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Descrição é obrigatória');
  });
});

describe('GET /api/pedidos/:id', () => {
  it('deve retornar 404 se pedido não existir', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/api/pedidos/999');
    expect(res.statusCode).toBe(404);
  });

  it('deve retornar o pedido correto', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, descricao: 'X-Burguer', cliente: 'João', status: 'pendente' }],
    });
    const res = await request(app).get('/api/pedidos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });
});

describe('Rotas inexistentes', () => {
  it('deve retornar 404 para rota desconhecida', async () => {
    const res = await request(app).get('/rota-que-nao-existe');
    expect(res.statusCode).toBe(404);
  });
});
