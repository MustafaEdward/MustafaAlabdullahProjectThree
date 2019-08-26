    let imgSource = "";
	let divId = "";
	let imagesFound = 0;
	let moves = 0;
	const imageList = [
					  "img/img-1.jpg",
					  "img/img-2.jpg",
					  "img/img-3.jpg",
					  "img/img-4.jpg",
					  "img/img-5.jpg",
					  "img/img-6.jpg",
					  "img/img-7.jpg",
					  "img/img-8.jpg",
					  "img/img-9.jpg",
					  "img/img-10.jpg",
					  ];
	function imagePosition() {
		let arrayLength = imageList.length*2;
		let newArrayOfImages = new Array();
		newArrayOfImages = $.merge($.merge([], imageList), imageList);
		let currentImage = $(".images div:first-child");
		for(let z = 0;z < arrayLength;z++)
		{
			let randomNum = Math.round(Math.random()*(newArrayOfImages.length-1));
			$("#" + currentImage.attr("id") + " img").attr("src", newArrayOfImages[randomNum]);
			newArrayOfImages.splice(randomNum, 1);
			currentImage = currentImage.next();
		}
	}
	
	function showImage() {
		let id = $(this).attr("id");
		if ($("#" + id + " img").is(":hidden"))
		{
			$("#" + id + " img").show("slow");
			if (imgSource == "")
			{
				divId = id;
			    imgSource = $("#" + id + " img").attr("src");
			}
			else
			{
				currentOpened = $("#" + id + " img").attr("src");
				if (imgSource != currentOpened)
				{
					setTimeout(function(){
							$("#" + id + " img").hide("slow");
							$("#" + divId + " img").hide("slow");
							divId = "";
					        imgSource = "";
						}, 600);	
				}
				else
				{
					divId = "";
					imgSource = "";
					imagesFound++;
				}
			}
			moves++;
			$(".count").html(moves);
			if (imageList.length == imagesFound) {
				setTimeout(function(){
					Swal.fire({
						title: 'Damn, You are smart😎👏🏼',
						width: 600,
						padding: '3em',
						background: "#ffc952",
						backdrop: `
						url("https://sweetalert2.github.io/images/nyan-cat.gif")
						center left
						no-repeat
						`
					  })
				}, 1000);
			}
		}
	}
	
	function gameReset() {
		imagePosition();
		moves = 0;
		$(".count").html(moves);
		$(".images div img").hide();
		imagesFound = 0;
		imgSource = "";
		divId = "";
	}
	$(document).ready(function() {	
		for(let i=1; i<=2; i++)
		{
			$.each(imageList, function(index, value){
				$(".images").append("<div class=card id=card" + i + index + "><img src=" + value + " /></div>");
			})
		}
		$(".button").on("click", function(){
			gameReset();
		});

		imagePosition();
		$(".images div").click(showImage);
		Swal.fire({
			title: `🤯 Welcome to Memory Hack 🤯
			Enjoy the game 🎉🤞🏻`,
			width: 600,
			padding: '6rem',
			background: '#ff7473'
		  })
	});
	
	// svg dimensions for setting up the viewBox and path string:
const y = 450, // just height
x = 40, // bump height on x axis
stroke = 4, // stroke width
pointsY = 40; // distance from middle anchor to its points on y axis

line.setAttribute('viewBox', `${stroke/2} 0 ${x + stroke} ${y + stroke}`);
line.style.setProperty('--stroke', stroke+'px');
line.style.setProperty('--lenght', y+x);

			   // X , Y
const default_path = '\"M'+(x+stroke)+','+(stroke/2)+ //Move of the top-anchor
			   'c0,'+(y/2)+ //top-anchor's curve point
			   ' 0,'+(y/2-pointsY)+ //mid-anchor's upper curve point from top-anchor
			   ' 0,'+(y/2)+ //mid-anchor from top-anchor
			   ',0,'+pointsY+','+ //mid-anchor's lower curve point form mid-anchor
			   '1,0,'+ //bot-anchor's curve point from mid-anchor
			   '0,'+(y/2); //bot-anchor from mid-anchor
line.style.setProperty('--path', default_path);

window.addEventListener('mousemove', handleMove);

function handleMove(e){
const mouseY = e.y,
  offsetH = this.offsetHeight || this.innerHeight || this.getBoundingClientRect().height,
  p = mouseY / offsetH,
  mid = Math.round(y * p),
  fromMidP = p <= .5 ? 1 - p / .5 : (p - .5) * 2,
  easing = t => t * t * t * t,
  bumpX = x - easing(fromMidP) * x,
  path = '\"M'+(x+stroke)+','+(stroke/2)+ //Move of top-anchor
		 'c0,'+(mid - pointsY/2)+' '+ //top curve point
		 (-bumpX)+','+(mid-pointsY)+' '+//mid upper curve point
		 (-bumpX)+','+(mid)+','+ //mid-anchor
		 '0,'+pointsY+','+ //mid lower curve point
		 (bumpX)+','+(pointsY/2)+','+ //bottom curve point
		 (bumpX)+','+(y-mid); //bot-anchor
line.style.setProperty('--path', path);
}

window.addEventListener('mouseout', () => line.style.setProperty('--path', default_path));


