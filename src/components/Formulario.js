import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, actualizarError] = useState(false); 

    //Funcion que se ejecuta cada vez que el usuario introduce datos
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer los valores
    const { mascota , propietario , fecha , hora , sintomas } = cita;


    //Funcion que ejecuta cuando el usuario presiona agregar cita.
    const submitCita = e => {
        e.preventDefault();

        //Validar los datos:
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //setear error a false nuevamente.
        actualizarError(false);

        //Asignar un ID:
        cita.id = uuid();
        console.log(cita);

        //Crear la cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return ( 
        <Fragment> {/*Recordar que el fragment esta adentro de un grid de size 6*/}
            <h2>Crear Cita</h2>

            { error ? <p className='alerta-error'>Todos los campos son obligatorios.</p>  : null}

            <form       
                onSubmit={submitCita}
            > 

                <label>Nombre Mascota</label> {/*Primer campo*/}
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Introduzca el nombre de su mascota:'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label> {/*Segundo campo*/} 
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Introduzca su nombre, por favor:'
                    onChange={actualizarState}
                    value={propietario}
                />

                {/*------------------Fecha y hora------------------*/}
                <div class="row">
                    <div class="one-half column">
                        <label>Fecha</label> {/*Tercer campo*/} 
                        <input
                        type='date'
                        name='fecha'
                        className='u-full-width'
                        onChange={actualizarState}
                        value={fecha}
                        />
                    </div>

                    <div class="one-half column">
                        <label>Hora</label> {/*Cuarto campo*/} 
                        <input
                        type='time'
                        name='hora'
                        className='u-full-width'
                        onChange={actualizarState}
                        value={hora}
                        />
                    </div>
                </div>
                {/*------------------Fecha y hora------------------*/}

                <label>Sintomas</label>
                <textarea 
                className='u-full-width' 
                name='sintomas' 
                onChange={actualizarState}
                value={sintomas}
                ></textarea>
                    
                <button type='submit' className='u-full-width button-primary'> Agregar cita </button>
                
                
            </form>
      </Fragment>
     );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired

}
 
export default Formulario;