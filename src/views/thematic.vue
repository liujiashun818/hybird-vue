<template>
    <div class="wrapper">
        <div class="top-pic">
            <img :src="data.image" alt="">
        </div>
        <!-- 标题区 -->
        <div class="title-area">
            <h3>{{data.title}}</h3>
            <div class="description">{{data.description}}</div>
        </div>
    
        <!-- 列表区 -->
        <section v-for="(item, index) in blocks" v-if="blocks && blocks.length">
            <header class="flex flex-cross-center">
                <span>{{index+1}}</span>∕<span>{{data.blocks.length}}</span>
                <div class="name">{{item.title}}</div>
            </header>
            <ul>
                <li class="flex flex-cross-center flex-main-justify" v-for="article in item.articles" @click="goPath(article)">
                    <div class="thumbnail" :style="{backgroundImage: 'url(' + article.imageUrl.split(',')[0] + ')'}" v-if="article.imageUrl">
                        <i :class="[article.type+'-icon']"></i>
                    </div>
                    <div class="info">
                        <div class="type ellipsis" v-html="article.tags" v-if="article.tags"></div>
                        <div class="title mult_line_ellipsis" v-html="article.title"></div>
                        <div class="flex flex-cross-center flex-main-justify date">
                            <time>{{getDate(article.date) | dateCompared}}</time>
                            <div>{{getCount(article.comments)}}评</div>
                        </div>
                    </div>
                </li>
            </ul>
            <footer @click="getArticles(item.id, index)" v-if="item.page.next*1 <= item.page.last*1">加载更多</footer>
        </section>
    </div>
</template>

<script>
    import wx from 'src/constants/wechatShare'
    import moment from 'moment'
    import { Toast } from 'mint-ui'
    export default {
        data () {
            return {
                data: {},
                blocks: []
            }
        },

        created () {
            this.getInit(this.$route.params.articleId)
        },

        methods: {
            getInit (id, size=5) {
                this.$axios.get(`/api/v2/subjects/${id}?size=${size}`)
                    .then(res=> {
                        const result = res.item
                        if (res.code === 0) {
                            this.data = result
                            this.blocks = result.blocks
                            
                            // 微信分享
                            wx({
                                title: result.title,
                                imgUrl: result.image
                            },this)

                            // 存储唤醒的数据
                            this.$store.dispatch('saveData', result)
                        }else {
                            Toast(res.msg)
                        }
                    })
            },

            getArticles (id, index, size=5) {
                const pageToken = this.blocks[index].page.next * 1
                const pageLast = this.blocks[index].page.last * 1
                // 最后一页无需加载
                if (pageToken > pageLast) return false
                this.$axios.get(`/api/v2/blocks/${id}?size=${size}&pageToken=${pageToken}`)
                    .then(res=> {
                        const result = res.items
                        if (res.code === 0) {
                            this.blocks[index].articles = [...this.blocks[index].articles, ...result]
                            this.blocks[index].page.next++
                        }
                    })
            },

            getDate: (date) => {
                return date.slice(0, -2) + ':00'
            },

            getTime (time) {
                let result = ''
                if (time) {
                    result = time.substring(0,10) + ' ' + time.substring(11,16)
                }
                return result
            },

            getCount (count) {
                let result = 0
                if (count > 0) {
                    result = count
                    if (count > 999999) {
                        result = count.substring(0,count.length - 4) + '万'
                        if (count > 99999999) {
                            result = '过亿'
                        }
                    }
                }
                return result
            },

            goPath (article) {
                window.location.href = article.shareUrl
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"
    @import "~src/stylus/list"
    
    .wrapper
        position relative
        font-family: 'PingFangSC-Regular', '微软雅黑', sans-serif;
        .top-pic
            width 750px
            max-height 422px
            overflow hidden
            img
                width 100%
                display block
        .title-area
            margin-top 26px
            padding 0 30px
            h3 
                line-height 72px 
                color #222
                font-size 60px
            .description 
                margin-top 14px
                color #858585
                font-size 28px
                line-height 40px
        section 
            margin-top 104px
        
</style>