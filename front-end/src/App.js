import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
const styles = {
  Toolbar: {
  },
 paper: {
    margin : '10vw auto',
    minHeight : '70vh',
    // padding : '10px',
    zIndex: '10',
    position : 'absolute',
    minWidth : '80vw'
  },
  container :{
    overflowY: 'auto',
    height: '100vh',
    display : 'flex',
    position: 'absolute',
    width: '100vw',
    justifyContent: 'center'
  },
  list : {
    margin: '10px'
  },
  card : {
    width : '100%'
  },
  actions : {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right'
  },
  btn : {
    color: 'white',
    textDecoration : 'none'
  }
};


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
          console.log(e.message)
          this.setState({error : e.message})
        }
      })
    }).catch(e=>{console.log(e)})
      
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
    console.log(window.state);
    if(!window.state) {
      return <Card> 
          <CardContent>
            <h1> Connecting ... </h1>
            </CardContent>
        </Card>
    }
    let errors = this.error(this)
    return (
      
          <div>
            <form action="/login/" role="form" method="post"  onSubmit={this.onclick.bind(this)}>
            <input type='hidden' name='csrfmiddlewaretoken' value={window.state.token} />
                    <input type="hidden" name="next" value="/" />
        <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width : '100vw'}}>
        <Paper style = {{width: '300px', display: 'flex', justifyContent: 'center'}}>
        <List>
         <ListSubheader >Form</ListSubheader>
         {errors}
          <ListItem>
            
        <FormControl >
        <InputLabel htmlFor="username">
          Username
        </InputLabel>
        <Input name="username" onChange = {this.username.bind(this)}
          id="username"/>
          </FormControl>
          </ListItem>
          <ListItem>
        <FormControl>
        <InputLabel htmlFor="password">
          password
        </InputLabel>
        <Input name="password" type="password" onChange = {this.password.bind(this)}
          id="password"/>
      </FormControl>
      </ListItem>
      
      <ListItem>
        <Button type="submit" onClick={this.onclick.bind(this)}>Login / Register</Button>
        </ListItem>
        
      </List>
            
                  </Paper>  
</div>
                
              </form>
          </div>
    
    );
  }
 
}





class MyMenu extends Component {
  state = {
    anchorEl: null,
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
      if (this.props.test) {

          return  <div>
                <IconButton aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon/>
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  transition={Fade}
                  onClick = {this.handleClose}
                >
                 { this.props.children }

                </Menu>
        </div>
      }
      else {
          return false;
      }
  }
};

class AccountButton extends Component {
  state = {
    open : false
  }
  login() {
    this.setState({
      open : true
    })
  }

  logout(){
    window.location.href = '/api/logout?next=/'
  }
  render (){
    if(this.props.test == false){
   
      return <Link to = {'/Login'} > <Button style={styles.btn} onClick={this.login.bind(this)} >
      Login / Register
    </Button> </Link>
    } else {
      return  <Button color="inherit" onClick={this.logout} >
      Logout ({window.state.user})
    </Button>
    }
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = window.state;
    console.log(this.state)
  }

  render() {
  
    console.log(window.state)
    if(!window.state){
      return null
    }
    this.state = window.state
    return (
        <div style={styles.container}>
        <AppBar color="primary"  style={styles.Toolbar}>
        <Toolbar >
          <AccountButton test={this.state.auth} />
         
        </Toolbar>
        </AppBar>
          <Paper style={styles.paper}>
              <List style={styles.list}>
                {/* <ListItem >
                <ListSubheader>Posts</ListSubheader>
                </ListItem> */}
                {this.state.posts}
              </List>
          </Paper>
        </div>
       
    
    );
  }
}

class RR  extends Component {
  static state = {
    auth : false,
    token : '',
    posts : []
  }
  constructor(props){
    super(props);
    window.state = this.state
    fetch('/api/auth', {
      credentials: "same-origin"
    }).then((v)=>{
      v.json().then(e =>{
        console.log("setting state")
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
        let val =  v.map(x => {
            let date = new Date(x.created_at);
            date =  monthNames[date.getMonth()] + " " + date.getDate() + ", "+ date.getFullYear();
            return <ListItem>
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
                            <MenuItem > Delete</MenuItem>
                          </MyMenu>
                        }
                        
                        title={x.title}
                        subheader={date}
                      />
                    <CardContent>
                    <Typography component="p">
                    {x.content}
                    </Typography>
                    </CardContent>
                    <CardActions>
                      <div className="text" style={styles.actions}>
                        <Button size="small" color="primary">
                          show post
                        </Button>
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
            console.log(e)
          })
    
  }
  render(){
   console.log("update")
    return <Router>
        <Sswitch>
          <Route  exact path='/login' component={Login} />
          <Route exact path='/' component={App} />
        </Sswitch>
    </Router>

  }
}

export default RR;
