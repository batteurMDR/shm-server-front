import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class Log extends Component {

    render() {
        if(this.props.log.type=="info"){
            return (
                <Message info header='Info' content={this.props.log.msg}/>
            );
        }else if(this.props.log.type=="warning"){
            return (
                <Message warning header='Attention' content={this.props.log.msg}/>
            );
        }else if(this.props.log.type=="debug"){
            return (
                <Message positive header='Debug' content={this.props.log.msg}/>
            );
        }else if(this.props.log.type=="error"){
            return (
                <Message negative header='Erreur' content={this.props.log.msg}/>
            );
        }
    }
}

export default Log;