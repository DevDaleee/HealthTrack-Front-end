
# HealthTrack

Doenças crônicas como diabetes e hipertensão são um desafio crescente para a saúde pública. O SUS e clínicas particulares enfrentam dificuldades na triagem rápida e eficaz de pacientes em risco. O nutricionista tem papel central na prevenção dessas doenças, mas limitações como consultas rápidas, coleta manual de dados e dificuldades na análise sistemática comprometem a eficiência do atendimento. A tecnologia surge como aliada para otimizar o tempo e melhorar a qualidade da triagem nutricional.

Atualmente, o atendimento sofre com a falta de padronização na coleta de informações, identificação imprecisa de fatores de risco e alta possibilidade de erros manuais. A ausência de processos estruturados prejudica a identificação precoce de doenças crônicas. Diante disso, é necessária uma solução tecnológica que automatize a triagem, padronize a coleta de dados e ofereça suporte à decisão do nutricionista.

Para resolver essas limitações, propõe-se o desenvolvimento de uma aplicação para auxiliar na triagem de pacientes. Antes da consulta, o paciente preencherá um formulário online sobre hábitos alimentares, histórico familiar e condições de saúde, gerando um score de risco baseado nas respostas. Uma professora de nutrição da UFPI apoiará a validação do questionário. A plataforma permitirá o cadastro de pacientes, cálculo automático do score de risco, visualização de relatórios pelos nutricionistas e o acompanhamento da evolução dos pacientes ao longo do tempo, tornando o atendimento mais rápido, preciso e personalizado.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) com suporte a TypeScript
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)

## 🧩 Estrutura do Projeto

- `src/app/`: Componentes e páginas da aplicação
- `public/`: Arquivos públicos e estáticos
- `eslint.config.mjs`: Configuração do ESLint
- `next.config.ts`: Configuração do Next.js
- `postcss.config.mjs`: Configuração do PostCSS
- `tsconfig.json`: Configuração do TypeScript
- `package.json`: Dependências e scripts do projeto

## 📦 Instalação e Execução Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/DevDaleee/HealthTrack.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd HealthTrack
   ```

3. Instale as dependências:

   ```bash
   pnpm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

5. Abra o navegador e acesse:

   ```
   http://localhost:3000
   ```

## 📊 Funcionalidades

- **Cadastro de Pacientes:** Registre informações pessoais e clínicas dos pacientes.
- **Registro de Atendimentos:** Documente consultas, avaliações e observações.
- **Visualização Gráfica:** Acompanhe a evolução dos pacientes através de gráficos interativos.
- **Interface Responsiva:** Design adaptável para diferentes dispositivos.

