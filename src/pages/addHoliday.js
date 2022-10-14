import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Addholiday extends Component
{
    state = {
        name: '',
        startDate: '',
        endDate: '',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveHoliday = async (e) => {
        e.preventDefault();

        if(this.state.startDate > this.state.endDate) {
            swal({
                title: "Warning!",
                text: 'Please insert the correct date range!',
                icon: "warning",
                button: "OK!",
              });
              return;
        }

        const res = await axios.post('http://127.0.0.1:8000/api/add-holiday', this.state);

        if(res.data.status === 200)
        {
            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.setState({
                name: '',
                startDate: '',
                endDate: '',
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'> 
                            <div className='card-header'>
                                <h4>
                                    Add Holiday
                                    <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
                                </h4>
                            </div>
                            <div className='card-body'>

                                <form onSubmit={this.saveHoliday}>
                                    <div className='form-group mb-3'>
                                        <label>Holiday Name</label>
                                        <input type='text' name='name' onChange={this.handleInput} value={this.state.name} className='form-control' />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>Start Date</label>
                                        <input type='date' name='startDate' onChange={this.handleInput} value={this.state.startDate} className='form-control' />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <label>End Date</label>
                                        <input type='date' name='endDate' onChange={this.handleInput} value={this.state.endDate} className='form-control' />
                                    </div>

                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Submit</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addholiday;