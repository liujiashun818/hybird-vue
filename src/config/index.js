
let BASE_URL = ""
switch(process.env.NODE_ENV){
    case 'development':
        // BASE_URL = "//testsxappapi2.peopletech.cn/" //测试
        BASE_URL = "//sxapi.sxrbw.com/" //生产
        // BASE_URL = "//10.50.162.236:8092/" //开发4.1版本
        break;
    case 'production':
        // BASE_URL = "//testsxappapi2.peopletech.cn/" //测试
        BASE_URL = "//sxapi.sxrbw.com/" //生产
        break;
}
export default BASE_URL;