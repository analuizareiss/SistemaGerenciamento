# Visão Geral do Projeto
Este projeto é um sistema completo (full-stack) desenvolvido para o gerenciamento de estudantes, composto por um backend em Node.js com Express e um frontend em React. A aplicação oferece funcionalidades completas para cadastro, listagem e geração de relatórios sobre estudantes, seguindo uma arquitetura organizada e modular.

# Tecnologias e Arquitetura
O sistema foi estruturado seguindo boas práticas de desenvolvimento, separando claramente as responsabilidades entre frontend e backend:

Backend:
-Desenvolvido em Node.js com Express para criação da API REST
-JSON Server para simulação de um banco de dados (armazenando dados em db.json)
-Arquitetura em camadas (controllers, services, repositories)
-Sistema de rotas modularizado

Frontend:

-Components: Componentes reutilizáveis
-Pages: Páginas da aplicação
-Services: Conexão com a API usando Fetch


Cadastro de Estudantes:

-Formulário completo para registro de novos estudantes
-Validação de dados
-Integração com a API para persistência dos dados

Listagem de Estudantes:

-Visualização em lista de todos os estudantes cadastrados
-Atualização em tempo real quando novos estudantes são adicionados

Geração de Relatórios:

-Dados estatísticos sobre o corpo discente
-Visualização gráfica das informações

# Configuração e Execução
Para colocar o sistema em funcionamento, siga estes passos:

Pré-requisitos:

Node.js (versão 14 ou superior) instalado

npm ou yarn como gerenciador de pacotes

Instalação:

# Clone o repositório
git clone <url-do-repositório>

# Instale as dependências do backend
cd backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install

# Execução:

# Inicie o servidor Json-server
cd ../backend
json-server --watch db.json --port 3000

# Inicie o servidor backend
cd ../backend
node server.js

# Em outro terminal, inicie o frontend
cd ../frontend
npm start
O backend estará disponível na porta 3001 (http://localhost:3001) e o frontend na porta 3000 (http://localhost:3000).

# Estrutura Detalhada do Projeto
Backend (Node.js)
/backend
  /controllers      # Lógica para manipulação das requisições HTTP
    ReportController.js  # Controle de relatórios
    StudentController.js # Controle de estudantes
  /repositories    # Camada de acesso aos dados
    StudentRepository.js # Operações com o "banco de dados"
  /routes          # Definição das rotas da API
    apiRoutes.js   # Configuração das rotas
  /services        # Lógica de negócio
    ReportService.js # Serviços de relatório
    StudentService.js # Serviços de estudante
  db.json          # "Banco de dados" em JSON
  package.json     # Configuração do projeto e dependências
  server.js        # Ponto de entrada do servidor
Frontend (React)
text
/frontend
  /public          # Arquivos estáticos e HTML base
  /src
    /components    # Componentes reutilizáveis
      /Reports     # Componentes para relatórios
        Reports.js
      /StudentForm # Formulário de estudante
        StudentForm.js
      /StudentList # Listagem de estudantes
        StudentList.js
    /pages         # Páginas da aplicação
      HomePage.js       # Página inicial
      StudentFormPage.js # Página de formulário
    /services      # Serviços para chamadas API
      apiService.js # Configuração do Axios
    App.js         # Componente raiz
    index.js       # Ponto de entrada
  package.json     # Configuração do projeto e dependências


#  Premissas Fundamentais

O sistema foi conceitualizado como um MVP focado em operações essenciais de CRUD para estudantes e geração básica de relatórios

Adotei JSON Server como camada de persistência temporária, adequada para prototipagem

A arquitetura foi planejada para permitir fácil evolução para um banco de dados convencional

Conscientemente optei por não implementar autenticação nesta fase inicial


# Vantagens da Estrutura Adotada

Manutenibilidade: Alterações podem ser feitas pontualmente
Testabilidade: Camadas isoladas facilitam testes unitários
Escalabilidade: Novas features podem ser adicionadas sem refatoração massiva
Clareza: Separação explícita de responsabilidades


# Considerações finais
Esta arquitetura representa um equilíbrio cuidadoso entre simplicidade inicial e preparação para crescimento. 
As decisões tomadas permitem que o sistema evolua gradualmente conforme as necessidades,mantendo sempre a organização e qualidade do código. 
O projeto serve tanto como solução funcional imediata quanto como base sólida para expansões futuras.

