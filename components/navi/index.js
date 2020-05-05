// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean, // 第一期右箭头禁用
    latest: Boolean // 最新一期左箭头禁用
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function (event) {
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function (event) {
      if (!this.properties.first)
        this.triggerEvent('right', {}, {})
    }
  }
})