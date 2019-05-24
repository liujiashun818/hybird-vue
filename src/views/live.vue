<template>
    <div>
        <!-- 视频直播 -->
        <div class="video-wrap">
            <div class="top-title" v-if="data.showTitle==='true'">{{data.title}}</div>
            <video
                    :src="data.video"
                    :poster="data.image"
                    style="object-fit:fill" 
                    controlsList="nodownload"
                    x5-playsinline
                    playsinline
                    webkit-playsinline
                    controls
                    preload="auto">
            </video>
        </div>
        <!-- 导航栏 -->
        <nav class="flex">
            <div @click="routerPush(index)" :class="{activeItem: activeIndex == index}" v-for="(li, index) in linkList">
                <span>{{li.name}}</span>
            </div>
            <div class="line"></div>
        </nav>

        <section>
            <!-- 直播间 -->
            <Room v-if="!activeIndex"></Room>

            <!-- 网友互动 -->
            <Interactive v-else></Interactive>
        </section>
    </div>
</template>

<script>
import Room from '_c/live/live-room'
import Interactive from '_c/live/interactive'
import wx from 'src/constants/wechatShare'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            data: {},
            activeIndex: 0,
            linkList: [
                {name:'直播间'},
                {name:'网友互动'}
            ]
        }
    },

    created () {
        let id = this.$route.params.articleId
        this.getInit(id)
    },

    methods: {
        routerPush (index) {
            this.activeIndex = index
        },

        getInit (articleId) {
            this.$axios.get(`/api/v2/live/detail/${articleId}`)
                .then(res=> {
                    const result = res.item
                    if (res.code === 0) {
                        this.data = result

                        // 微信分享
                        let imgUrl = this.data.image
                        wx({
                            title: this.data.title,
                            imgUrl: imgUrl
                        },this)

                        // 存储唤醒的数据
                        this.$store.dispatch('saveData', result)
                    }else {
                        Toast(res.msg)
                    }
                })
        }
    },

    components: {
        Room,
        Interactive
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .video-wrap
        position relative
        background #afafaf
        width 100vw
        height 432px
        .top-title
            position absolute
            top 0
            width 100%
            height 80px
            line-height 80px
            color #fff
            font-size 32px
            text-indent 40px
            background rgba(0, 0, 0, .2)
            z-index 10000
        video
            width 100%
            height 100%
    nav 
        position relative
        height 96px
        box-shadow 0px 10px 10px #f6f6f6
        .line
            position absolute
            left 50%
            top 50%
            margin -19px 0 0 -1px
            width 2px
            height 38px
            background #eee
        div 
            flex 1
            text-align center
            color #AAAAAA 
            font-size 28px
            line-height 96px
    section 
        overflow hidden
    .activeItem
        span 
            display inline-block
            color #ED1F2E
            font-weight bold
            height 88px
            font-size 32px
            border-bottom 4px solid #ED1F2E

</style>
