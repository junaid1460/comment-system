import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListSubheader from 'material-ui/List/ListSubheader';
import AppBar from 'material-ui/AppBar' 
import Toolbar from 'material-ui/Toolbar';
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
  }
};

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
  login() {
    window.location.href = '/api/login/?next=/'
  }

  logout(){
    window.location.href = '/api/logout/?next=/'
  }
  render (){
    if(this.props.test == false){
      return <Button color="inherit" onClick={this.login} >
      Login
    </Button>
    } else {
      return  <Button color="inherit" onClick={this.logout} >
      Logout
    </Button>
    }
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts : [],
      auth : false,
      token : ""
    }

    fetch('/api/auth', {
      credentials: "same-origin"
    }).then((v)=>{
      v.json().then(e =>{
        console.log(e)
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
        console.log(v[0].content)
        this.setState({
          posts : v.map(x => {
            console.log(x)
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
        })
      })
    })
  }

  render() {
  
   
    return (
      <div>
      
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
      
    </div>
    );
  }
}

export default App;



class SimpleDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        
          <div>

            hello
          </div>
      </Dialog>
    );
  }
}

const DialogWrapped = withStyles(styles)(SimpleDialog);