'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FilialPage() {

  const [filiais, setFiliais] = useState([])

  
  useEffect(() => {
    
    const filiaisLocalStorage = JSON.parse(localStorage.getItem("filiais")) || []
    
    setFiliais(filiaisLocalStorage)
    console.log(filiaisLocalStorage)
  }, [])

  
  function excluir(filial) {
    
    if (window.confirm(`Deseja realmente excluir a filial ${filial.nome}?`)) {
      
      const novaLista = filiais.filter(item => item.id !== filial.id)
      
      localStorage.setItem('filiais', JSON.stringify(novaLista))
      
      setFiliais(novaLista)
      alert("Filial excluída com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Filiais"}>
      <div className='text-end mb-2'>
        <Button href='/filiais/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com as Filiais */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>País</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Gerente</th>
            <th>Telefone</th>
            <th>Horário de funcionamento</th>
          </tr>
        </thead>
        <tbody>
          {filiais.map(filial => {
            return (
              <tr>
                <td>{filial.nome}</td>
                <td>{filial.endereco}</td>
                <td>{filial.pais}</td>
                <td>{filial.estado}</td>
                <td>{filial.cidade}</td>
                <td>{filial.gerente}</td>
                <td>{filial.telefone}</td>
                <td>{filial.horario}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/filiais/form?id=${filial.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(filial)}><FaTrash /></Button>

                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}