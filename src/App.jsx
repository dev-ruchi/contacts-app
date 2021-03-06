import React from 'react'
import { useState } from 'react'
import { Form, Button, ListGroup, Badge } from 'react-bootstrap'
import './index.css'


export default function App() {

  const [contacts, setContacts] = useState(loadContacts());
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("")


  function numberAlreadyExists() {
    return contacts.findIndex(contact => contact.number === contactNumber) !== -1
  }


  function addContacts(e) {
    e.preventDefault();

    if (numberAlreadyExists()) {
      alert("This number already exists");
      return;
    }

    const updatedContacts = [{ name: contactName, number: contactNumber }, ...contacts];

    setContacts(updatedContacts);
    setContactName("");
    setContactNumber("");

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  }

function loadContacts() {
  let savedContacts = [];
  
  try {
    savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  } catch (err) {
    savedContacts = [];
    console.log(err);
  }
  return savedContacts;
}


  function deleteContact(contact) {
    if (!confirm("Do you really want to delete this contact")) {
      return;
    }
    setContacts(contacts.filter(contactItem => contact.number !== contactItem.number))

    const updatedContacts = contacts.filter(contactItem => contact.number !== contactItem.number)

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

  }

  return (
    <div className="mt-5">

      <h3 className='heading'>Add new contacts</h3>

      <Form onSubmit={addContacts}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" value={contactName} onChange={(e) => { setContactName(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control required type="number" value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} />
        </Form.Group>
        <Button type="submit" variant="primary">Add</Button>
      </Form>

      <h3 className='mt-5 mb-3'>My contacts</h3>


      {contacts.length === 0 && <p>You do not have no contacts yet.</p>}

      <ListGroup className="mt-10">
        {
          contacts.map(contact => {
            return (
              <ListGroup.Item
                key={contact.number}
                as="li"
                className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{contact.name}</div>
                  {contact.number}
                </div>
                <Badge bg="danger" pill onClick={() => { deleteContact(contact) }}>
                  Delete
                </Badge>
              </ListGroup.Item>

            )
          })
        }

      </ListGroup>
    </div>
  )
}
