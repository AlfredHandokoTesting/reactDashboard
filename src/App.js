import './Assets/css/App.css';
import './Assets/css/style.css';

import SideBar from "./Assets/Component/sidebar";
import React, { Component } from 'react';
import Axios from 'axios';
import restURL from './Assets/url/restUrl.js';
import ContentGroup from './Assets/Component/ContentGroup';
import HeaderElement from './Assets/Component/HeaderElement';
class App extends React.Component{
  constructor(props)
    {
      super(props);
      this.state={
        checkboxes:{},
        tags:[],
        contents:{},
        sideBarIsOPen:false
      };
  }

  getTagsFromServer = () =>
  {
    Axios.get(restURL.url+restURL.port+restURL.getTags)
      .then(Response => {
          this.setState({
            checkboxes:Response.data.reduce(
              (tagOption, tag) => ({
                ...tagOption,
                [tag]:false
              }),
              {}
            ),
            tags:Response.data
          })
        }
      )
      .catch(error =>{
        //console.error('There was an error',error);
      });
  }

  getChoosenTags = () =>
  {
    let tempChoosenTag = [];
    
    this.state.tags.map((tag) => {
      if(this.state.checkboxes[tag])
      {
        tempChoosenTag = tempChoosenTag.concat(tag);
      }
    })

    return tempChoosenTag;
  }

  getContentFromServer = () =>
  {
    let tempChoosenTag = this.getChoosenTags();
    let responseData;

    if(tempChoosenTag.length > 0)
    {
      Axios.post(restURL.url+restURL.port+restURL.getContentWithTag, this.getChoosenTags())
          .then(response => {
            responseData = response.data
            this.setResponseContensData(responseData);
            console.log(responseData);
          })
          .catch(error =>{
            //console.error('There was an error',error);
          });;
    }
    else
    {
      Axios.get(restURL.url+restURL.port+restURL.getContents)
          .then(response => {
              responseData = response.data;
              this.setResponseContensData(responseData);
            })
          .catch(error =>{
            //console.error('There was an error',error);
          });;
    }
  }

  convert

  setResponseContensData(responseData)
  {
    this.setState({
      contents: responseData.reduce(
        (contentsData, content) => ({
          ...contentsData,
          [content.contentId]:content
        }),
        {}
      )
    });
  }

  componentDidMount()
  {
    this.getTagsFromServer();
    this.getContentFromServer();
  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  filterApplyClicked = () =>{
    this.getContentFromServer();
    this.setState({sideBarIsOPen:false});
  }

  handleSideBarStateChange = (state) =>
  {
    this.setState({sideBarIsOPen:state.sideBarIsOPen});
  }

  render(){
    return (
      <div className="App">
        <SideBar 
          pageWrapId={"page-wrap"} 
          outerContainerId={"App"}
          checkBoxAction={this.handleCheckboxChange}
          checkBoxData={this.state.checkboxes}
          checkBoxList={this.state.tags}
          handleApplyButton={this.filterApplyClicked}
          sideBarOpen={this.state.sideBarIsOPen}
          handleSideBarStateChange={this.handleSideBarStateChange}
        />
        <div id="page-wrap">
          <HeaderElement/>
          <div className="header-filler"></div>
          <div className="body-app">
            <ContentGroup 
              contents={this.state.contents}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
