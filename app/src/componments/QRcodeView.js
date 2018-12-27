import React from 'react';
import PropsTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import qr from 'qr-image';
import icon from '../assets/icon.png';

const style = theme =>({
    main:{
        display:'block',
        'text-align':'center'
    },
    title:{

    },
    code:{
        width:200,
        height:200
    }
});
class QRcodeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            message: this.props.message ? this.props.message : "欢迎使用",
            data:icon
        };
        this.genCode(this.state.message);
    }
    genCode = message => {
        console.log("要生成的二维码："+message);
        let code = qr.image(message, {type: 'png'});
        let chunks = [];
        let size = 0;
        code.on("data", function (chunk) {
            chunks.push(chunk)
            size += chunk.length
        });
        code.on('end', (chuck) => {
            let data = 'data:image/png;base64,'.concat(Buffer.concat(chunks, size).toString("base64"));
            this.setState(state => ({
                data: data
            }))
        })
    };

    componentWillReceiveProps(n) {
        this.setState(ps => ({
            message: n.message,
            title:n.title
        }), this.genCode(n.message))
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.main}>
                <h3 className={classes.title}>{this.state.title}</h3>
                <img className={classes.code} src={this.state.data} alt='二维码'/>
            </div>
        );
    }
}

QRcodeView.propTypes = {
    classes: PropsTypes.object.isRequired,
};
export default withStyles(style)(QRcodeView)

