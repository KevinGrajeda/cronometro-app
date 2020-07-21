import React from 'react';
import Display from './Display';
class Cronometro extends React.Component{
    constructor(){
        super();
        this.state={
            milisegundos:0,
            segundos:0,
            idTimer:null,
            iniciado:false,
            inicio:null,
        }
        this.handleClick=this.handleClick.bind(this);
        this.contar=this.contar.bind(this);
    }
    handleClick(evt){
        evt.preventDefault()
        if(this.state.iniciado){
            clearInterval(this.state.idTimer);
            this.setState({iniciado:false});
        }else{
            this.setState({inicio:new Date()});
            const idInterval=setInterval(this.contar,10);
            this.setState({idTimer:idInterval,iniciado:true});
        }
    }
    contar(){
        let current = new Date();
        let count = +current - +this.state.inicio;
        this.setState(prev=>{
            return {milisegundos:count};
        });
    }
    render(){
        return(
        <div className="central">
            <Display handleClick={this.handleClick} ms={this.state.milisegundos}/>
            <button onClick={this.handleClick} onTouchEnd={this.handleClick} className="boton"><i className="fas fa-play"></i></button>
        </div>
    )
    }
}
export default Cronometro;