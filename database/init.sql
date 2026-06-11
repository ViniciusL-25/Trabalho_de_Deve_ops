-- 
-- QuickBite — Inicialização do Banco de Dados
-- 

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id         SERIAL PRIMARY KEY,
  descricao  VARCHAR(255)  NOT NULL,
  cliente    VARCHAR(100)  NOT NULL DEFAULT 'Anônimo',
  status     VARCHAR(50)   NOT NULL DEFAULT 'pendente',
  criado_em  TIMESTAMP     NOT NULL DEFAULT NOW(),
  CONSTRAINT status_valido CHECK (status IN ('pendente', 'em_preparo', 'entregue', 'cancelado'))
);

-- Dados de exemplo
INSERT INTO pedidos (descricao, cliente, status) VALUES
  ('X-Burguer duplo com fritas',   'João Silva',   'entregue'),
  ('Pizza Margherita grande',       'Maria Souza',  'em_preparo'),
  ('Combo Frango Grelhado + Suco',  'Carlos Lima',  'pendente');
