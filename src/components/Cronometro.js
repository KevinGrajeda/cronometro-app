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
        this.space=this.space.bind(this);
        this.actualizarHead=this.actualizarHead.bind(this);
    }
    iniciar(){
        if(this.state.inicio){
            this.setState({pausa:true});
            this.setState({msPrev:this.state.milisegundos,inicio:null});
            clearInterval(this.state.idTimer);
            clearInterval(this.state.idTimer2);
        }else{
            this.setState({pausa:false});
            this.setState({inicio:new Date()});
            const idInterval=setInterval(this.contar,10);
            const idInterval2=setInterval(this.actualizarHead,333);
            this.setState({idTimer:idInterval,idTimer2:idInterval2,iniciado:true});
        }
    }
    detener(){
        clearInterval(this.state.idTimer);
        document.title="Cronómetro";
        clearInterval(this.state.idTimer2);
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
    actualizarHead(){
        let ms=this.state.milisegundos;
        let horas=0;
        if(ms>=3.6e6){
            horas=(ms/3.6e6)|0;
            ms%=3.6e6;
        }
        const minutos=(ms/60000)|0;
        ms%=60000;
        const segundos=(ms/1000)|0;
        document.title=`${horas>0?horas+":":""}${minutos>=10?minutos:"0"+minutos}:${segundos>=10?segundos:"0"+segundos}`
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
        let horas=0;
        if(ms>=3.6e6){
            horas=(ms/3.6e6)|0;
            ms%=3.6e6;
        }
        const minutos=(ms/60000)|0;
        ms%=60000;
        const segundos=(ms/1000)|0;
        ms=(ms%1000)/10|0;
        return {horas,ms,segundos,minutos};
    }
    space(event){
        if(event.keyCode === 32 || event.keyCode === 13) {
            this.iniciar();
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.space, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.space, false);
    }

    render(){
        return(
        <div className="central">
            <Display iniciar={this.iniciar} tiempo={this.msAHoras(this.state.milisegundos)} pausa={this.state.pausa} iniciado={this.state.iniciado} vueltas={this.state.vueltas.length}/>
            <Vueltas vueltas={this.state.vueltas}/>
            <Botones detener={this.detener} iniciar={this.iniciar} vuelta={this.vuelta} iniciado={this.state.iniciado} vueltas={this.state.vueltas.length} pausa={this.state.pausa} />
        </div>
    )
    }
}
export default Cronometro;