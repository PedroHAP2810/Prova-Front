'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'


export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([])

  
  useEffect(() => {
    
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    
    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])

  
  function excluir(funcionario) {
    
    if (window.confirm(`Deseja realmente excluir o funcionario ${funcionario.nome}?`)) {
     
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
     
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
      
      setFuncionarios(novaLista)
      alert("Funcionário excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Funcionários"}>
      <div className='text-end mb-2'>
        <Button href='/funcionarios/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Funcionários */}
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