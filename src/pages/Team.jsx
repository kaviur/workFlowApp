import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { get } from '../api'
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
import { useDispatch, useSelector } from 'react-redux'
import { changeRole, clearTeamMessage, expelFromTeam, getTeamById, inviteToTeam } from '../features/team/teamSlice'
import { changeState, createTask } from '../features/task/taskSlice'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import {AiOutlinePlus} from 'react-icons/ai'
import {FaUserPlus} from 'react-icons/fa'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'


const data = [
    "https://images.unsplash.com/photo-1647504277331-608dcd69d7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647470224859-4973bd0b428c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647582621141-8c61fd1dac53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647545756130-23979d9967ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647504277331-608dcd69d7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647470224859-4973bd0b428c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647582621141-8c61fd1dac53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647545756130-23979d9967ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
]

export default function Team() {
    const params = useParams()
    const [openCreate, setOpenCreate] = useState(false)
    const [listTools, setOpenListTools] = useState(false)

    const [lists,setLists] = useState([])
    const [tasks,setTasks] = useState([])
    const [idList, setIdList] = useState()

    const user = useSelector(state => state.user)
    const team = useSelector(state => state.team.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()


    //traer la info de las listas
    //crear, editar, eliminar tareas
    //agregar, eliminar miembros y cambiarles el rol - sólo si es líder del equipo

    //llenar la info del team
    useEffect(() => {
        if (!user.loading && user.logged) {
          dispatch(getTeamById(params.idTeam))
            .then((res) => {
                //console.log(res.payload.lists);
                setLists(res.payload.lists)
                if (res.error) return navigate('/')
            })
        }
    }, [user, team.loading])

    //crear una tarea (nombre, descripción, a quiénes está asignada y debería tener una fecha)
    const createNewTask = ({name, description, assigned }) => {
        const members = []
        members.push(assigned)

        dispatch(createTask({
          idList,  
          name,
          description,
          assigned:members
        }))
        .then((res) => {
            if (res.meta.requestStatus === 'fulfilled') return navigate(0)
        })
      }

    //DRAG AND DROP
    //cuando se cambia de lugar un draggable
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list]; //Generar una copia
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };
    
    //cuando se suelta el draggable se reordena la lista
    const onDragEndList = ({source,destination})=>{
        if(!destination){
            console.log("No hacer nada")
            return
        }
        setLists(reorder(lists,source.index,destination.index))
    }

    //cuando se suelta el draggable se reordena la lista de tareas
    const onDragEndTask = ({source,destination})=>{
        if(!destination){
            console.log("No hacer nada")
            return
        }
        setTasks(reorder(tasks,source.index,destination.index))
    }

    // Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire(
    //         'Deleted!',
    //         'Your file has been deleted.',
    //         'success'
    //       )
    //     }
    //   })

  return (
    <main className=''>
        {
        openCreate &&
          <Modal setOpenModal={setOpenCreate} title='New task'>
            <form
              className='flex flex-col w-full gap-4 mx-auto mt-2'
              onSubmit={handleSubmit(createNewTask)}
            >
              <input
                className='px-4 py-1 text-black border rounded-lg outline-none border-ebony-clay-500 placeholder:text-black/50'
                type='text'
                required
                maxLength='24'
                placeholder='Tittle'
                {...register('name', { required: true, maxLength: 30 })}
              />
              <textarea
                className='h-32 px-4 py-1 text-black border rounded-lg outline-none border-ebony-clay-500 placeholder:text-black/50'
                required
                placeholder='Description'
                {...register('description', { required: true })}
              />
              <label className="text-slate-600 ml-4" htmlFor='assigned'>Members</label>
              <select
                className='px-4 py-1 text-slate-500 bg-slate-50 border rounded-lg outline-none border-ebony-clay-500'
                required
                id='assigned'
                defaultValue=''
                {...register('assigned', { required: true })}
              >
                
                {team.members.map(member=>{
                    return(<option value={member._id._id}>{member._id.name}</option>)
                })}
              </select>
              

              <button className='w-3/4 bg-blue-900 hover:bg-blue-800 py-1 text-xl text-white border rounded-md bg-crimson-500 place-self-center'>Create</button>
            </form>
          </Modal>
      }
        <section className=''>
            {console.log("info equipo..."+team)}
            {console.log("id list..."+idList)}
            {/* <h1>{team.name}</h1>
            <h1>{team.id}</h1>
            <h1>{team.description}</h1>
            <h1>Líder del equipo:{team.idLeader.name}</h1>
            <h1>Miembros del equipo</h1>
            <ul> 
            {
                team.members.map(member=>{
                    return(<li>{member._id._id}</li>)
                })
            }
            </ul> */}
           
            
            <DragDropContext onDragEnd={onDragEndList}>
                <Droppable droppableId='droppable' direction='horizontal'>
                    {(provided,snapshot)=>{
                        return <div 
                            className='flex gap-5 max-w-screen-xl mx-auto'//contenedor de lista- o board
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                        {lists.map((list,index)=>{
                            return <Draggable key={index} draggableId={""+index} index={index}>
                                {(provided,snapshot)=>{
                                    return <article
                                        className='h-max w-64 bg-gray-200 rounded-md mt-20'//lista de tareas o column
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                            <div className="bg-slate-300 rounded-t-md py-1">
                                            {list.name}
                                            <div className="float-right z-0">
                                                <spam 
                                                    onClick={() => setOpenListTools(true)} 
                                                    className='cursor-pointer mr-2 text-2xl text-slate-600'>
                                                        ...
                                                </spam>
                                            </div>
                                            </div>
                                            <DragDropContext onDragEnd={onDragEndList}>
                                            <Droppable droppableId={'droppable'+index} direction='vertical'>
                                                {(provided,snapshot)=>{
                                                    return <div 
                                                        className='mx-2'//contenedor de tareas droppable
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {console.log(list)}
                                                    {list.tasks.map((task,i)=>{
                                                        return <Draggable key={"draggable"+index+i} draggableId={"draggable"+index+i} index={i}>
                                                            {(provided,snapshot)=>{
                                                                return <div
                                                                    className='flex-shrink-0 min-h-min pb-5 my-2 bg-white rounded-sm shadow-lg' //tarea
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                    <div className="mx-2">
                                                                        <h1 className='text-slate-400'>{task.name}</h1> 
                                                                        <hr />
                                                                        <div>
                                                                            <p className='mt-2 text-slate-800'>{task.description}</p> 
                                                                            <FaUserPlus
                                                                            className="float-right text-slate-500 cursor-pointer"
                                                                            />
                                                                        </div>
                                                                    </div>  
                                                                </div>//end task
                                                            }}
                                                        </Draggable>
                                                    })}
                                                    {provided.placeholder}
                                                    <button 
                                                    onClick={() => setOpenCreate(true)} 
                                                    onMouseOver={() => setIdList(list._id)}
                                                    className=' shadow-lg mt-2 rounded-lg mb-2 px-3 text-slate-500 bg-slate-50 float-right'>
                                                        Add Task <AiOutlinePlus className='inline-block'/>
                                                    </button>
                                                    </div>//end task container
                                                }}
                                            </Droppable>
                                            </DragDropContext>
                                    </article>
                                }}
                            </Draggable>
                        })
                        }
                        {provided.placeholder}
                        <button className='mt-20 h-10 shadow-lg rounded-lg mb-2 px-3 text-slate-500 bg-slate-50 float-right'>Add List <AiOutlinePlus className='inline-block'/></button>
                        </div>// end board
                    }}
                </Droppable>
            </DragDropContext>
        </section>
    </main>
  )
}