import './style.css';
import { AiFillDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import {VscTriangleUp, VscTriangleDown} from 'react-icons/vsc';
import { useState, useContext } from "react";
import { UpdateContext } from '../../contexts/UpdateContext';
import formatarData from '../../utils/formatDate';
import api from '../../services/api';
import Form from '../FormRegistry';

function Card() {
    const { atualizar, setAtualizar, infos, setNomeCard, setEditar } = useContext(UpdateContext)
    const [abrirForm, setAbrirForm] = useState(false)
    const [ordenarData, setOrdenarData] = useState(false)
    const [abrirDelete, setAbrirDelete] = useState('')

    async function deletarFinancas(id) {
        await api.delete(`/transacao/${id}`)
        setAtualizar(!atualizar)
    }

    function editarFinancas(info) {
        setEditar(info)
        setAtualizar(!atualizar)
        setAbrirForm(!abrirForm)
        setNomeCard('Editar')
    }

    function orderByDate() {
        infos.sort((a, b)=>{
            const dataA = new Date(formatarData(a.data))
            const dataB = new Date(formatarData(b.data))

            return !ordenarData ? +dataA - +dataB : +dataB - +dataA
        })
        setOrdenarData(!ordenarData)
    }

    return (
        <div className='container-card'>
            <div className='container-card-info'>
                <div className='btn-date cursor' onClick={() => orderByDate()}>
                    <h3>Data</h3>
                    {ordenarData ? <VscTriangleUp className='triagulo' /> : <VscTriangleDown className='triagulo' />}
                </div>
                <h3>Dia da semana</h3>
                <h3>Descrição</h3>
                <h3>Categoria</h3>
                <h3>Valor</h3>
                <h3></h3>
            </div>
            {infos.map((info, index) => (
                <div key={index} className='container-card-valores linha-horizontal-bottom icon'>
                    <>
                        <p>{info.data}</p>
                        <p>{info.diaSemana}</p>
                        <p>{info.descricao}</p>
                        <p>{info.categoria}</p>
                        <p style={{ color: info.tipo === 'entrada' ? "#645ffb" : "#fa8c10" }}>R$ {(info.valor / 100).toFixed(2).replace('.', ',')}</p>
                        < div className='icons'>
                            <GrEdit
                                className='cursor btn-editar'
                                onClick={() => editarFinancas(info)}
                            />
                            <AiFillDelete
                                className='cursor icon-color'
                                onClick={() => !abrirDelete ? setAbrirDelete(info.id) : setAbrirDelete(false) }
                            />
                        </div>
                        {abrirDelete === info.id && <div className='card-apagar'>
                            <p>Apagar item?</p>
                            <div>
                                <span className='btn-apagar-sim cursor' onClick={() => deletarFinancas(info.id)}>SIM</span>
                                <span className='btn-apagar-nao cursor' onClick={() => setAbrirDelete(false)}>NÃO</span>
                            </div>
                        </div>}
                    </>
                </div>
            ))}
            {abrirForm && <Form
                setAbrirForm={setAbrirForm}
            />}
        </div>
    )
}

export default Card;