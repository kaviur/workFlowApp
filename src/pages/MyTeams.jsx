import React, { useEffect, useState } from 'react'
import {FaWindowClose} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { get, post } from '../api'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearTeamMessage, createTeam } from '../features/team/teamSlice'

export default function MyTeams() {
    const [teams,setTeams] = useState([])
    const [modalOpened,setModalOpened] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    // const [openMembers, setOpenMembers] = useState(false)
    // const [openInvite, setOpenInvite] = useState(false)
    // const [openTeam, setOpenTeam] = useState(false)
    // const [openDelete, setOpenDelete] = useState(false)

    const addTeam = ({ name, img, description }) => {
        dispatch(createTeam({ data: { name, img, description } }))
          .then(res => {
            if (res.meta.requestStatus === 'fulfilled') return navigate(0)
          })
      }

    // const addTeam = (event) =>{
    //     event.preventDefault()
    //     const {name,img,description} = event.target
    //     const newTeam = {
    //         name:name.value,
    //         img:img.value,
    //         description:description.value
    //     }
    //     post("/teams",newTeam)
    //     .then(res=>{
    //         setTeams([...teams,res.data])
    //     })
    //     setModalOpened(false)
    // }

    useEffect(()=>{
        get("/teams")
        .then(res=>setTeams(res.data))
        .catch(error=>console.log(error))
    },[])

    return (
        <div>
            <button onClick={()=>{setModalOpened(true)}}>Agregar team</button>
            <section className='grid grid-cols-3 gap-5 mt-10 '>
                {teams.map(team=><article key={team._id} className='bg-white rounded-md'>
                    <Link to={"/my_teams/"+team._id}>
                        <div className='p-5'>
                            <h2 className='font-bold text-2xl'>{team.name}</h2>
                            <p>{team.description}</p>
                        </div>
                        <img className='h-48 w-full object-cover object-center transition-all hover:object-bottom duration-1000 rounded-b-md' src={team.img} alt={team.name}/>
                    </Link>
                </article>)}
            </section>
            {modalOpened&&<div>
                <div className='absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={()=>{setModalOpened(false)}}></div>
                <div className="bg-white w-1/4 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
                    <button className='absolute right-5 top-5' onClick={()=>{setModalOpened(false)}}><FaWindowClose className='w-8 h-8 text-lavender-800 hover:text-lavender-600'/></button>
                    <h2 className='p-5 text-lavender-800 text-3xl font-bold'>Create a new team</h2>
                    <form className='flex flex-col p-5' onSubmit={handleSubmit(addTeam)}>
                        <input
                            type='text'
                            id='name'
                            className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                            placeholder='Nombre del equipo'
                            required {...register('name', { required: true })}
                        />
                        <label htmlFor='name' className='text-xl font-semibold'>Name</label>

                        <input
                            type='text'
                            id='img'
                            className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                            placeholder='Image'
                            required {...register('img', { required: true })}
                        />
                        <label htmlFor='img' className='text-xl font-semibold'>Image</label>

                        <input
                            type='text'
                            id='description'
                            className='px-4 py-1 text-black border rounded-full outline-none border-ebony-clay-500 placeholder:text-black/50'
                            placeholder='Description'
                            required {...register('description', { required: true })}
                        />
                        <label htmlFor='description' className='text-xl font-semibold'>Description</label>
                        
                        <button className='bg-lavender-900 mt-5 py-4 text-xl font-bold text-lavender-100 rounded-md'>Crear equipo</button>
                    </form>
                </div>
            </div>}
        </div>
    )
}