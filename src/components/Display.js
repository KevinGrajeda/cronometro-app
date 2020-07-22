import React from 'react';

class Display extends React.Component{
    constructor(){
        super();
        this.state={
            touch:false
        }
    }
    render(){
        let ms=this.props.ms;
        const minutos=(ms/60000)|0;
        ms=ms-minutos*60000;
        const segundos=(ms/1000)|0;
        ms=(ms-segundos*1000)/10|0;
        const classContador="contador"+(this.props.pausa && this.props.iniciado ?" pausa":"");
        const classContenedor="contenedor-circulo"+(minutos>0|| segundos>58?" small":"");
        return(
            <div className={classContenedor}>
                <div 
                    className={this.state.touch?"circulo animacion ":"circulo"}
                    onTouchStart={()=>this.setState({touch:true})} 
                    onClick={this.props.handleClick} 
                    onTouchEnd={evt=>{this.setState({touch:false})
                        this.props.handleClick(evt)}} >
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