import { useEffect, useState } from 'react'
import { Navbar, Offcanvas, Nav, Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainLayout, PageRenderer, ConstructorService, Loading } from 'website-lib'

function App() {

  const [website, setWebsite] = useState(undefined)

  useEffect(() => {

    const constructorService = new ConstructorService()

    const fetchData = async () => {
      try {
        const constructorService = new ConstructorService()
        const website = await constructorService.fetchWebsiteFromApi(process.env.REACT_APP_WEBSITE_ID, process.env.REACT_APP_API)

        setWebsite(website)
        console.log('website', website)
      } catch (error) {
        console.error('Erro ao fazer conexão com a API:', error.message)

        try {
          const website = constructorService.fetchWebsiteFromCache()
          
          if (!website) {
            throw new Error('Nenhum cache encontrado')
          }

          console.warn('Usando dados do cache para construção do site')
          setWebsite(website)
        } catch (error) {
          console.error('Erro ao carregar o site: ', error.message)
          setWebsite({ error: true })
        }
      }
    }

    fetchData()
  }, [])

  if (website === undefined) {
    return <Loading />
  }
  
  return (
    <>
      <nav class="nav">
        <div class="container nav-inner">
          <a href="#top" class="brand" aria-label="PixelBuild - Início">
            <img src="logo_pixelbuild_dark_transparent_background.png" width="150" />
          </a>
          <button class="btn ghost menu-toggle" aria-controls="menu" aria-expanded="false" onclick="toggleMenu()">Menu</button>
          <div id="menu" class="menu" role="navigation" aria-label="Principal">
            <a href="#features">Recursos</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#precos">Preços</a>
            <a href="#faq">FAQ</a>
            <a href="#" class="btn ghost" onclick="openModal('login')" style={{ display: 'none' }}>Entrar</a>
            <a href="https://painel.pixelbuild.com.br" target="_blank" class="btn primary">Entrar</a>
          </div>
        </div>
      </nav>

      <header id="top" class="hero">
        <div class="container hero-grid">
          <div id="componente1-texto">
            <span class="badge" style={{ display: 'none' }}>Novo • Editor arraste‑e‑solte + IA</span>
            <h1 class="title">Crie <em>seu site</em> completo em minutos — sem código</h1>
            <p class="subtitle">Com o <b>PixelBuild</b>, qualquer pessoa cria, personaliza e publica um site profissional: temas modernos, páginas ilimitadas, blog, loja, formulários e muito mais. Tudo em um painel simples e intuitivo.</p>
            <div class="hero-cta" style={{ display: 'none' }}>
              <a href="#precos" class="btn primary">Experimente grátis</a>
              <a href="#features" class="btn">Ver recursos</a>
            </div>
            <div class="trust" aria-label="prova social" style={{ display: 'none' }}>
              <span class="stars" aria-hidden="true">★★★★★</span>
              <span>Mais de 12.000 sites publicados com PixelBuild</span>
            </div>
          </div>
          <div id="componente2-abaNavegador" class="screen" aria-label="Prévia do painel administrativo">
            <div class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
            <div class="iframe">
              <div>
                <div style={{textAlign:'center',fontSize:'1.1rem',marginBottom:'.4rem'}}>Painel Administrativo</div>
                <div style={{display:'flex',gap:'15px',justifyContent:'center',flexWrap:'wrap',padding:'20px'}}>
                  <span class="badge">Páginas</span>
                  <span class="badge">Componentes</span>
                  <span class="badge">Blog</span>
                  <span class="badge">Loja</span>
                  <span class="badge">Formulários</span>
                  <span class="badge">SEO</span>
                  <span class="badge">Integrações</span>
                </div>
                <div style={{ display: 'none' }}>
                  <p>Arraste blocos, solte conteúdos e publique. Simples assim.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="features" class="section">
        <div class="container">
          <h2>Tudo que você precisa para um site de alto nível</h2>
          <p class="lead">Recursos pensados para facilitar a vida de quem não é técnico — e acelerar quem é.</p>
          <div class="features">
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Domínio personalizado</h3>
              <p>Conecte seu domínio em poucos cliques com certificado SSL automático pra total segurança do seu site.</p>
            </article>
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Editor intuitivo</h3>
              <p>Monte páginas com componentes prontos (galeria, depoimentos, preços, formulário). Personalize cores, fontes e layouts sem tocar em código.</p>
            </article>
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Google Analytics</h3>
              <p>Monitore o desempenho do seu site com relatórios detalhados e insights valiosos.</p>
            </article>
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Gerenciamento de usuários</h3>
              <p>Controle o acesso de usuários ao seu site com permissões personalizadas e monitoramento de atividades.</p>
            </article>
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Blog & SEO avançado</h3>
              <p>Escreva posts, gerencie categorias, URLs amigáveis, metas e sitemap.</p>
            </article>
            <article class="card">
              <h3 style={{ color: '#FFF' }}>Loja e pagamentos</h3>
              <p>Adicione produtos, carrinho e checkout integrado (PagSeguro/Mercado Pago/Stripe). Controle de estoque e frete.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="como-funciona" class="section">
        <div class="container">
          <h2>Como funciona</h2>
          <p class="lead">Em 4 passos simples você coloca seu projeto no ar.</p>
          <div class="how">
            <div class="step">
              <h3>1. Crie sua conta</h3>
              <p>Cadastre-se com e‑mail e ganhe 14 dias grátis para testar.</p>
            </div>
            <div class="step">
              <h3>2. Escolha um tema</h3>
              <p>Selecione um layout inicial e personalize cores, fontes e imagens.</p>
            </div>
            <div class="step">
              <h3>3. Monte suas páginas</h3>
              <p>Arraste blocos, escreva seu conteúdo e publique em um clique.</p>
            </div>
            <div class="step">
              <h3>4. Conecte seu domínio</h3>
              <p>Conecte <em>seusite.com.br</em> com SSL automático e SEO pronto.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="precos" class="section">
        <div class="container">
          <h2>Planos simples, preço honesto</h2>
          <p class="lead">Comece grátis e faça upgrade quando precisar. Sem taxa escondida.</p>
          <div class="pricing">
            <div class="price">
              <h3>Starter</h3>
              <div class="value">R$ 9<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
              <ul>
                <li>✔️ 1 página</li>
                <li>✔️ Editor visual</li>
                <li>✔️ Domínio personalizado + Certificado SSL</li>
              </ul>
              <div style={{marginTop:'16px'}}><a class="btn" href="#" onclick="openModal('signup')">Assinar Starter</a></div>
            </div>
            <div class="price popular">
              <h3>Essential</h3>
              <div class="value">R$ 19<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
              <ul>
                <li>✔️ Tudo do Starter</li>
                <li>✔️ 5 páginas</li>
                <li>✔️ SEO avançado</li>
                <li>✔️ Google Analytics</li>
              </ul>
              <div style={{marginTop:'16px'}}><a class="btn primary" href="#" onclick="openModal('signup')">Assinar Essential</a></div>
            </div>
            <div class="price">
              <h3>Pro</h3>
              <div class="value">R$ 59<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
              <ul>
                <li>✔️ Tudo do Essential</li>
                <li>✔️ Páginas ilimitadas</li>
                <li>✔️ Usuários e permissões</li>
                <li>✔️ Integrações</li>
              </ul>
              <div style={{marginTop:'16px'}}><a class="btn" href="#" onclick="openModal('signup')">Assinar Pro</a></div>
            </div>
            <div class="price">
              <h3>Business</h3>
              <div class="value">R$ 129<span style={{fontSize:'.9rem',fontWeight:'600'}}>/mês</span></div>
              <ul>
                <li>✔️ Tudo do Pro</li>
                <li>✔️ Loja + pagamentos</li>
                <li>✔️ Blog</li>
                <li>✔️ Suporte prioritário</li>
              </ul>
              <div style={{marginTop:'16px'}}><a class="btn" href="#" onclick="openModal('signup')">Assinar Business</a></div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="section">
        <div class="container">
          <h2>Quem usa, recomenda</h2>
          <p class="lead">Empreendedores, criadores e pequenas empresas já possuem sites com o <b>PixelBuild</b>.</p>
          <div class="testimonials">
            <div class="quote">
              <p>“Em um sábado de manhã publiquei meu site e comecei a vender no mesmo dia. Sem desenvolvedor, sem complicação.”</p>
              <div class="who">Robinson</div>
            </div>
            <div class="quote">
              <p>“Troquei de tema duas vezes sem perder nada. O editor é muito intuitivo e o SEO já vem pronto.”</p>
              <div class="who">Marcos</div>
            </div>
            <div class="quote">
              <p>“O melhor custo‑benefício para quem precisa de agilidade. Publicamos dezenas de landing pages em uma semana.”</p>
              <div class="who">Gabriel</div>
            </div>
          </div>
        </div>
      </section>

      <section id="componente7-faq" class="section">
        <div class="container">
          <h2>Perguntas frequentes</h2>
          <details>
            <summary>Posso conectar meu domínio próprio?</summary>
            <p>Sim! Em todos os planos você conecta seu domínio (<em>seusite.com.br</em>) com SSL automático.</p>
          </details>
          <details>
            <summary>Existe teste grátis?</summary>
            <p>Você tem 14 dias grátis para testar todos os recursos. Não precisa de cartão para começar.</p>
          </details>
          <details>
            <summary>Consigo vender produtos?</summary>
            <p>Sim, o plano Business inclui loja, carrinho, checkout e integrações com gateway de pagamento.</p>
          </details>
          <details>
            <summary>Tenho suporte?</summary>
            <p>Claro! Nosso time atende por e‑mail e WhatsApp. No Business, o suporte é prioritário.</p>
          </details>
        </div>
      </section>

      <footer>
        <div class="container" style={{display:'flex',flexWrap:'wrap',gap:'16px',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}><strong>PixelBuild</strong> <span style={{opacity:'.7'}}>© <span id="year"></span></span></div>
          <div style={{display:'flex',gap:'14px'}}>
            <a href="#faq">Termos</a>
            <a href="#faq">Privacidade</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
    </>
    // <Router>
    //   <Routes>
    //     <Route element={<MainLayout website={website} />}>
    //       {website.pages.map((page) => (
    //         <Route
    //           key={page.path}
    //           path={page.path}
    //           element={
    //             <PageRenderer
    //               website={website}
    //               page={page}
    //             />
    //           }
    //         />
    //       ))}
    //     </Route>
    //   </Routes>
    // </Router>
  )
}

export default App