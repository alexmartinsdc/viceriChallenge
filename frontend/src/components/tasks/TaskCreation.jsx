import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    icon: 'tasks',
    title: 'Tarefas',
    subtitle: 'Cadastro de tarefas: Incluir, Alterar, Filtrar e Excluir!'
}

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    tasks: { name: '', task: '', status: ''},
    list: []
}

export default class TaskCreation extends Component {

    state = { ...initialState }
    
    
    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })    
        })
    }

    clear() {
        this.setState({tasks: initialState.tasks})
    }

    
    save() {
        const tasks = this.state.tasks 
        const method = tasks.id ? 'put' : 'post' /* Caso tenha id, o conteúdo será alterado, caso contrário, será incluído */
        const url = tasks.id ? `${baseUrl}/${tasks.id}` : baseUrl 
        axios[method](url, tasks) 
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ tasks: initialState.tasks, list })
            })
    }

    getUpdatedList(tasks, add = true) {
        const list = this.state.list.filter(t => t.id !== tasks.id)
        if(add) list.unshift(tasks) /* Retornar a tarefa na primeira posição */
        return list
    }

    updateField(event) {
        const tasks = {...this.state.tasks}
        tasks[event.target.name] = event.target.value
        this.setState({tasks})
    }

    

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.tasks.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Tarefa</label>
                            <input type="text" className="form-control"
                                name="task"
                                value={this.state.tasks.task}
                                onChange={e => this.updateField(e)}
                                placeholder="Descreva a tarefa" />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-control"
                                name="status"
                                value={this.state.tasks.status}
                                onChange={e => this.updateField(e)}>

                                    <option selected>Escolher</option>
                                    <option>Iniciada</option>
                                    <option>Bloqueada</option>
                                    <option>Concluída</option>
                                </select>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 col-md-6">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>

                        
                </div>
            </div>
        )
    }
    
    load(tasks) {
        this.setState({tasks})
    }

    remove(tasks) {
        axios.delete(`${baseUrl}/${tasks.id}`).then(resp => {
            const list = this.getUpdatedList(tasks, false)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tarefa</th>
                        <th>Status</th>
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(tasks => {
            return (
                <tr key={tasks.id}>
                    <td>{tasks.id}</td>
                    <td>{tasks.name}</td>
                    <td>{tasks.task}</td>
                    <td>{tasks.status}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(tasks)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(tasks)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}