import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const AddContact = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();
    const submit = (e) =>
    {
        e.preventDefault();
        if(!name || !email)
        {
            alert("Name or Email cannot be blank");
        }
        else
        {
            props.addContact(name, email)
            console.log(props.id);
            console.log(props);
            setName("");
            setEmail("");
            history.push("/");
        }   
    }
    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={submit}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" value={name} onChange = { (e) => {setName(e.target.value)}} 
                    name="name" placeholder="Name" ></input>
                </div>
                <div className="field">
                    <label>Name</label>
                    <input type="text" value={email} onChange = { (e) => {setEmail(e.target.value)}}
                     name="email" placeholder="Email"></input>
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}

export default AddContact;
