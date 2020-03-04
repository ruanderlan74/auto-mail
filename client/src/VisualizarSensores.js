  import React, {Component} from 'react';
  import { LineChart, Line, XAxis,YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
  import {FormControl, Button,Col, Row, InputGroup, Navbar} from 'react-bootstrap';
  import './css/estilo.css';
  import axios from 'axios';
  import socketIOClient from "socket.io-client";


  class VisualizarSensores extends Component {
    constructor(props){
      super(props);
      this.state={
        instru: {
          accx: "", 
          accy: "", 
          vg: "",
          velox: "", 
          veloy: "", 
          distan: "",
          angulo: "",
          bate: "",
          enco1: "",
          enco2: "",
          ultra1: "",
          ultra2: "", 
          ultra3: ""
        },
        graficoVelocidadeGiro: [
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
          {v: ""},
      
        ],

        graficoAcelaracao:[
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
         {acx: "", acy:""},
          {acx: "", acy:""},

        ],
        graficoAngulo: [
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
      
        ],

        graficoAngulo: [
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
          {a: ""},
      
        ],

        graficoVelocidade:[
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},
          {vx: "", vy:""},

         ],

         graficoEncoder:[
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},
          {e1: "", e2:""},

         ],

         graficoUtra:[
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},
          {u1: "", u2:"", u3:""},

         ],

        endpoint: "http://localhost:8080",
        
      }
      this.socket = socketIOClient(this.state.endpoint)

      this.socket.on('getData', (json, qtdMenssagens) =>{
          console.log(json)
          this.setState({instru: json.instru})
          if(qtdMenssagens !==0){
          this.montarGraficoVelGiro()
          this.montarGraficoAceleracao()
          this.montarGraficoAngulo()
           this.montarGraficoVelocidade()
          this.montarGraficoEncoder()
          this.montarGraficoUltra()
         }
        //  else{
        //    let state = this.state
        //    state.graficoAcelaracao = [
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //     {acx: "", acy:""},
        //      {acx: "", acy:""},
   
        //    ]
        //    state.graficoVelocidadeGiro = [
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        //     {v: ""},
        
        //   ]

        //   state.graficoAngulo = [
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        
        //   ]
  
        //   state.graficoAngulo = [
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        //     {a: ""},
        
        //   ]
  
        //   state.graficoVelocidade = [
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
        //     {vx: "", vy:""},
  
        //    ]
  
        //    state.graficoEncoder = [
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
        //     {e1: "", e2:""},
  
        //    ]
  
        //    state.graficoUtra = [
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
        //     {u1: "", u2:"", u3:""},
  
        //    ]

        //    this.setState(state)
        //  }
      })

    }
    getMensagem() {
      this.socket.emit('getData')

  }
    componentDidMount(){
     //this.getMensagem()
     //     this.intervalo = setInterval( () => this.tratarMensagens(), 1000);
     this.intervalo = setInterval( () => this.getMensagem(), 1000);
      }

      montarGraficoVelGiro = () =>{
        let state = this.state
        parseFloat(state.instru.vg)
       //state.instru.vg = Math.random() * (200 - (-200)) + (-200)

        if(state.graficoVelocidadeGiro[0].v === ""){
          state.graficoVelocidadeGiro[0] = {vg: state.instru.vg, v: state.instru.vg}
        }else{
          for(var i = (state.graficoVelocidadeGiro.length - 1); i > 0; i--){
            state.graficoVelocidadeGiro[i] = state.graficoVelocidadeGiro[i-1]
            }
        state.graficoVelocidadeGiro[0] = {vg: state.instru.vg, v: state.instru.vg}
        
      }
        
         this.setState(state);
      }
      montarGraficoAceleracao = () =>{
        let state = this.state
        parseFloat(state.instru.accx)
        parseFloat(state.instru.accy)

        // state.instru.accx = Math.random() * (10 - (-10)) + (-10)
        // state.instru.accy = Math.random() * (10 - (-10)) + (-10)


        if(state.graficoAcelaracao[0].acx === "" && state.graficoAcelaracao[0].acy === ""){
          state.graficoAcelaracao[0] = {accx: state.instru.accx, acx:state.instru.accx, accy: state.instru.accy, acy:state.instru.accy}
        }else{
          for(var i = (state.graficoAcelaracao.length - 1); i > 0; i--){
            state.graficoAcelaracao[i] = state.graficoAcelaracao[i-1]
            }
        state.graficoAcelaracao[0] = {accx: state.instru.accx, acx: state.instru.accx, accy: state.instru.accy, acy: state.instru.accy}
        
      }
      this.setState(state);

    }

      montarGraficoAngulo = () =>{
        let state = this.state
        parseFloat(state.instru.angulo)
       //state.instru.angulo = Math.random() * (360 - (-360)) + (-360)

        if(state.graficoAngulo[0].a === ""){
          state.graficoAngulo[0] = {angulo: state.instru.angulo, a: state.instru.angulo}
        }else{
          for(var i = (state.graficoAngulo.length - 1); i > 0; i--){
            state.graficoAngulo[i] = state.graficoAngulo[i-1]
            }
        state.graficoAngulo[0] = {angulo: state.instru.angulo, a: state.instru.angulo}
        
      }
    
         this.setState(state);
      }
      montarGraficoVelocidade= () =>{
        let state = this.state
        parseFloat(state.instru.velox)
        parseFloat(state.instru.veloy)

        // state.instru.velox = Math.random() * (1 - 0) + 0
        // state.instru.veloy = Math.random() * (1 - 0) + 0


        if(state.graficoVelocidade[0].vx === "" && state.graficoVelocidade[0].vy === ""){
          state.graficoVelocidade[0] = {velox: state.instru.velox, vx:state.instru.velox, veloy: state.instru.veloy, vy:state.instru.veloy}
        }else{
          for(var i = (state.graficoVelocidade.length - 1); i > 0; i--){
            state.graficoVelocidade[i] = state.graficoVelocidade[i-1]
            }
        state.graficoVelocidade[0] = {velox: state.instru.velox, vx: state.instru.velox, veloy: state.instru.veloy, vy: state.instru.veloy}
        
      }
      this.setState(state);

    }
    montarGraficoEncoder= () =>{
      let state = this.state
      parseFloat(state.instru.enco1)
      parseFloat(state.instru.enco2)

      // state.instru.enco1 = Math.random() * (10 - 0) + 0
      // state.instru.enco2 = Math.random() * (10 - 0) + 0


      if(state.graficoEncoder[0].e1 === "" && state.graficoEncoder[0].e2 === ""){
        state.graficoEncoder[0] = {enco1: state.instru.enco1, e1:state.instru.enco1, enco2: state.instru.enco2, e2:state.instru.enco2}
      }else{
        for(var i = (state.graficoEncoder.length - 1); i > 0; i--){
          state.graficoEncoder[i] = state.graficoEncoder[i-1]
          }
      state.graficoEncoder[0] = {enco1: state.instru.enco1, e1: state.instru.enco1, enco2: state.instru.enco2, e2: state.instru.enco2}
      
    }
    this.setState(state);

  }

  montarGraficoUltra= () =>{
    let state = this.state
    parseFloat(state.instru.ultra1)
    parseFloat(state.instru.ultra2)
    parseFloat(state.instru.ultra3)


    // state.instru.ultra1 = Math.random() * (4 - 2) + 2
    // state.instru.ultra2 = Math.random() * (4 - 2) + 2
    // state.instru.ultra3 = Math.random() * (4 - 2) + 2



    if(state.graficoUtra[0].u1 === "" && state.graficoUtra[0].u2 === "" &&  state.graficoUtra[0].u3 === ""){
      state.graficoUtra[0] = {ultra1: state.instru.ultra1, u1:state.instru.ultra1, ultra2: state.instru.ultra2, u2:state.instru.ultra2,  ultra3: state.instru.ultra3, u3:state.instru.ultra3}
    }else{
      for(var i = (state.graficoUtra.length - 1); i > 0; i--){
        state.graficoUtra[i] = state.graficoUtra[i-1]
        }
    state.graficoUtra[0] = {ultra1: state.instru.ultra1, u1: state.instru.ultra1, ultra2: state.instru.ultra2, u2: state.instru.ultra2, ultra3: state.instru.ultra3, u3: state.instru.ultra3}
    
  }
  this.setState(state);

}
  //   getMensagem = () => {
  //     axios.get('http://localhost:8080/api/getDataSensores', {mode:'no-cors',  timeout: 2000}, )
  //         .then(response => {
  //           let state = this.state
  //           state.instrumentacao= response.data.data.instru
  //           let random = Math.random() * (360 - (-360)) + (-360)
  //           if(state.graficoVelocidadeGiro[0].v === ""){
  //             state.graficoVelocidadeGiro[0] = {vg: response.data.data.instru.vg, v: response.data.data.instru.vg}

  //           }else{
  //           for(var i = (state.graficoVelocidadeGiro.length - 1); i > 0; i--){

  //             //if(state.graficoVelocidadeGiro[i].v == "" ){
  //             state.graficoVelocidadeGiro[i] = state.graficoVelocidadeGiro[i-1]
  //             }
  //             state.graficoVelocidadeGiro[0] = {vg:  response.data.data.instru.vg, v:  response.data.data.instru.vg}
            
  //         }
  //           state.instrumentacao.distan = 10
  //           //const dataG = this.state.graficoVelocidadeGiro
  //            this.setState(state);
  //             console.log(response.data)
  //         }	).catch(err => console.log(err));

  // };
  componentDidUpdate(prevProps, prevState) {
    return this.state.graficoVelocidadeGiro !== prevState.graficoVelocidadeGiro;
  }

  render(){
      return(
          <div>
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
                </Navbar>
        <div className='container'>

        <Row style={{paddingTop: '15px'}}>
      <Col md={12} style={{textAlign: 'center', paddingtop: '15px'}}>
      <h2>Informações dos Sensores</h2>
      </Col>
            </Row>
            <Row style={{ marginTop: '15px'}}>
              <Col md={12}>
                  <label>Distância percorrida: </label>
              <Col xs={12} md={2}>
            <InputGroup className="mb-3">
              <FormControl
                    readOnly
                  value={this.state.instru.distan}
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </Col>
            </Col>

            </Row>
        
  <Row >
      <Col xs={12} md={6} >
          <label>Velocidade: </label>
      </Col>
      <Col xs={12} md={6}  style={{paddingLeft: '5%'}}>
          <label>Aceleração: </label>
      </Col>
  </Row>
  
  <Row>             
       <Col xs={12} md={6} >
       <LineChart
              width={600}
              height={300}
              data={this.state.graficoVelocidade}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          name="Velocidade em X"
          type='monotone'
          dataKey='velox'
          stroke='#2A58BC'
          strokeWidth={2}
          dot={false}
          />
        <Line
          name="Velocidade em Y"
          type='monotone'
          dataKey='veloy'
          stroke='#358645'
          strokeWidth={2}
          dot={false}
          />
              <CartesianGrid strokeDasharray='1 1'/>
              <Tooltip/>
              <YAxis  domain={[0, 1]}/>

              <XAxis/>
              <Legend/>
            </LineChart>
          </Col>
          <Col xs={12} md={6} >
          <LineChart
              width={600}
              height={300}
              data={this.state.graficoAcelaracao}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
              style={{paddingLeft: '8%'}}
        >
        <Line
          name="Aceleração em X"
          type='monotone'
          dataKey='accx'
          stroke='#2A58BC'
          strokeWidth={2}
          dot={false}
          />
        <Line
          name="Aceleração em Y"
          type='monotone'
          dataKey='accy'
          stroke='#358645'
          strokeWidth={2}
          dot={false}
          />
              <CartesianGrid strokeDasharray='1 1'/>
              <Tooltip/>
              <YAxis  domain={[-10, 10]}/>
              {/* <Legend payload={data4}/> */}

              <XAxis/>
              <Legend />
            </LineChart>
            </Col>
      </Row>

             
  <Row >
      <Col xs={12} md={6} >
          <label>Velocidade de giro: </label>
      </Col>
      <Col xs={12} md={6}  style={{paddingLeft: '5%'}}>
          <label>Ângulo: </label>
      </Col>
  </Row>

  <Row>             
       <Col xs={12} md={6} >
        <LineChart
              width={600}
              height={300}
              data={this.state.graficoVelocidadeGiro}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          name="Velocidade de giro"
          type='monotone'
          dataKey='vg'
          stroke='#2A58BC'
          strokeWidth={2}
          dot={false}
          />
              <CartesianGrid strokeDasharray='1 1'/>
              <Tooltip/>
              <YAxis domain={[-200, 200]}/>
              {/* <Legend payload={data4}/> */}

              <XAxis/>
              <Legend />
            </LineChart>
          </Col>
          <Col xs={12} md={6} >
          <LineChart
              width={600}
              height={300}
              data={this.state.graficoAngulo}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
              style={{paddingLeft: '8%'}}

        >
        <Line
          name="Ângulo"
          type='monotone'
          dataKey='angulo'
          stroke='#2A58BC'
          strokeWidth={2}
          dot={false}
          />
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <YAxis  domain={[-360, 360]}/>
              <XAxis />
              <Legend />
            </LineChart>
            </Col>
      </Row>

      <Row >
      <Col xs={12} md={6} >
          <label>Encoders: </label>
      </Col>
      <Col xs={12} md={6}  style={{paddingLeft: '5%'}}>
          <label>Ultrassônicos: </label>
      </Col>
  </Row>

  <Row>             
      <Col xs={12} md={6} >
       <LineChart
              width={600}
              height={300}
              data={this.state.graficoEncoder}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <Line
          name="Encoder 1"
          type='monotone'
          dataKey='enco1'
          stroke='#2A58BC'
          strokeWidth={2}
          dot={false}
          />
        <Line
          name="Encoder 2"
          type='monotone'
          dataKey='enco2'
          stroke='#358645'
          strokeWidth={2}
          dot={false}
          />
          <CartesianGrid strokeDasharray='1 1'/>
          <Tooltip/>
          <YAxis  domain={[0, 10]}/>

          <XAxis/>
          <Legend />
          </LineChart>
        </Col>
        <Col xs={12} md={6} >
          <LineChart
              width={600}
              height={300}
              data={this.state.graficoUtra}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
              style={{paddingLeft: '8%'}}
          >
          <Line
          name="Ultrassônico 1"
            type='monotone'
            dataKey='ultra1'
            stroke='#2A58BC'
            strokeWidth={2}
            dot={false}
            />
            <Line
            name="Ultrassônico 2"
              type='monotone'
              dataKey='ultra2'
              stroke='#358645'
              strokeWidth={2}
              dot={false}
          />
          <Line
          name="Ultrassônico 3"
              type='monotone'
              dataKey='ultra3'
              stroke='#E87422'
              strokeWidth={2}
              dot={false}
          />
              <CartesianGrid strokeDasharray='3 3'/>
              <Tooltip/>
              <YAxis  domain={[0, 4]}/>
              <XAxis/>
              <Legend />
            </LineChart>
            </Col>
      </Row>

    </div>
  </div>
      )
  }
  }
  export default VisualizarSensores;
