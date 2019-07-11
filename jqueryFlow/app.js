$(function(){
	// $(window).on("load",function(){
		imgLocation();
		var data = {"data":[{'src':"11.jpg"},{'src':"12.jpg"},{'src':"13.jpg"},{'src':"14.jpg"},{'src':"15.jpg"}]}
		window.onscroll = function(){
			if(scrollside()){
				$.each(data.data,function(index,value){
					var box = $("<div>").addClass("box").appendTo($("#container"));
					var centent = $("<div>").addClass("img").appendTo(box);
					$("<img>").attr("src","img/"+$(value).attr("src")).appendTo(centent);
				})
				imgLocation();
			};
		}
		
	// })
})

function imgLocation(){
	var box = $('.box');
	var boxWidth = box.eq(0).width();//盒子宽度
	var num = Math.floor($(window).width()/boxWidth);//设备的宽度
	var boxArr = [];
	box.each(function(index,value){//index 位置  value 元素对象
		var boxHeight = box.eq(index).height();
		if (index<num) {
			boxArr[index] = boxHeight;
		}else{
			//取到数组中最小的值
			var minheight = Math.min.apply(null,boxArr);
			var minboxIndex = $.inArray(minheight,boxArr);
			$(value).css({
				'position':'absolute',
				'top':minheight,
				"left":box.eq(minboxIndex).position().left,
				'margin-top':"10px"
			})
			boxArr[minboxIndex] += box.eq(index).height();
		}
	})
}

function scrollside(){
	var box = $('.box');
	//最后一张图片一半的高度
	var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
	//容器高度
	var documentHeight = $(document).height();
	//鼠标滚动高度
	var scrollHeight = $(window).scrollTop();
	return (lastboxHeight<documentHeight+scrollHeight)?true:false;
}