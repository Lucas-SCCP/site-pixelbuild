import { useEffect, useState } from 'react'
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
    <Router>
      <Routes>
        <Route element={<MainLayout website={website} />}>
          {website.pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={
                <PageRenderer
                  website={website}
                  page={page}
                />
              }
            />
          ))}
        </Route>
      </Routes>
    </Router>
  )
}

export default App