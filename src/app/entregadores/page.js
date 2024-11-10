'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function EntregadoresPage() {

  const [entregadores, setEntregadores] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const entregadoresLocalStorage = JSON.parse(localStorage.getItem("entregadores")) || []
    // guarda a lista no estado
    setEntregadores(entregadoresLocalStorage)
    console.log(entregadoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(entregador) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o entregador ${entregador.nome}?`)) {
      // filtra a lista antiga removando o professor recebido
      const novaLista = entregadores.filter(item => item.id !== entregador.id)
      // grava no localStorage a nova lista
      localStorage.setItem('entregadores', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setEntregadores(novaLista)
      alert("Entregador excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Entregadores"}>
      <div className='text-end mb-2'>
        <Button href='/entregadores/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Professores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>CNH</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Endereço</th>
            <th>Veículo</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {entregadores.map(entregador => {
            return (
              <tr>
                <td>{entregador.nome}</td>
                <td>{entregador.cpf}</td>
                <td>{entregador.cnh}</td>
                <td>{entregador.sexo}</td>
                <td>{entregador.dataNascimento}</td>
                <td>{entregador.endereco}</td>
                <td>{entregador.veiculo}</td>
                <td>{entregador.telefone}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/entregadores/form?id=${entregador.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(entregador)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}