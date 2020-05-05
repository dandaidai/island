import {
    config
} from '../config.js'
import {
    Base64
} from '../util/base64.js'
import {
    Token
} from '../models/token.js'
const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey 无效，请前往 www.7yue.pro申请',
    3000: '期刊不存在'
}
class HTTP {
    request({
        url,
        data = {},
        method = 'GET'
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }

    // 自动 无感知重新刷新令牌 二次重发机制
    _request(url, resolve, reject, data = {}, method = 'GET', noRefetch = false) {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
                // Authorization: this._encode()
            },
            success: (res) => {
                const code = res.statusCode.toString()
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    if (code == '403') {
                        if (!noRefetch) {
                            this._refetch(url, resolve, reject, data, method)
                        }
                    } else {
                        reject()
                        // 服务器异常
                        let error_code = res.data.error_code
                        this._show_error(error_code)
                    }
                }
            },
            fail: (err) => {
                reject()
                // api 调用失败
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }

    _refetch(...param) {
        var token = new Token();
        token.getTokenFromServer((token) => {
            this._request(...param, true)
        })
    }

    _encode() {
        const token = wx.getStorageSync('token')
        const base64 = new Base64()
        // base64 原则是是要传入 account:password
        // 由于没有密码，我们只传入 token:
        const result = base64.encode(token + ':')
        // Authorization:Baisc base64(account:password)
        return 'Basic ' + result
    }
}

export {
    HTTP
}