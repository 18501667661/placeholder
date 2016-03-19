/*
 * placeholder v1.0    jQuery-placeholder 
 * 解决IE浏览器不支持placeholder属性的问题 *
 * Copyright 2014, 7*
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */
//console.log($);
$.fn.placeholder = function(options){
	//插件的默认参数，将默认参数暴露，以便别人自定义插件
	$.fn.placeholder.defaults = {
		focus:false,
		focusClass:'focus',
		placeholderClass:'phTips',
        color : '#909090'
    };
    //判断浏览器是否支持placeholder属性，如果不支持则执行下面方法。
    var input = document.createElement('input'),
        placeholdersupport = 'placeholder' in input;
    	//执行事件添加后返回，便于jQuery的链式操作，如$("input").placeholder().val("啊啊啊");
//  	如果不加return，后面的.val()会报错。
	return this.each(function(){
		//扩展默认参数/////可以自定义插件的作用对象，方便对其进行操作。
		var opts = $.extend({},$.fn.placeholder.defaults,options),$this = $(this);
		//if(!placeholdersupport){
	        var i_text = $this.attr('placeholder'),
	        	pdl = parseInt($this.css("padding-left")),
	        	i_oheight = $this.outerHeight(),
                i_owidth = $this.outerWidth(),
                i_height = $this.height(),
                i_width = $this.width(),
                i_top = $this.offset().top,
                i_left = $this.offset().left,
                i_fz = (opts.fontSize==undefined || opts.fontSize =="")?$this.css("font-size"):opts.fontSize,
		        placeholder = $('<span class='+opts.placeholderClass+'>' + i_text + '</span>');
			placeholder.css({"height": i_height, "line-height": i_height + "px", "position":"absolute", "left":(i_left+pdl+2), "top":(i_top+(i_oheight-i_height)/2), "font-size":i_fz, "color":opts.color});
			placeholder.insertAfter($this);
		    placeholder.click(function() {
                $this.focus();
            });
			//初始化&刷新后判断input值
            if ($this.val() != "") {
                placeholder.css({display: 'none'});
            } else {
                placeholder.css({display: 'inline'});
            };
            //监控input值的变化
            $this.bind('input propertychange',function() {
			    if ($(this).val() != "") {
                   placeholder.css({display: 'none'});
                } else {
                   placeholder.css({display: 'inline'});
                }
			});
		//}else{
			
		//};
		//修复不支持":focus"伪类的BUG；
		if(opts.focus){
			$this.focus(function(){
				$(this).addClass(opts.focusClass);
			});
			$this.blur(function(){
				$(this).removeClass(opts.focusClass);	
			});
		}
    });
};
