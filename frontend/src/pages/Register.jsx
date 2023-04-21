import React, { useState , useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import {FaUser} from 'react-icons/fa'
import {register} from "../features/auth/authSlice"
import { reset } from '../features/auth/authSlice';
import {useSelector , useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'

function Register() {
  const dispatch = useDispatch()
  const navigate  = useNavigate()
  
  const {user , isLoading , isError , isSuccess , message} = useSelector(state => state.auth)
  




  const [formData , setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : ""
  })

  const {name , email , password , password2} = formData

  const onChange = (e) => {
    setFormData((prevState)=>(
      {
        ...prevState,
        [e.target.name] : e.target.value
      }
    ))
  }




  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if(password !== password2){
        toast.error("Password don't match")
    }else{
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }



  }

  useEffect(()=>{
    if(isError){
      toast.error("user already exist")
    }
    // Redirect when logged in
    if(isSuccess || user){
      toast.success("User Register Successfully" , {position: "top-right",})
      setFormData({
        name : "",
        email : "",
        password : "",
        password2 : ""
      })
      navigate('/')
    }   

  },[isError , isSuccess , isLoading , user , message , navigate , dispatch])


 

  if(isLoading){
    return (
      <Spinner/>
    )
  }

  
  return (
    <div>
      <section className='heading'>
            <h1>
              <FaUser /> Register
            </h1>
            <p>Please create an account</p>
          </section>
    
          <section className='form'>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  onChange={onChange}
                  placeholder='Enter your name'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  placeholder='Enter password'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  placeholder='Confirm password'
                  required
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
              </div>
            </form>
          </section>
    </div>
  )
}

export default Register
