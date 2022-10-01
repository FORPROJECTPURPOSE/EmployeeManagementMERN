import React, {Component} from 'react';
import axios from "axios";
import {API} from '../api-config'
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2'


let EmployeeID = '';

const FindIDofEmployee = () => {

    const {id} = useParams();
    EmployeeID = id;
}


class UpdateEmployee extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangePosition = this.onChangePosition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: '',
            age: '',
            position: '',
            email:'',
            employees: []
        }
    }

    componentDidMount() {

        axios.get(`${API}/${EmployeeID}`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    age: response.data.age,
                    position: response.data.position,
                    email: response.data.email,
                })
            })

        this.setState({
            employees: ['test employees'],
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangePosition(e) {
        this.setState({
            position: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const employee = {
            username: this.state.username,
            age: this.state.age,
            position: this.state.position,
            email: this.state.email
        }

        axios.post(`${API}/update/${EmployeeID}`, employee)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                }).then(() => window.location = '/')
            }).catch(reason => {
            Swal.fire({
                title: 'Error!',
                icon: 'error',
            }).then(() => window.location = '/')
        });

        this.setState({
            username: '',
            age: '',
            position: '',
            email: ''
        })



    }


    render() {
        return (
            <div>
                <h3 className="p-3">Change details of an Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group p-3">
                        <label htmlFor="exampleInputEmail1">Employee's Name</label>
                        <input type="text" className="form-control" id="employeesNameId"
                               aria-describedby="emailHelp"
                               required
                               value={this.state.username}
                               onChange={this.onChangeUsername}/>
                        <small id="emailHelp" className="form-text text-muted">Full name would be appropriate.</small>
                    </div>

                    <div className="form-group p-3">
                        <label htmlFor="exampleInputPassword1">E-mail Address</label>
                        <input type="email" className="form-control" id="employeesEmailId"
                               required
                               value={this.state.email}
                               onChange={this.onChangeEmail}/>
                    </div>

                    <div className="form-group p-3">
                        <label htmlFor="exampleInputPassword1">Age</label>
                        <input type="number" className="form-control" id="employeesAgeId"
                               required
                               value={this.state.age}
                               onChange={this.onChangeAge}/>
                    </div>

                    <div className="form-group p-3">
                        <label htmlFor="exampleInputPassword1">Position</label>
                        <input type="text" className="form-control" id="employeesPositionId"
                               required
                               value={this.state.position}
                               onChange={this.onChangePosition}/>
                    </div>

                    <div className="form-group p-3">
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
                <FindIDofEmployee></FindIDofEmployee>
            </div>
        );
    }
}

export default UpdateEmployee;