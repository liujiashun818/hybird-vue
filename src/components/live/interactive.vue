<template>
    <div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-if="list.length>0">
            <li class="flex" v-for="item in list">
                <div class="avatar" :style="{backgroundImage:`url(${item.userIcon?item.userIcon:head})`}"></div>
                <div class="bubble">
                    <div class="flex-default info">
                        <span>{{item.username}}</span>
                        <time>{{getDate(item.date) | dateCompared}}</time>
                    </div>
                    <div class="content" v-html="item.content"></div>
                    <div class="reply" v-for="replie in item.replies">
                        <p><span>回复：</span><span>{{replie.username}}</span>{{replie.content}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="null-data"></div>
         <p v-if="loading" class="loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            加载中...
        </p>
        <p v-if="isAll" class="loading">已显示全部内容</p>
    </div>
</template>

<script>
import head from '_images/default-head.png'
export default {
    data () {
        return {
            head,
            list: [],
            loading: false,
            isAll: false,
            wrapperHeight: 0,
            data: {
                page: {
                    last: 2
                }
            },
            time: '',
            next: 1,
            clock: null,
            el: null
        }
    },

    created () {
        this.getComment(this.$route.params.articleId)

        this.el = setInterval(() => {
            this.getNewComment(this.$route.params.articleId)
        }, 30000)
    },

    mounted() {
        this.$nextTick(() => {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
        })
    },

    destroyed () {
        clearInterval(this.el)
    },

    methods: {
         getComment (articleId) {
            this.loading = true
            const pageToken = this.next * 1
            const pageLast = this.data.page.last * 1
            if (pageToken > pageLast) {
                this.loading = false
                this.isAll = true
                return false
            }
            this.$axios.get(`/api/v2/live/liveRoomComment?articleId=${articleId}&pageToken=${pageToken}`)
                .then(res=> {
                    const result = res
                    if (res.code === 0) {
                        this.data = result
                        this.time = result.item.time
                        this.loading = false
                        if (this.data.items && this.data.items.length > 0) {
                            this.data.items.map((item) => {
                                this.list.push(item)
                            })
                        
                            this.next++
                        }
                    }
                })
        },

        getNewComment (articleId) {
            this.$axios.get(`/api/v2/live/newLiveRoomComment?articleId=${articleId}&time=${this.time}&sysCode="live"`)
                .then(res=> {
                    const result = res.items
                    this.time = res.item.time
                    if (res.code === 0 && result) {
                        result.map(item => {
                            this.list.push(item)
                        })
                    }
                })
        },

        getDate: (date) => {
            return date.slice(0, -2) + ':00'
        },

        loadMore() {
            if (this.isAll || this.loading) return false
            
            this.getComment(this.$route.params.articleId)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .wrapper
        overflow auto 
        padding 0 20px
        ul 
            margin-top 60px
            padding-bottom 50px
            li 
                margin-bottom 30px
                .avatar 
                    width 70px
                    height 70px
                    background no-repeat 50%/100%
                    border-radius 999px
                .bubble
                    box-sizing border-box
                    max-width 528px
                    min-width 266px
                    padding 16px 24px
                    margin-left 20px
                    border-radius 8px
                    background #f6f6f6
                    color #222222
                    font-size 32px
                    .info 
                        span 
                            font-size 28px
                            color #858585
                        time 
                            margin-left 10px
                            font-size 22px
                            color #9B9B9B    
                    .content 
                        margin-top 5px
                        line-height 52px
                        img 
                            width 100%
                .reply 
                    color #9B9B9B
                    font-size 28px
                    p 
                        line-height 52px
                    span:nth-of-type(1)
                        color #FF6161
                    span:nth-of-type(2)
                        color #858585
                        margin-right 20px
            .reverse 
                flex-direction row-reverse
                .bubble 
                    margin-left 0
                    margin-right 20px
                    background #FFF8F6
                    border 1px solid #FEEDE8
     .loading 
        padding-bottom 50px
        text-align center
        font-size 24px
        color #AFAFAF
        height 56px
        line-height 56px
    .null-data 
        width 560px
        height 560px
        margin 0 auto
        background url("~_images/null.png") no-repeat 50%/100%
</style>