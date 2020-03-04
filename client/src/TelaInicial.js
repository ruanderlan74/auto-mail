import React, {Component} from 'react';
import {Button, Row, Navbar, Alert} from 'react-bootstrap';
import './css/estilo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Alerta from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Spinner from './Spinner'
import  './css/spinner.css'
class TelaInicial extends Component {

    constructor(props){
        super(props);
        this.state = {
        iaLoading: false,
            mostrarAlerta: false,
            msgAlerta: '',
            typeAlert: ''
        }
    }
    interceptorRequest = axios.interceptors.response.use((response) => {
        return response;
      }, error => {
        if(error.message === "Network Error"){
            error.menssagem = "Erro de conexão, verifique sua conexão de internet ou contate o Administrador."
            return error
        }
          console.log("erro: " + error.message)
        return Promise.reject(error);
      });

    iniciar = () =>{
        this.setState({isLoading: true})
        axios('http://localhost:8080/api/setData', {
            mode:'no-cors',
            method: 'POST',
            params: JSON.stringify({  modo: "1", destino: "",sentido: ""})
        })
            .then(response => {
                if(response.status === 200) {
                    window.location.href = "/telaPrincipal"
                    this.setState({isLoading: false})
                }else{
                    this.setState({isLoading: false})
                    Alerta.error(response.menssagem, {
                    });
                }
            })
            .catch(err => console.log(err));

    
    }
	render() {

	    return (
            <div>
                <Navbar expand="xl" className='no-padding menu'>
                    <Navbar.Brand href="#home" className='no-padding'>
                        <img
                            alt=""
                            src="/logoAutoMail.jpg"
                            width="420"
                            height="90"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#" className="title-menu">Estação de Controle</Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Button className="botao-contato"> Contato</Button>
                    </Navbar.Brand>
                </Navbar>
                <Spinner isSendingRequest={this.state.isLoading}/>

                <Row>
                    <div class="col-sm-12" style={{position:"absolute", top:"50%"}}>
                        <div class="text-center">
                            <Link  className="botao-incio" size='lg'
                            onClick={this.iniciar}
                             >
                                Iniciar <FontAwesomeIcon icon="sign-in-alt"/> </Link>

                        </div>
                    </div>
                </Row>
                <Alerta position='top-right' />

            </div>
	);
  }
}


export default TelaInicial;
