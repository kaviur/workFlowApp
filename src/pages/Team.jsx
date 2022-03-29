import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { get } from '../api'
import {DragDropContext,Droppable,Draggable} from "react-beautiful-dnd"
import { useDispatch, useSelector } from 'react-redux'
import { changeRole, clearTeamMessage, expelFromTeam, getTeamById, inviteToTeam } from '../features/team/teamSlice'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const data = [
    "https://images.unsplash.com/photo-1647504277331-608dcd69d7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647470224859-4973bd0b428c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647582621141-8c61fd1dac53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1647504277331-608dcd69d7b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
]

export default function Team() {
    const params = useParams()

    const [lists,setLists] = useState(data)
    const [tasks,setTasks] = useState(data)

    const user = useSelector(state => state.user)
    const team = useSelector(state => state.team.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    // useEffect(()=>{
    //     get("/teams/"+params.idTeam)
    //     .then(res=>{
    //         setTeam(res.data)
    //         //setLists(res.data.lists)
    //         //console.log("info equipo...",team);
    //     })
    //     .catch(error=>console.log(error))
    // },[])

    //traer la info de las listas
    //crear, editar, eliminar tareas
    //agregar, eliminar miembros y cambiarles el rol - sólo si es líder del equipo

    useEffect(() => {
        if (!user.loading && user.logged) {
          dispatch(getTeamById(params.idTeam))
            .then((res) => {
                //setLists(res.data.lists)
                if (res.error) return navigate('/')
            })
        }
      }, [user, team.loading])


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
        <section className='mt-10'>
            {console.log("info equipo..."+team)}
            <h1>{team.name}</h1>
            <h1>{team.id}</h1>
            <h1>{team.description}</h1>
            <h1>Líder del equipo:{team.idLeader.name}</h1>
            <h1>Miembros del equipo</h1>
            <ul>
            {
                team.members.map(member=>{
                    return(<li>{member._id.name}</li>)
                })
            }
            </ul>
            
            <DragDropContext onDragEnd={onDragEndList}>
                <Droppable droppableId='droppable' direction='horizontal'>
                    {(provided,snapshot)=>{
                        return <div 
                            className='flex overflow-x-scroll gap-5 bg-red-300'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                        {lists.map((el,index)=>{
                            return <Draggable key={index} draggableId={""+index} index={index}>
                                {(provided,snapshot)=>{
                                    return <article
                                        className='flex-shrink-0 w-1/3 bg-slate-300'
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                            <DragDropContext onDragEnd={onDragEndList}>
                                            <Droppable droppableId={'droppable'+index} direction='vertical'>
                                                {(provided,snapshot)=>{
                                                    return <div 
                                                        className=' space-y-5'
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                    {tasks.map((el,i)=>{
                                                        return <Draggable key={"draggable"+index+i} draggableId={"draggable"+index+i} index={i}>
                                                            {(provided,snapshot)=>{
                                                                return <div
                                                                    className='flex-shrink-0 w-full h-10 bg-green-900'
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    >
                                                                        
                                                                </div>
                                                            }}
                                                        </Draggable>
                                                    })}
                                                    {provided.placeholder}
                                                    </div>
                                                }}
                                            </Droppable>
                                            </DragDropContext>
                                    </article>
                                }}
                            </Draggable>
                        })}
                        {provided.placeholder}
                        </div>
                    }}
                </Droppable>
            </DragDropContext>
        </section>
    </main>
  )
}