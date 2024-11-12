'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ProdutosPage() {

  const [produtos, setProdutos] = useState([])

  const formatarValor = (valor) => {
    const valorNumerico = valor.replace(/\D/g, ''); 

    if (valorNumerico) {
  
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valorNumerico / 100);  // Divide por 100 para simular centavos
    }

    return 'R$ 0,00'; 
  };


  
  useEffect(() => {
  
    const produtosLocalStorage = JSON.parse(localStorage.getItem("produtos")) || []
  
    setProdutos(produtosLocalStorage)
    console.log(produtosLocalStorage)
  }, [])

  

  
  function excluir(produto) {
    
    if (window.confirm(`Deseja realmente excluir o produto ${produto.nome}?`)) {
      
      const novaLista = produtos.filter(item => item.id !== produto.id)
      
      localStorage.setItem('produtos', JSON.stringify(novaLista))
      
      setProdutos(novaLista)
      alert("Produto excluído com sucesso!")
    }
  }




  return (
    <Pagina titulo={"Lista de Produtos"}>
      <div className='text-end mb-2'>
        <Button href='/produtos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Produtos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Fabricante</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data de Validade</th>
            <th>Fornecedor</th>
            <th>Lote</th>
            <th>Gramatura</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => {
            return (
              <tr>
                <td>{produto.nome}</td>
                <td>{produto.fabricante}</td>
                <td>{formatarValor(produto.valor)}</td>
                <td>{produto.categoria}</td>
                <td>{produto.dataValidade}</td>
                <td>{produto.fornecedor}</td>
                <td>{produto.lote}</td>
                <td>{produto.gramatura}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/produtos/form?id=${produto.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(produto)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}