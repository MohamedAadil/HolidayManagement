import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';
import swal from 'sweetalert';


function EditHoliday()  {

    const [holidayInput, setHoliday] = useState([]);

    let {id} = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/edit-holiday/${id}`).then( res => {

            if(res.data.status === 200)
            {
                setHoliday(res.data.holiday);
            }
        });

    }, []);

    const handleInput = (e) => {
        e.persist();
        setHoliday({...holidayInput, [e.target.name]: e.target.value});
    }

    const updateHoliday = (e) => {
        e.preventDefault();

        const data = {
           name: holidayInput.name,
           startDate: holidayInput.startDate,
           endDate: holidayInput.endDate,
        }

        axios.put(`http://127.0.0.1:8000/api/update-holiday/${id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal({
                    title: "Updated!",
                    text: res.data.message,
                    icon: "success",
                    button: "OK!",
                  });
            }
        });
        
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                Edit Holiday
                                <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
                            </h4>
                        </div>
                        <div className='card-body'>

                            <form onSubmit={updateHoliday}>
                                <div className='form-group mb-3'>
                                    <label>Holiday Name</label>
                                    <input type='text' name='name' onChange={handleInput} value={holidayInput.name} className='form-control' />
                                </div>

                                <div className='form-group mb-3'>
                                    <label>Start Date</label>
                                    <input type='date' name='startDate' onChange={handleInput} value={dateFormat(holidayInput.startDate, "yyyy-mm-dd").toString()} className='form-control' />
                                </div>

                                <div className='form-group mb-3'>
                                    <label>End Date</label>
                                    <input type='date' name='endDate' onChange={handleInput} value={dateFormat(holidayInput.endDate, "yyyy-mm-dd").toString()} className='form-control' />
                                </div>

                                <div className='form-group mb-3'>
                                    <button type='submit' className='btn btn-primary'>Update</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditHoliday;