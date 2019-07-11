$(function(){
	$(".link .button").hover(function(){
		var title = $(this).data('title');
		$(".tip em").text(title);
		var pos = $(this).offset().left;
		var W1 = $(".tip").outerWidth();
		var W2 = $(this).outerWidth();
		if (W1 > W2) {
			dis = (W1-W2)/2;
		}else{
			dis = (W2-W1)/2;
		}
		var leftw = pos+dis;
		$(".tip").css("left",leftw+"px").animate({"top":195,"opacity":1},300);
	},function(){
		$(".tip").animate({"top":160,"opacity":0},300);
	})
})