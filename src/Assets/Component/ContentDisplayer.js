import '../css/ContentGroup.css'

import {react,Component} from 'react';

class ContentDisplayer extends Component
{
    render(){
        return(
            <div id="contentDisplay">
                <div className="inner">
                    <div className="title">
                        {this.props.title}
                    </div>
                    <div className="body">
                        {this.props.body}
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentDisplayer;