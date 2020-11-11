import react, {Component} from 'react';
 
class HeaderElement extends Component
{
    render()
    {
        return(
            <div className="header-app">
                <div className="user-message">Welcome, User331</div>
                <div className="title">DASHBOARD</div>    
            </div>         
        );
    }
}

export default HeaderElement;