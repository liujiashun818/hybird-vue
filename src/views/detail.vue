<template>
    <div class="wrapper">
        <div class="wrap" v-if="showPage">
            <!-- 头图区 -->
            <div v-if="data.type==='video'" ref="videoWrap"></div>
            <div class="video-mask" ref="videoMask" v-if="openVideoMask"></div>
            <p class="video-wrap"  v-if="data.type==='video'">
                <video :src="videoUrl" :poster="poster" webkit-playsinline="true" playsinline="true" x5-playsinline="true" x-webkit-airplay="allow" style="object-fit:fill" controlsList="nodownload"></video>
                <button class="content-button"></button>
            </p>
            <div class="box-block" v-if="data.type==='video'"></div>
            <audio v-else-if="data.type==='audio' && isSharePage" :src="audioUrl" controls></audio>
            <div class="top-pic" v-else  v-show="imageUrl">
                <img :src="imageUrl" alt="">
            </div>

            <!-- 标题区 -->
            <div class="essay" v-if="articleType !== 'image'">
                <h3 v-if="$route.params.type !== 'normal'" v-html="data.introTitle || data.intro_title || ''"></h3>
                <h3 v-if="$route.params.type.indexOf('paper') > -1" v-html="data.introTitle1 || data.intro_title1 || ''"></h3>
                <h3 v-if="$route.params.type.indexOf('paper') > -1" v-html="data.introTitle2 || data.intro_title2 || ''"></h3>
                <h1 v-html="data.title"></h1>
                <div class="desc" v-if="$route.params.type !== 'normal'" v-html="data.subTitle || data.sub_title || ''"></div>
                <div class="desc" v-if="$route.params.type.indexOf('paper') > -1" v-html="data.subTitle1 || data.sub_title1 || ''"></div>
                <div class="desc" v-if="$route.params.type.indexOf('paper') > -1" v-html="data.subTitle2 || data.sub_title2 || ''"></div>
                <!-- 政务专用 -->
                <div class="gov-info flex-default" v-if="$route.params.type === 'gov'">
                    <div class="flex flex-cross-center" @click="goGov">
                        <img class="avatar" :src="data.officeLogo" alt="" onerror>
                        <div class="info">
                            <h5>{{data.officeName}}</h5>
                            <div class="date">{{getTime(date)}}</div>
                        </div>
                    </div>
                    <div v-if="!isSharePage && (isFollow===1 || isFollow===0)" :class="['follow-btn', isFollow?'no':'']" @click="setFollow">
                        {{isFollow?'已关注':'关注'}}
                    </div>
                </div>
                <div class="date-wrap flex flex-cross-center" v-else>
                    <div class="recite" v-if="isVoice && !isSharePage" @click="readPaper"></div>
                    <div class="date">{{getTime(date)}} {{source}} {{data.authors}}</div>
                </div>
            </div>

            <!-- 报纸专用图片区 -->
            <ul class="images" v-if="$route.params.type.indexOf('paper') > -1 && data.medias && data.medias.length">
                <li v-for="item in data.medias">
                    <img v-lazy="item.img_url" alt="" />
                    <p>{{item.img_desc}}</p>
                </li>
            </ul>

            <!-- 问政专区 -->
            <section class="QA-area" v-if="$route.params.type === 'question'">
                <div>
                    <header class="flex flex-cross-center flex-main-justify">
                        <div class="flex flex-cross-center info">
                            <div class="tag ask-color">问</div>
                            <div class="avatar" :style="{backgroundImage:'url('+ data.userPhoto?data.userPhoto:'' + ')'}"></div>
                            <h5>{{data.userName}}</h5>
                        </div>
                        <div class="date">{{data.questionTime && data.questionTime.split(' ')[0]}}</div>
                    </header>
                    <div :class="['content','font-size-'+fontSizeNum]">
                        {{data.questionContent}}
                    </div>
                    <div class="status">问题状态：{{data.status==4?'审核未通过':data.status==3?'已回复':data.status==2?'办理中':data.status==1?'已审核':'未审核'}}</div>
                </div>
                <div class="QA-wrap" v-if="data.replyContent">
                    <header class="flex flex-cross-center flex-main-justify">
                        <div class="flex flex-cross-center info">
                            <div class="tag anw-color">答</div>
                            <div class="avatar gov-avatar" :style="{backgroundImage:'url('+ data.organizationPhoto?data.organizationPhoto:'' + ')'}"></div>
                            <h5>{{data.organization}}</h5>
                        </div>
                        <div class="date">{{data.replyTime && data.replyTime.split(' ')[0]}}</div>
                    </header>
                    <div :class="['content','font-size-'+fontSizeNum]">
                          {{data.replyContent}}
                    </div>
                </div>
            </section>

            <!-- 图集专区 -->
            <div class="swipe-wrap" v-if="articleType === 'image'">
                <mt-swipe :auto="0" :continuous="false" @change="handleSwipeChange">
                    <mt-swipe-item :key="index" v-for="(item, index) in data.medias">
                        <img :src="item.image" alt="">
                    </mt-swipe-item>
                </mt-swipe>
                <div class="swipe-title">{{data.title}}</div>
                <div :class="['swipe-desc','content','font-size-'+fontSizeNum]">{{swipeDescription}}</div>
            </div>

            <!-- 内容区 -->
            <div ref="content" :class="['content','font-size-'+fontSizeNum]" v-html="data.content?data.content:''"></div>

            <!-- 广告区 -->
            <div v-if="($route.params.type === 'normal') && ad" class="ad-area" @click="goAdPage(ad)">
                <div v-for="(item, index) in ad.images" v-if="!index">
                    <img :src="item.image" alt="">
                    <p v-html="ad.title"></p>
                </div>
            </div>

            <!-- 评论区 -->
            <div class="comment" v-if="comments !== null">
                <div class="title">
                    <i></i>
                    <span>热门评论</span>
                </div>
                <div v-if="comments.length > 0">
                    <ul>
                        <li :key="index" v-for="(item, index) in comments" @click="addComment(item)">
                            <header class="flex flex-cross-center flex-main-justify">
                                <div class="flex flex-cross-center">
                                    <div class="avatar" :style="{backgroundImage:`url(${item.userIcon?item.userIcon:icon})`}"></div>
                                    <div class="info-area">
                                        <div class="name ellipsis">{{item.username}}</div>
                                        <div class="time ellipsis">{{getTime(item.date)}}</div>
                                    </div>
                                </div>
                                <div class="like flex flex-cross-center" @click.stop="setActiveLike(item)" v-if="item.id">
                                    <i :class="[item.isLike?'active-good':'good']"></i>
                                    <span :class="[item.isLike?'active-num':'num']">{{getLikesCount(item.likes+'')}}</span>
                                </div>
                            </header>
                            <section>
                                <p v-html="item.content"></p>
                            </section>
                            <div class="origin" v-if="item.parent">
                                <div class="origin-info flex flex-cross-center flex-main-justify">
                                    <div class="origin-name">{{item.parent.username}}</div>
                                    <div class="origin-time">{{getTime(item.parent.date)}}</div>
                                </div>
                                <div class="origin-content">
                                    {{item.parent.content}}
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div v-if="!isSharePage" class="check-all" @click="appPostMessage('checkAllComment')">查看全部评论 <i></i></div>
                </div>
                <div v-else class="no-comment"></div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import { Lazyload, Toast, Swipe, SwipeItem} from 'mint-ui';
import api from 'src/constants/appapi'
import icon from '_images/detail-avatar.png'
import govHead from '_images/gov_avatar.png'
import wx from 'src/constants/wechatShare'
import { mapGetters } from 'vuex'

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);

export default {
    data () {
        return {
            govHead,
            icon,
            articleType: '', // 文章类型
            swipeIndex: 0, // 图集坐标
            swipeDescription: '', // 图集的描述
            isSharePage: false, // 是否为分享页面
            el: null, // 元素：正在播放的video
            data: {}, // 接口数据
            type: '', // 文章类型
            videoUrl: '', // 顶部video的地址
            audioUrl: '', // 顶部audio的地址
            imageUrl: '', // 顶部img的地址
            isVoice: false, // 是否可以朗读
            content: '', // 接口：内容部分
            poster: '', // 顶部video的图片
            fontSizeNum: 3, // 字体设置大小  1-5 小-大
            source: '', // 作品来源
            urls: [], // 文章内所以图片合集
            comments: null, // 评论内容
            mockLikes: [], // 点赞数组
            images: [], // content内的图片
            saveVideo: null, // 4g/wifi 弹窗前保存的video元素
            picFlag: true, //防止多次点击图集
            isFollow: null, // 政务gov 是否关注
            date: '', // 日期（政务与普通一致，报纸字段不同）
            ad: {}, // 广告
            openVideoMask: false, //video的黑色底部
        }
    },

	created () {
        // 暴露方法给webview
        window.appapi = api
        window.$vm = this

        // 设置字体大小
        appapi.changeFontSize(this.$route.query.fontsize)

        // 判断 普通或报纸 调取不同的接口
        const { type, id } = this.$route.params

        if (type === 'paperA' || type === 'paperB') {
            // paperA 人民日报, paperB 山西日报 
            this.initPaper(id, type)
        }else if (type === 'normal') {
            this.initNormal(id)
        }else if (type === 'gov') {
            this.initGov(id)
        }else if (type === 'question') {
            this.initQA(id)
        }

        this.isSharePage = appapi.isSharePage()
	},

    mounted () {
        this.move()
    },

    updated () {
        let imgs = $('.content img')
        this.images = Array.from(imgs)
    },

    watch: {
        data: {
            handler (val) {           
                this.$store.dispatch('setShowPage', true)

                if (this.isSharePage) {
                    // 微信分享
                    let imgUrl = val.images?val.images[0]:'';
                    wx({
                        title: val.title,
                        imgUrl: imgUrl
                    },this)
                }
                
                // 存储唤醒的数据
                this.$store.dispatch('saveData', val)
                // content样式重绘
                this.pageUpdate()
            },
            deep: true
        },

        showPage (val) {
            // 原生app 渲染完调用
            if (val) this.appPostMessage('renderFinish')
        },

        el: {
            handler (val, oldVal) {
                if (oldVal) {
                    let father = $(oldVal).parent()
                    father
                        .css('position', 'relative')
                    $(oldVal)
                        .css('position', 'absolute')
                        .css('z-index', 1)
                }

                this.openVideoMask = false 
            },
            deep: true
        },

        comments: {
            handler () {},
            deep: true
        }
    },

	methods: {
        goAdPage (ad) {
            if (this.isSharePage) 
                window.location.href = ad.link
            else
                this.appPostMessage('clickAdvert', JSON.stringify(ad))
        },

        readPaper () {
            this.pauseAllVideo()
            this.appPostMessage('voiceRead')
        },

        setFollow () {
            if (!this.isFollow) this.appPostMessage('sub')
        },

        goGov () {
            if (this.isSharePage) {
                if (this.data.officeType == '1') {
                    this.$router.push({name:'Local', params:{categoryId:this.data.officeId}})
                } else if (this.data.officeType == '2') {
                    this.$router.push({name:'ShanXi', params:{id:this.data.officeId}})
                }
            } else {
                this.appPostMessage('goGovDetail')
            }
        },

        scrollHandler () {
            this.lazyLoad();
            this.handleScroll()
            this.getTopMask()
            if (this.data && (this.data.type === 'video')) {
                this.getTopVideo()
            }
        },

        handleSwipeChange (index) {
            let obj = this.data.medias[index]
            this.swipeIndex = index
            this.swipeDescription = obj.description || ''
        },

        handleScroll () {
            if (this.el) {
                let val = parseInt($(this.el).parent()[0].getBoundingClientRect().top)
                let height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
                let father = $(this.el).parent()
                let scrollTop = $(document).scrollTop()
                if (this.isSharePage) {
                    if(val > height && scrollTop<=100) {
                        father
                            .css('position', '')
                        $(this.el)
                            .css('position', 'absolute')
                            .css('top', 0)
                            .css('z-index', 1001)
                        // 非顶部视频悬浮时 打开黑色遮罩
                        this.openVideoMask = true
                    }else if (val < 0 || val > height) {
                        father
                            .css('position', '')
                        $(this.el)
                            .css('position', 'fixed')
                            .css('top', 0)
                            .css('z-index', 1001)
                        // 非顶部视频悬浮时 打开黑色遮罩
                        this.openVideoMask = true
                    }else {
                        father
                            .css('position', 'relative')
                        $(this.el)
                            .css('position', 'absolute')
                            .css('z-index', 1)
                        // 非顶部视频悬浮时 关闭黑色遮罩
                        this.openVideoMask = false
                    }
                }else {
                    if (val < 0 || val > height) {
                        father
                            .css('position', '')
                        $(this.el)
                            .css('position', 'fixed')
                            .css('top', 0)
                            .css('z-index', 1001)
                        // 非顶部视频悬浮时 打开黑色遮罩
                        this.openVideoMask = true
                    }else {
                        father
                            .css('position', 'relative')
                        $(this.el)
                            .css('position', 'absolute')
                            .css('z-index', 1)
                        // 非顶部视频悬浮时 关闭黑色遮罩
                        this.openVideoMask = false
                    }
                }
            }

        },

        move () {
            // 滚动时懒加载 content内的图片,端内不做懒加载
            this.getTopVideo()
            window.onload = window.onscroll = () => {
                this.scrollHandler()
            }
        },

        initQA (id) {
            // 问政接口
            this.comments = []

            this.$axios.get(`/api/asks/detail/${id}`)
                .then(res=> {
                    const result = res.item
                    if (res.code === 0) {
                        this.data = result
                        this.imageUrl = result.headImage
                       
                        switch(result.typeId) {
                            case 1:
                                this.source = '咨询'
                                break
                            case 2:
                                this.source = '投诉'
                                break
                            case 5:
                                this.source = '谏言'
                                break
                            case 6:
                                this.source = '求助'
                                break
                            case 9:
                                this.source = '感谢'
                                break
                        }

                        // 调用评论接口
                        this.getComment(result.sysCode, id)

                        // 原生app 渲染完调用
                        this.appPostMessage('renderFinish')
                    }
                })
                .catch(err => console.log(err))
        },

        initGov (id)  {
            // 政务接口
            this.$axios.get(`${this.$url}/api/articles/detail/${id}`)
                .then(res=> {
                    const result = res.item
                    if (res.code === 0) {
                        // console.log('result:',result)
                        // 如果type为链接link 直接跳转
                        if (result.type === 'link') {
                            window.location.href = result.link
                            return false
                        } else if (result.type === 'image') {
                            this.articleType = 'image'
                            this.data = result
                            this.data.medias = result.mediaList
                            let obj = this.data.medias[0]
                            this.swipeDescription = obj.description || ''
                            this.data.content = ''
                            return false
                        } else {
                            this.data = result
                            let reg= new RegExp(/line-height:\s.*?[\d]*/g)
                            this.data.content=this.data.content?this.data.content.replace(reg,'line-height:0'):''
                            let textreg=new RegExp(/text-indent:\s.*?(\d{2}pt)/g)
                            this.data.content=this.data.content?this.data.content.replace(textreg,'text-indent:2em'):''

                            this.imageUrl = result.images?result.images[0]:''

                            this.isVoice = result.isVoice?result.isVoice:false
                            this.source = result.source
                            this.date = result.date
                        
                            if (result.type === 'video') {
                                this.poster = result.image
                                this.videoUrl = result.mediaList[0].image
                            }
                            //console.log(this.videoUrl)
                            if (result.type === 'audio') {
                                this.poster = result.image
                                this.audioUrl = result.mediaList[0].image
                            }
                        }

                        // 调用评论接口
                        this.getComment(result.sysCode, id)

                        // 原生app 渲染完调用
                        this.appPostMessage('renderFinish')
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        },

        initPaper (id, type)  {
            // 报纸接口
            let url = ''
            if (type === 'paperA') {
                // 人民日报
                url = `//rmrbapi.people.cn/content/getdetail?articleid=${id}&platform=${appapi.checkTerminal()}`
            } else {
                // 山西日报
                url = `/api/v2/paper/detail?articleId=${id}&platform=${appapi.checkTerminal()}`
            }
            this.$axios.get(url)
                .then(res=> {
                        if (res.code === -1) {
                            Toast('该文章已下线')
                        }
                
                        const result = res.data || res.item
                        if (!result) return
                        
                        this.data = result
                        let reg= new RegExp(/line-height:\s.*?[\d]*/g)
                        this.data.content=this.data.content?this.data.content.replace(reg,'line-height:0'):''
                        let textreg=new RegExp(/text-indent:\s.*?(\d{2}pt)/g)
                        this.data.content=this.data.content?this.data.content.replace(textreg,'text-indent:2em'):''
                        this.data.content = this.data.content?this.data.content.replace('face = "宋体"'):''
                        this.data.content = this.data.content.replace('<br>', '')
                        // 报纸取消来源显示
                        // this.source = result.copyfrom
                        this.date = result.news_datetime

                        if (result.medias && result.medias.length > 0) {
                            result.medias.map((item,index) => {
                                // console.log(item.imgUrl);
                                this.urls.push(item.img_url)
                            })
                        }
                    
                })
                .catch(e => console.log(e))
        },

        initNormal (id)  {
            // 普通接口
            this.$axios.get(`/api/v2/articles/detail/${id}`)
                .then(res=> {
                    const result = res.item
                    if (res.code === 0) {
                        // console.log('result:',result)
                        // 如果type为链接link 直接跳转
                        if (result.type === 'link') {
                            window.location.href = result.link
                            return false
                        } else if (result.type === 'image') {
                            this.articleType = 'image'
                            this.data = result
                            let obj = this.data.medias[0]
                            this.swipeDescription = obj.description || ''
                            this.data.content = ''
                            return false
                        } else {
                            this.data = result
                            let reg= new RegExp(/line-height:\s.*?[\d]*/g)
                            this.data.content=this.data.content?this.data.content.replace(reg,'line-height:0'):''
                            let textreg=new RegExp(/text-indent:\s.*?(\d{2}pt)/g)
                            this.data.content=this.data.content?this.data.content.replace(textreg,'text-indent:2em'):''

                            this.imageUrl = result.images?result.images[0]:''

                            this.isVoice = result.isVoice?result.isVoice:false
                            this.source = result.source
                            this.date = result.date
                            this.ad = result.ads?result.ads[0]:null
                        
                            if (result.type === 'video') {
                                result.medias.map(item => {
                                    this.poster = item.image
                                    item.resources.map (opt => {
                                        if (opt.enctype === 'ld') {
                                            this.videoUrl = opt.url
                                        }
                                    })
                                })
                            }
                            //console.log(this.videoUrl)
                            if (result.type === 'audio') {
                                result.medias.map(item => {
                                    item.resources.map ((opt, i) => {
                                        if (i === 0) {
                                            this.audioUrl = opt.url
                                        }
                                    })
                                })
                            }
                        }

                        // 调用评论接口
                        this.getComment(result.sysCode, id)
                        
                        // 广告渲染完调用
                        this.appPostMessage('renderAdvert', JSON.stringify(this.ad))
                    }
                })
                .catch(e => console.log(e))
        },

        pageUpdate () {
            this.$nextTick(() => {
                this.setContentCSS()
                this.setVideoBtn()
                this.setVideoFun()
                this.setPaperImg()
            })
        },

        async getComment (sysCode, articleId) {
            const res = await this.$axios.get(`/api/comments/${sysCode}/${articleId}?size=5`)
            const result = res.items
            if (res.code === 0) {
                // console.log('comments:',result);
                if (result) {
                    this.comments = result
                    this.comments.map(item => {
                        item.isLike = false
                    })

                    this.handleLikes(this.mockLikes)
                }else {
                    this.comments = []
                }
            }
        },

        setContentCSS () {
            // 处理content内的 图片与视频 样式
            let img = $('.content img')
            let video = $('.content video')
            let p = $('.content p,.content ul,.content ol,.content h1,.content h2,.content h3,.content h4,.content h5,.content h6,.content blockquote')
            
            let imgParent = img.parent()
            let imgParent2 = img.parent().parent()
            let videoParent = video.parents('p')

            // 清除video标签外层的多余父元素
            let arr = Array.from(videoParent)
            arr.map(item => {
                let v = $(item).find('video')[0]
                $(item).empty().append(v)
            })
           
            let images = Array.from(img);
            if (images && images.length>0) {
                images.map((item, index) => {
                    let img = $(item)
                    let imgUrl = img.attr('src')
                    // 绑定图片点击事件
                    this.setImageFun(img, index)
                    // 懒加载
                    if (!img.attr('data-src')) {
                        this.urls.push(img.attr('src'))
                        img.attr('data-src', imgUrl)
                        if (index > 1) {
                            img.attr('src', require('_images/banner_gray.png'))
                        }
                    } 
                })
            }

            img
                .css('width', '100%')
                .css('height', '100%')
                .css('display', 'block')
                .css('margin', '0 auto')
                .attr('onerror', require('_images/banner_gray.png'))

            video
                .css('width', '100%')
                .css('height', '5.6266rem')
                .css('display', 'block')
                .css('position','absolute')
                .css('top', 0)
                .css('z-index', 1)
                .attr('controlsList', 'nodownload')

                if(p.css('line-height')){
                    p.css('line-height','')
                }
            
            p
                .css('margin', '0.3rem 0 0 0')
                .css('padding', '0 .4rem')
                .css('font-size','')
                .css('line-height','')
            $(p[0]).css('margin', '0')

            $(imgParent).attr('style', '')
            $(imgParent2).attr('style', '')

            $(videoParent).attr('style', '')
            $(videoParent).children('.content-button').remove();
            if ($(videoParent).children('video').attr('flag') != '1') {
                $(videoParent)
                    .attr('style', '')
                    .css('margin', '1.33rem auto')
                    .css('height', '5.6266rem')
                    .css('position','relative')
                    .css('background', '#000')
                    .append('<button class="content-button"></button>')
            }
        },

        setVideoBtn () {
            // 设置video按钮 点击播放
            const _this = this
            $('button').off("click").click(function () {
                if(!navigator.onLine){
                    Toast({
                        message:'网络连接失败，请稍后再试',
                        position:'bottom'
                    })
                }else{
                    let video = $(this).parents('p').find('video')
                    _this.saveVideo = video[0]
                    
                    // console.log(_this.saveVideo)

                    //  _this.saveVideo.play()
                    if (_this.isSharePage) {
                        video[0].play()
                    } else {
                        _this.appPostMessage('getNetState')
                    }
                   
                    // if (!_this.isSharePage) {
                    //     // 由app客户端调用视频
                    //     let videoData = {
                    //         url: video.attr('src'),
                    //         image: video.attr('poster'),
                    //         size: video.attr('size')
                    //     }  
                    //     _this.appPostMessage('playVideo', JSON.stringify(videoData))
                    // } else {
                    //     video[0].play()
                    // }
                }
            })
        },

        setVideoFun () {
            // 配置video 悬浮逻辑
            const _this = this
            let md = $(".content video")
            let topVideo = $(".video-wrap video")
            let arg = Array.from(md);
            arg.map((item, index) => {
                item.addEventListener("pause",function(){
                    setTimeout(() => {
                        if (item.paused) {
                            let father = $(item).parent()
                            father
                                .css('position', 'relative')
                            $(item)
                                .css('position', 'absolute')
                                .css('z-index', 1)

                            if (_this.el === item) {
                                _this.el = null
                            }
                        }
                    },500)
                })

                item.addEventListener("ended",function(){
                    setTimeout(() => {
                        if (item.ended) {
                            let father = $(item).parent()
                            father
                                .css('position', 'relative')
                                .append('<button class="content-button"></button>')

                            if ($(item).attr('poster')) {
                                father.append('<div class="poster" style="background-image:url('+$(item).attr('poster')+')"></div>')
                            }

                            $(item)
                                .css('position', 'absolute')
                                .css('z-index', 1)
                                .removeAttr('controls')
                            $(father.children('.content-button')).click(function () {
                                let video = $(this).prev()
                                video[0].play()
                            })
           
                            if (_this.el === item) {
                                _this.el = null
                                // 非顶部视频悬浮时 关闭黑色遮罩
                                _this.openVideoMask = false
                            }
                        }
                    },100)
                })

                item.addEventListener("playing",function(){
                    _this.pauseVideo(item)
                    // 暂停朗读
                    _this.appPostMessage('pauseAudio')
                    let btn = $(item).next()
                    btn.remove()
                    let videoParent = $(item).parent()
                    $(videoParent).children('.poster').remove();
                    $(item).attr('controls', 'controls')
                    _this.el = item
                })

                let videoInfo  = _this.data.moreVideos?_this.data.moreVideos[index]:null
                if (videoInfo) $(item).attr('size',videoInfo.video.size)
            })

            if (topVideo && topVideo.length > 0) {
                topVideo[0].addEventListener("pause",function(){
                    // console.log("暂停");
                })

                topVideo[0].addEventListener("ended",function(){
                    // console.log("停止");

                    let father = $(this).parent()
                    father
                        .append('<button class="content-button"></button>')
                    if ($(this).attr('poster')) {
                        father.append('<div class="poster" style="background-image:url('+$(this).attr('poster')+')"></div>')
                    }
                    $(this)
                        .removeAttr('controls')

                    $(father.children('.content-button')).click(function () {
                        let video = $(this).prev()
                        video[0].play()
                    })

                    // this.load()
                })

                topVideo[0].addEventListener("playing",function(){
                    _this.pauseVideo(this)
                    _this.el = null
                    // 暂停朗读
                    _this.appPostMessage('pauseAudio')
                    let btn = $(this).next()
                    btn.remove()
                    let videoParent = $(this).parent()
                    $(videoParent).children('.poster').remove();
                    $(this).attr('controls', 'controls')
                })

                if (this.$route.params.type === 'gov') {
                    topVideo.attr('size',_this.data.mediaList[0].size)
                } else {
                    let topVideoInfo  = _this.data.medias[0]
                    let obj = topVideoInfo.resources[0]
                    topVideo.attr('size',obj.size)
                }

                // 顶部视频16:9
                // let dpr = window.devicePixelRatio
                // let u = navigator.userAgent;
                // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                // if (isiOS) {
                //     topVideo.css('height', (window.screen.width*dpr / 16 * 9) + 'px' )
                //     $(".video-wrap").css('height', (window.screen.width*dpr / 16 * 9) + 'px' )
                //     $(".video-mask").css('height', (window.screen.width*dpr / 16 * 9) + 'px' )
                // }else {
                //     topVideo.css('height', (window.screen.width / 16 * 9) + 'px' )
                //     $(".video-wrap").css('height', (window.screen.width / 16 * 9) + 'px' )
                //     $(".video-mask").css('height', (window.screen.width / 16 * 9) + 'px' )
                // }
            }
        },

        pauseVideo (act) {
            let video = $('video')
            let videoArr = Array.from(video);
            videoArr.map((item,index) => {
                if (!item.paused && act !== item) {
                    item.pause()
                }
            })
        },

        setImageFun (img, index) {
            let _this = this
            // 图片 绑定点击事件，调用app图集
            img.off("click").on("click", () => {
                let obj1 = JSON.stringify({ position: index, urls: _this.urls })
                console.log(obj1)
                if (this.picFlag && !this.isSharePage) {
                    this.picFlag = false
                    this.pauseAllVideo()
                    let obj = JSON.stringify({ position: index, urls: _this.urls })
                    this.appPostMessage('checkBigPic', obj)
                    setTimeout(() => {
                        this.picFlag = true
                    }, 500)
                }
            })
        },

        pauseAllVideo () {
            let video = $('video')
            let videoArr = Array.from(video);
            videoArr.map((item,index) => {
                if (!item.paused) {
                    item.pause()
                }
            })
        },

        setPaperImg () {
            // images 绑定图片点击事件
            let images = Array.from($('.images img'));
            images.map((item, index) => {
                this.setImageFun($(item), index)
            })
        },

        lazyLoad() {
            // 图片懒加载
            let height = document.documentElement.clientHeight

            this.images.map(item => {
                if (item.getBoundingClientRect().top < height) {
                    if(this.CheckImgExists($(item).attr('data-src'))){
                        $(item).attr('src', $(item).attr('data-src'))
                    }
                }
            })
        },

        getTopVideo () {
            let videoWrap = $('.video-wrap')
            if (this.isSharePage && this.$refs.videoWrap) {
                if (parseInt(this.$refs.videoWrap.getBoundingClientRect().top)<0) {
                    videoWrap.css('position', 'fixed').css('top', 0)
                }else {
                    videoWrap.css('position', 'absolute').css('top', '')
                }
            } else {
                videoWrap.css('position', 'fixed').css('top', 0)
            }
        },

        getTopMask () {
            if (this.$refs.videoMask) {
                let videoMask = $('.video-mask')
                if (this.isSharePage && this.$refs.videoMask) {
                    if (parseInt(this.$refs.videoMask.getBoundingClientRect().top)<0) {
                        videoMask.css('position', 'fixed').css('top', 0)
                    }else {
                        videoMask.css('position', 'absolute').css('top', '')
                    }
                } else {
                    videoMask.css('position', 'fixed').css('top', 0)
                }
            }
        },

        appPostMessage (name, value='') {
            // 调用app原生方法
            if (name) window.appapi.appPostMessage(name, value)
        },

        getTime (time) {
            let result = ''
            if (time) {
                result = time.substring(0,10) + ' ' + time.substring(11,16)
            }
            return result
        },

        getLikesCount (count) {
            let result = ''
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

        handleLikes (arr) {
            if (arr && arr.length > 0) {
                this.mockLikes = arr
                this.mockLikes.map((item) => {
                    this.$forceUpdate();
                    this.comments.map((option) => {
                        if (item === option.id) {
                            option.isLike = true
                        }
                    })
                })
            }
        },

        setActiveLike (opt) {
            if (this.isSharePage || !opt.id) return
            this.$forceUpdate();
            if (!opt.isLike) {
                this.appPostMessage('phraise',JSON.stringify(opt))
                this.comments.map((option) => {
                    if (opt.id === option.id) {
                        option.isLike = true
                        option.likes += 1
                    }
                })
            }
        },

        addComment(item){
            if(!item.id) return 
                this.appPostMessage('comment',JSON.stringify(item))
        },

        CheckImgExists(imgurl) {  
            let ImgObj = new Image(); //判断图片是否存在
            ImgObj.src = imgurl;  
                //没有图片，则返回-1  
            if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
                return true;  
            } else {  
                return false;
            }  
        }
    },

    computed: {
        ...mapGetters([
            'showPage'
        ])
    }
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    // @import "~src/stylus/font";
    @import "~src/stylus/index";
    @import "~src/stylus/detail/index";
    @import "~src/stylus/detail/QA";
    @import "~src/stylus/detail/image";
    @import "~src/stylus/detail/ad";

</style>