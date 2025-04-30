# Marta Murari Bronze

Um site profissional de bronzeamento natural e artificial, com painel administrativo completo para gestão de serviços e galeria de resultados. Desenvolvido com foco em performance, responsividade e facilidade de manutenção.

---

## 🔥 Tecnologias Aplicadas

| Tecnologia      | Por que usamos?                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **Vite**        | • Bundler ultrarrápido: inicia o servidor de desenvolvimento em milissegundos.<br>• HMR instantâneo: mudanças são refletidas no navegador sem recarregar. |
| **React 18**    | • Componentização: facilita a criação e reuso de interfaces (Hero, Services, Gallery, Admin, etc.).<br>• Virtual DOM: atualizações eficientes de UI. |
| **Tailwind CSS**| • Estilização utilitária: classes rápidas para layout responsivo, tipografia e cores (“rosa & bronze”).<br>• Tema extensível: definimos `bg-bronze`, tipografia e paleta personalizada para manter a identidade. |
| **Supabase**    | • Backend “serverless”: autenticação, banco de dados Postgres e storage de arquivos em um só lugar.<br>• RLS e políticas de segurança: garantem que só usuários autenticados façam uploads e leituras. |
| **React Router**| • Navegação declarativa: definimos rotas públicas e protegidas (`ProtectedRoute`) para painel admin.<br>• SPA: transições suaves sem recarregar a página. |
| **CI/CD (Vercel/Netlify)** | • Deploy automático: a cada push no GitHub, o site é reconstruído e publicado instantaneamente.<br>• HTTPS grátis: certificado SSL configurado sem esforço. |

---

## 🚀 Funcionalidades

- **Hero Section**: apresentação visual impactante com imagem de fundo e botão para WhatsApp.
- **Nossos Serviços**: cards com título, descrição, preço e imagem de cada opção de bronzeamento.
- **Galeria “Antes & Depois”**: exibe pares de imagens lado a lado e uploads “Outros” como cases únicos.
- **Painel Admin**: login por e-mail, CRUD completo de serviços e galeria, upload de imagens ao storage.
- **Responsividade**: layouts dedicados para desktop e mobile, garantindo experiência consistente.
- **Segurança**: autenticação e RLS no Supabase para proteger operações de escrita.
- **Deploy & Domínio**: pipeline CI/CD e SSL/HTTPS configurados para produção segura e manutenção fácil.

---

## 📥 Como Executar Localmente

1. Clone o repositório  
   \`\`\`bash
   git clone https://github.com/SEU_USUARIO/marta-bronze-site.git
   cd marta-bronze-site
   \`\`\`
2. Instale dependências  
   \`\`\`bash
   npm install
   \`\`\`
3. Crie o \`.env\` a partir do modelo e preencha as chaves Supabase  
   \`\`\`bash
   cp .env.example .env
   # edite .env com VITE_SUPABASE_URL e VITE_SUPABASE_KEY
   \`\`\`
4. Rode o servidor de desenvolvimento  
   \`\`\`bash
   npm run dev
   \`\`\`
5. Abra no navegador  
   \`\`\`
   http://localhost:5173
   \`\`\`

---

## ☁️ Deploy em Produção

1. Conecte este repositório ao Vercel ou Netlify.  
2. Defina as variáveis de ambiente (\`VITE_SUPABASE_URL\`, \`VITE_SUPABASE_KEY\`) no painel da sua plataforma.  
3. Faça um push no GitHub e aguarde o build automático.  
4. Acesse seu domínio próprio com HTTPS habilitado automaticamente.

---

## 🤝 Como Contribuir

1. Abra uma **issue** para reportar bugs ou sugerir melhorias.  
2. Crie um **fork** e um **branch** para sua feature/fix:  
   \`\`\`bash
   git checkout -b feat/nova-funcionalidade
   \`\`\`
3. Faça seus commits e **pull request** para \`main\`.  
4. Após revisão, seu código será mesclado e implantado automaticamente.

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Marta Murari Bronze** – 💛 Unindo técnica e cuidado para resultados impecáveis no bronzeamento!
