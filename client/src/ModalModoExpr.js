import React, {Component} from 'react';
import {
    Form,
    Modal,
    Button,
    Col,
    Row,
    Container,
} from 'react-bootstrap';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import Alerta from "react-s-alert";
import Spinner from "./Spinner";
const URL = "./mapaV4.jpg"
var value


class ModalModoExpr extends Component {

    constructor() {
        super();
    
        this.state = {
            isLoading: false,
          sentido: "",
          destino: "",
            map:  {name: "map",
                areas: [
                    { name: "mb3", shape: "poly", coords: [72, 299, 92, 299, 92, 318, 72, 318], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },

                    { name: "mb4", shape: "poly", coords: [406, 299, 427, 299, 427, 318, 406, 318], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },

                    { name: "mb2", shape: "poly", coords: [464, 202, 489, 202, 489, 221, 464, 221], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },

                    { name: "mb1", shape: "poly", coords: [259, 202, 285, 202, 285, 221, 259, 221], preFillColor: "#FFCD00",  strokeColor: "#FFCD00" },


                ]},
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
    enviarDadosModoExpr = () =>{
        if(this.state.sentido === ""){
            Alerta.error("Escolha o sentido", {});

        }
        if(this.state.destino === ""){
            Alerta.error("Escolha o destino", {});

        }
        if(this.state.sentido !== "" && this.state.destino !== "") {
            this.setState({isLoading: true})

            axios('http://localhost:8080/api/setData', {
                mode: 'no-cors',
                method: 'POST',
                // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
                params: JSON.stringify({modo: "3", destino: this.state.destino, sentido: this.state.sentido})
            })
                .then(response => {
                    if (response.status === 200) {
                        let state = this.state
                        this.setState({isLoading: false, destino: "", sentido: ""})
                        let msgAlerta = "Modo expresso foi solicitado"
                        // state.map.areas[this.state.destino].strokeColor = '#FFCD00'
                        // state.map.areas[this.state.destino].preFillColor = '#FFCD00'
                        // this.setState(state)

                        this.props.closeModal(msgAlerta)


                    } else {
                        this.setState({isLoading: false})
                        Alerta.error(response.menssagem, {});
                    }
                }).catch(err => console.log(err));
        }


    }
    
   
      handleChangeSentido = (event) => {
        this.setState({sentido: event.target.value});
      }
      handleChangeMailBox = (event) =>{
        this.setState({destino: event.target.id});

      }
    clicked = (area) =>{
        let map = this.state.map
        let indiceArea
        map.areas.map(function(a, indice){
            if( area.name === a.name ){
       //         console.log(indice)
                indiceArea =  indice;
            }
            if(a.strokeColor === 'black'){
                console.log(indice)
                map.areas[indice].strokeColor = '#FFCD00'
                map.areas[indice].preFillColor = '#FFCD00'
            }
        });
        map.areas[indiceArea].strokeColor = 'black'
        map.areas[indiceArea].preFillColor = 'black'
        this.state.destino = parseInt(indiceArea) + 1
       this.setState({map: map})
    }
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modo Expresso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    <Row >
                        <Col md = {12}>

                            <label htmlFor="basic-url">Selecionar Mailbox:</label>

                        </Col>
                    </Row>
                    </Container>
                    <div className="d-flex justify-content-center">

                        <ImageMapper src={URL}
                                     map={this.state.map}
                                     width={500}
                             onClick={area => this.clicked(area)}
                        />

                    </div>
                    <Alerta position='top-right' />

                    <Spinner isSendingRequest={this.state.isLoading}/>

                    <Container>
                    <Row>
                        <Col>
                        
                        <label htmlFor="basic-url">Sentido:</label>
                        
                        </Col>   
                    </Row>
                </Container>   

                <Container>

                    <Row style = {{width: "80%", height: "50px"}}>
                        <Col xs={12} md={5}>
                        <label>
                        <Form.Control as="select"  onChange={this.handleChangeSentido} >
                            <option value=""> Selecione o sentido </option>
                            <option value="1">Mailbox Master para Mailbox</option>
                            <option value="2">Mailbox para Mailbox Master</option>
                        </Form.Control>
                        </label>
                        </Col>   
                    </Row>

                </Container>   
                
                </Modal.Body>
               
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal} >
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={this.enviarDadosModoExpr}>
                        Confirmar
                    </Button>
                </Modal.Footer>
                
            </Modal>

        );
    }
}


export default ModalModoExpr;
