window.onload = function(){
	imgLocation("container","box");
	var imgData = {"data":[{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"10.jpg"},{"src":"2.jpg"},{"src":"1.jpg"},{"src":"9.jpg"}]}
	window.onscroll = function(){
		if(checkFlag()){
			var cparent = document.getElementById("container");
			for (var i = 0; i < imgData.data.length; i++) {
				var ccontent = document.createElement('div');
				ccontent.className = "box";
				cparent.appendChild(ccontent);
				var boximg = document.createElement('div');
				boximg.className = "box_img";
				ccontent.appendChild(boximg);
				var img = document.createElement('img');
				img.src = "img/"+imgData.data[i].src;
				boximg.appendChild(img);

			}
			imgLocation("container","box");
		}
	}
}

//瀑布流加载
function checkFlag(){
	var cparent = document.getElementById("container");
	var ccontent = getChildElement(cparent,"box");

	//倒数第二张图距离顶部的距离
	var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
	//网页正文部分上： window.screenTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	//网页可见区域高： document.body.clientHeight;
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if (lastContentHeight < scrollTop+pageHeight) {
		return true;
	}
}

function imgLocation(parent,content){
	//将parent下多有的content全部取出
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);
	var imgWidth = ccontent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	cparent.style.cssText = "width:"+imgWidth*num+"px; margin: 0 auto;";

	var BoxHeightArr = [];
	for (var i = 0; i < ccontent.length; i++) {
		if (i<num) {
			BoxHeightArr[i] = ccontent[i].offsetHeight;
		}else{
			var minheight = Math.min.apply(null,BoxHeightArr);
			var minIndex = getminheightLocation(BoxHeightArr,minheight);
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minheight+"px";
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			BoxHeightArr[minIndex] = BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}

function getminheightLocation(BoxHeightArr,minheight){
	for (var i in BoxHeightArr) {
		if (BoxHeightArr[i] == minheight) {
			return i;
		}
	}
}

function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for (var i = 0; i < allcontent.length; i++) {
		if (allcontent[i].className==content) {
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}