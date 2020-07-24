import React from 'react';

class Botones extends React.Component{
    constructor(){
        super();
        this.state={
            touch:0,
        }
        this.vuelta=this.vuelta.bind(this);
        this.play=this.play.bind(this);
        this.detener=this.detener.bind(this);
        this.iniciarAnimacion=this.iniciarAnimacion.bind(this);
    }
    shouldComponentUpdate(nextProps,prevState) {
        if((this.props.iniciado===nextProps.iniciado&&this.props.pausa===nextProps.pausa)&&
        this.state===prevState){
            return false 
        }
        return true
    }
    vuelta(evt){
        evt.preventDefault();
        this.setState({touch:0});
        this.props.vuelta();
    }
    play(evt){
        evt.preventDefault();
        this.setState({touch:0});
        this.props.iniciar();
    }
    detener(evt){
        evt.preventDefault();
        this.setState({touch:0});
        this.props.detener();
    }
    iniciarAnimacion(num){
        this.setState({touch:num});
    }
    render(){
        const claseInicio=(this.state.touch===2?"boton animacion-boton":"boton")+(this.props.iniciado?" ":"");
        const claseStop="boton stop"+(this.state.touch===1?" animacion-boton":"")
            +(this.props.iniciado?" izquierda":"");
        const claseLap="boton vuelta"+(this.state.touch===3?" animacion-boton":"")
            +(this.props.iniciado?" derecha":"")
            +(this.props.pausa?" transparente":"");
        const  classContenedor="contenedor-botones"+(this.props.vueltas>0?" abajo":"")
        return(
            <div className={classContenedor}>
                <button className={claseStop} aria-label="detener"
                    onTouchStart={evt=>this.iniciarAnimacion(1)}
                    onMouseDown={evt=>this.iniciarAnimacion(1)}
                    onTouchEnd={evt=>this.detener(evt)}
                    onMouseUp={evt=>this.detener(evt)}
                >
                    <i className="fas fa-stop"></i>
                </button>
                <button className={claseInicio} aria-label="iniciar"
                    onTouchStart={evt=>this.iniciarAnimacion(2)}
                    onMouseDown={evt=>this.iniciarAnimacion(2)}
                    onTouchEnd={evt=>this.play(evt)}
                    onMouseUp={evt=>this.play(evt)}
                >
                    {!this.props.pausa?
                        <i className="fas fa-pause"></i>:
                        <i className="fas fa-play"></i>
                    }
                </button>
                <button className={claseLap} aria-label="vuelta"
                    onTouchStart={evt=>this.iniciarAnimacion(3)}
                    onMouseDown={evt=>this.iniciarAnimacion(3)}
                    onTouchEnd={evt=>this.vuelta(evt)}
                    onMouseUp={evt=>this.vuelta(evt)}
                >
                    <i className="fas fa-undo-alt"></i>
                </button>
            </div>
        )
    }
}
export default Botones;