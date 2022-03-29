import React, { useState, useEffect } from 'react'
//import signImage from '../assets/images/signup.svg'
import { signup } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import pencil from '../assets/images/pencil.svg'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        birthday: "",
        city: "",
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.logged) {
            navigate('/')
        }
    }, [user])

    const SignUpUser = (e) => {
        e.preventDefault()
        console.log(formData)
        dispatch(signup({...formData}))
    }

    const handlechange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section className="bg-acapulco-200 h-auto min-h-screen py-12 md:py-0 flex flex-col gap-7  justify-center items-center md:flex-row">
            <div className="w-[90%] h-1/2 md:w-[40%] md:h-4/5  flex flex-col pt-7 ">
                <form onSubmit={SignUpUser} className='w-full p-4 bg-nile-blue-100 rounded-xl font-jost'>
                    <h1 className='font-righteous text-4xl text-palette-dark'>Register</h1>
                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-palette-dark font-semibold' htmlFor="email">Name</label>
                        <input onChange={handlechange} className='bg-acapulco-200 h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="text" name="name" placeholder=" " autoComplete="off" />
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-palette-dark font-semibold' htmlFor="email">Birthday</label>
                        <input onChange={handlechange} className='bg-acapulco-200 h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="date" name="birthday" placeholder=" " autoComplete="off" />
                    </div>
                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-palette-dark font-semibold' htmlFor="city">City</label>
                        <input onChange={handlechange} className='bg-acapulco-200 h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="text" name="city" placeholder=" " autoComplete="off" />
                    </div>

                    <div className='flex flex-col w-full mt-4'>
                        <label className='text-palette-dark font-semibold' htmlFor="email">Email</label>
                        <input onChange={handlechange} className='bg-acapulco-200 h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="email" name="email" placeholder=" " autoComplete="off" />
                    </div>
                    <div className='flex flex-col w-full mt-3'>
                        <label className='text-palette-dark font-semibold' htmlFor="password">Password</label>
                        <input onChange={handlechange} className='bg-acapulco-200 h-9 p-3 rounded-3xl mt-2 outline-none border-none text-center' type="password" name="password" placeholder=" " autoComplete="off" />
                    </div>
                    <button className='w-full h-9 bg-burnt-sienna-600 text-acapulco-200 mt-6 rounded-xl transition-all duration-700 ease-in-out hover:tracking-widest'>
                        Sign Up
                    </button>
                </form>
                {/* <div className='w-full flex justify-center items-center md:hidden'>
            {user.loading && <p>Loading...</p>}
            {
                user.error && <p className='p_error'>{user.message}</p>
            }
        </div> */}
            </div>
            <div className=' w-[80%] h-1/2 md:w-[30%] md:h-4/5'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi29vZH95HRBFLUa1Z_m6vi3-Bt4_IOTAKDQ&usqp=CAU" alt='welcome image' className='w-full h-full' />
            </div>
        </section>
    )
}

export default SignUp