let u = navigator.userAgent;
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
import $ from 'jquery'

let api = {
    changeFontSize (fontSize=3) {
        $vm.fontSizeNum = fontSize
    },

    refreshSub (val) {
        //  1 关注 0  没关注  
        $vm.isFollow = val * 1
    },

    loadNetState: (networkType, networkFlag) => {
        // networkType      0：wifi  1： 4g网
        // networkFlag     是否需要再次弹窗   0：需要弹窗  1：已经弹过窗并点击确认
        if (networkType==1 && networkFlag==0) {
            let size = $($vm.saveVideo).attr('size')

            if (size) {
                size = (size/1024)/1024
                size = size.toFixed(1)
                size += 'M'
            } else {
                size = ''
            }

            let val = confirm(`播放视频需要消耗${size}流量，是否继续？`)
            if (val) {
                $vm.saveVideo.play()
            }
        } else {
            $vm.saveVideo.play()
        }
    },

    changeNetwork: () => {
        let video = $('video')
        let videoArr = Array.from(video);
        videoArr.map((item,index) => {
            if (!item.paused) {
                $vm.saveVideo = item

                item.pause()
                
                let size = $(item).attr('size')
                if (size) {
                    size = (size/1024)/1024
                    size = size.toFixed(1)
                    size += 'M'
                } else {
                    size = ''
                }
              
                let val = confirm(`播放视频需要消耗${size}流量，是否继续？`)
                if (val) {
                    item.play()
                }
            }
        })
    },

    isSharePage: () => {
        let result = true
        if (isAndroid) {
            try {
                console.log(typeof window.jsobj.voiceRead)
                result = false
            }catch (e) {
                // console.log(e);
            }
        } else if (isiOS) {
            try {
                console.log(typeof window.webkit.messageHandlers.voiceRead.postMessage)
                result = false
            }catch (e) {
                // console.log(e);
            }
        }
        return result
    },

    checkTerminal: () => {
        let result = ''
        if (isiOS) {
            result = 'ios'
        }else if (isAndroid) {
            result = 'android'
        }
        return result
    },

    appendComment (option) {
        if (option) {
            $vm.$forceUpdate();
            let opt = JSON.parse(option || '{}')
            let arr = [opt, ...$vm.comments]
            $vm.comments = arr
        }
    },

    loadPhraiseData (arr) {
        $vm.handleLikes(JSON.parse(arr || '[]'))
    },

    appPostMessage (name, value='') {
        // console.log(name, value);
        if (isAndroid) {
            try {
                window.jsobj[name](value);
            }catch (e) {
                // console.log(e);
            }
        } else if (isiOS) {
            try {
                window.webkit.messageHandlers[name].postMessage(value);
            }catch (e) {
                // console.log(e);
            }
        }
    }
}

export default api;