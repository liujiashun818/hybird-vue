<template>
    <div>
        <div class="share" v-if="showPage"></div>
        <a id="openApp"></a>
        <div :class="['mask', `${phoneType}-tip`]" @click="toggleMask" v-if="isOpenMask">

        </div>
    </div>
</template>

<script>
import wxShare from 'src/constants/wechatShare.js'
import CallApp from 'callapp-lib'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            phoneType: '',
            isOpenMask: false
        }
    },

    watch: {
        wakeData: {
            handler (val) {
                console.log('watch wakeData()', val)


                document.title = val.title || '山西日报，讲山西故事'

                // 获取唤醒数据
                let params = {
                    articleId: '',
                    type: '',
                    sysCode: '',
                    officeType: ''
                }
                if (this.$route.path.includes('/paper')) {
                    params = {
                        articleId: this.$route.params.id,
                        sysCode: 'paper',
                        type: 'paper',
                        officeType: ''
                    }
                } else if (this.$route.path.includes('/detail')) {
                    const { sysCode, type } = this.wakeData
                    params = {
                        articleId: this.$route.params.id,
                        sysCode,
                        type,
                        officeType: ''
                    }
                } else if (this.$route.path.includes('/thematic')) {
                    params = {
                        articleId: this.$route.params.articleId,
                        sysCode: 'subject',
                        type: 'subject',
                        officeType: ''
                    }
                } else if (this.$route.path.includes('/live')) {
                    params = {
                        articleId: this.$route.params.articleId,
                        sysCode: 'live',
                        type: 'live',
                        officeType: ''
                    }
                } else if (this.$route.path.includes('/local')) {
                    params = {
                        articleId: this.$route.params.categoryId,
                        sysCode: '',
                        type: '',
                        officeType: '1'
                    }
                    document.title = val.cityName || '山西日报，讲山西故事'
                } else if (this.$route.path.includes('/shanxi')) {
                     params = {
                        articleId: this.$route.params.id,
                        sysCode: '',
                        type: '',
                        officeType: '2'
                    }
                    document.title = val.office.name || '山西日报，讲山西故事'
                }  

                new Mlink({
                    mlink:'AbGz',//短链地址
                    button:document.querySelector('a#openApp'),
                    autoLaunchApp : false,
                    autoRedirectToDownloadUrl: true,
                    downloadWhenUniversalLinkFailed: false,
                    inapp: false,
                    params
                })
            },
            deep: true
        }
    },
    
    methods: {  
        openApp () {
            // 此方法暂停使用，先使用极光魔链来唤起App
            
            //判断是否在微信中
            if (localStorage.isWeiXin === '1') {
                // 判断机型
                this.phoneType = localStorage.phoneType
                this.toggleMask()
                return false
            }

            // 获取唤醒数据
            let dataOptions = null
            if (this.$route.path.includes('/paper')) {
                dataOptions = {
                    param: {
                        articleId: this.$route.params.id,
                        sysCode: 'paper',
                        type: 'paper'
                    },
                    path: 'detail'
                }
            } else if (this.$route.path.includes('/detail')) {
                const { sysCode, type } = this.wakeData
                dataOptions = {
                    param: {
                        articleId: this.$route.params.id,
                        sysCode,
                        type
                    },
                    path: 'detail'
                }
            } else if (this.$route.path.includes('/thematic')) {
                dataOptions = {
                    param: {
                        articleId: this.$route.params.articleId,
                        sysCode: 'subject',
                        type: 'subject'
                    },
                    path: 'detail'
                }
            } else if (this.$route.path.includes('/live')) {
                dataOptions = {
                    param: {
                        articleId: this.$route.params.articleId,
                        sysCode: 'live',
                        type: 'live'
                    },
                    path: 'detail'
                }
            } else if (this.$route.path.includes('/local')) {
                dataOptions = {
                    param: {
                        id: this.$route.params.categoryId,
                        officeType: '1'
                    },
                    path: 'gov'
                }
            } else if (this.$route.path.includes('/shanxi')) {
                dataOptions = {
                    param: {
                        id: this.$route.params.id,
                        officeType: '2'
                    },
                    path: 'gov'
                }
            }  
        
            dataOptions.callback = () => {
                let phoneType = localStorage.phoneType
                if (phoneType === 'ios') {
                    window.location.href = 'https://itunes.apple.com/cn/app/%E5%B1%B1%E8%A5%BF%E6%97%A5%E6%8A%A5%E5%AE%98%E6%96%B9%E7%89%88/id859098148?mt=8'
                } else {
                    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.shanxidaily.activity'
                }
            }
            // 唤醒app
            const options = {
                scheme: {
                    protocol: 'sxrbapp'
                },
                appstore: 'https://itunes.apple.com/cn/app/%E5%B1%B1%E8%A5%BF%E6%97%A5%E6%8A%A5%E5%AE%98%E6%96%B9%E7%89%88/id859098148?mt=8',
                yingyongbao: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.shanxidaily.activity',
                fallback: window.location.href
            };
            const callLib = new CallApp(options)

            callLib.open(dataOptions)
        },

        toggleMask () {
            this.isOpenMask = !this.isOpenMask
        }
    },

    computed: {
        ...mapGetters([
            'wakeData',
            'showPage'
        ])
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"

    .share 
        position relative
        height 162px
        width 100%
        background url("~_images/share-banner.png") no-repeat 50%/100%
    a 
        position absolute
        top 70px
        left 570px
        display block
        width 155px 
        height 60px
    .mask 
        position fixed
        top 0
        left 0
        width 100vw
        height 100vh
        background #f7f8f3 no-repeat 0 0/100%
        z-index 9999999
    .ios-tip
        background-image url("~_images/ios-mask.jpg")
    .android-tip
        background-image url("~_images/android-mask.jpg")
</style>