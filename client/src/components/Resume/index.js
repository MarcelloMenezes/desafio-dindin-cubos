import { useState, useContext } from 'react';
import { UpdateContext } from '../../contexts/UpdateContext';
import Form from '../FormRegistry';
import './style.css';

function Resume() {
    const { valores, setNomeCard, setFormTransacoes, setEntrada } = useContext(UpdateContext)
    const [abrirForm, setAbrirForm] = useState(false)

    function adicionarRegistro() {
        setNomeCard('Adicionar')
        setAbrirForm(!abrirForm)
        setFormTransacoes({
            valor: '',
            categoria: '',
            data: '',
            descricao: ''
        })
        setEntrada(true)
    }
    return (
        <div className='container-resume'>
            <div className='container-resume-usuario'>
                <h2>Resumo</h2>
                <div className='flex-between'>
                    <p>Entradas</p>
                    <p className='cor-entrada'>R$ {valores.entrada}</p>
                </div>
                <div className='flex-between container-resume-usuario-saida'>
                    <p>Saídas</p>
                    <p className='cor-saida'> R$ {valores.saida}</p>
                </div>
                <div className='linha-horizontal-bottom'></div>
                <div className='flex-between container-resume-usuario-saldo'>
                    <p><strong>Saldo</strong></p>
                    <p className='cor-saldo'>R$ {valores.saldo}</p>
                </div>
            </div>
            <button onClick={() => adicionarRegistro()}>Adicionar Registro</button>
            {abrirForm && <Form
                setAbrirForm={setAbrirForm}
            />}
        </div>
    )
}

export default Resume