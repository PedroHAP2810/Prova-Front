'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ClienteFormPage(props) {


  const router = useRouter()

  const handleBackClick = () => {
    router.push('/clientes');
  };

  
  const convenios = JSON.parse(localStorage.getItem('convenios')) || []

  
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  
  const clienteEditado = clientes.find(item => item.id == id)
  console.log(clienteEditado)


  
  function salvar(dados) {
    
    if (clienteEditado) {
      Object.assign(clienteEditado, dados)
      
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
            dados.id = v4()
      
      clientes.push(dados)
      
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }

    alert("Cliente criado com sucesso!")
    router.push("/clientes")
  }


    const initialValues = {
    nome: '',
    cpf: '',
    rg: '',
    sexo: '',
    dataNascimento: '',
    endereco: '',
    convenio: '',
    telefone: '',
  }

 
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cpf: Yup.string().required("Campo obrigatório"),
    rg: Yup.string().required("Campo obrigatório"),
    sexo: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    convenio: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Clientes"}>

      {/* Formulário */}

      <Formik
        
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

           
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
                    <Form.Label>RG:</Form.Label>
                    <Form.Control
                      name='rg'
                      type='text'
                      value={values.rg}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.rg && !errors.rg}
                      isInvalid={touched.rg && errors.rg}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.rg}</Form.Control.Feedback>
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
                    <Form.Label>Convenio:</Form.Label>
                    <Form.Select
                      name='convenio'
                      value={values.convenios}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.convenio && !errors.convenio}
                      isInvalid={touched.convenio && errors.convenio}
                    >
                      <option value=''>Selecione</option>
                      <option value="Acesso Saude">Acesso Saúde</option>
                      <option value="Cartão de Todos">Cartão de Todos</option>
                      <option value="Cassi">Cassi</option>
                      <option value="GEAP">GEAP</option>
                      <option value="Preferencial Drogasil">Preferencial Drogasil</option>
                      <option value="Quallity">Quallity</option>
                      <option value="Saúde Caixa">Saúde Caixa</option>
                      <option value="Unimed">Unimed</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.convenio}</Form.Control.Feedback>
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