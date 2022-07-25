import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css'


function Login() {
    const [user, setUser] = useState({
        email: '', password:''
    })


    
    const onChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e => {
        console.log('success')
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})
            
            localStorage.setItem('firstLogin', true)

            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        
        <div className="login-page">
            <div className="login-register">
            <h1>로그인</h1>
            <form onSubmit={loginSubmit}>
                <div className="text-field">
                <input type="email" name="email" required
                value={user.email} onChange={onChangeInput}/>
                <span></span>
                <label>아이디</label>
                </div>
                <div className="text-field">
                <input type="password" name="password" required autoComplete="on"
                value={user.password} onChange={onChangeInput}/>
                <span></span>
                <label>비밀번호</label>
                </div>
                <div className="row">
                    <button type="submit">로그인</button>
                    <Link to="/register" className="Link">회원가입</Link>
                   
                </div>

            </form>
            </div>
        </div>
    )
}

export default Login
