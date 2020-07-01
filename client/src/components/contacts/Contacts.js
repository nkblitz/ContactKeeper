import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



export const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if (contacts === null || contacts.length == 0) {
        return <div><h1>Add contacts...</h1></div>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {
                    filtered !== null
                        ? filtered.map(contact => (
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}></ContactItem>
                            </CSSTransition>
                        ))
                        : contacts.map(contact => (
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}></ContactItem>
                            </CSSTransition>
                        ))

                }
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;