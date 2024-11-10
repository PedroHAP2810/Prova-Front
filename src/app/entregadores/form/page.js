'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function EntregadorFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/entregadores');
  };

  // Busca a lista de cursos para usar no select
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []

  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const entregadores = JSON.parse(localStorage.getItem('entregadores')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista a faculdade com o ID recebido no parametro
  const entregadorEditado = entregadores.find(item => item.id == id)
  console.log(entregadorEditado)


  // função para salvar os dados do form
  function salvar(dados) {
    // Se professorEditado existe, mudar os dados e gravar no localStorage
    if (entregadorEditado) {
      Object.assign(entregadorEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('entregadores', JSON.stringify(entregadores))
    } else {
      // se clienteEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona a nova faculdade na lista de faculdades
      entregadores.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('entregadores', JSON.stringify(entregadores))
    }

    alert("Entregador criado com sucesso!")
    router.push("/entregadores")
  }


  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: '',
    cpf: '',
    cnh: '',
    sexo: '',
    dataNascimento: '',
    endereco: '',
    veiculo: '',
    telefone: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    cnh: Yup.string().required("Campo obrigatório"),
    sexo: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    veiculo: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Entregadores"}>

      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de professorEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={entregadorEditado || initialValues}
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
                      value={values.sexo}
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
                    <Form.Label>CNH:</Form.Label>
                    <Form.Control
                      name='cnh'
                      type='text'
                      value={values.cnh}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.cnh && !errors.cnh}
                      isInvalid={touched.cnh && errors.cnh}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.cnh}</Form.Control.Feedback>
                  </Form.Group>

                  
                  <Form.Group as={Col}>
                    <Form.Label>Endereco:</Form.Label>
                    <Form.Control
                      name='endereco'
                      type='text'
                      value={values.endereco}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.endereco && !errors.endereco}
                      isInvalid={touched.endereco && errors.endereco}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Veículo:</Form.Label>
                    <Form.Select
                      name='veiculo'
                      value={values.veiculos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.veiculo && !errors.veiculo}
                      isInvalid={touched.veiculo && errors.veiculo}
                    >
                      <option value=''>Selecione</option>
                      <option value="Carro Hatch">Carro Hatch</option>
                      <option value="Carro Sedan">Carro Sedan</option>
                      <option value="Moto">Moto</option>
                      <option value="Moto com Bau">Moto com Baú</option>
                      <option value="Bicicleta">Bicicleta</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.veiculo}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={6}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  mask={"(99)99999-9999"}
                  placeholder='(99)99999-9999'
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && !!errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>  
              </Form.Group>
                </Row>



                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2'  onClick={handleBackClick}><FaArrowLeft /> Voltar</Button>
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