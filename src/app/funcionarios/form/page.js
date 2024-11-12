'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { ReactInputMask } from 'react-input-mask'

export default function FuncionarioFormPage(props) {

  
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/funcionarios'); // Navega para '/funcionarios'
  };

  
  const cargos = JSON.parse(localStorage.getItem('cargos')) || []

  
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []

  
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  
  const funcionarioEditado = funcionarios.find(item => item.id == id)
  console.log(funcionarioEditado)


  
  function salvar(dados) {
    
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados)
      
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    } else {
      
      dados.id = v4()
      
      funcionarios.push(dados)
      
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    }

    alert("Funcionário criado com sucesso!")
    router.push("/funcionarios")
  }


  
  const initialValues = {
    nome: '',
    filial: '',
    matricula: '',
    sexo: '',
    dataNascimento: '',
    situacao: '',
    cargo: '',
    telefone: '',

  }

  
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    filial: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    sexo: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    situacao: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Funcionarios"}>

      {/* Formulário */}

      <Formik
        
        initialValues={funcionarioEditado || initialValues}
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
                    <Form.Label>Filial:</Form.Label>
                    <Form.Control
                      name='filial'
                      type='text'
                      value={values.filial}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.filial && !errors.filial}
                      isInvalid={touched.filial && errors.filial}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.filial}</Form.Control.Feedback>
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

                  <Form.Group as={Col} md={3}>
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

                  <Form.Group as={Col} md={6}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"(99) 99999-9999"}
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