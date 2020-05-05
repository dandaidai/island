// pages/classic/classic.js
import {
  ClassicModel
} from "../../models/classic.js";
import {
  LikeModel
} from '../../models/like'
let classicModel = new ClassicModel();
let likeModel = new LikeModel()
Page({
  // properties: {
  //   cid: Number,
  //   type: Number,
  //   needNavi: {
  //     type: Boolean,
  //     value: true
  //   }
  // },
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest()
      .then(res => {
        this.setData({
          classic: res,
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        });
      })
    // classicModel.getLatest(res => {
    //   this.setData({
    //     classic: res,
    //     likeCount: res.fav_nums,
    //     likeStatus: res.like_status
    //   });
    // });
  },
  // 综合考虑是否是从喜欢页面跳转过来详情页，无接口
  // attached(options) {
  //   const cid = this.properties.cid
  //   const type = this.properties.type
  //   if (!cid) {
  //     classicModel.getLatest().then(res => {
  //       this.setData({
  //         classic: res,
  //         likeCount: res.fav_nums,
  //         likeStatus: res.like_status
  //       })
  //     })
  //   } else {
  //     classicModel.getById(cid, type).then(res => {
  //       this._getLikeStatus(res.id, res.type)
  //       this.setData({
  //         classic: res,
  //         latest: classicModel.isLatest(res.index),
  //         first: classicModel.isFirst(res.index)
  //       })
  //     })
  //   }
  // },

  onNext: function (event) {
    this._updateClassic('next')
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  _updateClassic: function (nextOrPrevious) {
    const index = this.data.classic.index
    const classic = classicModel.getClassic(index, nextOrPrevious)
    classic.then(res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
    // classicModel.getClassic(index, nextOrPrevious, (res) => {
    //   this._getLikeStatus(res.id, res.type)
    //   this.setData({
    //     classic: res,
    //     latest: classicModel.isLatest(res.index),
    //     first: classicModel.isFirst(res.index)
    //   })
    // })
  },

  _getLikeStatus: function (artID, category) {
    const status = likeModel.getClassicLikeStatus(artID, category)
    status.then(res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
    // likeModel.getClassicLikeStatus(artID, category, (res) => {
    //   this.setData({
    //     likeCount: res.fav_nums,
    //     likeStatus: res.like_status
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});