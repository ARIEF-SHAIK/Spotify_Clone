import React from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [showSubmitErrMsg, setShowSubmitErrMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()


const handleUser = (event)=>{
    setUsername(event.target.value)
}
const handlePassword=(event)=>{
    setPassword(event.target.value)
}
function onSubmitSucess(jwttoken) {
    Cookies.set('jwt_token',jwttoken,{expires:30})
    navigate('/home',{replace:true} )

}
function onSubmitfailure(err_msg){
    setShowSubmitErrMsg(true)
    setErrorMsg(err_msg);

}
const submitForm = async event =>{
    event.preventDefault()// Prevent default form submission
    const userdetails={username,password}
    const api="https://apis.ccbp.in/login"
    const options={
        method:'post',
        body:JSON.stringify(userdetails)
    }
    const response = await fetch(api, options);
    const data = await response.json()
    if(response.ok===true){
        onSubmitSucess(data.jwt_token)
    }else{
        onSubmitfailure(data.err_msg)
    }
}
  return (
    <div>
        <div className="bg-gradient-to-b from-[#2a2a2a] via-[#1c1c1c] to-black bg-cover black text-center p-30 min-h-screen w-full">
            <form className="flex flex-col shadow-xl rounded-xl bg-black rounded p-13 w-1/2 gap-2 m-auto h-full" onSubmit={submitForm}>
                <h1 className='text-white flex flex-col items-start uppercase font-bold text-md'>Username</h1>
                <input type='text' placeholder='username' id='username' className="border-2 border-white-600 w-full h-full rounded-lg p-3 bg-white text-black" value={username} onChange={handleUser}/>
                <h1 className="text-white  flex flex-col items-start uppercase font-bold text-md">Password</h1>
                <input type='password' placeholder='password' id='password' className="border-2 border-white-600 w-full h-full rounded-lg p-3 bg-white text-black" value={password} onChange={handlePassword}/>
                {showSubmitErrMsg && <p className='font-stretch-extra-expanded text-red-500 p-0 text-sm'>⚠ **incorrect password {errorMsg}</p>}
                <button  type="submit" className="bg-[#20E863] rgba(15, 163, 65, 1) cursor-pointer hover:scale-105 hover:text-black text-black font-bold shadow-xl p-3 w-full h-full rounded-xl mt-4">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
