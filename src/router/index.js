import Vue from "vue";
import Router from "vue-router";

//  引入子路由
// import User from '../views/User';
Vue.use(Router);

const childrenRoutes = [

]
export default new Router({
    routes: [
        {
            path: "/thematic/:articleId",
            name: 'Thematic',
            component: () =>
                import(/* 专题详情页面 */ "../views/thematic")
        },
        {
            path: "/detail/:type/:id",
            name: 'Detail',
            component: () =>
                import(/* 多类详情页面 */ "../views/detail")
        },
        {
            path: "/local/:categoryId",
            name: 'Local',
            component: () =>
                import(/* 本地新闻页面 */ "../views/local")
        },
        {
            path: "/localist/:id",
            name: 'LocalList',
            component: () =>
                import(/* 本地栏目文章列表页 */ "../views/local-list")
        },
        {
            path: "/live/:articleId",
            name: 'Live',
            component: () =>
                import(/* 直播页面 */ "../views/live")
        },
        {
            path: "/shanxi/:id",
            name: 'ShanXi',
            component: () =>
                import(/* 山西号详情列表页面 */ "../views/shanxi")
        },
        {
            path: "/download",
            name: 'Download',
            component: () =>
                import(/* 下载页 */ "../views/download")
        }
    ]
});
