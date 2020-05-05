// 引用使用 es6 的 module 引入和定义
// 全局变量以 g_ 开头
// 私有函数以 _ 开头

import {
    config
} from '../config.js'

class Token {
    constructor() {
        this.verifyUrl = config.api_base_url + 'token/verify'
        this.tokenUrl = config.api_base_url + 'token'
    }

    // 验证 token
    verify() {
        var token = wx.getStorageSync('token')
        if (!token) {
            // 获取token并存入Storage
            this.getTokenFromServer()
        } else {
            this._verifyFromServer(token)
        }
    }

    getTokenFromServer(callBack) {
        var that = this
        wx.login({
            success: function (res) {
                wx.request({
                    url: that.tokenUrl,
                    method: 'POST',
                    data: {
                        account: res.code,
                        type: 100
                    },
                    success: function (res) {
                        wx.setStorageSync('token', res.data.token)
                        callBack && callBack(res.data.token)
                    }
                })
            }
        })
    }

    _verifyFromServer(token) {
        var that = this
        wx.request({
            url: that.verifyUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if (!valid) {
                    that.getTokenFromServer()
                }
            }
        })
    }
}
export {
    Token
}