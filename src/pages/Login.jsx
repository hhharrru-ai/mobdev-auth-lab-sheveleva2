import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch('https://api.kitek-pg.ru/api/marketplace/auth/login'
, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })

            const data = await response.json()

            if (response.ok && data.token) {
                localStorage.setItem('token', data.token)
                navigate('/')
            } else {
                setError(data.message || 'Неверное имя пользователя или пароль')
            }
        } catch (err) {
            setError('Ошибка соединения с сервером')
        }
    }

    return (
        <div className="container">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-icon">🔐 
 
</div>
                    <h1 className="auth-title">Вход</h1>
                    <p className="auth-subtitle">Войдите в свой аккаунт</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Имя пользователя</label>
                        <Input
                            type="text"
                            className="form-input"
                            name="username"
                            placeholder="Введите имя пользователя"
                            required
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <Input
                            type="password"
                            className="form-input"
                            name="password"
                            placeholder="Введите пароль"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="btn-submit">
                        Войти
                    </Button>
                </form>

                <div className="auth-divider">или</div>

                <div className="auth-link">
                    Нет аккаунта?{" "}
                    <Link to={"/register"}>Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    )
}

export default Login