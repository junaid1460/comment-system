import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import AppBar from 'material-ui/AppBar' 
import Toolbar from 'material-ui/Toolbar';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
// import IconButton from 'material-ui/IconButton';4
import DeleteIcon from 'material-ui-icons/Delete';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
// import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Fade from 'material-ui/transitions/Fade';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { BrowserRouter as Router, Switch as Sswitch, Route, Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';
// import Avatar from 'material-ui/Avatar';
// import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from 'material-ui-icons/Person';
import AddIcon from 'material-ui-icons/Add';
// import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';

import MyMenu from './menu';
import styles from './styles';
import AccountButton from './account'


class Rif extends  Component {
    render(){
        if(this.props.test){
            return this.props.children
        }
        return null
    }
}

class Reply extends Component {
    state = {
        text: null,
        chars: 250
    }
    uploading = false;
    change(e){
        let c = e.target.value;
        // console.log(e)
        if(c.length <= 250){
            this.state.text = c;
        } this.forceUpdate();
    }
    constructor(s){
        super(s)
        console.log(this.props.text)
    }
    keypress(e){
        // console.log(e.key)
        if(e.key == 'Enter'){
            this.props.submit(this.state.text); 
            this.props.close()
            this.state.text = null;   
        }   
    }
    render(){
       
        if(this.state.text == null) {
            this.state.text = this.props.text
            if(this.state.text){
                this.state.text = '@' + this.state.text;
            }
        }
        
        if(!this.props.show) return null
        return <div style={{padding: '30px', paddingTop: '0'}}> 
        <form>
        <TextField
        label="Reply"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Write Content"
        helperText={<span>{(this.state.chars - this.state.text.length )+" characters left"} <Button style={styles.rep} onClick={() => {this.state.text=null;this.props.close()}}>( cancel )</Button></span>}
        fullWidth
        multiline={true}
        rows={2}
        rowsMax ={4}
        value = {this.state.text}
        autoFocus={true}
        onKeyPress={this.keypress.bind(this)}
        margin="normal" onChange={this.change.bind(this)}
      />
      </form>
      </div>
    }
}

class If extends Component {
    render(){
        if(this.props.test == true){
            return this.props.children;
        }
        return null
    }
}

class PostComponent extends Component {
    state = {
        post : null,
        error: 'Loading',
        show : true,
        message: ["Show Replies", "Hide Replies"],
        showReply: false,
        repmessage: ['reply', 'hide']
    }
    reply(){
        this.setState({showReply : !this.state.showReply})
    }
    constructor(props){
        super(props)
        let id = props.match.params.pid;
        fetch('/api/allofpost/'+ id , {credentials : 'same-origin'})
        .then(res => {
            res.json().then(e=> {
                if(e.detail){
                    this.setState({error : 'Post not found'})
                }else{
                    this.setState({post : e})
                }
            })
        }).catch(e=>{
            this.setState({error: 'Connection error'})
        })
    }
    submit(message){
        fetch('/api/addcomment/', {
            credentials: "same-origin",
              method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf8',
                  'X-CSRFToken' : window.state.token,
                },
                body : JSON.stringify({
                'post': this.state.post.id,
                  'by':'0',
                  'content':message
                })
              }).then(v => {
                window.location.reload()
              }).catch(e=>{console.log("error",e)})

    }
    toggle(){
        this.setState({show : !this.state.show})
    }
    render(){
        if(this.state.post == null){
            return null
        }
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
        let x = this.state.post;
        let date = new Date(x.created_at);
        date =  monthNames[date.getMonth()] + " " + date.getDate() + ", "+ date.getFullYear();
        return   <div>
             <AppBar color="primary"  style={styles.Toolbar}>
        <Toolbar >
          <AccountButton test={this.state.auth} />
         
        </Toolbar>
        </AppBar>    
        
        <Card style={{margin: '5vw', marginTop: '20vh'}} >
        <CardHeader 
              avatar={<a >
                <Avatar aria-label="Recipe" >
                  {x.username.toUpperCase()[0]}
                </Avatar>
                </a>
              }

              action = {
                <MyMenu test={x.owner}>
                  <MenuItem > Delete</MenuItem>
                </MyMenu>
              }
              
              title={x.title}
              subheader={date}
            />
          <CardContent>
          <Typography component="div">
          {x.content}
          </Typography>
          
          </CardContent>
          <CardActions>
            <If test={x.comments.length > 0} >
              <Button onClick={this.toggle.bind(this)}> {this.state.message[+this.state.show]}</Button>
            </If>
              <If test={window.state.auth} >
                <Button onClick={this.reply.bind(this)}> {this.state.repmessage[+this.state.showReply]}</Button>
              </If>
          </CardActions>
          <Reply show={this.state.showReply } text={ x.username} close={this.reply.bind(this)} submit={this.submit.bind(this)}/>
          { 
              this.state.post.comments.map(e => {
              return <MList key = {e.id}  data={e} show ={this.state.show }/>
             })
          }
        </Card>
        </div>
    }
    
}


class MList extends Component {
    reply(){
        this.childrep(this.props.data.username);
    }
    deleteComment(e){
       let x = window.confirm("Are you sure?")

        if(!x) return
      fetch('/api/comments/' + this.props.data.id, {
        credentials: "same-origin",
          method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken' : window.state.token,
            }
          }).then(e=>{
              window.location.reload();
          })
    }
    constructor(p){
        super(p)
        this.state = {
            show : false,
            message : ['show replies', 'hide replies'],
            showReply :false,
            user: null
        }
    }
    
    toggle(){
        console.log("yes")
        this.state.show = !this.state.show
        this.forceUpdate();
    }
    user = null
    submit(message){
        
        fetch('/api/addreply/', {
            credentials: "same-origin",
              method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf8',
                  'X-CSRFToken' : window.state.token,
                },
                body : JSON.stringify({
                'comment': this.props.data.id,
                  'by':'0',
                  'content':message
                })
              }).then(v => {
                window.location.reload()
              }).catch(e=>{console.log("error",e)})
    }
    childrep(user){
        
        this.state.showReply = true;
        this.user = null
        this.forceUpdate()
        this.user = user;
        this.forceUpdate()
        
    }
    render(){
     
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
        let e = this.props.data
        if(!this.props.show) return null;
        let datec = new Date(e.created_at);
                datec =  monthNames[datec.getMonth()] + " " + datec.getDate() + ", "+ datec.getFullYear();
                 return <ListItem key = {e.id} style={{alignItems:'flex-start'}}> 
                        <Avatar>
                            {e.username.toUpperCase()[0]}
                        </Avatar>
                        <ListItemText about="hello" primary={<Typography component="span">
           {e.username } <span style ={{fontSize: '7pt', color : 'gray'}}>On {datec}</span> 
                </Typography>} secondary={<Typography style={{fontSize: '10pt'}} component="span" >
                {e.content}
                    <br/>
                    <If test={e.replies.length > 0} >
                    {
                        function(obj){

                   return <Button style={styles.rep} onClick={obj.toggle.bind(obj)}> {obj.state.message[+obj.state.show]}</Button>
                        }(this)
                    } 
                    </If>
                    <If test={window.state.auth} >
                    <Button style={styles.rep} onClick={this.reply.bind(this)}> reply</Button>
                    </If>
                        {
                            function(owns, deleteComment){
                            if(owns)
                                return <Button style={styles.rep} onClick = {deleteComment}> Delete</Button>
                            }(e.owner, this.deleteComment.bind(this))
                        }
                        
                            {
                                e.replies.map(v => {
                                    return <MListRep reply={this.childrep.bind(this)} key = {v.id} data = {v} show={this.state.show} />
                                })
                            }

                        <Reply show={this.state.showReply} text={this.user} close={(()=>{this.user = null;this.setState({showReply:false});}).bind(this)} submit={this.submit.bind(this)}/>
                
                    </Typography>} />
                       
                  </ListItem>
    }
}


class MListRep extends Component {
    reply(){
        this.props.reply(this.props.data.username)
    }
    deleteReply(e){
        let x = window.confirm("Are you sure?")

        if(!x) return
        console.log(this)
      fetch('/api/replies/' + this.props.data.id, {
        credentials: "same-origin",
          method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken' : window.state.token,
            }
          }).then(e=>{
              window.location.reload()
          })
    }
    constructor(p){
        super(p)
        this.state = {
            show : false
        }
    }
    
    toggle(){
        console.log("yes")
        this.state.show = !this.state.show
        this.forceUpdate();
    }
    render(){
     
        var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
        let e = this.props.data
        if(!this.props.show) return null;
        let datec = new Date(e.created_at);
                datec =  monthNames[datec.getMonth()] + " " + datec.getDate() + ", "+ datec.getFullYear();
                 return <ListItem key = {e.id}> 
                        <Avatar>
                            {e.username.toUpperCase()[0]}
                        </Avatar>
                        <ListItemText about="hello" primary={<Typography component="span">
           {e.username } <span style ={{fontSize: '7pt', color : 'gray'}}>On {datec}</span> 
                </Typography>} secondary={<Typography style={{fontSize: '10pt'}} component="span" >
                {e.content}
                    <br/>
                    
                        {
                            function(owns, deleteComment){
                            if(owns)
                                return <Button style={styles.rep} onClick = {deleteComment}> Delete</Button>
                            }(e.owner, this.deleteReply.bind(this))
                        }
                    <If test={window.state.auth} >
                    <Button style={styles.rep} onClick={this.reply.bind(this)}> reply</Button>
                    </If>
                    </Typography>} />
                       
                  </ListItem>
    }
}

export default PostComponent;