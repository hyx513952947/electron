const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const process = require('process');
const {ipcMain} = require('electron');
ipcMain.on('chanel_start_ws', (event, host, port) => {
    console.log("通知创建ws进行通信,配置信息为ip:" + host + " port:" + port); // prints "ping"

    wservice({host: host, port: port}, function (data) {
        event.sender.send('chanel_ws_success', data, host, port)
    },function (err) {
        event.sender.send('chanel_ws_err', err)
    });
});
let wservice = function (option, callback,errcallback) {
    let wss = null;
    let success = false;
    let errListenr = function (e) {
        console.log(e.errno);
        if (e.errno === 'EADDRINUSE' || e.code === 'EADDRINUSE') {
            console.log("端口占用问题！");
            errcallback('该端口已经被占用，已经自动更改端口号');
            if (!success){
                option.port+=1;
                init();
            }
        }
    };
    process.on('uncaughtException', errListenr);
    function init() {
        console.log("创建的端口："+option.port);
        wss = new WebSocketServer(
            {
                host: option.host,
                port: option.port
            },
            function (err) {
                if (err) {
                    console.log(err)
                }
                if (!err) {
                    callback({
                        title:'创建服务成功，请使用手机客户端进行二维码扫描连接',
                        host:option.host,
                        port:option.port
                    });
                    success = true;
                } else {
                    errcallback("创建失败！")
                }
            });
        wss.on('connection', function (ws) {
            ws.on('message', function (message) {
                callback(message);
                ws.send(`哈哈: ${message}`, (err) => {
                    if (err) {
                        window.console.log(`[SERVER] error: ${err}`);
                    }
                });
            })
        });
        wss.onerror = function (err) {
            console.log(err);
        };
        wss.on('close', function (ws) {
            console.log("关闭咯");
            process.removeListener('uncaughtException', errListenr);
        })
    };
    init();
};
module.exports = wservice;
