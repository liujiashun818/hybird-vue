<template>
    <div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <ul class="live-room" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" v-if="list.length>0">
            <li class="flex" v-if="top">
                <div class="left">
                    <div class="avatar" :style="{backgroundImage:`url(${top.userIcon?top.userIcon:head})`}"></div>
                    <div class="job">{{top.userType==='host'?'主持人':'嘉宾'}}</div>
                </div>
                <div class="right">
                    <div class="flex-default">
                        <div class="name">{{top.userName}} <div class="i">置顶</div></div>
                        <time>{{getDate(top.date) | dateCompared}}</time>
                    </div>
                    <div class="content" v-html="top.content"></div>
                    <div class="reply" v-for="replie in top.replies">
                        <p><span>回复：</span><span>{{replie.userName}}</span>{{replie.content}}</p>
                    </div>
                </div>
            </li>
            <li class="flex" v-for="(item, index) in list"> 
                <div class="left">
                    <div class="avatar" :style="{backgroundImage:`url(${item.userIcon?item.userIcon:head})`}"></div>
                    <div class="job">{{item.userType==='host'?'主持人':'嘉宾'}}</div>
                </div>
                <div class="right">
                    <div class="flex-default">
                        <div class="name">{{item.userName}}</div>
                        <time>{{getDate(item.date) | dateCompared}}</time>
                    </div>
                    <div class="content" v-html="item.content"></div>
                    <div class="reply" v-for="replie in item.replies">
                        <p><span>回复：</span><span>{{replie.userName}}</span>{{replie.content}}</p>
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
import _ from 'lodash'
export default {
    data () {
        return {
            head,
            top: null,
            loading: false,
            isAll: false,
            data: {
                page: {
                    last: 2
                }
            },
            list: [],
            wrapperHeight: 0,
            next: 1,
            time: '',
            clock: null,
            el: null
        }
    },

    created () {
        let id = this.$route.params.articleId
        this.getLive(id)

        this.el = setInterval(() => {
            this.getNewLive(this.$route.params.articleId)
        }, 30000)
    },

    mounted () {
        this.$nextTick(() => {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
        })
    },

    destroyed () {
        clearInterval(this.el)
    },

     methods: {
        getLive (articleId) {
            this.loading = true
            const pageToken = this.next * 1
            const pageLast = this.data.page.last * 1
            if (pageToken > pageLast) {
                this.loading = false
                this.isAll = true
                return false
            }
            this.$axios.get(`/api/v2/live/liveRoomTalk?articleId=${articleId}&pageToken=${pageToken}`)
                .then(res=> {
                    const result = res
                    if (res.code === 0) {
                        this.data = result
                        this.time = result.item.time
                        this.loading = false
                        if (result.items && result.items.length > 0) {
                            result.items.map(n => {
                                if (n.top) {
                                    this.top = n 
                                    return false
                                }
                                this.list.push(n)
                            })

                            this.next++
                        }
                    }
                })
        },

        getNewLive (articleId) {
            this.$axios.get(`/api/v2/live/newLiveRoomTalk?articleId=${articleId}&time=${this.time}`)
                .then(res=> {
                    const result = res.items
                    if (res.code === 0) {
                        this.time = res.item.time
                        let arr = _.remove(result, (n) => {
                            if (n.top) {
                                this.top = n 
                                return false
                            }
                            return true
                        })
                        this.list = [...arr, ...this.list]
                    }
                })
        },

        getDate: (date) => {
            return date.slice(0, -2) + ':00'
        },

        loadMore() {
            if (this.isAll || this.loading) return false
            
            this.getLive(this.$route.params.articleId)
        }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .wrapper
        overflow auto
    .live-room 
        margin-top 48px
        padding 0 30px
        li  
            margin-bottom 58px
            .left 
                margin-right 22px
                .avatar 
                    width 70px
                    height 70px
                    background gray no-repeat 50%/100%
                    border-radius 999px
                .job 
                    margin-top 6px
                    text-align center
                    font-size 22px
                    color #AFAFAF
            .right 
                flex 1
                .name 
                    font-weight bold
                    font-size 28px 
                    color #858585
                    .i 
                        display inline-block
                        width 60px
                        height 30px
                        background #ED1F2E
                        color #fff
                        text-align center
                        line-height 32px
                        font-size 22px
                        font-style normal
                        font-weight 200
                        box-sizing border-box
                time 
                    margin-left 10px
                    color #AFAFAF
                    font-size 24px
                .content 
                    margin-top 6px
                    line-height 64px
                    font-size 32px
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