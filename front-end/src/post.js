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



class MakePost extends Component {
    _title = "";
    title(e){
        this._title = e.target.value;
    }
    _content = "";
    content(e){
        this._content = e.target.value;
    }
    submit(e){
        e.preventDefault()
        if(this._title.length < 10 || this._content.length < 10){
            window.alert('post and title must have at least 10 characters')
            return
        }
        window.updateApp(true)
        fetch('/api/addpost/', {
            credentials: "same-origin",
              method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf8',
                  'X-CSRFToken' : window.state.token,
                },
                body : JSON.stringify({
                'title': this._title,
                  'content':this._content
                })
              }).then(v => {
                window.location.href = '/'
              }).catch(e=>{
                window.updateApp(false)                
              })
    }
    render(){
        return (
            <div>
            <form method = "POST" action="/api/posts/" onSubmit = {this.submit.bind(this)}>
            <div style={{width : '95vw', display: 'flex', justifyContent: 'center', margin: '0 auto'}}>

                <Card style={{marginTop: '11vh', width: '100%',  maxWidth: '600px'}}>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Write something you want tell everyone"/>
                        </ListItem>
                    <ListItem>
                            <TextField name="title" 
                            label="Title"
                            placeholder="Write"
                            onChange = {this.title.bind(this)}
                            fullWidth
                            rows={2}
                            id="t"/>
                    </ListItem>
                    <ListItem>
                        <TextField name="content" 
                         label="Content"
                         placeholder="Write" 
                         fullWidth
                        multiline = {true}
                        rows = {3}
                        rowsMax = {6}
                        onChange = {this.content.bind(this)}
                        id="password"/>
                    </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button type="submit"> Post</Button>
                </CardActions>
                </Card>
                </div>
            </form>

            </div>
        );
    }
}


export default MakePost