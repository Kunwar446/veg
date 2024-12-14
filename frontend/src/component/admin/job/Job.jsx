import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import "./Job.css"
import axios from 'axios';
import { setDeleteVegetable, setEditVegetable } from '../../../redux.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Job = ({ data }) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const jobId=data._id;


    // handling admin job delete 
    const adminJobDelete=(jobId)=>{
        axios.delete(`${process.env.REACT_APP_END_POINT}/job/deletejob/${jobId}`,{withCredentials:true}).then((res)=>{
            dispatch(setDeleteVegetable(jobId))
        }).catch(error=>{
            console.log("error while deleting job post")
        })
    }

    // handling admin job delete 
    const adminJobEdit=(jobId)=>{
        console.log("edit clicked");
        navigate("/postjob",{state:{data}});
        // axios.patch(`http://localhost:5000/job/updatejob/${jobId}`,{withCredentials:true}).then((res)=>{
        //     dispatch(setEditVegetable(jobId))
        // }).catch(error=>{
        //     console.log("error while deleting job post")
        // })
    }


    return (
        <>
            <div className="adminJob">
                <h3 className='title'>{data.title}</h3>
                <p className='desc'>{data.description}</p>
                <div className="extraInfo">
                    <div className="extraInfoLeft">
                        <div className="category"><h4>Category: </h4><p>{data.category}</p></div>
                        <div className="location"><h4>Location: </h4><p>{data.location}</p> </div>
                        <div className="salary"><h4>Salary:</h4><p>{data.salary}</p></div>
                    </div>
                    <div className="extraInfoRight">
                        <div className="actionBtn">
                            <LocationOnIcon className='locationIcon' />
                            <BorderColorRoundedIcon className='editIcon'  onClick={()=>adminJobEdit(data)}/>
                            <DeleteOutlineRoundedIcon className='deleteIcon' onClick={()=>adminJobDelete(jobId)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Job