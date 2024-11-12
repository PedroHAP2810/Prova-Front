'use client'

import Pagina from '@/components/Pagina'
import apiLocalidades from '@/services/apiLocalidades'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'


export default function FilialFormPage(props) {

  
  const router = useRouter()

  
  const [paises, setPaises] = useState([])
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])

  
  const filiais = JSON.parse(localStorage.getItem('filiais')) || []

  
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  
  const filialEditada = filiais.find(item => item.id == id)
  console.log(filialEditada)


  
  useEffect(() => {
    // buscar os paises da api
    apiLocalidades.get('/paises').then(response => {
      console.log("paises >>> ", response.data)
      setPaises(response.data)
    })

    apiLocalidades.get("estados?orderBy=nome").then(response => {
      console.log("estados >>> ", response.data)
      setEstados(response.data)
    })

  }, [])

  
  function salvar(dados) {
    
    if(filialEditada){
      Object.assign(filialEditada, dados)
      
      localStorage.setItem('filiais', JSON.stringify(filiais))
    } else {
      
      dados.id = v4()
      
      filiais.push(dados)
      
      localStorage.setItem('filiais', JSON.stringify(filiais))
    }

    alert("Filial criada com sucesso!")
    router.push("/filiais")
  }

  
  const initialValues = {
    nome: '',
    pais: 'Brasil',
    estado: '',
    cidade: '',
    endereco: '',
    gerente: '',
    telefone: '',
    horario: '',
  }

  
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    gerente: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    horario: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Filiais"}>

      {/* Formulário */}

      <Formik
        
        initialValues={filialEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
        
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {

           

            useEffect(() => {
              console.log("Mexeu no estado >>>")
              if (values.estado !== '') {
                apiLocalidades.get(`/estados/${values.estado}/municipios`).then(response => {
                  console.log("cidades >>>", response.data)
                  setCidades(response.data)
                })
              }
            }, [values.estado])


           
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
                    <Form.Label>Pais:</Form.Label>
                    <Form.Select
                      name='pais'
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.pais && !errors.pais}
                      isInvalid={touched.pais && errors.pais}
                    >
                      <option value="">Selecione</option>
                      {paises.map(pais => <option value={pais.nome}>{pais.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.pais}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Estado:</Form.Label>
                    <Form.Select
                      name='estado'
                      value={values.estado}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== 'Brasil'}
                      isValid={touched.estado && !errors.estado}
                      isInvalid={touched.estado && errors.estado}
                    >
                      <option value="">Selecione</option>
                      {estados.map(estado => <option value={estado.sigla}>{estado.sigla}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.estado}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Select
                      name='cidade'
                      value={values.cidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.pais !== 'Brasil'}
                      isValid={touched.cidade && !errors.cidade}
                      isInvalid={touched.cidade && errors.cidade}
                    >
                      <option value="">Selecione</option>
                      {cidades.map(cidade => <option value={cidade.nome}>{cidade.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cidade}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Gerente:</Form.Label>
                    <Form.Control
                      name='gerente'
                      type='text'
                      value={values.gerente}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.gerente && !errors.gerente}
                      isInvalid={touched.gerente && errors.gerente}
                    >
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>{errors.gerente}</Form.Control.Feedback>
                  </Form.Group>

                <Form.Group as={Col} md={3}>
                <Form.Label>Telefone da Filial:</Form.Label>
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

              <Form.Group as={Col} md={6}>
                <Form.Label>Horário de funcionamento:</Form.Label>
                <Form.Control
                  mask={"7 às 22h"}
                  placeholder='7 às 22h'
                  name='horario'
                  type='text'
                  value={values.horario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.horario && !errors.horario}
                  isInvalid={touched.horario && !!errors.horario}
                />
                <Form.Control.Feedback type='invalid'>{errors.horario}</Form.Control.Feedback>  
              </Form.Group>

                </Row>

                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/filiais'><FaArrowLeft /> Voltar</Button>
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