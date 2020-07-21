import React from 'react';

class Display extends React.Component{
    constructor(){
        super();
        this.state={
            touch:false
        }
    }
    render(){
        
        const segundos=Math.floor(this.props.ms/1000);
        const milisegundos=(this.props.ms-(segundos*1000))/10|0;
        return(
        <div 
            className={this.state.touch?"circulo animacion ":"circulo"}
            onTouchStart={()=>this.setState({touch:true})} 
            onClick={this.props.handleClick} 
            onTouchEnd={evt=>{this.setState({touch:false})
                this.props.handleClick(evt)}} >
            <span>{segundos}</span><span className="ms">{milisegundos>=10?milisegundos:"0"+milisegundos}</span>
        </div>
    )
    }
}
export default Display;