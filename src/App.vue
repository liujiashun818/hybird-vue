<template>
    <div id="app">
        <div class="wrap">
            <Share v-if="$route.name !== 'Download' && isSharePage"></Share>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import api from 'src/constants/appapi'
    import Share from '_c/common/share'
    export default {
        data () {
            return {}
        },

        created () {
            this.isSharePage = api.isSharePage()
            localStorage.phoneType = this.phoneType()
            localStorage.isWeiXin = this.isWeiXin()
        },

        methods: {
            phoneType () {
                // 区分机型
                let u = navigator.userAgent;
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
                if (isiOS) {
                    return 'ios'
                } else if (isAndroid) {
                    return 'android'
                } else {
                    return ''
                }
            },
            isWeiXin () {
                // 判断是否微信
                let ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return '1';
                } else {
                    return '0';
                }
            }
        },

        components: {
            Share
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .wrap 
        min-height 100vh
        overflow-x hidden
</style>
