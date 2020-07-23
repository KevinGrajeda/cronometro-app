import React from 'react';
import Display from './Display';
import Botones from './Botones';
import Vueltas from './Vueltas';

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
            vueltas:[],
            msVueltaAnterior:0,
        }
        this.iniciar=this.iniciar.bind(this);
        this.contar=this.contar.bind(this);
        this.detener=this.detener.bind(this);
        this.vuelta=this.vuelta.bind(this);
    }
    iniciar(){
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
            vueltas:[],
            msVueltaAnterior:0,
        });
    }
    contar(){
        let current = new Date();
        let count =this.state.msPrev+ +current - +this.state.inicio;
        this.setState({milisegundos:count});
    }
    vuelta(){
        this.setState(prev=>{
            return {
                vueltas:prev.vueltas.concat({
                    actual:this.msAHoras(this.state.milisegundos),
                    previo:this.msAHoras(this.state.milisegundos-this.state.msVueltaAnterior),
                }),
                msVueltaAnterior:prev.milisegundos,
        };
        });
    }
    msAHoras(milis){
        let ms=milis;
        const minutos=(ms/60000)|0;
        ms=ms-minutos*60000;
        const segundos=(ms/1000)|0;
        ms=(ms-segundos*1000)/10|0;
        return {ms,segundos,minutos};
    }
    render(){
        return(
        <div className="central">
            <Display iniciar={this.iniciar} ms={this.state.milisegundos} pausa={this.state.pausa} iniciado={this.state.iniciado} vueltas={this.state.vueltas.length}/>
            <Vueltas vueltas={this.state.vueltas}/>
            <Botones detener={this.detener} iniciar={this.iniciar} vuelta={this.vuelta} iniciado={this.state.iniciado} vueltas={this.state.vueltas.length} pausa={this.state.pausa} />
        </div>
    )
    }
}
export default Cronometro;