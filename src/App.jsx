import styled,{ThemeProvider} from 'styled-components'
import { GlobalStyles, MyRoutes, Sidebar, useThemeStore} from './index'
import { Device } from './styles/breakpoints'
import { useState } from 'react';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {themeStyle} = useThemeStore();

  return (
    <ThemeProvider theme={themeStyle}>
     <Container>
      <GlobalStyles /> 
      <section className='contentSidebar'>
        <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)}/>

      </section>
      <section className='contentMenuambur'>Hamburguesa</section>
      <section className='contentRouters'> <MyRoutes /></section>
      </Container>
    </ThemeProvider>

    

   
  )
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: black;
  .contentSidebar{
    display: none;
    background-color: rgba(255, 0, 0, 0.5);

  }

  .contentMenuambur{
    position: absolute;
    background-color: rgba(185, 33, 41, 0.493);


  }

  .contentRouters{
    background-color: rgb(253, 0, 253);
    grid-column: 1;
    width: 100%;

  }

  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    .contentSidebar{
      display: initial;
    }
    .contentMenuambur{
      display: none;

  }  .contentRouters{
    grid-column: 2;

  }
    
  }


  
`
export default App
