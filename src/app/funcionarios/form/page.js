'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FuncionarioFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de cursos para usar no select
  const cargos = JSON.parse(localStorage.getItem('cargos')) || []

  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista a faculdade com o ID recebido no parametro
  const funcionarioEditado = funcionarios.find(item => item.id == id)
  console.log(funcionarioEditado)


  // função para salvar os dados do form
  function salvar(dados) {
    // Se professorEditado existe, mudar os dados e gravar no localStorage
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    } else {
      // se professorEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona a nova faculdade na lista de faculdades
      professores.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    }

    alert("Funcionario criado com sucesso!")
    router.push("/funcionarios")
  }


  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: '',
    cpf: '',
    matricula: '',
    sexo: '',
    dataNascimento: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    sexo: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    situacao: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Funcionario"}>

      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de professorEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={funcionarioEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})


            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                      name='cpf'
                      type='text'
                      value={values.cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cpf && !errors.cpf}
                      isInvalid={touched.cpf && errors.cpf}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sexo:</Form.Label>
                    <Form.Select
                      name='sexo'
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.sexo && !errors.sexo}
                      isInvalid={touched.sexo && errors.sexo}
                    >
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.sexo}</Form.Control.Feedback>
                    </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Data de Nascimento:</Form.Label>
                    <Form.Control
                      name='dataNascimento'
                      type='date'
                      value={values.dataNascimento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataNascimento && !errors.dataNascimento}
                      isInvalid={touched.dataNascimento && errors.dataNascimento}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Matricula:</Form.Label>
                    <Form.Control
                      name='matricula'
                      type='text'
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && errors.matricula}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Situação:</Form.Label>
                    <Form.Select
                      name='situacao'
                      value={values.situacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.situacao && !errors.situacao}
                      isInvalid={touched.situacao && errors.situacao}
                    >
                      <option value=''>Selecione</option>
                      <option value="Trabalhando">Trabalhando</option>
                      <option value="Férias">Férias</option>
                      <option value="Atestado">Atestado</option>
                      <option value="Licença">Licença</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.situacao}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cargo:</Form.Label>
                    <Form.Select
                      name='cargo'
                      value={values.cargos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cargo && !errors.cargo}
                      isInvalid={touched.cargo && errors.cargo}
                    >
                      <option value=''>Selecione</option>
                      <option value="Auxiliar de Loja">Auxiliar de Loja</option>
                      <option value="Auxiliar de Serviços Gerais">Auxiliar de Serviços Gerais</option>
                      <option value="Atendente I">Atendente I</option>
                      <option value="Atendente II">Atendente II</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Farmaceutico">Farmaceutico</option>
                      <option value="Consultor de Beleza">Consultor de Beleza</option>
                      <option value="Gerente">Gerente</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cargo}</Form.Control.Feedback>
                  </Form.Group>
                </Row>



                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/funcionarios'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>



              </Form>
            )

          }
        }
      </Formik>

    </Pagina>
  )
}