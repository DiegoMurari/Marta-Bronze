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
   ```bash
   git clone https://github.com/SEU_USUARIO/marta-bronze-site.git
   cd marta-bronze-site
