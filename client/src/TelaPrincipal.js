import React, {Component} from 'react';
import ImageMapper from 'react-image-mapper';
import axios from 'axios';
import { Button, Col, Row, Navbar, Card, Form, Tooltip, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
import {Link} from 'react-router-dom'
import './css/estilo.css'
import ModalModoExpr from './ModalModoExpr';
import socketIOClient from "socket.io-client";
import Alerta from "react-s-alert";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

const URL = "./mapaV4.jpg";

class TelaPrincipal extends Component {

    constructor(props){
        super(props);
        this.state = {
            placement: '',
            hoveredArea: '',
            msg: '',
            moveMsg: '',
            data: '',
            mensagem: '',
            mensagemRecebida: '',
            showModal: false,
            map:  {name: "my-map",
                areas: [
                    { name: "linha1", shape: "poly", coords: [], preFillColor: "#1E1B1B", strokeColor:"black"  },
                    { name: "linha2", shape: "poly", coords: [],preFillColor: "#1E1B1B", strokeColor:"black"  },
                    { name: "linha3", shape: "poly", coords: [], preFillColor: "#1E1B1B", strokeColor:"black"  },
                    { name: "linha4", shape: "poly", coords: [], preFillColor: "#1E1B1B", strokeColor:"black"  },

                    { name: "car", shape: "poly", coords: [], preFillColor: "#C59C52",  strokeColor: "#F0E68C" },

                    { name: "roda1", shape: "circle", coords: [], preFillColor: "black" },
                    { name: "roda2", shape: "circle", coords: [] , preFillColor: "black" },
                    { name: "roda3", shape: "circle", coords: [], preFillColor: "black" },
                    { name: "roda4", shape: "circle", coords: [], preFillColor: "black" },

                   

                ]},
            dadosMailCar:{
                instru: {
                    accx: " ", 
                    accy: " ", 
                    vg: " ",
                    velox: " ", 
                    veloy: " ", 
                    distan: " ",
                    angulo: " ",
                    bate: "",
                    enco1: " ",
                    enco2: " ",
                    ultra1: " ",
                    ultra2: " ", 
                    ultra3: " "},
                    status: {
                        modo: 1
                    },
                    coord: {
                        x: 0,
                        y: 0
                    },
                    erros: [{code: 1}, {code: 2}]
            },
            corIconeBateria:  '',
            endpoint: "http://localhost:8080",
            mostrarAlerta: false,
            mensagensAlertas: []
        }
         this.socket = socketIOClient(this.state.endpoint);
         this.socket.on('getData', (json) =>{
           // parseInt(json.status.modo)
            console.log(json)
    //        json.erros = [{code: 1}, {code: 2}]
            this.setState({dadosMailCar: json})
            this.posicionarCar(this.state.dadosMailCar.coord.x, this.state.dadosMailCar.coord.y)
           this.mostrarErro()
        })

    }


    getMensagem() {
        this.socket.emit('getData')
    }

    componentDidMount() {
      //  this.getMensagem()
    this.posicionarCar(this.state.dadosMailCar.coord.x, this.state.dadosMailCar.coord.y)
   this.intervalo = setInterval( () =>  this.getMensagem(), 100);
  //  setInterval( () =>             this.mostrarErro(),        1000);
    
   // this.setMensagem()

    }

    mostrarErro = () =>{
        let state = this.state
        if(this.state.dadosMailCar.erros.length === 0){
            state.mensagensAlertas = []
        }else{
        this.state.dadosMailCar.erros.forEach(erro => {
            if(erro.code === 1){
            let mensagem = this.state.mensagensAlertas.find(msg => msg === "Perda de conexão" )
            if(mensagem === undefined){
                state.mensagensAlertas.push("Perda de conexão")
            }
             }
            else if(erro.code === 2){
                let mensagem = this.state.mensagensAlertas.find(msg => msg === "O dispositivo móvel está mais distante do que 20 cm da localização prevista" )
                if(mensagem === undefined){
                    state.mensagensAlertas.push("O dispositivo móvel está mais distante do que 20 cm da localização prevista")

                }
            }
            else if(erro.code === 3){
                let mensagem = this.state.mensagensAlertas.find(msg => msg === "Encoder de uma determinada roda para de funcionar" )
                if(mensagem === undefined){
                    state.mensagensAlertas.push("Encoder de uma determinada roda para de funcionar")
                }
            }
        
        });
    }
        this.setState(state)
    }



    getTipPosition(positionTooltip) {
        return { top: `${positionTooltip[1]}px`, left: `${positionTooltip[0]}px` , opacity: "1"};
    }
    moveOnImage(evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on the image at coords ${JSON.stringify(coords)} !`
        });
    }
    moveOnArea(area, evt) {
        const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
        this.setState({
            moveMsg: `You moved on ${area.shape} ${
                area.name
                } at coords ${JSON.stringify(coords)} !`
        });
    }


    posicionarCar = ( xCm, yCm) =>{
        parseFloat(xCm)
        parseFloat(yCm)
        let x = 19.2 + (xCm * 0.255)
        let y
        if(yCm < 0){
            y = 286.6 - (yCm * 0.285)
        }else {
            y = 232.4 + (yCm * 0.285)
        }
        let valorDecCord1e3 = 0, valorDecCord0e6 = 0
        let valoresIncRoda1 = []
        let valoresIncRoda2 = []
        let valoresIncRoda3 = []
        let valoresIncRoda4 = []
        let valorDecRodasY = 0, valorDecRodasX = 0
        let map = this.state.map
        let mapCar = map.areas[4]
        let mapLinha1 = map.areas[0]
        let mapLinha2= map.areas[1]
        let mapLinha3 = map.areas[2]
        let mapLinha4 = map.areas[3]
        let mapRoda1 = map.areas[5]
        let mapRoda2 = map.areas[6]
        let mapRoda3 = map.areas[7]
        let mapRoda4 = map.areas[8]

        //Trajetoria

          
        //Trajetoria
        if(this.state.dadosMailCar.status.modo === 1){
        mapLinha1.coords[0] = 19.2 
        mapLinha1.coords[2] = 19.2 + 2
        mapLinha1.coords[4] = 19.2 + 2
       mapLinha1.coords[6] = 19.2
       mapLinha1.coords[1] = 283.6
       mapLinha1.coords[3] = 283.6
       mapLinha1.coords[5] = 233
       mapLinha1.coords[7] = 233

       mapLinha2.coords[0] = 19.2
       mapLinha2.coords[2] = 475.8
       mapLinha2.coords[4] = 475.8
       mapLinha2.coords[6] = 19.2
       mapLinha2.coords[1] = 285
       mapLinha2.coords[3] = 285
       mapLinha2.coords[5] = 287
       mapLinha2.coords[7] = 287

       mapLinha3.coords[0] = 475.8 
       mapLinha3.coords[2] = 479.8 - 6
       mapLinha3.coords[4] = 479.8 - 6
       mapLinha3.coords[6] = 475.8 
       mapLinha3.coords[1] = 285
       mapLinha3.coords[3] = 285
       mapLinha3.coords[5] = 230.67000000000002
       mapLinha3.coords[7] = 230.67000000000002

       mapLinha4.coords[0] = 475.8
       mapLinha4.coords[2] = 19.2 
       mapLinha4.coords[4] = 19.2 
       mapLinha4.coords[6] = 475.8
       mapLinha4.coords[1] = 230.55
       mapLinha4.coords[3] = 230.55
       mapLinha4.coords[5] = 232.55
       mapLinha4.coords[7] = 232.55
           }
        //Carrinho
       //x em cm 0
        if(xCm <= 10 ){
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 5.5
            mapCar.coords[4] = x + 5.5
            mapCar.coords[6] = x

            valorDecCord1e3 = 7.12

            valoresIncRoda1[0] = 0
            valoresIncRoda1[1] = 2

            valoresIncRoda2[0] = 0
            valoresIncRoda2[1] = 5.13

            valoresIncRoda3[0] = 5
            valoresIncRoda3[1] = 2

            valoresIncRoda4[0] = 5
            valoresIncRoda4[1] = 5.13

        }else{
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 7.12
            mapCar.coords[4] = x + 7.12
            mapCar.coords[6] = x

            valorDecCord1e3 = 5.5

            valoresIncRoda1[0] = 2
            valoresIncRoda1[1] = 0

            valoresIncRoda2[0] = 5.13
            valoresIncRoda2[1] = 0

            valoresIncRoda3[0] = 2
            valoresIncRoda3[1] = 5

            valoresIncRoda4[0] = 5.13
            valoresIncRoda4[1] = 5
         }
         if(xCm > 910){
            valorDecRodasX = 7.12
            mapCar.coords[0] = x - 7.12
            mapCar.coords[2] = x
            mapCar.coords[4] = x
            mapCar.coords[6] = x - 7.12
         }else{
            mapCar.coords[0] = x
            mapCar.coords[2] = x + 7.12
            mapCar.coords[4] = x + 7.12
            mapCar.coords[6] = x
         }
        if(yCm > 105){
            valorDecRodasY = valorDecCord1e3
            mapCar.coords[1] = y - valorDecCord1e3
            mapCar.coords[3] = y - valorDecCord1e3
            mapCar.coords[5] = y
            mapCar.coords[7] = y
        }else{
            mapCar.coords[1] = y
            mapCar.coords[3] = y
            mapCar.coords[5] = y + valorDecCord1e3
            mapCar.coords[7] = y + valorDecCord1e3
        }

            //Roda 1
           mapRoda1.coords[0] = x + valoresIncRoda1[0] - valorDecRodasX
           mapRoda1.coords[1] = y + valoresIncRoda1[1] - valorDecRodasY
           mapRoda1.coords[2] = 1

            //Roda 2
           mapRoda2.coords[0] = x +  valoresIncRoda2[0] - valorDecRodasX
           mapRoda2.coords[1] = y + valoresIncRoda2[1] - valorDecRodasY
           mapRoda2.coords[2] = 1

            //Roda 3
           mapRoda3.coords[0] = x +  valoresIncRoda3[0] - valorDecRodasX
           mapRoda3.coords[1] = y + valoresIncRoda3[1] - valorDecRodasY
           mapRoda3.coords[2] = 1

            //Roda 4
           mapRoda4.coords[0] = x + valoresIncRoda4[0] - valorDecRodasX
           mapRoda4.coords[1] = y +  valoresIncRoda4[1] - valorDecRodasY
           mapRoda4.coords[2] = 1

            //Tooltip
            let positionTooltip = []
            let xi = 19.2, yi = 232.4, xf = 479.8, yf = 286.6

            if (x <= xi && y >= yi && this.state.dadosMailCar.coord.y <=yf){
                this.state.placement = 'right'
                positionTooltip[0] = x + 25
                positionTooltip[1] = y - 3  - valorDecRodasY
            } else if(y >= (yi + 30) && x > xi && x < xf ){
                this.state.placement = 'top'
                positionTooltip[0] = x + 13
                positionTooltip[1] = y - 42  - valorDecRodasY
            }else{
                this.state.placement = 'bottom'
                positionTooltip[0] = x + 13
                positionTooltip[1] = y + 10  //- valorDecRodasY
             }

            this.setState({map: map, hoveredArea: positionTooltip})

    }
    // desenharTrajetoria = () =>{
    //
    //     //MbM para mb1
    //     if(this.state.dadosMailCar.coord.y < 210 && this.state.dadosMailCar.coord.x == 0){
    //         for(var i = 0; i <= 5; i++){
    //             this.posicionarCar(this.state.dadosMailCar.coord.x , (this.state.dadosMailCar.coord.y + 5))
    //             this.state.dadosMailCar.coord.y = this.state.dadosMailCar.coord.y + 5
    //         }
    //     }else if ( this.state.dadosMailCar.coord.x < 1799  && this.state.dadosMailCar.coord.y >= 210) {
    //         for(var i = 0; i <= 5; i++){
    //             this.posicionarCar((this.state.dadosMailCar.coord.x + 25) , this.state.dadosMailCar.coord.y )
    //             this.state.dadosMailCar.coord.x = this.state.dadosMailCar.coord.x + 25            }
    //     }else if(this.state.dadosMailCar.coord.x >= 1799 && this.state.dadosMailCar.coord.y > 0){
    //         for(var i = 0; i <= 5; i++){
    //             this.posicionarCar(this.state.dadosMailCar.coord.x , (this.state.dadosMailCar.coord.y - 5))
    //             this.state.dadosMailCar.coord.y = this.state.dadosMailCar.coord.y - 5
    //         }
    //
    //     }else {
    //         for(var i = 0; i <= 5; i++){
    //             this.posicionarCar((this.state.dadosMailCar.coord.x - 25) , this.state.dadosMailCar.coord.y )
    //             this.state.dadosMailCar.coord.x = this.state.dadosMailCar.coord.x - 25            }
    //     }
    //
    // }

    visaualizarSensores = () =>{
        window.open('/sensores')

    }
    closeModal = (msgAlerta) => {

        let state = this.state;
        state.showModal = false;
        this.setState(state);
        if(msgAlerta) {
            Alerta.success(msgAlerta, {});
        }

    };
    showModal = () => {
        let state = this.state;
        state.showModal = true;
        this.setState(state);
    };
  
    iconeBateria = () =>{
        if(parseInt(this.state.dadosMailCar.instru.bate) === 1 ){
            this.state.corIconeBateria = 'green'
            return 'battery-full';
        }else if(parseInt(this.state.dadosMailCar.instru.bate) === 3){
            this.state.corIconeBateria = 'yellow'
            return 'battery-quarter';
        }else{
            return 'battery-full';
        }
    }
    modoOperacao = () =>{
        if(this.state.dadosMailCar.status.modo === 0){
            return 'Desligado';
        }else if(this.state.dadosMailCar.status.modo === 1){
            return 'Circular';
        }else if(this.state.dadosMailCar.status.modo === 2){
            return 'Expresso';
        }else if(this.state.dadosMailCar.status.modo === 3){
            return 'Recarga';
        }else{
            return '';
        }
    }

    desligar = () =>{
        this.setState({isLoading: true})
        axios('http://localhost:8080/api/setData', {
            mode:'no-cors',
            method: 'POST',
            // headers:{'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'},
            params: JSON.stringify({  modo: "0", destino: "",sentido: ""})
        })
            .then(response => {  this.setState({isLoading: false})})
            .catch(err => console.log(err));


    }
    render(){
            //const socket = socketIOClient(this.state.endpoint);

        return(
            <div >
                 <Navbar expand="xl" className='no-padding menu'>
                    <Navbar.Brand href="#home" className='no-padding'>
                        <img
                            alt=""
                            src="/logoAutoMail.jpg"
                            width="350"
                            height="70"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="#" className="title-menu">Estação de Controle</Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Button className="botao-contato"> Contato</Button>
                    </Navbar.Brand>
                    <Navbar.Brand className="contato-menu">   
                        <Link className="botao-sair" to='/' onClick={this.desligar}> Desconectar <FontAwesomeIcon icon='times'></FontAwesomeIcon></Link>
                    </Navbar.Brand>
                </Navbar>
                <Alerta position='top-right' />
                <div className='alerta'>
                    {this.state.mensagensAlertas.map(msg =>
                <Alert variant="danger" show={true} onClose={false} >
                    {msg}
                </Alert>
                    )}
                </div>

                <ModalModoExpr showModal={this.state.showModal} closeModal={this.closeModal} map={this.state.map} placement={this.state.placement} hoveredArea={this.state.hoveredArea}
                               getTipPosition={this.getTipPosition}/>
                <Card className="card-tela-principal" style={{boxShadow: 'rgb(169, 166, 166) 2px 2px 12px'}}>
                    <Card.Body>
                        <Row  style={{paddingLeft: '1%'}}>
                            <Col xs={12} md={3}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontSize: '15px'}}>Modo de Operação</Form.Label>
                                    <Form.Control size='sm' value={this.modoOperacao()}
                                    type="text"  readOnly/>
                                </Form.Group>
                            </Col>
                            <Col  xs={12} md={3} className='botoes-tela-principal'  style={{ paddingTop: '1.5%', paddingLeft: '7%'}}>
                                <Button size='sm' disabled={this.state.dadosMailCar.status.modo !== 1} onClick={this.showModal}>Modo Expresso</Button>
                            </Col>
                            <Col xs={12} md={4} className='botoes-tela-principal' style={{ paddingTop: '1.5%', paddingLeft: '4%'}}>
                                <Button size='sm' onClick={()=> this.visaualizarSensores()}>Visualizar dados dos sensores</Button>
                            </Col>
                            <Col  xs={12} md={2} className='botoes-tela-principal'  style={{ paddingLeft: '3%', paddingTop: '1%' }}>
                                {this.state.dadosMailCar.instru.bate !== " " || this.state.dadosMailCar.instru.bate !== null || this.state.dadosMailCar.instru.bate!== undefined?
                                <FontAwesomeIcon icon={this.iconeBateria()} color={this.state.corIconeBateria}size="4x"/>
                                : ""
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
               
            
                <Row style={{paddingTop: '70px'}}>
                    <Col md={6} style={{marginLeft: '30%'}}>
                        <ImageMapper src={URL} map={this.state.map} width={500}
                                     onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
                                     onImageClick={evt => this.clickedOutside(evt)}
                                     onImageMouseMove={evt => this.moveOnImage(evt)}
                        />

                        {this.state.hoveredArea && !this.state.showModal && (
                            <Tooltip id="overlay-example"
                            placement={this.state.placement}
                            style={{ ...this.getTipPosition(this.state.hoveredArea) }}>
                                MailCar
                            </Tooltip>

                       )}
                        <pre className="message">
                        {this.state.msg ? this.state.msg : null}
                    </pre>
                        <pre>{this.state.moveMsg ? this.state.moveMsg : null}</pre>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default TelaPrincipal;