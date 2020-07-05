

import { ADD_CONTACT,GET_CONTACTS, UPDATE_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, CLEAR_CONTACTS } from '../types';


export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                current: null,
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case GET_CONTACTS:
                return {
                    ...state,
                    contacts: action.payload,
                    loading: false
                }
        case CONTACT_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                loading: false
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                loading: false
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(
                    contact => {
                        const regex = new RegExp(`${action.payload}`, 'gi')
                        return contact.name.match(regex) || contact.email.match(regex)
                    }
                ),
                loading: false
            };
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts: null,
                current: null,
            filtered: null,
            error: null,
            }
        default:
            return state
    }
}
