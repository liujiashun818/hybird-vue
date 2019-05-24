<template>
    <section>
       <ul>
            <li class="flex flex-cross-center flex-main-justify" v-for="article in list" @click="goPath(article)">
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
        <footer @click="getArticles" v-if="data.page.next*1 <= data.page.last*1">加载更多</footer>
    </section>
</template>

<script>
export default {
    data () {
        return {
            list: [],
            data: {
                page: {
                    next: 1,
                    last: 99
                }
            }
        }
    },

    created () {
        this.getArticles()
    },

    methods: {
        getArticles () {
            const pageToken = this.data.page.next * 1
            const pageLast = this.data.page.last * 1
            // 最后一页无需加载
            if (pageToken > pageLast) return false
            this.$axios.get(`${this.$url}/api/articles/articleListByCategory?categoryId=${this.$route.params.id}&size=${10}&pageToken=${pageToken}`)
                .then(res=> {
                    const result = res.items
                    if (res.code === 0) {           
                        this.data = res
                        this.list = [...this.list, ...result]
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

        goPath (article) {
            this.$router.push({name:'Detail', params:{type:'gov', id:article.articleId}})
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~src/stylus/index"
    @import "~src/stylus/list"
   
</style>
