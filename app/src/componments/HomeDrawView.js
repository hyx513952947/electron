import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import PrimarySearchAppBar from "./AppBarView";

import head from "../assets/icon.png"

const styles = theme=>({
    list: {
        width: 200,
        [theme.breakpoints.up('sm')]:{
            width:300
        }
    },
    fullList: {
        width: 'auto',
    },
    listDivider: {
        height: 20
    },
    head: {
        height:200,
        width:200,
        textAlign: "center",
        [theme.breakpoints.up('sm')]:{
            width:300
        }
    }
});

class SwipeableTemporaryDrawer extends React.Component {

    constructor(props){
        super(props);
        this.state={
            left: false,
            center:this.props.menuList.items_commons[2]
        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState((prevState, props) => ({
            [side]: open
        }));
    };
    handleLeftMenu = (item,index) =>{
        this.setState({
            center :item,
        });
    };
    genLeftMenuList() {
        return (this.props.menuList.items_commons.map((item, index) => (
            <ListItem onClick={(e)=>this.handleLeftMenu(item,index)} button key={item.title}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                <ListItemText primary={item.title}/>
            </ListItem>
        )))
    };
    genSettingMenuList() {
        return (this.props.menuList.items_setting.map((item, index) => (
            <ListItem onClick={(e)=>this.handleLeftMenu(item,index)} button key={item.title}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                <ListItemText primary={item.title}/>
            </ListItem>
        )))
    };

    render() {
        const {classes} = this.props;
        const sideList = (
            <div className={classes.list}>
                <img className={classes.head} src={head}/>
                <List>
                    {this.genLeftMenuList()}
                </List>
                <Divider className={classes.listDivider}/>
                <List>
                    {this.genSettingMenuList()}
                </List>
                <Divider/>
            </div>
        );
        return (
            <div>
                <PrimarySearchAppBar toggleLeftMenu={this.toggleDrawer} title={this.state.center.title}/>
                <div>
                    {this.state.center.view}
                </div>
                <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}
                    onOpen={this.toggleDrawer('left', true)}>
                    <div tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}>
                        {sideList}
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);
