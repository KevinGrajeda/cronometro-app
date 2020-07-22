import React from 'react';
import Display from './Display';
import Botones from './Botones';

class Cronometro extends React.Component{
    constructor(){
        super();
        this.state={
            milisegundos:0,
            msPrev:0,
            segundos:0,
            idTimer:null,
            inicio:null,
            iniciado:false,
            play:false,
            pausa:true,
            vueltas:{

            }
        }
        this.iniciar=this.iniciar.bind(this);
        this.contar=this.contar.bind(this);
        this.detener=this.detener.bind(this);
        this.vuelta=this.vuelta.bind(this);
    }
    iniciar(evt){
        evt.preventDefault()
        if(this.state.inicio){
            this.setState({pausa:true});
            this.setState({msPrev:this.state.milisegundos,inicio:null});
            clearInterval(this.state.idTimer);
        }else{
            this.setState({pausa:false});
            this.setState({inicio:new Date()});
            const idInterval=setInterval(this.contar,10);
            this.setState({idTimer:idInterval,iniciado:true});
        }
    }
    detener(){
        clearInterval(this.state.idTimer);
        this.setState({
            iniciado:false,
            msPrev:0,
            milisegundos:0,
            pausa:true,
            inicio:null,
        });
    }
    contar(){
        let current = new Date();
        let count =this.state.msPrev+ +current - +this.state.inicio;
        this.setState(prev=>{
            return {milisegundos:count};
        });
    }
    vuelta(){
        //console.log(this.state.milisegundos);
    }
    render(){
        return(
        <div className="central">
            <Display handleClick={this.iniciar} ms={this.state.milisegundos} pausa={this.state.pausa} iniciado={this.state.iniciado}/>
            
            <Botones detener={this.detener} handleClick={this.iniciar} vuelta={this.vuelta} iniciado={this.state.iniciado} pausa={this.state.pausa} />
        </div>
    )
    }
}
export default Cronometro;