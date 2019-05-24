<template>
    <div>
        <!-- 头部信息 -->
        <header class="flex flex-cross-center">
            <img class="avatar" :src="office.logo" alt="" onerror>
            <div class="info">
                <h3>{{office.name}}</h3>
                <div class="follow">关注 {{getCount(office.likes)}}</div>
            </div>
        </header>

        <!-- 导航栏 --> 
        <nav ref="nav">
            <ul class="flex-default">
                <li @click="routerPush(li, index)" :class="{activeItem: activeIndex == index}" v-for="(li, index) in categoryList">
                    <span>{{li.name}}</span>
                </li>
            </ul>
        </nav>

        <!-- 列表区 -->
        <section v-if="categoryId && categoryId!=='desc'">
            <ul v-if="list.length > 0">
                <li v-for="article in list" @click="goPath(article)">
                    <!-- 三图 -->
                    <div v-if="article.viewType==='three'" style="height:100%">
                        <h4 v-html="article.title"></h4>
                        <div class="three-list flex">
                            <div class="img" v-for="img in article.images" :style="{backgroundImage: 'url(' + img + ')'}"></div>
                        </div>
                    </div>
                    <!-- 通栏 -->
                    <div v-else-if="article.viewType==='banner'" style="height:100%">
                        <!-- 新闻 -->
                        <div v-if="article.type === 'normal'">
                            <h3 v-html="article.title"></h3>
                            <div class="pic-wrap">
                                <img :src="article.image" alt="">
                            </div>
                        </div>
                        <!-- 图集 -->
                        <div v-else-if="article.type === 'image'">
                            <h3 v-html="article.title"></h3>
                             <div class="flex images-list">
                                <div class="images" v-for="img in article.mediaList.slice(0,4)" :style="{backgroundImage: 'url(' + img.image + ')'}"></div>
                                <div class="images-label" v-if="article.mediaList.length>3">{{article.mediaList.length}}图</div>
                            </div>
                        </div>
                        <!-- 视频 -->
                        <div v-else-if="article.type === 'video'">
                            <div class="pic-wrap">
                                <img :src="article.image" alt="">
                                <i class="video-btn"></i>
                            </div>
                            <h4 v-html="article.title"></h4>
                        </div>
                        <!-- 音频 -->
                        <div v-else-if="article.type === 'audio'">
                            <h4 v-html="article.title"></h4>
                            <div class="audio"></div>
                        </div>  
                        <div v-else>other</div>
                    </div>
                    <!-- 普通类型 -->
                    <div v-else class="flex-default" style="height:100%">
                        <div class="thumbnail" :style="{backgroundImage: 'url(' + article.image + ')'}" v-if="article.image">
                            <i :class="[article.type+'-icon']"></i>
                        </div>
                        <div class="info">
                            <div class="type ellipsis" v-html="article.tags" v-if="article.tags"></div>
                            <div class="title mult_line_ellipsis" v-html="article.title"></div>
                            <div class="flex-default date">
                                <time>{{getDate(article.date) | dateCompared}}</time>
                                <div>{{getCount(article.comments)}}评</div>
                            </div>
                        </div>
                    </div>

                     <!-- 信息部分 -->
                    <div class="three-info flex-default" v-if="article.viewType!=='normal'">
                        <div class="flex flex-cross-center">
                            <div class="tag" v-html="article.tags" v-if="article.tags"></div>
                            <time>{{getDate(article.date) | dateCompared}}</time>
                        </div>
                        <div class="comment">{{getCount(article.comments)}}评</div>
                    </div>
                    <div class="description" v-if="article.type === 'normal' && article.viewType==='banner'" v-html="article.description"></div>
                </li>
            </ul>
            <div class="desc no-desc" v-else>该山西号暂未发布内容</div>
            <footer @click="getArticles" v-if="list.length > 0 && (data.page.next*1 <= data.page.last*1)">加载更多</footer>
        </section>

        <div class="desc" v-html="office.description" v-if="categoryId==='desc'"></div>
        <div class="desc no-desc" v-if="categoryId==='desc' && !office.description">暂无简介</div>
    </div>
</template>

<script>
import wx from 'src/constants/wechatShare'
export default {
    data () {
        return {
            data: {
                 page: {
                    next: 1,
                    last: 99
                }
            },
            office: {},
            categoryList: [],
            activeIndex: 0,
            list: [],
            categoryId: null
        }
    },

    created () {
        this.getInit(this.$route.params.id)
    },

    mounted () {
        this.$nextTick(() => {
            this._initScroll()
        })
    },

    methods: {
        getInit (id, size=5) {
            this.$axios.get(`${this.$url}/api/articles/officeArticleList?id=${id}&size=${size}`)
                .then(res=> {
                    const result = res.item
                    if (res.code === 0) {
                        this.categoryList = result.categoryList
                        this.office = result.office

                        this.categoryList.push({name:'简介', id: 'desc'})
                        
                        // 获取第一页文章列表
                        let id = result.categoryList[0].id
                        if (id && (id !== 'desc')) {
                            this.categoryId = id
                            this.getArticles()
                        } 

                        // 微信分享
                        wx({
                            title: this.office.name,
                            imgUrl: this.office.logo
                        },this)

                        // 存储唤醒的数据
                        this.$store.dispatch('saveData', result)
                    }
                })
        },

        getArticles () {
            const pageToken = this.data.page.next * 1
            const pageLast = this.data.page.last * 1
            // 最后一页无需加载
            if (pageToken > pageLast) return false
            this.$axios.get(`${this.$url}/api/articles/articleListByCategory?categoryId=${this.categoryId}&size=${10}&pageToken=${pageToken}`)
                .then(res=> {
                    const result = res.items
                    if (res.code === 0) {           
                        this.data = res
                        this.list = [...this.list, ...result]
                    }
                })
        },

        routerPush (item, index) {
            // 重复选择不执行
            if (this.activeIndex === index) return false
            this.activeIndex = index
            this.categoryId = item.id

            // 简介不需要重新调用
            if (item.id === 'desc') return false
            // 重置数据
            this.data = {
                 page: {
                    next: 1,
                    last: 99
                }
            }
            this.list = []

            this.getArticles()
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

        getDate: (date) => {
            return date.slice(0, -2) + ':00'
        },

        goPath (article) {
            this.$router.push({name:'Detail', params:{type:'gov', id:article.articleId}})
        },

        _initScroll () {
            this.navScroll = new this.$BScroll(this.$refs.nav, {
                click: true,
                scrollY: false,
                scrollX: true
            })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"
    @import "~src/stylus/list"

    header 
        padding 42px 30px
        height 204px
        background #ED1F2E
        box-sizing border-box
        color #fff
        .avatar 
            width 120px
            height 120px
            background #FDE0E2 url("~_images/gov_avatar.png") no-repeat 0 0/100% 100%
            border-radius 999px
        .info 
            margin-left 20px
            h3 
                font-size 36px
                line-height 50px
                font-weight normal
            .follow 
                margin-top 20px
                font-size 26px
                line-height 24px
    nav 
        box-shadow:0px 4px 6px 0px rgba(230,230,230,0.5);
        height 90px
        line-height 90px
        ul 
            width -webkit-min-content
            width -moz-min-content
            width fit-content
            padding 0 30px
            box-sizing border-box
            white-space nowrap
            li 
                font-size 28px 
                color #888888
                text-align center
                margin 0 34px
    .desc 
        margin-top 40px
        padding 0 30px
        font-size 28px 
        color #000
        line-height 56px
    .no-desc 
        margin-top 120px
        text-align center
    .activeItem
        position relative
        color #222
        font-weight bold
        font-size 30px
        &:before 
            content ''
            position absolute
            left -30px
            top 50%
            margin-top -1px
            width 20px 
            height 2px
            background #FF606C
        &:after 
            content ''
            position absolute
            right -30px
            top 50%
            margin-top -1px
            width 20px 
            height 2px
            background #FF606C

</style>
