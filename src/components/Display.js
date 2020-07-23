import React from 'react';

class Display extends React.Component{
    constructor(){
        super();
        this.state={
            touch:false
        }
        this.play=this.play.bind(this);
        this.iniciarAnimacion=this.iniciarAnimacion.bind(this);
    }
    play(evt){
        evt.preventDefault();
        this.setState({touch:false});
        this.props.iniciar();
    }
    iniciarAnimacion(num){
        this.setState({touch:true});
    }
    render(){
        let ms=this.props.ms;
        const minutos=(ms/60000)|0;
        ms=ms-minutos*60000;
        const segundos=(ms/1000)|0;
        ms=(ms-segundos*1000)/10|0;
        const classContador="contador"+(this.props.pausa && this.props.iniciado ?" pausa":"");
        const classContenedor="contenedor-circulo"+(minutos>0|| segundos>58?" small":"")
        +(this.props.vueltas>0?" arriba":"");
        return(
            <div className={classContenedor}>
                <div 
                    className={this.state.touch?"circulo animacion":"circulo"}
                    onTouchStart={this.iniciarAnimacion}
                    onMouseDown={this.iniciarAnimacion}
                    onTouchEnd={evt=>this.play(evt)}
                    onMouseUp={evt=>this.play(evt)}
                >
                    <div className={classContador}>
                        <span>{minutos>0?minutos+":":""}</span>
                        <span>{minutos>0?segundos>=10?segundos:"0"+segundos:segundos}</span>
                        <span className="ms">{ms>=10?ms:"0"+ms}</span>
                    </div>
                </div>
            </div>
    )
    }
}
export default Display;