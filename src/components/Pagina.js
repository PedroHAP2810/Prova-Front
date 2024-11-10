'use client'

import { Container, Nav, Navbar } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
    
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Pagina Inicial</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/filiais">Filiais</Nav.Link>
          <Nav.Link href="/produtos">Produtos</Nav.Link>           
          <Nav.Link href="/funcionarios">Funcionários</Nav.Link>
          <Nav.Link href="/entregadores">Entregadores</Nav.Link>
          <Nav.Link href="/clientes">Clientes</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar>

      
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}