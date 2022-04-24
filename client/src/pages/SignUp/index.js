import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

function SignUp() {
    const navigate = useNavigate()
    const [cadastro, setCadastro] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!cadastro.nome || !cadastro.email || !cadastro.senha || !cadastro.confirmarSenha) return alert("Preencha todos os campos")
            if (cadastro.senha !== cadastro.confirmarSenha) {
                limparInput()
                return alert("Senhas não conferem")
            }

            await api.post('/usuario', {
                nome: cadastro.nome,
                email: cadastro.email,
                senha: cadastro.senha
            })
            navigate('/')
        } catch (error) {
            limparInput()
            alert(error.response.data.mensagem)
        }
    }

    function limparInput() {
        setCadastro({
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        })
    }

    return (
        <div className="signUp">
            <img src={logo} alt='logo' />
            <div className='signUp-form'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>Cadastre-se</h2>
                    <label htmlFor='nome'>Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name='nome'
                        value={cadastro.nome}
                        onChange={(e) => setCadastro({ ...cadastro, [e.target.name]: e.target.value })}
                        required
                    />
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={cadastro.email}
                        onChange={(e) => setCadastro({ ...cadastro, [e.target.name]: e.target.value })}
                        required
                    />
                    <label htmlFor='senha'>Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name='senha'
                        value={cadastro.senha}
                        onChange={(e) => setCadastro({ ...cadastro, [e.target.name]: e.target.value })}
                        required
                    />
                    <label htmlFor='confirmarSenha'>Confirmar senha</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name='confirmarSenha'
                        value={cadastro.confirmarSenha}
                        onChange={(e) => setCadastro({ ...cadastro, [e.target.name]: e.target.value })}
                        required
                    />
                    <button>Confirmar</button>
                    <p>Já tem cadastro? <Link to='/'>Clique aqui</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;