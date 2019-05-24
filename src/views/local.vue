<template>
    <div>
        <!-- 天气、日期 -->
        <header class="city">
            <div class="info">
                <div class="top">
                    <div class="flex-default date">
                        <div>{{weather.date}}</div>
                        <div>{{weather.week}}</div>
                    </div>
                    <div class="name ellipsis">{{weather.cityName}}</div>
                    <div class="temperature"><span>{{weather.highTemperature}}</span>/ {{weather.lowestTemperature}} ℃</div>
                </div>
                <div class="mid word-style">{{weather.weather}}</div>
                <div class="bottom word-style">PM2.5 {{weather.pm}}</div>
            </div>
        </header>
        <!-- 列表区 -->
        <section v-for="(item, index) in blocks" v-if="blocks && blocks.length">
            <header class="flex-default">
                <div class="name">{{item.category.name}}</div>
                <i @click="getMore(item.category.id)"></i>
            </header>
            <ul>
                <li class="flex flex-cross-center flex-main-justify" v-for="article in item.articleResult.list" @click="goPath(article)">
                    <div class="thumbnail" :style="{backgroundImage: 'url(' + article.image + ')'}" v-if="article.image">
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
        </section>  
    </div>
</template>

<script>  
    import wx from 'src/constants/wechatShare'
    import { Toast } from 'mint-ui'
    export default {
        data () {
            return {
                blocks: [],
                weather: {}
            }
        },

        created () {
            this.getInit(this.$route.params.categoryId)
            this.getWeather(this.$route.params.categoryId)
        },

        methods: {
            getInit (id, pageToken='', size=5) {
                this.$axios.get(`${this.$url}/api/local/getLocalArticleList?categoryId=${id}&size=${size}&pageToken=${pageToken}`)
                    .then(res=> {
                        const result = res.item
                        if (res.code === 0) {
                            this.blocks = result
                        }else {
                            Toast(res.msg)
                        }
                    })
            },

            getWeather (categoryId) {
                this.$axios.get(`${this.$url}/api/local/getWeather/${categoryId}`)
                    .then(res=> {
                        const result = res.item
                        if (res.code === 0) {
                            this.weather = result
                            switch (result.week) {
                                case 'Monday':
                                    this.weather.week = '星期一'
                                    break
                                case 'Tuesday':
                                    this.weather.week = '星期二'
                                    break
                                case 'Wednesday':
                                    this.weather.week = '星期三'
                                    break
                                case 'Thursday':
                                    this.weather.week = '星期四'
                                    break
                                case 'Friday':
                                    this.weather.week = '星期五'
                                    break
                                case 'Saturday':
                                    this.weather.week = '星期六'
                                    break
                                case 'Sunday':
                                    this.weather.week = '星期日'
                                    break
                            }

                            // 微信分享
                            wx({
                                title: result.cityName,
                                imgUrl: result.cover
                            },this)

                            // 存储唤醒的数据
                            this.$store.dispatch('saveData', result)
                        }else {
                            Toast(res.msg)
                        }
                    })
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

            getMore (id) {
                this.$router.push({name:'LocalList', params:{id}})
            },

            goPath (article) {
                this.$router.push({name:'Detail', params:{type:'gov', id:article.articleId}})
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"
    @import "~src/stylus/list"

    .city
        position relative
        width 100%
        height 750px
        background url("~_images/local-bg.png") no-repeat 50%/100%
        .info 
            position absolute
            top 60px
            left 30px
            width 380px
            height 560px
            overflow hidden
            border-radius 20px
            background rgba(226, 150, 105, .25)
            color #fff
            .top 
                position relative
                height 380px
                .date 
                    position absolute
                    left 60px
                    top 40px
                    width 260px
                    font-size 28px
                .name 
                    position absolute
                    left 58px
                    top 110px
                    width 300px
                    font-size 60px
                .temperature 
                    position absolute
                    left 58px
                    top 180px
                    width 300px
                    font-size 40px
                    span 
                        font-size 140px
                        font-weight bold
            .word-style
                text-align center
                font-size 32px
                line-height 90px
                height 90px
            .mid 
                background:rgba(237,31,46, .15);
            .bottom
                background rgba(170, 101, 155, .4)

</style>

