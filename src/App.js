import { useEffect, useState } from 'react'
import { Navbar, Offcanvas, Nav, Container, Row, Col } from 'react-bootstrap'
import { ConstructorService, Loading } from 'website-lib'

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
    <Container fluid>
      <Row>
        <Navbar expand="lg" className="website-navbar">
          <Container>
            <Navbar.Brand className="website-navbar-brand">
              <img alt="NOIS" src="/favicon.ico" className="d-inline-block align-top website-navbar-brand-logo" />
              <span className="tiktok-sans fw-700" style={{ color: '#FFF', fontSize: '1.5rem' }}>PixelBuild</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand" style={{ border: '1px solid var(--blue3)' }} />
            <Navbar.Offcanvas id="offcanvasNavbar-expand" aria-labelledby="offcanvasNavbarLabel-expand" placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand">Painel Administrativo</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="w-100">
                  <div className="menu-direita">
                    <Nav.Link className='website-navbar-button'>
                      Recursos
                    </Nav.Link>
                    <Nav.Link className='website-navbar-button'>
                      Como funciona
                    </Nav.Link>
                    <Nav.Link className='website-navbar-button'>
                      Preços
                    </Nav.Link>
                    <Nav.Link className='website-navbar-button' href="https://painel.pixelbuild.com.br" rel="noreferrer" target="_blank">
                      <div class="btn primary">
                        Entrar
                      </div>
                    </Nav.Link>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container>
            <Row className='hero-grid'>
              <Col lg={6} style={{ width: '100%' }}>
                <h1 class="title">Crie <em>seu site</em> completo em minutos — sem código</h1>
                <p class="subtitle">
                  Com o <b>PixelBuild</b>, qualquer pessoa cria, personaliza e publica um site profissional: temas modernos, páginas ilimitadas, blog, loja, formulários e muito mais.
                  Tudo em um painel simples e intuitivo.
                </p>
              </Col>
              <Col lg={6} style={{ width: '100%' }}>
                <div class="screen">
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
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col>
                <h2>Tudo que você precisa para um site de alto nível</h2>
                <p class="lead">Recursos pensados para facilitar a vida de quem não é técnico — e acelerar quem é.</p>
                <div class="features">
                  <article class="card">
                    <h3 style={{ color: '#FFF' }}>Domínio personalizado</h3>
                    <p>Conecte seu domínio em poucos cliques com certificado SSL automático pra total segurança do seu site.</p>
                  </article>
                  <article class="card" style={{ display: 'none' }}>
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
                  <article class="card" style={{ display: 'none' }}>
                    <h3 style={{ color: '#FFF' }}>Blog & SEO avançado</h3>
                    <p>Escreva posts, gerencie categorias, URLs amigáveis, metas e sitemap.</p>
                  </article>
                  <article class="card" style={{ display: 'none' }}>
                    <h3 style={{ color: '#FFF' }}>Loja e pagamentos</h3>
                    <p>Adicione produtos, carrinho e checkout integrado (PagSeguro/Mercado Pago/Stripe). Controle de estoque e frete.</p>
                  </article>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col lg={12} className='mb-3'>
                <h2>Como funciona</h2>
                <p class="lead">Em 4 passos simples você coloca seu projeto no ar.</p>
              </Col>
              <Col lg={3}>
                <div class="step">
                  <h3>1. Crie sua conta</h3>
                  <p>Cadastre-se com seu e‑mail.</p>
                </div>
              </Col>
              <Col lg={3}>
                <div class="step">
                  <h3>2. Conecte seu domínio</h3>
                  <p>Conecte <em>seusite.com.br</em> com SSL automático.</p>
                </div>
              </Col>
              <Col lg={3}>
                <div class="step">
                  <h3>3. Personalize</h3>
                  <p>Selecione um layout inicial e personalize cores, fontes e imagens.</p>
                </div>
              </Col>
              <Col lg={3}>
                <div class="step">
                  <h3>4. Monte suas páginas</h3>
                  <p>Arraste blocos, escreva seu conteúdo e publique em um clique.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <h2>Planos simples, preço honesto</h2>
                <p class="lead">Comece grátis e faça upgrade quando precisar. Sem taxa escondida.</p>
              </Col>
              <Col lg={3}>
                <div class="price">
                  <h3>Lite</h3>
                  <div class="value">R$ 9<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ 1 página</li>
                    <li>✔️ Formulário</li>
                    <li>✔️ Ideal para landing pages</li>
                    <li>✔️ Domínio personalizado + Certificado SSL</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn">Assinar Lite</div>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div class="price popular">
                  <h3>Basic</h3>
                  <div class="value">R$ 19<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Lite</li>
                    <li>✔️ 5 páginas</li>
                    <li>✔️ SEO avançado</li>
                    <li>✔️ Google Analytics</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn primary">Assinar Basic</div>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div class="price">
                  <h3>Standard</h3>
                  <div class="value">R$ 49<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Basic</li>
                    <li>✔️ Páginas ilimitadas</li>
                    <li>✔️ Usuários e permissões</li>
                    <li>✔️ Integrações</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn">Assinar Standard</div>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div class="price">
                  <h3>Plus</h3>
                  <div class="value">R$ 89<span style={{fontSize:'.9rem',fontWeight:'600'}}>/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Standard</li>
                    <li>✔️ Loja + pagamentos</li>
                    <li>✔️ Blog</li>
                    <li>✔️ Suporte prioritário</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn">Assinar Plus</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <h2>Quem usa, recomenda</h2>
                <p class="lead">Empreendedores, criadores e pequenas empresas já possuem sites com o <b>PixelBuild</b>.</p>
              </Col>
              <Col lg={4}>
                <div class="quote">
                  <p>“Em um sábado de manhã publiquei meu site e comecei a vender no mesmo dia. Sem desenvolvedor, sem complicação.”</p>
                  <div class="who">Robson</div>
                </div>
              </Col>
              <Col lg={4}>
                <div class="quote">
                  <p>“Troquei de tema duas vezes sem perder nada. O editor é muito intuitivo e o SEO já vem pronto.”</p>
                  <div class="who">Marcos</div>
                </div>
              </Col>
              <Col lg={4}>
                <div class="quote">
                  <p>“O melhor custo‑benefício para quem precisa de agilidade. Publicamos dezenas de landing pages em uma semana.”</p>
                  <div class="who">Gabriel</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5'>
          <Container fluid className='footer'>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col className='text-center'>
                      <strong>PixelBuild</strong> <span style={{opacity:'.7'}}>© <span id="year">2025</span></span>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
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