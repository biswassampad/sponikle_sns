import React,{Component} from 'react';
import {isAuthenticated,readUser,getLocation} from '../functions';
import {Redirect} from 'react-router-dom';
import {createPost} from '../functions';


class NewPost extends Component {
  constructor(){
    super()
    this.state = {
      body:'',
      image:'',
      error:'',
      user:{},
      filesize:'',
      loading:false
    }
  }
    componentDidMount() {
      this.postData = new FormData();
      this.setState({user:isAuthenticated().user})
    }

    isValid=()=>{
      const {filesize} = this.state;
      if(filesize>10000){
        this.setState(
                {
                  error:"Image size can not be more than 1 Mb" ,
                  loading:false
              }
            );
            return false;
      }
    };

    handleChange= name => event =>{
      this.setState({
        error:""
      });
      const value = name ==="image" ?event.target.files[0]:event.target.value;
      const filesize = name === "image"?event.target.files[0].size:0;
      this.setState({[name]:value, filesize})
    }

    clickSubmit = event =>{
      console.log('initating post');
      event.preventDefault();
      this.setState(
            { loading:true }
        );
        if(this.state.image && this.state.body.length == 0){
          console.log('switchin to image post mode');
          const userId = isAuthenticated().user._id;
          const token = isAuthenticated().token;
          const reader = new FileReader();
          reader.addEventListener('load', async()=>{
          const image = reader.result.slice(22);
          var postData ={
            image:image,
            location:this.props.location
          }
          createPost(userId, token,postData)
          .then(data=>{
            if(data.error){
              this.setState({
                error:data.error
              })
            }else{
              console.log('new post added');
            }
          })
        },false);
          reader.readAsDataURL(this.state.image);
        }else if(this.state.image.length ==0 && this.state.body){
          console.log('switching to post only mode');
          const userId = isAuthenticated().user._id;
          const token = isAuthenticated().token;
          console.log('post data',this.state.body);
          var postData ={
            text:this.state.body,
            location:this.props.location
          }
          createPost(userId,token,postData)
          .then(data=>{
            if(data.error){
              this.setState({
                error:data.error
              })
            }else{
              console.log('new post added');
            }
          })
        }else if(this.state.image.length !=0 && this.state.body){
          console.log('switching to post with image mode')
        }
    }

    newPostForm=(body,image)=>{
      return(
        <>
            <div className="row">
          <div className="input-field col s12">
            <textarea id="textarea1" className="materialize-textarea" onChange={this.handleChange("body")}></textarea>
          </div>
        </div>
        <div className="file-field input-field">
     <div className="btn">
       <span>File</span>
       <input type="file" onChange={this.handleChange("image")}/>
     </div>
     <div className="file-path-wrapper">
       <input className="file-path validate" type="text"/>
     </div>
   </div>
   <button className="waves-effect waves-light btn" onClick={this.clickSubmit}>Submit</button>
   </>
      )
    }
    render() {
      const {body,image,user} = this.state;
      return (
          <div className="container">
          <h2>Create a new Post</h2>
          <div>
            {this.newPostForm(body,image)}
          </div>
          </div>
      )
    }


}


export default NewPost;
