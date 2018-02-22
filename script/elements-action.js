const elements = require('./elements.js');

const displayWidget = function() {
    elements.widget.className = 'widget-mouseover';
}

const hideWidget = function() {
    elements.widget.className = 'widget';
}

const togglePlayPause = function() {
    if (elements.video.paused) {
        elements.video.play();
    } else {
        elements.video.pause();
    }
}

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
const formatTime = function(time) {
    var formatted_time;
    if(time > -1) {
        var hour = parseInt(time/3600);
        var minute = parseInt(time/60);
        var second = parseInt(time%60);

        if(hour < 10) {
            formatted_time = '0'+ hour + ':';
        } else {
            formatted_time = hour + ':';
        }
        if(minute < 10) { 
        	formatted_time += '0' + minute + ':';
        } else {
        	formatted_time += minute + ":";
        }
        if(second < 10) { 
        	formatted_time += '0' + second;
        } else {
        	formatted_time += second;
        }
    }
    console.log(formatted_time);
    return formatted_time;
}

const updateTime = function(time, element) {
	const node = document.createTextNode(formatTime(time));
	const childs = element.childNodes;
	for(var i = childs.length - 1; i >= 0; i--) {    
		element.removeChild(childs.item(i));    
	} 
    element.appendChild(node);
}

elements.video.onloadedmetadata = function() {
	updateTime(elements.video.duration, elements.info_duration);
}

//为 <video> 元素添加 ontimeupdate 事件，如果当前播放位置改变则执行函数 
elements.video.ontimeupdate = function() { 
	updateTime(elements.video.currentTime, elements.info_current_time);
};

elements.splayer.addEventListener('mouseover', displayWidget, false);
elements.splayer.addEventListener('mouseout', hideWidget, false);
elements.splayer.addEventListener('click', togglePlayPause, false);