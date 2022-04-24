import { useState, useEffect, useContext } from 'react'
import { UpdateContext } from '../../contexts/UpdateContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

function SignIn() {
    const { atualizar, setAtualizar} = useContext(UpdateContext)
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: '',
        senha: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) return navigate('/main')
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!login.email || !login.senha) return alert('Preencha todos os campos!')
            
            const response = await api.post('/login', {
                email: login.email,
                senha: login.senha
            })
            
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.usuario.id)
            
            setAtualizar(!atualizar)
            document.location.assign('/main')
        } catch (error) {
            setLogin({
                email: '',
                senha: ''
            })
            alert(error.response.data.mensagem)
        }
    }

    return (
        <div className="signIn">
            <img src={logo} alt='logo' />
            <div className='flex signIn-card' >
                <div className='signIn-card-informacoes'>
                    <div className='signIn-card-informacoes-dindin'>
                        <h1>Controle suas <b className='nome-financas'>finanças</b>, sem planilha chata.</h1>
                        <p>.Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                        <Link to='/sign-up'><button>Cadastre-se</button></Link>
                    </div>
                </div>
                <div className='signIn-card-form'>
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={login.email}
                            onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
                            required
                        />
                        <label htmlFor='senha'>Senha</label>
                        <input
                            type='password'
                            id='senha'
                            name='senha'
                            value={login.senha}
                            onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })}
                            required
                        />
                        <button>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;