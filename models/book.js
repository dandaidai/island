import {
    HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot_list'
        })
    }

    search(start, q) {
        return this.request({
            url: 'book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }

    getMyBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    // 根据id获取书籍详情
    getDetail(bid) {
        return this.request({
            url: `book/${bid}/detail`
        })
    }

    // 根据id获取点赞状态
    getLikeStatus(bid) {
        return this.request({
            url: `book/${bid}/favor`
        })
    }

    // 根据id获取当前图书短评
    getComments(bid) {
        return this.request({
            url: `book/${bid}/short_comment`
        })
    }

    postComment(bid, comment) {
        return this.request({
            url: 'book/add/short_comment',
            method: 'POST',
            data: {
                book_id: bid,
                content: comment
            }
        })
    }
}
export {
    BookModel
}