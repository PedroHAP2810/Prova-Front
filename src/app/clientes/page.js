'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ClientesPage() {

  const [clientes, setClientes] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    // guarda a lista no estado
    setClientes(clientesLocalStorage)
    console.log(clientesLocalStorage)
  }, [])

  
  function excluir(cliente) {
    
    if (window.confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`)) {
      
      const novaLista = clientes.filter(item => item.id !== cliente.id)
      
      localStorage.setItem('clientes', JSON.stringify(novaLista))
      
      setClientes(novaLista)
      alert("Cliente excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Clientes"}>
      <div className='text-end mb-2'>
        <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
      </div>

      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Convenio</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => {
            return (
              <tr>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.rg}</td>
                <td>{cliente.sexo}</td>
                <td>{cliente.dataNascimento}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.convenio}</td>
                <td>{cliente.telefone}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/clientes/form?id=${cliente.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}