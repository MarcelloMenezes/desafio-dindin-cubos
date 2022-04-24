import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import formatarData from '../utils/formatDate';
import formatarNumero from '../utils/formatNumber';

export const UpdateContext = createContext()

export function UpdateContextProvider({ children }) {
    const [atualizar, setAtualizar] = useState(false);
    const [entrada, setEntrada] = useState(true)
    const [editar, setEditar] = useState([])
    const [infos, setInfos] = useState([])  
    const [nomeCard, setNomeCard] = useState()
    const [formTransacoes, setFormTransacoes] = useState({
        valor: '',
        categoria: '',
        data: '',
        descricao: ''
    })
    const [valores, setValores] = useState({
        entrada: "0,00",
        saida: "0,00",
        saldo: "0,00"
    })

    useEffect(() => {
        async function fetchData() {
            const { data: { financas } } = await api.get(`/transacao`)
            setInfos(financas)
            
            const { data: { entrada: [{ sum: valorEntrada }], saida: [{ sum: valorSaida }] } } = await api.get(`/transacoes/extrato`)

            setValores({
                "entrada": formatarNumero(valorEntrada),
                "saida": formatarNumero(valorSaida),
                "saldo": formatarNumero(valorEntrada - valorSaida)
            })
            
            if (nomeCard === 'Editar') {
                setEntrada(editar.tipo === "entrada" ? true : false )
                setFormTransacoes({
                    ...formTransacoes,
                    valor: (editar.valor / 100).toFixed(2),
                    categoria: editar.categoria,
                    data: formatarData(editar.data),
                    descricao: editar.descricao
                })
            }
        }
        fetchData();
    }, [atualizar])

    return (
        <UpdateContext.Provider value={{atualizar, setAtualizar, infos, valores, nomeCard, setNomeCard, editar, setEditar, entrada, setEntrada, formTransacoes, setFormTransacoes}}>
            {children}
        </UpdateContext.Provider>
    )
}