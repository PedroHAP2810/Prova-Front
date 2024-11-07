'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const filiais = JSON.parse(localStorage.getItem("filiais")) || []
  const produtos = JSON.parse(localStorage.getItem("produtos")) || []
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []
  const entregadores = JSON.parse(localStorage.getItem("entregadores")) || []
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []

  const lista = [
    {
      nome: "Filial",
      imagem: "https://www.sindipublicos.com.br/wp-content/uploads/2022/02/drogasil-site.jpg", quantidade: filiais.length,
      link: "/filial"
    },
    {
      nome: "Produtos",
      imagem: "https://ictq.com.br/images/Redes_de_farm%C3%A1cias_registram_retra%C3%A7%C3%A3o_de_22_em_abril.jpg", quantidade: produtos.length,
      link: "/produto"
    },
    {
      nome: "Funcionários",
      imagem: "https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia13814/funcao-social-farmacias-farmaceuticos-dicas-cursos-cpt.jpg", quantidade: funcionarios.length,
      link: "/funcionario"
    },
    {
      nome: "Entregadores",
      imagem: "https://www.designi.com.br/images/preview/10102082.jpg", quantidade: entregadores.length,
      link: "/entregador"
    },
    {
      nome: "Clientes",
      imagem: "https://www.triersistemas.com.br/blog/wp-content/uploads/2020/08/passos-para-fidelizar-cliente-triersistemas.jpg", quantidade: clientes.length,
      link: "/cliente"
    },
  ]



  return (
    <Pagina titulo={"Projeto Farmácias"}>
      <Row md={5}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}