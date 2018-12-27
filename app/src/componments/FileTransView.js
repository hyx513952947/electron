import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import IP from 'ip';
import QRcode from './QRcodeView';

const {ipcRenderer} = window.require('electron');
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            port: 8080,
            host: this.getIP(),
            code: this.getIP() + ":" + 8080,
            title: '服务未开启'
        };

        ipcRenderer.on('chanel_ws_err', (event, message) => {
            console.log("服务创建失败：" + message);
            this.setState({
                title: message
            })
        });
        ipcRenderer.on('chanel_ws_success', (event, data) => {
            console.log("服务创建成功：" + data);
            console.log(this.state);
            this.setState({
                code: data.host + ":" + data.port,
                title: data.title,
                host: data.host,
                port: data.port
            })
        });
    }

    getIP = () => {
        return IP.address()
    };
    genCode = e => {
        let remembered = document.getElementById("remember").checked;
        //todo 记住端口号-待做
        if (remembered) {

        } else {

        }
        ipcRenderer.send('chanel_start_ws', this.state.host, this.state.port);
    };
    handlePort = e => {
        this.setState({
            port: e.target.value,
            code: this.state.host + ":" + e.target.value
        });
    };

    render() {
        const {classes} = this.props;
        return (<main className={classes.main}>
            <CssBaseline/>
            <Card className={classes.card}/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    创建本地服务
                </Typography>
                <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">电脑ip地址</InputLabel>
                        <Input id="address" defaultValue={this.state.host} readOnly={true} name="address"
                               autoComplete="address">
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="port">端口号 1000-60000</InputLabel>
                        <Input value={this.state.port} onChange={this.handlePort} autoFocus name="port" type="number"
                               id="port"
                               autoComplete="current-port"/>
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox id="remember" value="remember" color="primary"/>}
                        label="记住该端口"
                    />
                    <Button
                        onClick={this.genCode}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        开启本地服务
                    </Button>
                </form>
                <QRcode message={this.state.code} title={this.state.title}/>
            </Paper>
        </main>)
    };
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);