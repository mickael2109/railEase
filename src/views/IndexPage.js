import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
    return (
        <div>
            Train mande
            <ul>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/controller'>Controller</Link></li>
                <li><Link to='/client'>Client</Link></li>
            </ul>
        </div>
    );
};

export default IndexPage;