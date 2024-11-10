'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FilialPage() {

  const [filiais, setFiliais] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const filiaisLocalStorage = JSON.parse(localStorage.getItem("filiais")) || []
    // guarda a lista no estado faculdades
    setFiliais(filiaisLocalStorage)
    console.log(filiaisLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(filial) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir a filial ${filial.nome}?`)) {
      // filtra a lista antiga removando a faculdade recebida
      const novaLista = filiais.filter(item => item.id !== filial.id)
      // grava no localStorage a nova lista
      localStorage.setItem('filiais', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setFiliais(novaLista)
      alert("Filial excluída com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Filiais"}>
      <div className='text-end mb-2'>
        <Button href='/filiais/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com as faculdades */}
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