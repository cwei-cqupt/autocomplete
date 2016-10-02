/*
 * author:@Abelw
 * date:2016-09-27 14:59
 * qq:673162780
 * email:vicenwe@163.com
 */
'use strict';
(function(that, fn) {
    if(that){
        fn(that);
    }
    else{
        fn(this);
    }
})(window?window:this, function(that) {
    Object.prototype.addListener = function(str,fn,boolean){
        if(isNaN(parseInt(this.length))) {
            if(this.addEventListener){
                this.addEventListener(str,fn,boolean||false);
            }else{
                this.attachEvent("on"+str,fn);
            }
        }else if(this.length > 0){
            this.forEach(function(that){
                if(this.addEventListener){
                    that.addEventListener(str,fn,boolean||false);
                }else{
                    that.attachEvent("on"+str,fn);
                }
            })
        }
    };
    var Abel = function(){},flag = -1;
    var init = function(obj) {
            var style = document.createElement("style");
            style.innerHTML = ".Abel_a:hover{background:#ccc}.active_able_a{background:#ccc}";
            document.getElementsByTagName("head")[0].appendChild(style);
            boxInit(obj);
            inputInit(obj);
        },
        inputInit = function(obj) {
            obj.obj.addListener("keyup",function(e){
                var event = e?e:window.event;
                keyDownFn(obj,this,event);
            });
        },
        boxInit = function(obj) {
            var offset = absoluteXY(obj.obj);
            obj.box = document.createElement("div");
            obj.box.className = "box-"+obj.obj.id;
            obj.box.style.cssText = 'overflow:hidden;display:none;position:absolute;top:'+(offset.top+obj.obj.offsetHeight)+'px;left:'+offset.left+'px;max-height:300px;width:'+obj.obj.offsetWidth+'px;height:auto;box-sizing:border-box;border:1px solid black';
            document.getElementsByTagName("body")[0].appendChild(obj.box);
            document.addListener("click",function(e) {
                var event = e?e:window.event;
                changeObjValue(event.target,obj);
                boxFade(event.target,obj);
            });

        },
        keyDownFn = function(obj,that,e) {
            if(e&&(e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13 || e.keyCode === 39 || e.keyCode === 37)&& obj.box.children.length !== 0){
                obj.box.getElementsByClassName("active_able_a")[0]?obj.box.getElementsByClassName("active_able_a")[0].className = "Abel_a":"";
                switch(e.keyCode){
                    case 40:
                        flag++;
                        addJiaohu(obj);
                        break;
                    case 38:
                        flag--;
                        reduceJiaohu(obj);
                        break;
                    case 13:
                        changeObjValue(obj.box.children[flag],obj);
                        break;
                }
            }
            else{
                var i = 0,
                    array = filterArray(obj.array,that.value),
                    len = array.length,
                    a;
                obj.box.innerHTML = "";
                for(;i < len;i++){
                    a = document.createElement("a");
                    a.className = "Abel_"+obj.obj.id;
                    a.innerHTML = array[i];
                    a.href = "javascript:void(0)";
                    a.style.cssText = "width:"+obj.obj.offsetWidth+"px;display:block;text-decoration:none;color:black";
                    obj.box.appendChild(a);
                }
            }
        },
        addJiaohu = function(obj) {
            if(!obj.box.children[flag]){
                flag -= 1;
            }
            obj.box.children[flag].className += " active_able_a";
        },
        reduceJiaohu = function(obj) {
            if(!obj.box.children[flag]){
                flag += 1;
            }
            obj.box.children[flag].className += " active_able_a";
        },
        filterArray = function(array,str) {
            var i = 0,
                len = array.length,
                arr = [];
            for(;i < len;i++){
                if(array[i].toLowerCase().indexOf(str.toLowerCase())>-1 && str !== ""){
                    arr.push(array[i]);
                }
            }
            return arr;
        },
        changeObjValue = function(el,obj) {
            if(el.className.indexOf("Abel_"+obj.obj.id)>-1){
                obj.obj.value = el.innerHTML;
                obj.box.style.display = "none";
            }
            flag = -1;
            keyDownFn(obj,obj.obj);
        },
        boxFade =function(el,obj) {
            if(el === obj.obj){
                obj.box.style.display = "block";
            }
            else if(el !== obj.box && el !== obj.obj){
                obj.box.style.display = "none";
                flag = -1;
            }
        },
        absoluteXY = function(obj) {
            var obj = obj;
            for (var t = obj.offsetTop, l = obj.offsetLeft; obj = obj.offsetParent;) {
                t += obj.offsetTop;
                l += obj.offsetLeft;
            }
            return {
                left:l,
                top:t
            }
        };
    function O(obj, array) {
        var o = new Abel();
        o.obj = obj;
        o.array = array || [];
        init(o);
        return o;
    }
    that.autocomplete = O;
});