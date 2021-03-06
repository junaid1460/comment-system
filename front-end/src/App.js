import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import ListSubheader from 'material-ui/List/ListSubheader';
import AppBar from 'material-ui/AppBar' 
import Toolbar from 'material-ui/Toolbar';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
// import IconButton from 'material-ui/IconButton';
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


import PostComponent from './posts';
import MyMenu from './menu';
import styles from './styles';
import AccountButton from './account'
import MakePost from './post'



class Login extends Component {
  state = {
    error: []
  }
  onclick(e){
    e.preventDefault()
    let val = JSON.stringify({
      
      'username' : this._username,
      'password' : this._password
    } )
    // console.log(val);
    window.updateApp(true)
fetch('/login/', {
  credentials: "same-origin",
    method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken' : window.state.token,
      },
      body:val
    }).then(v => {
      v.json().then(e =>{
        if(e.auth){
          window.state.auth = true
          window.location = '/'
        }else{
          // console.log(e.message)
          window.updateApp(false)  
          this.setState({error : e.message})
        }
      })
    }).catch(e=>{
      window.updateApp(false)      
    })
      
  }
  _error = []
  _username = "";
  _password = "";
  username(e){
    this._username = e.target.value;
  }
  password(e){
    this._password = e.target.value;
  }
  error(th){
  
    if(th.state.error.length == 0){
      // console.log("null")
      return null
    }
    // console.log("not null")
    
    return <ListItem style={{color: 'red'}}>
      <ul> 
      {th.state.error.map(e=>{return <li> {e} </li> })}
    </ul></ListItem>
  }
  render() {
    if(!window.state) {
      return <Card> 
          <CardContent>
            <h1> Connecting ... </h1>
            </CardContent>
        </Card>
    }
    let errors = this.error(this)
    return (
      
          <div >
            <form action="/login/" role="form" method="post"  onSubmit={this.onclick.bind(this)}>
            <input type='hidden' name='csrfmiddlewaretoken' value={window.state.token} />
                    <input type="hidden" name="next" value="/" />
        <div className="login">
        <Paper style = {{width: '100%', maxWidth: '95vw', display: 'flex', justifyContent: 'center'}}>
        
        <List style={{width : '100%'}}>
          <ListItem>
          Login or Register
          </ListItem>
         <ListItem>
         
         {errors}
         </ListItem>
          <ListItem>
          
        <TextField label="Username" fullWidth placeholder="existing or new" name="username" onChange = {this.username.bind(this)}
          id="username"/>
          </ListItem>
          <ListItem>
        <TextField label="Password" fullWidth placeholder="existing or new" name="password" type="password" onChange = {this.password.bind(this)}
          id="password"/>
      </ListItem>
      
      <ListItem>
        <Button type="submit" fullWidth onClick={this.onclick.bind(this)}>submit</Button>
        </ListItem>
        
      </List>
            
                  </Paper>  
</div>
                
              </form>
          </div>
    
    );
  }
 
}









class App extends Component {
  constructor(props){
    super(props);
    this.state = window.state;
  }

  render() {
    if(!window.state){
      return null
    }
    this.state = window.state
    return (
        <div style={styles.container}>
          <div style={styles.paper}>
              <List style={styles.list}>
               
                {this.state.posts}
              </List>
          </div>
        </div>
       
    
    );
  }
}



const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196f3' }, // Purple and green play nicely together.
    secondary: { main: '#03A9F4' },
    action : {main :'#03A9F4'} // This is just green.A700 as hex.
  },
});

class If extends Component {
  render(){
      if(this.props.test == true){
          return this.props.children;
      }
      return null
  }
}

class RR  extends Component {
  static state = {
    auth : false,
    token : '',
    posts : []
  }
  deletePost() {
    let x = window.confirm("Are you sure?")
      if(!x) return
      // console.log(this)
      fetch('/api/deletepost/', {
        credentials: "same-origin",
          method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken' : window.state.token,
            },
            body : JSON.stringify({
                id : this
            })
          }).then(e=>{
              window.location.reload()
          })
  }
  update(val){
    window.showProgress = val;
    // console.log('updating')
    this.forceUpdate();    
  }
  constructor(props){
    super(props);
    window.updateApp = this.update.bind(this)
    window.state = this.state
    window.showProgress = true
    
    fetch('/api/auth', {
      credentials: "same-origin"
    }).then((v)=>{
      v.json().then(e =>{
        this.setState(e)
        window.state = this.state;
        this.setState(e)
        
      })
    })

    fetch('/api/posts/?format=json', {
      credentials: "same-origin"
    }).then((value)=>{
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      value.json().then((v)=>{
        window.updateApp(false)        
        let val =  v.map(x => {
            let date = new Date(x.created_at);
            date =  monthNames[date.getMonth()] + " " + date.getDate() + ", "+ date.getFullYear();
            return <ListItem key={x.id} style={{display: 'flex', justifyContent: 'center', padding: '0', paddingBottom:'10px'}}>
                  <Card style={styles.card}>
                  <CardHeader
                        avatar={<a >
                          <Avatar aria-label="Recipe" >
                            {x.username.toUpperCase()[0]}
                          </Avatar>
                          </a>
                        }

                        action = {
                          <MyMenu test={x.owner}>
                            <MenuItem onClick = {this.deletePost.bind(x.id)} > Delete</MenuItem>
                          </MyMenu>
                        }
                        
                        title={x.title}
                        subheader={<span>{x.username} <span style={{fontSize: '9pt'}}>On {date}</span></span>}
                      />
                    <CardContent>
                    <Typography component="p">
                    {x.content}
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <div className="text" style={styles.actions}>
                      <Link to={'/post/' + x.id } >
                        <Button size="small" color="primary">
                          show post
                        </Button>
                      </Link>
                      </div>
                    </CardActions>
                  </Card>
                </ListItem>
              })
            
          
          this.setState({posts : val})
          window.state = this.state
          this.setState({posts : val})
          
            })
          }).catch(e => {
            window.updateApp(false)
          })
    
  }
  render(){
    if(!window.state) return null
    return <MuiThemeProvider theme = {theme}> 
    <div  style={{  marginBottom: '10px'}} >
    
    
      
    <Router>
        
        <div>
        <If test={window.showProgress && window.showProgress == true}>
          <div className="loading">
            <span > Loading ... </span>
          </div>
        </If>
        <AppBar color="primary"  style={styles.Toolbar}>
        <Toolbar >
          <AccountButton test={window.state && window.state.auth} />
         
        </Toolbar>
        </AppBar>  
        <div className="overflowfix">
        </div>
     <Sswitch>
          <Route  exact path='/join' component={Login} />
          <Route  exact path='/post/:pid' component={PostComponent} />
          <Route  exact path='/create' component={MakePost} />
          <Route exact  path='/' component={App} />
        </Sswitch>
        </div>
    </Router>
    </div>
  </MuiThemeProvider>
  }
}

export default RR;
