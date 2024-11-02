import React from 'react';

const AuthButtons = ({ loggedIn }) => {
    return (
        <>
            {loggedIn ? (
                <a href="/">Logout</a>
            ) : (
                <>
                    <a  href="/login">Log in</a>
                    
                </>
            )}
        </>
    );
};

export default AuthButtons;