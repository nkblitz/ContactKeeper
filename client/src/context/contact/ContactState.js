import React, { useReducer } from 'react';
import { v4 as uuid } from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER } from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personal",
                "id": "1",
                "user": "5ef726ae43b9d832043d0302",
                "name": "do5n",
                "email": "nsk112@gmail.com",
                "phone": "1078670"
            },
            {
                "type": "personal",
                "id": "2",
                "user": "5ef726ae43b9d832043d0302",
                "name": "jsdfd",
                "email": "nsk112@gmail.com",
                "phone": "1078670"
            },
            {
                "type": "personal",
                "id": "3",
                "user": "5ef726ae43b9d832043d0302",
                "name": "vsdf",
                "email": "nsk112@gmail.com",
                "phone": "1078670"
            },
            {
                "type": "professional",
                "id": "4",
                "user": "5ef726ae43b9d832043d0302",
                "name": "bhtf",
                "email": "nsk112@gmail.com",
                "phone": "1078670"
            }
        ],
        current: null,
        filtered: null
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);


    //add
    const addContact = contact => {
        contact.id = uuid;
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    //delete
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    //set current
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    //clear contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    //update contactReducer
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }

    //filter
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    }

    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }


    return (<ContactContext.Provider value={
        {
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }
    }>
        {props.children}
    </ContactContext.Provider>);
};

export default ContactState;