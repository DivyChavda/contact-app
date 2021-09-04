
import Header from "./Components/Header";
import AddContact from "./Components/AddContact";
import ContactList from "./Components/ContactList";
import React, { useState } from 'react';
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ContactDetails } from "./Components/ContactDetails";
import api from "./api/contacts";
import EditContact from "./Components/EditContact";


function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  let initTodo;
  if (localStorage.getItem("contacts") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("contacts"));
  }

  const onDelete = async (contact) => {
    await api.delete(`/contacts/${contact.id}`);
    console.log("I am onDelete", contact);
    setContacts(contacts.filter((e) => {
      return e !== contact;
    }))
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  const addContact = async (name, email) => {
    console.log("i am adding this todo", name, email);
    let id;
    if (contacts.length === 0) {
      id = 1;
    }
    else {
      id = contacts[contacts.length - 1].id + 1;
    }
    const myContacts = {
      id: id,
      name: name,
      email: email
    }

    const response = await api.post("/contacts", myContacts);
    console.log(response);
    setContacts([...contacts, response.data]);

    //setContacts([...contacts, myContacts]);

    console.log(myContacts);
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const [contacts, setContacts] = useState(initTodo);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} term={searchTerm}
                searchKeyword={searchHandler} onDelete={onDelete}></ContactList>
              </>)
          }}>
          </Route>
          <Route exact path="/add" render={() => {
            return (
              <>
                <AddContact addContact={addContact}></AddContact>
              </>)
          }}>
          </Route>

          <Route exact path="/contact/:id" render={ContactDetails}>
          </Route>

          {/* <Route exact path="/edit" render={EditContact} updateContact={updateContact}>
          </Route> */}

          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

        </Switch>


      </Router>
    </div>
  );
}

export default App;
