import React from 'react';

import FileView from "./FileTransView";
import PersonView from "./PersonView"

export default {
    icon_head: "",
    items_commons: [
        {
            title: "个人用心",
            view: <PersonView />
        },
        {
            title: "文件管理",
            view: null
        },
        {
            title: "文件传输",
            view: <FileView />
        }],
    items_setting: [
        {
            title: "设置",
            view: null
        },
        {
            title: "关于",
            view: null
        },
        {
            title: "声明",
            view: null
        }],
}