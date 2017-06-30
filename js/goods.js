$(function(){
		
		//顶部购物车数量
	 	var cookieStr = $.cookie("goods");
		var arr = eval(cookieStr);
		var sum = 0;
		console.log(arr)
		for(var j in arr){
			sum +=arr[j].num;
			$(".col-lg-4 span").html(sum);
		}
		//导航栏下拉效果
		$("#ful").find("li").hover(function(){
			var index = $(this).index();
			$.ajax({
				url:"js/data.json",
				type:"POST",
				success:function(data){
					
					$(".phone1").html("");
					var arr = data["list" + index];
					for(var i = 0; i < arr.length; i++){
						$('<li class="list2"><img src="'+arr[i].img+'"><p>'+arr[i].txt+'</p><span>'+arr[i].oldscore+'</span><span>'+arr[i].newscore+'</span></li>').appendTo(".phone1");
					
					$("#drop").stop().show("blind", 500);
					$("#drop").find(".list2").animate({left:0},200 * i /2 + 150).animate({opacity:1},400);
					}
				}
			})
			
		})
		$("#select").mouseleave(function(){
			
			$("#drop").hide("blind",200);
			//clearTimeout(t);
		})
		$("#ful").on("mouseover","a",function(){
			$(this).css("color","rgb(0,195,245)").css("text-decoration","none");

		})
		$("#ful").on("mouseout","a",function(){
			$(this).css("color","black");
		})

		$("#index_right ul").on("click","li",function(){
			$("#index_right li").attr("class","");
			$(this).attr("class","act");
			var k = $(this).index();
			$(".info div").css("display","none");
			$(".info div").eq(k).css("display","block");
		})

		

		$.ajax({
            url:"js/data4.json",
            type:"POST",
            success:function(data){
            	// console.log(data);
            	var arr =data["list0"];
              //  var arr = data["list"+index];
                for(var i = 0; i < arr.length; i++){
                	// console.log(arr.length);
                    
					$('<h3>'+arr[i].title+'</h3><p id="txt">'+arr[i].txt+'</p><div class="ogray ogray1"><span>价&nbsp;&nbsp;&nbsp;&nbsp;格：</span><span id="oscore1">￥<span id="oscore">'+arr[i].score+'</span></span></div><div class="ogray ogray2"><span>领&nbsp;&nbsp;&nbsp;&nbsp;券：</span><span>满51减50.00</span><a href="#">更多></a></div><div id="mid"><div id="type"><span>网络类型：</span><div><span id="type1">'+arr[i].type+'</span></div></div><div id="color"><span>颜色分类：</span><div id="bt1" class="active"><img src="'+arr[i].img1+'"><span>'+arr[i].col1+'</span></div><div id="bt2"><img src="'+arr[i].img2+'"><span>'+arr[i].col2+'</span></div><div id="bt3"><img src="'+arr[i].img3+'"><span>'+arr[i].col3+'</span></div><div id="bt4"><img src="'+arr[i].img4+'"><span>'+arr[i].col4+'</span></div></div><div id="rom"><span>内存容量：</span><div><span id="rom1">'+arr[i].rom+'</span></div></div>').appendTo("#index_right");
                }

                var index = $(this).index();
				$("#index_bottom").on("click","img",function(){
					var _index = $(this).index();
					$(".struc img").css("display","none");
					$(".struc img").eq(_index).css("display","block");
				})



                $("#color").on("click","div",function(){
					$("#blank").html("");
					$("#index_bottom").html("");
					$("#color div").attr("class","");
					$(this).attr("class","active");
					 var index = $(this).index();

					$.ajax({
			            url:"js/data5.json",
			            type:"POST",
			            success:function(data){
			            	
			            	console.log(data);
			            	
			            	// var arr =data["list0"];
			                var arr = data["list"+index];
			                for(var i = 0; i < arr.length; i++){
			                	console.log(arr.length);
			                	$('<img src='+arr[i].img+' />').appendTo($("#blank"));
			                	console.log(arr[i].img1);
			                	$('<img src=' + arr[i].img1 + ' />').appendTo($("#index_bottom"));
			                }
			            }
			        })

				})

            }
        })
		$( "#spinner" ).spinner();
		$.ajax({
            url:"js/data5.json",
            type:"POST",
            success:function(data){
            	
            	console.log(data);	
            	
            	// var arr =data["list0"];
                var arr = data["list1"];
                for(var i = 0; i < arr.length; i++){
                	console.log(arr.length);
                	$('<img src='+arr[i].img+' />').appendTo($("#blank"));
                	console.log(arr[i].img1);
                	$('<img src=' + arr[i].img1 + ' />').appendTo($("#index_bottom"));
                }
            }
        })
        //购物车
		$("#btn4").click(function(){
			var oID = $(".active span").html();
			var first = $.cookie("goods") == null ? true : false;
			var count =parseInt($("#spinner").val());
			var oImg = $("#blank img")[0].src;
			var oTit = $("#index_right h3").html();
			var oType = $("#type1").html();
			var oCol = $(".active span").html()
			var oRom = $("#rom1").html();
			var oPrice = $("#oscore").html();
			alert("添加成功！");
			if(first){
				$.cookie("goods", '[{id:"' + oID + '",num:' + count +',img:"'+oImg+'",title:"'+ oTit+ '",type:"'+ oType+ '",color:"'+ oCol+ '",rom:"'+ oRom+ '",score:'+ oPrice +'}]', {expires: 7});
				// alert(typeof count);
			}else{
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				var isYes = false;
				for(var i in arr){
					if(arr[i].id == oID){
					
						arr[i].num+= count;
						// alert(count);
						// alert(arr);
						isYes = true;
					}
				}
				if(!isYes){
					//如果之前没有存储过
					var obj = {id: oID, num: count,img:oImg,title:oTit,type:oType,color:oCol,rom:oRom,score:oPrice};
					arr.push(obj);
					
				}

				$.cookie("goods", JSON.stringify(arr), {expires: 7});
				//顶部购物车数量
	 			var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				var sum = 0;
				console.log(arr)
				for(var j in arr){
					sum +=arr[j].num;
					$(".col-lg-4 span").html(sum);
				}

			}
			// $.cookie("goods",$(".active span").html(),{expires:7});
			// alert($(".active span").html());
			// 
			// 
		
		})
		//放大镜效果
		$("#blank").on("mouseover","img",function(){
			$("#b_box_all img").attr("src",this.src).css("display","block");
			$(".position_box").css("display","block");
			$("#b_box_all").css("display","block");
			$("#b_box").css("display","block");

		})
		$(".struc").mouseleave(function(){
			$("#b_box_all img").css("display","none");
			$(".position_box").css("display","none");
			$("#b_box_all").css("display","none");
			$("#b_box").css("display","none");
		})
		$(".struc").on("mousemove","img",function(ev){
			var oS_position = document.getElementsByClassName("position_box")[0];
			var oS_box=document.getElementById('s_box');
			var oS_mark=oS_box.children[0];
			var oB_box=document.getElementById('b_box');
			var oB_box_all=document.getElementById('b_box_all')
			var left = ev.offsetX - parseInt(oS_position.offsetWidth)/2;
			// console.log(left);
			if(left<0){
				left=0;
			}else if(left>oS_box.offsetWidth-oS_position.offsetWidth){
				left=oS_box.offsetWidth-oS_position.offsetWidth
			}


			oS_position.style.left=left+'px';

			var top=ev.offsetY-oS_position.offsetHeight/2;
			if(top<0){
				top=0;
			}else if(top>oS_box.offsetHeight-oS_position.offsetHeight){
				top=oS_box.offsetHeight-oS_position.offsetHeight
			}
			//console.log(top)
			oS_position.style.top=top+'px';

			var proportionX=left/(oS_box.offsetWidth-oS_position.offsetWidth);
			var proportionY=top/(oS_box.offsetHeight-oS_position.offsetHeight);

			console.log(proportionX+':'+proportionY);

			oB_box_all.style.left=-proportionX*(oB_box_all.offsetWidth-oB_box.offsetWidth)+'px';

			oB_box_all.style.top=-proportionY*(oB_box_all.offsetHeight-oB_box.offsetHeight)+'px';
		})



	})	