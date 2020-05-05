import {
  HTTP
} from "../util/http-p.js";

class ClassicModel extends HTTP {
  // getLatest(sCallback) {
  //   this.request({
  //     url: "classic/latest",
  //     success: res => {
  //       sCallback(res);
  //       this._setLatestIndex(res.index)
  //       let key = this._getKey(res.index)
  //       wx.setStorageSync(key, res)
  //     }
  //   });
  // }

  // getClassic(index, nextOrPrevious, sCallback) {
  //   let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
  //   let classic = wx.getStorageSync(key)
  //   if (!classic) {
  //     this.request({
  //       url: `classic/${index}/${nextOrPrevious}`,
  //       success: (res) => {
  //         wx.setStorageSync(this._getKey(res.index), res)
  //         sCallback(res)
  //       }
  //     })
  //   } else {
  //     sCallback(classic)
  //   }
  // }

  getLatest() {
    const latest = this.request({
      url: 'classic/latest'
    })
    latest.then(res => {
      this._setLatestIndex(res.index)
      const key = this._getKey(res.index)
      wx.setStorageSync(key, res)
    })
    return latest
  }

  getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写入到缓存中
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
      classic.then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
      })
    }
    return Promise.resolve(classic)
  }

  getMyFavor(success) {
    return this.request({
      url: 'classic/favor'
    })
  }

  // getById(cid, type, success) {
  //   return this.request({
  //     url: `classic/${type}/${cid}`
  //   })
  // }

  _getKey(index) {
    let key = 'classic-' + index;
    return key
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  // getMyFavor(success) {
  //   const params = {
  //     url: 'classic/favor',
  //     success: success
  //   }
  //   this.request(params)
  // }

  _setLatestIndex(index) {
    // 同步写入缓存 异步 setStorage
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
}
export {
  ClassicModel
};