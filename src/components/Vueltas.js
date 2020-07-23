import React from 'react';

class Vueltas extends React.Component{
    constructor(){
        super();
        this.state={
        }
    }
    shouldComponentUpdate(nextProps,prevState) {
        if(this.props.vueltas===nextProps.vueltas){
            return false 
        }
        return true
    }
    imprimirHora(min,seg,ms){
        min=min<10?''+min:min;
        seg=seg<10?'0'+seg:seg;
        ms=ms<10?'0'+ms:ms;
        return `${min} ${seg}.${ms}`
    }
    render(){
        const vueltas=this.props.vueltas.map((vuelta,id)=>{
            return(
                <li key={id+1}>
                    <span className="numero-vuelta">Vuelta {id+1}&nbsp;&nbsp;&nbsp;</span>
                    {this.imprimirHora(vuelta.previo.minutos,vuelta.previo.segundos,vuelta.previo.ms)}&nbsp;&nbsp;
                    {this.imprimirHora(vuelta.actual.minutos,vuelta.actual.segundos,vuelta.actual.ms)}
                </li>
            )
        }).reverse();
        return(
            <div className="contenedor-vueltas">
                <ul>
                    {vueltas}
                </ul>
            </div>
        )
    }
}
export default Vueltas;