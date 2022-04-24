import { GrClose } from 'react-icons/gr';
import { useEffect, useState, useContext } from 'react';
import { UpdateContext } from '../../contexts/UpdateContext';
import api from '../../services/api';
import './style.css';

function Form({ setAbrirForm }) {
    const { atualizar, setAtualizar, nomeCard, editar, entrada, setEntrada, formTransacoes, setFormTransacoes } = useContext(UpdateContext)
    const [entradaValor, setEntradaValor] = useState([])
    const [saidaValor, setSaidaValor] = useState([])

    useEffect(() => {
        async function fetchData() {
            const { data: { categoriasEntrada, categoriasSaida } } = await api.get(`/categoria`);
            setEntradaValor(categoriasEntrada)
            setSaidaValor(categoriasSaida)
        }
        fetchData();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formTransacoes.valor || !formTransacoes.categoria || !formTransacoes.data) return alert('Preencha todos os campos')
        try {
            const valores = {
                descricao: formTransacoes.descricao ? formTransacoes.descricao : '-',
                valor: (formTransacoes.valor) * 100,
                data: formTransacoes.data,
                categoria: formTransacoes.categoria,
                tipo: entrada ? 'entrada' : 'saida'
            }

            nomeCard === 'Editar' ? await api.put(`/transacao/${editar.id}`, valores) : await api.post('/transacao', valores)
            setAbrirForm(false)
            setAtualizar(!atualizar)
        } catch (error) {
            alert(error.response.data.mensagem)
        }
    }

    return (
        <div className='modal'>
            <div className="modal-editar-adicionar">
                <h2>{nomeCard} Registro</h2>
                <div >
                    <button
                        className="btn-entrada"
                        onClick={() => setEntrada(true)}
                        style={{ background: entrada ? "#3A9FF1" : "#B9B9B9" }}>
                        Entrada
                    </button>
                    <button
                        className="btn-saida"
                        onClick={() => setEntrada(false)}
                        style={{ background: entrada ? "#B9B9B9" : "#FA8C10" }}>
                        Saída
                    </button>
                </div>
                <form className="modal-registro" onSubmit={handleSubmit}>
                    <GrClose className='modal-close cursor' onClick={() => setAbrirForm(false)} />
                    <label htmlFor='valor'>Valor</label>
                    <input
                        type='number'
                        id='valor'
                        name="valor"
                        value={formTransacoes.valor}
                        onChange={(e) => setFormTransacoes({ ...formTransacoes, [e.target.name]: e.target.value })}
                        required
                    />
                    <label htmlFor='categoria'>Categoria</label>
                    <select name="categoria" value={formTransacoes.categoria} onChange={(e) => setFormTransacoes({ ...formTransacoes, [e.target.name]: e.target.value })}>
                        <option value='' >SELECIONE</option>
                        {entrada ? entradaValor.map((entrada) => <option key={entrada.id} value={entrada.descricao}>{entrada.descricao}</option>) : saidaValor.map((saida) => <option key={saida.id} value={saida.descricao}>{saida.descricao}</option>)}
                    </select>
                    <label htmlFor='data'>Data</label>
                    <input
                        type='date'
                        id='data'
                        name="data"
                        value={formTransacoes.data}
                        onChange={(e) => setFormTransacoes({ ...formTransacoes, [e.target.name]: e.target.value })}
                        required
                    />
                    <label htmlFor='descricao'>Descrição</label>
                    <input
                        type='text'
                        id='descricao'
                        name="descricao"
                        value={formTransacoes.descricao}
                        onChange={(e) => setFormTransacoes({ ...formTransacoes, [e.target.name]: e.target.value })}
                    />
                    <button className='modal-btn-confirmar'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default Form;