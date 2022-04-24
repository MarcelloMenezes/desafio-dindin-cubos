import { useState, useEffect} from 'react';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import usuario from '../../assets/usuario.svg';
import sair from '../../assets/sair.svg';
import api from '../../services/api';
import './style.css';

function Header() {
    const navigate = useNavigate()
    const [editarPerfil, setEditarPerfil] = useState(false)
    const [infoUsuario, setInfoUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    })

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/usuario`);
            setInfoUsuario({
                ...infoUsuario,
                nome: response.data.nome,
                email: response.data.email,
                senha: '',
                confirmarSenha: ''
            })
        }
        fetchData();
    }, [editarPerfil])

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            if (!infoUsuario.nome || !infoUsuario.email || !infoUsuario.senha || !infoUsuario.confirmarSenha) return alert("Preencha todos os campos")
            if (infoUsuario.senha !== infoUsuario.confirmarSenha) return alert("Senhas não conferem")
        
            await api.put('/usuario', {
                nome: infoUsuario.nome,
                email: infoUsuario.email,
                senha: infoUsuario.senha
            })

            setEditarPerfil(!editarPerfil)
        } catch (error) {
            alert(error.response.data.mensagem)
        }
    }
    
    function editarUsuario(e) {
        setEditarPerfil(!editarPerfil)
        setInfoUsuario({
            ...infoUsuario,
            nome: infoUsuario.nome,
            email: infoUsuario.email,
            [e.target.name]: [e.target.value]
        })
    }

    function paginaIncial() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <header className='flex-between'>
            <img src={logo} alt='logo' />
            <div className='flex-center'>
                <img src={usuario} alt='usuario' className='cursor' onClick={(e) => editarUsuario(e)} />
                <p className='header-usuario'>{infoUsuario.nome}</p>
                <img src={sair} alt='sair' className='cursor' onClick={() => paginaIncial()} />
            </div>
            {editarPerfil && <div className='modal-editar'>
                <div className='modal-editar-usuario'>
                    <h2>Editar Perfil</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <GrClose className='modal-close cursor' onClick={() => setEditarPerfil(!editarPerfil)} />
                        <label htmlFor='nome'>Nome</label>
                        <input 
                        type='text' 
                        id='nome'
                        name='nome'
                        value={infoUsuario.nome}
                        onChange={(e) => setInfoUsuario({ ...infoUsuario, [e.target.name]: e.target.value })}
                        required
                        />
                        <label htmlFor='email'>E-mail</label>
                        <input 
                        type='email' 
                        id='email'
                        name='email'
                        value={infoUsuario.email}
                        onChange={(e) => setInfoUsuario({ ...infoUsuario, [e.target.name]: e.target.value })}
                        required
                        />
                        <label htmlFor='senha'>Senha</label>
                        <input 
                        type='password' 
                        id='senha' 
                        name='senha'
                        value={infoUsuario.senha}
                        onChange={(e) => setInfoUsuario({ ...infoUsuario, [e.target.name]: e.target.value })}
                        required
                        />
                        <label htmlFor='confirmarSenha'>Confirmar senha</label>
                        <input 
                        type='password' 
                        id='confirmarSenha'
                        name='confirmarSenha'
                        value={infoUsuario.confirmarSenha}
                        onChange={(e) => setInfoUsuario({ ...infoUsuario, [e.target.name]: e.target.value })}
                        required
                        />
                        <button className='modal-btn-confirmar'>Confirmar</button>
                    </form>
                </div>
            </div>}
        </header>
    )
}

export default Header;