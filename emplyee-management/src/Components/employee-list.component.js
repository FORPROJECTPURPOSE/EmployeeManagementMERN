import React, {Component} from 'react';
import axios from "axios";
import {API} from '../api-config'
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const Employee = props => (
    <tr>
        <td>{props.index}</td>
        <td>{props.employee.username}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.age}</td>
        <td>{props.employee.position}</td>
        <td>
            <Link className="btn btn-primary m-0" to={"/update_employees/" + props.employee._id}>Edit</Link>
            <a className="btn btn-danger m-lg-1 m-0" href="#" onClick={() => {
                props.deleteEmployee(props.employee._id)
            }}>delete</a>
        </td>
    </tr>
)

class EmployeeListComponent extends Component {

    constructor(props) {
        super(props);

        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.state = {
            username: '',
            age: '',
            position: '',
            email: '',
            employees: []
        }
    }

    componentDidMount() {
        axios.get(API)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        employees: response.data,
                    })
                }
            });
    }

    onClickEditButton(ID) {
        window.location = `/update_employees/${ID}`;

    }

    deleteEmployee(ID) {

        this.setState({
            employees: this.state.employees.filter(el => el._id !== ID)
        })

        axios.delete(`${API}/${ID}`)
            .then(value => {
                console.log(value.data);
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                }).then()
            }).catch(reason => {
            Swal.fire({
                title: 'Error!',
                icon: 'error',
            }).then()
        })
    }

    employeeList() {
        return this.state.employees.map((currentEmployee, index) => {
            return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id}
                             index={index}/>
        })
    }

    render() {
        return (
            <div>
                <h3 className="p-3">Employee Details</h3>
                <div className="row d-flex justify-content-center">

                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Age</th>
                        <th scope="col">Position</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.employeeList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EmployeeListComponent;