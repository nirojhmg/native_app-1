import React, {Component} from 'react';

export default class Todos extends Component{
    render(){
    return this.props.namelists.map((namelist)=>{

    <h3>{namelist.title}</h3>

    });
    }
    }

