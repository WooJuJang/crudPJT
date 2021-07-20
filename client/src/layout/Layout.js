import React from 'react';
import LayoutStyle from './Layout.css';

function Layout({children}){
    return (
        <div className="layoutmain">    
            {children}
        </div>

    );
}
export default Layout