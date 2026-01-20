import { useEffect, useState } from 'react'
import { Navbar, Offcanvas, Nav, Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import { ConstructorService, Loading, analyticsService } from 'website-lib'
import InputMask from "react-input-mask";

function App() {

  const [website, setWebsite] = useState(undefined)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (fn) => (e) => {
    e.target.style.border = '';
    fn(e);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    if (!formValidate()) {
      setLoading(false)
      return
    }

    setError(false)

    const planNames = {
      '1': 'Inicial - R$ 9,99/mês',
      '2': 'Essencial - R$ 19,99/mês',
      '3': 'Completo - R$ 49,99/mês',
      '4': 'Profissional - R$ 89,99/mês'
    }

    const message = `Novo cadastro via site:
      Nome: ${firstName} ${lastName}
      Email: ${email}
      Celular: ${phone}
      Plano: ${planNames[plan]}
    `

    if (!await sendMail(message)) {
      setError(true);
      console.log('Notification sending failed')
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPlan('');

    setLoading(false);
    setSuccess(true);
  };

  const formValidate = () => {
    if (!firstName || firstName.length < 3) {
      const fieldName = document.getElementById('formFirstName');
      fieldName.focus();
      fieldName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldName.style.border = '5px solid red';
      return false;
    }

    if (!lastName || lastName.length < 3) {
      const fieldLastName = document.getElementById('formLastName');
      fieldLastName.focus();
      fieldLastName.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldLastName.style.border = '5px solid red';
      return false;
    }

    if (!email || !emailValidate(email)) {
      const fieldEmail = document.getElementById('formEmail');
      console.log('fieldEmail', fieldEmail)
      console.log('email', email)
      fieldEmail.focus();
      fieldEmail.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldEmail.style.border = '5px solid red';
      return false;
    }

    if (!phone || !phoneValidate(phone)) {
      const fieldPhone = document.getElementById('formPhone');
      fieldPhone.focus();
      fieldPhone.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldPhone.style.border = '5px solid red';
      return false;
    }

    if (plan === '' || plan === '0') {
      const fieldPlan = document.getElementById('formPlan');
      fieldPlan.focus();
      fieldPlan.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldPlan.style.border = '5px solid red';
      return false;
    }

    return true;
  }

  const phoneValidate = (phone) => {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(phone)
  }

  const emailValidate = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const sendMail = async (data) => {
    const body = createBody(data)
    const response = await fetch(`${process.env.REACT_APP_API_CONTROLLER}/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Website-Id': process.env.REACT_APP_WEBSITE_ID,
        'Authorization': `Bearer ${process.env.REACT_APP_API_MAIL_KEY}`
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      return true
    } else {
      setError(true);
      return false
    }
  }

  const handleAssinar = (planId) => async (e) => {
    e.preventDefault()

    setPlan(planId)

    const el = document.getElementById('assinar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if ('focus' in el) el.focus({ preventScroll: true });
    }
  }

  const createBody = (message) => {
    return {
      'senderName': 'Site PixelBuild',
      'sender': 'contato@nois.dev.br',
      'recipientName': 'Site',
      'recipient': 'pixelbuildapp@gmail.com',
      'title': 'Nova inscrição via site',
      'message': message,
      'lead': {
        'formId': 18,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phone': phone
      }
    }
  }

  useEffect(() => {

    analyticsService.pageView('/', 'Página inicial')

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
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand" style={{ border: '1px solid var(--muted)' }} />
            <Navbar.Offcanvas id="offcanvasNavbar-expand" aria-labelledby="offcanvasNavbarLabel-expand" placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand"></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="w-100">
                  <div className="menu-direita">
                    <Nav.Link href="#recursos" className='website-navbar-button'>
                      Recursos
                    </Nav.Link>
                    <Nav.Link href="#como-funciona" className='website-navbar-button'>
                      Como funciona
                    </Nav.Link>
                    <Nav.Link href="#preco" className='website-navbar-button'>
                      Preços
                    </Nav.Link>
                    <Nav.Link href="#assinar" className='website-navbar-button'>
                      <div class="btn primary">
                        Assinar
                      </div>
                    </Nav.Link>
                    <Nav.Link className='website-navbar-button' href="https://painel.pixelbuild.com.br" rel="noreferrer" target="_blank">
                      <div class="btn ghost">
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
      <Row id="recursos">
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
      <Row id="como-funciona">
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col lg={12} className='mb-3'>
                <h2>Como funciona</h2>
                <p class="lead">Em 4 passos simples você coloca seu projeto no ar.</p>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="step" data-step="1">
                  <h3>1. Crie sua conta</h3>
                  <p>Cadastre-se com seu e‑mail.</p>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="step" data-step="2">
                  <h3>2. Conecte seu domínio</h3>
                  <p>Conecte <em>seusite.com.br</em> com SSL automático.</p>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="step" data-step="3">
                  <h3>3. Personalize</h3>
                  <p>Selecione um layout inicial e personalize cores, fontes e imagens.</p>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="step" data-step="4">
                  <h3>4. Monte suas páginas</h3>
                  <p>Arraste blocos, escreva seu conteúdo e publique em um clique.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row id="preco">
        <Col className='mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <h2>Planos simples, preço honesto</h2>
                <p class="lead">Comece grátis e faça upgrade quando precisar. Sem taxa escondida.</p>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="price">
                  <h3>Inicial</h3>
                  <div class="value">R$ 9<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ 1 página</li>
                    <li>✔️ 1 usuário</li>
                    <li>✔️ Formulário</li>
                    <li>✔️ Ideal para landing pages</li>
                    <li>✔️ Domínio personalizado + Certificado SSL</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn" onClick={handleAssinar(1)}>Assinar Inicial</div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="price popular">
                  <h3>Essencial</h3>
                  <div class="value">R$ 19<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Inicial</li>
                    <li>✔️ 5 páginas</li>
                    <li>✔️ 3 usuários</li>
                    <li>✔️ SEO avançado</li>
                    <li>✔️ Google Analytics</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn primary" onClick={handleAssinar(2)}>Assinar Essencial</div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="price">
                  <h3>Completo</h3>
                  <div class="value">R$ 49<span style={{fontSize:'.9rem',fontWeight:'600'}}>,99/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Essencial</li>
                    <li>✔️ 15 Páginas</li>
                    <li>✔️ 5 usuários</li>
                    <li>✔️ Usuários e permissões</li>
                    <li>✔️ Integrações</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn" onClick={handleAssinar(3)}>Assinar Completo</div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className='mt-md-0 mt-3'>
                <div class="price">
                  <h3>Profissional</h3>
                  <div class="value">R$ 89<span style={{fontSize:'.9rem',fontWeight:'600'}}>/mês</span></div>
                  <ul>
                    <li>✔️ Tudo do Completo</li>
                    <li>✔️ Páginas ilimitadas</li>
                    <li>✔️ 10 usuários</li>
                    <li>✔️ Loja + pagamentos</li>
                    <li>✔️ Blog</li>
                    <li>✔️ Suporte prioritário</li>
                  </ul>
                  <div style={{marginTop:'16px'}}>
                    <div class="btn" onClick={handleAssinar(4)}>Assinar Profissional</div>
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
              <Col lg={4} className='mt-3'>
                <div class="quote">
                  <p>“Em um sábado de manhã publiquei meu site e comecei a vender no mesmo dia. Sem desenvolvedor, sem complicação.”</p>
                  <div class="who">Robson</div>
                </div>
              </Col>
              <Col lg={4} className='mt-3'>
                <div class="quote">
                  <p>“Troquei de tema duas vezes sem perder nada. O editor é muito intuitivo e o SEO já vem pronto.”</p>
                  <div class="who">Marcos</div>
                </div>
              </Col>
              <Col lg={4} className='mt-3'>
                <div class="quote">
                  <p>“O melhor custo‑benefício para quem precisa de agilidade. Publicamos dezenas de landing pages em uma semana.”</p>
                  <div class="who">Gabriel</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row id="assinar">
        <Col>
          <Container>
            <Row>
              <Col lg={{ span: 6, offset: 3 }} className='mt-5'>
                <div class="quote" style={{ padding: '2em' }}>
                  <div className='text-center form'>
                    <div style={{ fontSize: '24px' }}>
                      Preencha os dados abaixo para criar a sua conta.
                    </div>
                  </div>
                  <Form id="formulario" className='mb-5 form'>
                    <Row>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            id="formFirstName"
                            type="text"
                            placeholder="Digite o seu nome"
                            value={firstName}
                            onChange={handleChange(e => setFirstName(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Sobrenome</Form.Label>
                          <Form.Control
                            id="formLastName"
                            type="text"
                            placeholder="Digite o seu sobrenome"
                            value={lastName}
                            onChange={handleChange(e => setLastName(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control
                            id="formEmail"
                            type="email"
                            placeholder="Digite o seu e-mail" 
                            value={email}
                            onChange={handleChange(e => setEmail(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Telefone</Form.Label>
                          <Form.Control
                            id="formPhone"
                            as={InputMask}
                            mask='(99) 99999-9999'
                            placeholder="(99) 99999-9999"
                            value={phone}
                            onChange={handleChange(e => setPhone(e.target.value))}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Plano</Form.Label>
                          <Form.Select id="formPlan" aria-label="Selecione o plano" value={plan} onChange={handleChange(e => setPlan(e.target.value))}>
                            <option value='0'>Selecione uma opção</option>
                            <option value='1'>Inicial - R$ 9,99/mês</option>
                            <option value='2'>Essencial - R$ 19,99/mês</option>
                            <option value='3'>Completo - R$ 49,99/mês</option>
                            <option value='4'>Profissional - R$ 89,99/mês</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Button onClick={handleSubmit} disabled={loading} className='mt-3' style={{ fontSize: '18px', backgroundColor: 'var(--ring)', border: 'none', width: '100%' }}>
                          {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            ENVIANDO...
                          </>
                        ) : (
                          "ENVIAR"
                        )}
                        </Button>
                        <Alert variant="danger" className='mt-3 text-center' style={{ display: error ? 'block' : 'none' }}>
                          <b>Ops!</b> Ocorreu um problema ao enviar seu cadastro. Por favor, tente novamente.
                        </Alert>
                        <Alert variant="success" className='mt-3 text-center' style={{ display: success ? 'block' : 'none' }}>
                          <div>
                            <b>Cadastro enviado com sucesso!</b>
                          </div>
                          <div>
                            Em breve entraremos em contato.
                          </div>
                        </Alert>
                      </Col>
                    </Row>
                  </Form>
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