import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

function FooterComponent() {
    return (
        <div className="footer">
            <div> <FontAwesomeIcon icon={faCopyright} /> Copyright 2021 Company ABC</div>
            <div>
                Follow Us:
                <i className="fa fa-twitter" aria-hidden="true"></i>
                <i className="fa fa-facebook-official" aria-hidden="true"></i>
                <i className="fa fa-instagram" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default FooterComponent;