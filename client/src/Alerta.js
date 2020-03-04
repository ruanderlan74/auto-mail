import Alert from "react-s-alert";

export default {
  handleAlert(type, message) {
    return (Alert[type]( message,
    {
        position: 'top-right',
        effect: 'scale',
       
    }))
    // return alerta;
}
}
// import React, {Component} from 'react';
// import {Alert} from 'react-bootstrap';

// class Alerta extends Component {

//     render(){
//         return(
//             this.props.mensagensAlertas.map((msg, id) => (
//                 <Alert variant="danger" key={id} show={this.props.mostrarAlerta} onClose={false}>
//                       {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
//                       <p>
//                         {msg}
//                       </p>
//                     </Alert>
//                     ))
//         )
//                 }
// }
// export default Alerta;