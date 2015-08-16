(function($){
	function EasySlider(){
		this.defaults = {
			width:600,//设置轮播的宽度
			height:200,//设置轮播的高度
	    	speed:400,//设置轮播的速度
	    	delay:2000,//设置轮播的延迟时间
	    	imgCount:4,//设置轮播的图片数
	    	dots:true,//设置轮播的序号点
	    	autoPlay:true//设置轮播是否自动播放
		}
		this.count = 0;//轮播计数器
		this.timer = null;//轮播计时器
	}
	//函数初始化
	EasySlider.prototype.init = function(){
		this.clacSize();
		this.doEvent();
		this.dots();
		this.autoPlay();
	}
	//设置轮播图样式
	EasySlider.prototype.clacSize = function(){
		var _self = this;
		$('.easySlider').css({
			'width':this.defaults.width,
			'height':this.defaults.height
		})
		$('.slider-list').width(this.defaults.width);

		$('.slider-lists').width(this.defaults.width*this.defaults.imgCount);

		$('.slider-derec').css({
			'top':(this.defaults.height-$('.slider-derec').height())/2
		})

		$('.slider-prev').css({
			'left':20
		})

		$('.slider-next').css({
			'right':20
		})

		$('.slider-dots').css({
			'left':(this.defaults.width-$('.slider-dots').width())/2
		})

		$('.slider-dot').on('click',function(){
			_self.active($(this))
		})
	}
	//触发轮播事件
	EasySlider.prototype.doEvent = function(){
		var _self = this;
		$('.slider-next').click(function(){
	    	_self.next();
	    })

	     $('.slider-prev').click(function(){
	    	_self.prev();
	    })
	    
	    
	}
	//下一页
	EasySlider.prototype.next = function(){
	if(!$(".slider-lists").is(":animated"))
	{
		if(this.count>=this.defaults.imgCount-1){
    		$('.slider-lists').animate({
    		'left':0
    		},this.defaults.speed);
    		this.count=0;
    		this.active($('.slider-dot').eq(0))
    	}
    	else{
    		$('.slider-lists').animate({
    		'left':-this.defaults.width*(this.count+1)
    		},this.defaults.speed)
    		this.count++
    		this.active($('.slider-dot').eq(this.count))
    	}

	}
		
	}
	//上一页
	EasySlider.prototype.prev = function(){
	if(!$(".slider-lists").is(":animated"))
	{
		if(this.count<=0){
    		$('.slider-lists').animate({
    		'left':-this.defaults.width*(this.defaults.imgCount-1)
    		},this.defaults.speed);
    		this.count=this.defaults.imgCount-1;
    		this.active($('.slider-dot').eq(this.count))
    	}
    	else{
    		$('.slider-lists').animate({
    		'left':-this.defaults.width*(this.count-1)
    		},this.defaults.speed);
    		this.count--;
    		this.active($('.slider-dot').eq(this.count))
    	}
	}
		
	}
	//轮播序号点
	EasySlider.prototype.dots = function(){
		var _self = this;
		if(_self.defaults.dots){
			$('.slider-dots').show()
			$('.slider-dot').each(function(index){
	     	$(this).click(function(){
	     		if(index-1<0){
	     			$('.slider-lists').animate({
			    		'left':0
			    		},_self.defaults.speed);
	     		}
	     		else{
	     			_self.list(index-1);
	     			_self.count = index;
	     		}
	     	})
	     })
		}
		else{
			$('.slider-dots').hide()
		}
		
	}
	//添加激活状态
	EasySlider.prototype.active = function(elements){
		elements.addClass('active').siblings().removeClass('active')
	}
	//序号点触发事件
	EasySlider.prototype.list = function(num){
		var _self = this;
		$('.slider-lists').animate({
	    		'left':-_self.defaults.width*(num+1)
	   },_self.defaults.speed)
	}
	//自动轮播事件
	EasySlider.prototype.autoPlay = function()
	{
		var _self = this;
		if(_self.defaults.autoPlay)
		{
	    	_self.timer=setInterval(function(){
	    		_self.next()
	    	},_self.defaults.delay)
	    	$(".easySlider").mouseover(function()
	    	{
	    		clearInterval(_self.timer);
	    	})
	    	$(".easySlider").mouseout(function()
	    	{
	    		_self.timer=setInterval(function(){
	    		_self.next()
	    	},_self.defaults.delay)
	    	})
	    }
	    else{
	    	clearInterval(_self.timer);
	    }

	}
	//扩展jQuery.prototype
	$.fn.easySlider = function(options){
		var easySlider = new EasySlider();
		$.extend(easySlider.defaults,options)
		easySlider.init()
	}
})(jQuery)