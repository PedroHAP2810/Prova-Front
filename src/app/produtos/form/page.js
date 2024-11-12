'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ProdutoFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  const handleBackClick = () => {
    router.push('/produtos');
  };

  // Busca a lista de cursos para usar no select
  const categoria = JSON.parse(localStorage.getItem('categoria')) || []

  // Buscar a lista de cursos no localStorage, se não existir, inicializa uma lista vazia
  const produtos = JSON.parse(localStorage.getItem('produtos')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  console.log(props.searchParams.id)
  // Buscar na lista a faculdade com o ID recebido no parametro
  const produtoEditado = produtos.find(item => item.id == id)
  console.log(produtoEditado)


  // função para salvar os dados do form
  function salvar(dados) {
    // Se professorEditado existe, mudar os dados e gravar no localStorage
    if (produtoEditado) {
      Object.assign(produtoEditado, dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('produtos', JSON.stringify(produtos))
    } else {
      // se clienteEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4()
      // Adiciona a nova faculdade na lista de faculdades
      produtos.push(dados)
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    alert("Produto criado com sucesso!")
    router.push("/produtos")
  }


  // Campos do form e valores iniciais(default)
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

  // Esquema de validação com Yup
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
      // Formatar como moeda com separador de milhar e centavos
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valorNumerico / 100);  // Divide por 100 para simular centavos
    }
  }
  return (
    <Pagina titulo={"Cadastro de Produtos"}>

      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de professorEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={produtoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {

            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            const handleValorChange = (e) => {
              const valorFormatado = e.target.value.replace(/[^\d,]/g, ''); // Remove caracteres não numéricos
              setFieldValue('valor', valorFormatado);  // Atualiza o valor sem formatação
            };
  
  
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
                    <Form.Select
                      name='categoria'
                      value={values.categoria}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.categoria && !errors.categoria}
                      isInvalid={touched.categoria && errors.categoria}
                    >
                      <option value="">Selecione</option>
                      <option value="Medicamentos">Medicamentos</option>
                      <option value="Fraldas">Fraldas</option>
                      <option value="Perfumaria">Perfumaria</option>
                      <option value="Alimentos">Alimentos</option>
                    </Form.Select>
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
                      value={formatarValor(values.valor)}  // Exibe o valor formatado
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