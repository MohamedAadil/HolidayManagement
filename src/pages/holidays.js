import React, {Component, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import dateFormat from 'dateformat';

function Holidays() {

    const [loading, setLoading] = useState(true);
    const [holidays, setHolidays] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/holidays').then(res=> {

            if(res.data.status === 200) {
                setHolidays(res.data.holidays);
                setLoading(false);
            }

        });

    }, []);

    const searchHoliday = (e) => {

        if(search.from > search.to) {
            swal({
                title: "Warning!",
                text: 'Please search the correct date range!',
                icon: "warning",
                button: "OK!",
              });
            return;
        }

        axios.get(`http://127.0.0.1:8000/api/holiday?from=${search.from}&to=${search.to}`).then(res=> {

            if(res.data.status === 200) {
                setHolidays(res.data.holidays);
                setLoading(false);
            }

        });
    }

    const handleInput = (e) => {
        e.persist();
        setSearch({...search, [e.target.name]: e.target.value});
    }
    
    const deleteHoliday = async (e, id) => {

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-holiday/${id}`);

        if(res.data.status === 200)
        {
            thisClicked.closest("tr").remove();
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
        }
    }

    var holiday_TABLE = "";
        if(loading)
        {
            holiday_TABLE = <tr><td colSpan='6'><h2>Loading...</h2></td></tr>
        }
        else
        {
            holiday_TABLE = holidays.map( (item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{dateFormat(item.startDate, "yyyy-mmm-dd").toString()}</td>
                        <td>{dateFormat(item.endDate, "yyyy-mmm-dd").toString()}</td>
                        <td>
                            <Link to={`edit-holiday/${item.id}`} className='btn btn-success sm'>Edit</Link>
                        </td>
                        <td>
                            <button type='button' onClick={(e) => deleteHoliday(e, item.id)} className='btn btn-danger sm'>Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'> 
                            <div className='card-header'>
                                <h4>
                                    Holiday Management
                                    <Link to={'add-holiday'} className='btn btn-primary btn-sm float-end'>Add Holiday</Link>
                                </h4>
                            </div>
                            <div className='card-body'>                                
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <td><label>From</label></td>
                                            <td><input type='date' name='from' onChange={handleInput} value={search.from} className='form-control' /></td>
                                            <td><label>To</label></td>
                                            <td><input type='date' name='to' onChange={handleInput} value={search.to} className='form-control' /></td>
                                            <td><button type='button' onClick={() => searchHoliday()} className='btn btn-primary sm'>Search</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Holiday Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holiday_TABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Holidays;