import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const stateInicial = { 
    cita : {
        mascota : '',
        propietario : '',
        fecha: '',
        hora: '',
        sintomas : ''
    },
    error: false
 }

class NuevaCita extends Component {
    state = { ...stateInicial }

     //Cuando el usuario escribe en el formulario
     handleChange = e => {
         //colocar lo que el usuario escribre en el state
         this.setState({
             cita : {
                ...this.state.cita,  //copio el state, para no afectar a los demas campos

                 //Lo que esta en cita.mascota es sobre escrita por e.target.value 
                 [e.target.name] : e.target.value
             }
         })
     }

     //Cuando el usuario envía el formulario
     handleSubmit = e => {
        e.preventDefault();

        //Extraer los valore del state
        const {mascota, propietario, fecha, hora, sintomas } = this.state.cita;

        //Validar que todos los campos esten llenos
        if(mascota === '' || propietario === '' || fecha === '' || hora === '' || 
        sintomas === ''){
            this.setState({
                error: true
            });

            //Detener la ejecucuion
            return;
        }

        //Generar objeto con los datos
        const nuevaCita = {...this.state.cita};
        nuevaCita.id = uuid();

        //Agregar la cita al state de App
        this.props.crearNuevaCita(nuevaCita);
        
        //Colocar en el state el stateInicial
        this.setState({
            ...stateInicial
        })
    }


    render() { 

        const { error } = this.state;

        return ( 
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Llena el formulario para crear una nueva cita
                    </h2>

                    {/* Muestra el mensaje de error en dado caso que no se llenen los campos */}
                    {error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los 
                    Campos son obligatorios</div> : null}
                    
                    <form
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className="col-sm-8 col-lg-10"> 
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Mascota"
                                    name="mascota"
                                    onChange = {this.handleChange}
                                    value={this.state.cita.mascota}
                                />
                            </div>
                        </div> {/*cierre de form group*/}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
                            <div className="col-sm-8 col-lg-10"> 
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Dueño Mascota"
                                    name="propietario"
                                    onChange = {this.handleChange}
                                    value={this.state.cita.propietario}
                                />
                            </div>
                        </div> {/*cierre de form group*/}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4"> 
                                <input 
                                    type="date"
                                    className="form-control"                                   
                                    name="fecha"
                                    onChange = {this.handleChange}
                                    value={this.state.cita.fecha}
                                />
                            </div>
            
                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4"> 
                                <input 
                                    type="time"
                                    className="form-control"                                    
                                    name="hora"
                                    onChange = {this.handleChange}
                                    value={this.state.cita.hora}
                                />
                            </div>
                        </div> {/*cierre de form group*/}

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Síntomas</label>
                            <div className="col-sm-8 col-lg-10"> 
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    placeholder="Describe los sintomas"
                                    onChange = {this.handleChange}
                                    value={this.state.cita.sintomas}
                                ></textarea>

                            </div>
                        </div> {/*cierre de form group*/}

                        <input type="submit" className="py-3 mt-2 btn btn-success 
                        btn-block" value ="Agregar Nueva Cita"></input>

                    </form>
                </div>
            </div>
         );
    }
}

NuevaCita.propTypes ={
    crearNuevaCita : PropTypes.func.isRequired
}
 
export default NuevaCita;