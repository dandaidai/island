import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */

  // 使用行为
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  //初始化组件的时候调用
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot()
      .then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      // 无需更新到 wxml 的写法，如果wxml内绑定的变量需要进行setData数据更新
      if (this.hasMore()) {
        // 加锁，正在加载数据
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            // 操作完数据，解锁
            this.unLocked()
          }, () => {
            // 避免死锁
            this.unLocked()
          })
      }
    },

    onCancel(event) {
      // 每次进入搜索详情页都初始化一下，以免重复数据
      this.initialize()
      this.triggerEvent('cancel', {}, {})
      // 将事件抛出来，在页面中监听然后再改变 searching
    },

    onDelete(event) {
      this.initialize()
      this._closeResult()
    },

    onConfirm(event) {
      this.initialize()
      this._showResult()
      this._showLoadingCenter()

      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    // 增强可读性，添加一些私有方法
    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})