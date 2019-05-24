<template>
    <div class="wrapper">
        <section>
            <div class="logo"></div>
            <p>政治责任 新闻担当</p>
            <p>人本情怀 职业品格</p>
            <div class="line"></div>
            <button @click="downloadApp">立即下载</button>
            <div class="group"></div>
        </section>
    </div>
</template>

<script>
import wx from 'src/constants/wechatShare'
export default {
    created () {
        wx({
            title: '山西日报，讲山西故事'
        },this)
    },

    methods: {
        downloadApp () {
            let type = localStorage.phoneType
            let isWeiXin = localStorage.isWeiXin
            if (type === 'ios') {
                window.location.href = 'https://itunes.apple.com/cn/app/%E5%B1%B1%E8%A5%BF%E6%97%A5%E6%8A%A5%E5%AE%98%E6%96%B9%E7%89%88/id859098148?mt=8'
            } else if (type === 'android' && isWeiXin === '1') {
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.shanxidaily.activity'
            } else if (type === 'android' && isWeiXin === '0') {
                window.location.href = 'http://img.sxrbw.com/data/soft/sxrb.apk'
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .wrapper 
        position relative
        height 100vh
        background #eee
        overflow hidden
        section
            position absolute
            top 50%
            margin -520px 0 0 0
            width 100%
            min-height 920px
            .logo
                margin 0 auto
                width 306px
                height 306px
                background url("~_images/sxrb-logo.png") no-repeat 50%/100%
            p 
                margin-top 6px
                text-align center
                color #6D6D6D
                font-size 48px
                line-height 66px
            .line
                margin 46px auto 90px
                width 542px
                height 2px
                background url("~_images/download-line.png") no-repeat 50%/100%
            button 
                display block
                margin 0 auto
                width 492px
                height 106px
                line-height 106px
                border-radius 56px
                background #FF3847
                color #fff
                font-size 40px
                letter-spacing 1px
                text-align center
            .group 
                margin 26px auto 100px
                width 492px
                height 72px
                background url("~_images/download-group.png") no-repeat 50%/100%
</style>
