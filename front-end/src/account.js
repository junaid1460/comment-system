


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
import EditIcon from 'material-ui-icons/Edit';
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


import styles from './styles';


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
      fetch('/api/logout/', {
          credentials :'same-origin',
          method: 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken' : window.state.token,
          }
      }).then(e =>{
          window.location = '/'
          window.location.reload();
      })
    }
    render (){
        // console.log(window.state)
      if(this.props.test == false || !window.state || !window.state.auth ){
     
        return <div style={{display:'flex', flexDirection: 'row', width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
            <a href='/'><IconButton  style={{color:'white',background : '#445cc2'}}> <PersonIcon /> </IconButton> </a>
      <Typography style={{width: '100%', padding:'5px'}} variant="title" color="inherit" >
      AnomPost
    </Typography>
    <Link to = {'/Login'} > <Button style={styles.btn} onClick={this.login.bind(this)} >
        Login 
      </Button> </Link>
    
      </div>
      } else {
        return  <div style={{display:'flex', flexDirection: 'row', width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
        <a href='/'><IconButton  style={{color:'white',background : '#445cc2'}}> <PersonIcon /> </IconButton> </a>
  <Typography style={{width: '100%', padding:'5px'}} variant="title" color="inherit" >
  {window.state.user}
</Typography>
<Button color="inherit" onClick={this.logout} >
        Logout
      </Button>
<Link to = {'/create'}  style={{color:'black', textDecoration: 'none'}}> 

    <Button variant="raised"  onClick={this.login.bind(this)} >
        <EditIcon />
        
      </Button> </Link>


  </div>
        
      }
    }
  }

  export default AccountButton