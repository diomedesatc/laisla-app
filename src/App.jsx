import styled from 'styled-components'
import { GlobalStyles } from './index'
import { Device } from './styles/breakpoints'
function App() {

  return (
    <Container>
     <GlobalStyles /> 
     <section className='contentSidebar'>Sidebar</section>
     <section className='contentMenuambur'>Hamburguesa</section>
     <section className='contentRouters'>Rutas</section>

    </Container>

   
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
    background-color: rgb(255, 249, 255);
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
