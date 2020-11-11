import '../css/style.css'
import '../css/ContentGroup.css'
import './contentThumbnail'

import react, { Component } from 'react';
import contentThumbnail from './contentThumbnail';
import ContentDisplayer from './ContentDisplayer';


class ContentGroup extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            choosenKey:null
        };
    }

    generateContentTumbnail = () =>
    {
        let keys = Object.keys(this.props.contents);
        return(
            keys.map((key) =>
            {
                return contentThumbnail(this.props.contents[key].contentTitle, this.props.contents[key].contentTags, this.thumbnailOnClickHandler,
                    key);
            })
        )
    }

    thumbnailOnClickHandler = (key) =>
    {
        this.setState({choosenKey:key})
    }   

    generateContent = () =>
    {
        let titleShown;
        let bodyShown;
        if(this.state.choosenKey !== null)
        {
            if(this.props.contents[this.state.choosenKey] === undefined)
            {
                titleShown = null;
                bodyShown = null;
                this.setState({choosenKey:null})
            }
            else
            {
                titleShown = this.props.contents[this.state.choosenKey].contentTitle;
                bodyShown = this.props.contents[this.state.choosenKey].content;
            }
        }

        return(
            <ContentDisplayer
                        title={titleShown}
                        body={bodyShown}
                    />
        )
    }

    render(){
        return(
            <div>
                <div style={{overflow:"auto"}}>
                    {this.generateContentTumbnail()}
                </div>
                {this.generateContent()}
                
            </div>
        );        
    }
}
export default ContentGroup;