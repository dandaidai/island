// onReachBottom触发时，生成一个指定位数n的随机字符串，以确保每次赋值给子组件more属性不同值。
// 子组件more属性被改变，observer触发，调用私有函数，执行下滑触底加载功能
const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

// 产生由0～9，A～Z构成的随机字符串
const random = function (n) {
    let res = '';
    for (let i = 0; i < n; i++) {
        // 向上取整 0~35 范围内数字
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }

    return res;
}

export {
    random
};