import React, {useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

function Register() {
    const [register, setRegister] = useState({
        name: '',  email: '', password:''
    })

   
    
    const onChangeInput = e => {
        const {name, value} = e.target;
        setRegister({...register, [name]:value})
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/register', {...register})
            
    

            window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <div className="login-register">
            <h1>회원가입</h1>
            <form onSubmit={registerSubmit}>
                <div className="text-field">
            <input type="name" name="name" required 
                value={register.name} onChange={onChangeInput}/>
                <span></span>
                <label>닉네임</label>
                    </div>
                    <div className="text-field">
                <input type="email" name="email" required
                value={register.email} onChange={onChangeInput}/>
                <span></span>
                <label>아이디</label>
                </div>
                <div className="text-field">
                <input type="password" name="password" required 
                value={register.password} onChange={onChangeInput}/>
                <span></span>
                <label>비밀번호</label>
                </div>
                <div className="row">
                    <button type="submit">확인</button>
                    <Link to="/login" className="Link">로그인</Link>
                </div>

            </form>
            </div>
        </div>
    )
}

export default Register
