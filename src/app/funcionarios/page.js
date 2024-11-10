'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    // guarda a lista no estado
    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(funcionario) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o funcionario ${funcionario.nome}?`)) {
      // filtra a lista antiga removando o professor recebido
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
      // grava no localStorage a nova lista
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setFuncionarios(novaLista)
      alert("Funcionario excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Funcionarios"}>
      <div className='text-end mb-2'>
        <Button href='/funcionarios/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Professores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Filial</th>
            <th>Matricula</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Situação</th>
            <th>Cargo</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => {
            return (
              <tr>
                <td>{funcionario.nome}</td>
                <td>{funcionario.filial}</td>
                <td>{funcionario.matricula}</td>
                <td>{funcionario.sexo}</td>
                <td>{funcionario.dataNascimento}</td>
                <td>{funcionario.situacao}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.telefone}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/funcionarios/form?id=${funcionario.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}