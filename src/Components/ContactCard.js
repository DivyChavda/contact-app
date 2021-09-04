import React from 'react'
import user from "../images/user.png";
import {
    Link
  } from "react-router-dom";


export const ContactCard = ({contact,onDelete}) => {
    console.log(contact);
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"></img>
            <div className="content">
                <Link to={{pathname:`/contact/${contact.id}`, state:{contact: contact}}}>
                <div>{contact.id}</div>
                <div className="header">{contact.name}</div>
                <div>{contact.email}</div>
                </Link>
            </div>
            <i className="trash alternate outline icon" onClick={() => {onDelete(contact)}} style={{color: "red",marginTop:"7px", marginLeft:"10px"}}></i>

            <Link to={{pathname:`/edit`, state:{contact: contact}}}>
            <i className="edit alternate outline icon" style={{color: "blue",marginTop:"7px"}}></i>
            </Link>
        </div>
    );
};
