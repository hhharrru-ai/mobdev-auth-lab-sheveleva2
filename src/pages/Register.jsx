import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { api } from '../api/api'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setSession } = useUserStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== password2) {
            setError('Пароли не совпадают')
            return
        }

        setLoading(true)
        try {
            const data = await api.register(username, email, password)

            if (data.token) {
                setSession({ token: data.token, user: data.user })
                localStorage.setItem('token', data.token)
                navigate('/')
            } else {
                setError(data.message || 'Ошибка при регистрации')
            }
        } catch (err) {
            setError('Ошибка соединения с сервером')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">👤 
 
</div>
                    <h1 className="auth-title">Регистрация</h1>
                    <p className="auth-subtitle">Создайте новый аккаунт</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form id="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            minLength="3"
                            required
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="form-hint">Минимум 3 символа</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Email <span className="optional">(необязательно)</span>
                        </label>
                        <Input
                            type="email"
                            className="form-input"
                            name="email"
                            placeholder="example@email.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            minLength="6"
                            required
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
<div className="form-hint">Минимум 6 символов</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Подтверждение пароля</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password2"
                            placeholder="Повторите пароль"
                            required
                            autoComplete="new-password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    <p>
                        <Link to={'/login'}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register