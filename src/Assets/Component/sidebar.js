import React, {Component} from 'react';
import {slide as Menu }from 'react-burger-menu';
import Checkbox from './Checkbox';

class sidebar extends Component{
    
    createCheckbox = option => (
        <Checkbox
          label={option}
          isSelected={this.props.checkBoxData[option]}
          onCheckboxChange={this.props.checkBoxAction}
          key={option}
        />
    );

    createCheckboxes = () => this.props.checkBoxList.map(this.createCheckbox);
    render(){
        return (
            <div className="container">
                <Menu 
                    pageWrapId={this.props.pageWrapId}
                    outerContainerId={this.props.pageWrapId}
                    isOpen={this.props.sideBarOpen}
                    onStateChange={this.props.handleSideBarStateChange}
                    >
                    {this.createCheckboxes()}

                    <button className="checkbox-button"
                        onClick={this.props.handleApplyButton}
                    >APPLY</button>
                </Menu>
            </div>
                        
        );
    }
};

export default sidebar;