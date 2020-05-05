// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    //启用插槽(单/多插槽)
    multipleSlots: true
  },
  // externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        // detail 参数
        text: this.properties.text
      })
    }
  }
})