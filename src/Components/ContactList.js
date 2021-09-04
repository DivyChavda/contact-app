import React, { useRef } from 'react'
import {
    Link
} from "react-router-dom";
import { ContactCard } from './ContactCard';

export const ContactList = (props) => {
    const inputEl = useRef("");
    console.log(props);
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };
    return (
        <div className="App">
            <h2>Contact List</h2>
            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputEl}
                        type="text"
                        placeholder="Search Contacts"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {props.contacts.length === 0 ? "No Contact to display" : props.contacts.map((contact) => {
                    return (
                        <ContactCard contact={contact} key={contact.id} onDelete={props.onDelete}></ContactCard>
                    );
                })}
            </div>

        </div>
    )
}

export default ContactList;
