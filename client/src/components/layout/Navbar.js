import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const {user, isAuthenticated, logout, clearErrors} = authContext;
    const {clearContacts} = contactContext;

const onLogout = () => {
    logout();
    clearContacts();
}

const authLinks = (

    <Fragment>
<li>Welcome! {user && user.name}</li>
<li>
    <a onClick={onLogout} href='#!'>
        <i className='fas fa-sign-out-alt'></i>
        <span className='hide-sm'>Logout</span>
    </a>
</li>
    </Fragment>
);

const guestLinks = (

    <Fragment>
    <li>
        <Link to='/Register'>Register</Link>

    </li>
    <li>
        <Link to='/Login'>Login</Link>
    </li>
    </Fragment>
);

    return (
        <nav className='navbar bg-primary'>

            <h1>
                <i className={icon}></i>
                {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>

                </li>
                <li>
                    <Link to='/About'>About</Link>
                </li>
               {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    )
};



Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
};

export default Navbar
