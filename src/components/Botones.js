import React from 'react';

class Botones extends React.Component{
    constructor(){
        super();
        this.state={
            touch:0,
        }
    }
    shouldComponentUpdate(nextProps,prevState) {
        if((this.props.iniciado===nextProps.iniciado&&this.props.pausa===nextProps.pausa)&&
        this.state===prevState){
            return false 
        }
        return true
    }
    render(){
        const claseInicio=(this.state.touch===2?"boton animacion-boton":"boton")+(this.props.iniciado?" ":"");
        const claseStop="boton stop"+(this.state.touch===1?" animacion-boton":"")
        +(this.props.iniciado?" izquierda":"");
        const claseLap="boton vuelta"+(this.state.touch===3?" animacion-boton":"")
        +(this.props.iniciado?" derecha":"")
        +(this.props.pausa?" transparente":"");
        return(
            <div className="contenedor-botones">
                <button className={claseStop}
                    onTouchStart={()=>this.setState({touch:1})}
                    onTouchEnd={evt=>{this.setState({touch:0})
                    this.props.detener(evt)}}>
                    <i className="fas fa-stop"></i>
                </button>
                <button className={claseInicio}
                    onTouchStart={()=>this.setState({touch:2})}
                    onClick={this.props.handleClick} 
                    onTouchEnd={evt=>{this.setState({touch:0})
                    this.props.handleClick(evt)}}>
                    {!this.props.pausa?
                        <i className="fas fa-pause"></i>:
                        <i className="fas fa-play"></i>
                    }
                </button>
                <button className={claseLap}
                    onTouchStart={()=>this.setState({touch:3})}
                    onTouchEnd={evt=>{this.setState({touch:0})
                    this.props.vuelta(evt)}}>
                        <i className="fas fa-undo-alt"></i>
                </button>
            </div>
        )
    }
}
export default Botones;