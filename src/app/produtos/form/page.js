'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import Select from 'react-select'

export default function ProdutoFormPage(props) {

  
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/produtos');
  };

  
  const categoria = JSON.parse(localStorage.getItem('categoria')) || []

  
  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  
  const produtoEditado = produtos.find(item => item.id == id)
  console.log(produtoEditado)


  
  function salvar(dados) {
    
    if (produtoEditado) {
      Object.assign(produtoEditado, dados)
      
      localStorage.setItem('produtos', JSON.stringify(produtos))
    } else {
      
      dados.id = v4()
      
      produtos.push(dados)
      
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    alert("Produto criado com sucesso!")
    router.push("/produtos")
  }


  
  const initialValues = {
    nome: '',
    fabricante: '',
    valor: '',
    categoria: '',
    dataValidade: '',
    fornecedor: '',
    lote: '',
    gramatura: '',
  }

  
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    fabricante: Yup.string().required("Campo obrigatório"),
    valor: Yup.string().required("Campo obrigatório"),
    categoria: Yup.string().required("Campo obrigatório"),
    dataValidade: Yup.date().required("Campo obrigatório"),
    fornecedor: Yup.string().required("Campo obrigatório"),
    lote: Yup.string().required("Campo obrigatório"),
    gramatura: Yup.string().required("Campo obrigatório"),
  })

  const formatarValor = (valor) => {
    const valorNumerico = valor.replace(/\D/g, ''); // Remove tudo que não for número

    if (valorNumerico) {
      
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valorNumerico / 100);  // Divide por 100 para simular centavos
    }
  }

  const categoriaOptions = [
    { value: 'Medicamentos', label: 'Medicamentos' },
    { value: 'Fraldas', label: 'Fraldas' },
    { value: 'Perfumaria', label: 'Perfumaria' },
    { value: 'Alimentos', label: 'Alimentos' }
  ]
  return (
    <Pagina titulo={"Cadastro de Produtos"}>

      {/* Formulário */}

      <Formik
        
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
        
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {

            

            const handleValorChange = (e) => {
              const valorFormatado = e.target.value.replace(/[^\d,]/g, ''); // Remove caracteres não numéricos
              setFieldValue('valor', valorFormatado);  // Atualiza o valor sem formatação
            };
  
  
            
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
                    <Form.Label>Fabricante:</Form.Label>
                    <Form.Control
                      name='fabricante'
                      type='text'
                      value={values.fabricante}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.fabricante && !errors.fabricante}
                      isInvalid={touched.fabricante && errors.fabricante}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.fabricante}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Categoria:</Form.Label>
                    <Select
                      name="categoria"
                      options={categoriaOptions}
                      value={categoriaOptions.find(option => option.value === values.categoria)}
                      onChange={(selectedOption) => handleChange({ target: { name: 'categoria', value: selectedOption.value } })}
                      onBlur={handleBlur}
                      isValid={touched.categoria && !errors.categoria}
                      isInvalid={touched.categoria && errors.categoria}
                    ></Select>
                    <Form.Control.Feedback type='invalid'>{errors.categoria}</Form.Control.Feedback>
                    </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Data de Validade:</Form.Label>
                    <Form.Control
                      name='dataValidade'
                      type='date'
                      value={values.dataValidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataValidade && !errors.dataValidade}
                      isInvalid={touched.dataValidade && errors.dataValidade}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.dataValidade}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Valor:</Form.Label>
                    <Form.Control
                      name='valor'
                      type='text'
                      value={formatarValor(values.valor)}
                    onChange={handleValorChange} 
                      onBlur={handleBlur}
                      isValid={touched.valor && !errors.valor}
                      isInvalid={touched.valor && errors.valor}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
                  </Form.Group>

                  
                  <Form.Group as={Col}>
                    <Form.Label>Fornecedor:</Form.Label>
                    <Form.Control
                      name='fornecedor'
                      type='text'
                      value={values.fornecedor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.fornecedor && !errors.fornecedor}
                      isInvalid={touched.fornecedor && errors.fornecedor}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.fornecedor}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Lote:</Form.Label>
                    <Form.Control
                      name='lote'
                      value={values.lote}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.lote && !errors.lote}
                      isInvalid={touched.lote && errors.lote}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.lote}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md={6}>
                <Form.Label>Gramatura:</Form.Label>
                <Form.Control
                  mask={"200g"}
                  placeholder='200g'
                  name='gramatura'
                  type='text'
                  value={values.gramatura}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.gramatura && !errors.gramatura}
                  isInvalid={touched.gramatura && !!errors.gramatura}
                />
                <Form.Control.Feedback type='invalid'>{errors.gramatura}</Form.Control.Feedback>  
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