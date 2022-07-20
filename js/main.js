$(function(){

    function responsive(){
        var width = $("body").width();
        $("html").css("fontSize",width/10 + "px");
    }
    responsive();
    $(window).on("resize",function(){
        responsive();
    });

    
    //游戏开始函数
    function begin(){

        var index = $(".index");
        var rule = $(".rule");
        var diff = $(".diff");

        //按钮按下的效果
        var btn = $(".index p");
        var diffBtn = $(".diff li");
        btn.on("touchstart",function(){
            $(this).css("transform","scale(0.9,0.9)");
        });
        btn.on("touchend",function(){
            $(this).css("transform","scale(1,1)");
        })
        diffBtn.on("touchstart",function(){
            $(this).css("transform","scale(0.9,0.9)");
        });
        diffBtn.on("touchend",function(){
            $(this).css("transform","scale(1,1)");
        })

        //跳转游戏难度选择页面
        var beginBtn = $(".index .beginBtn");
        beginBtn.on("touchend",function(){
            index.animate({
                opacity:"0",
            },500);
            setTimeout(function(){
                index.hide();
                diff.show();
                diff.animate({
                    opacity:"1",
                },500)
            }, 500);
        })

        //选择游戏难度开始游戏
        var game = $(".game");
        var easy = $(".easy");
        var normal = $(".normal");
        var difficult = $(".difficult");
        easy.on("touchend",function(){
            game.addClass("easy");
            diff.animate({
                opacity:"0",
            },500);
            setTimeout(function(){
                diff.hide();
                game.show();
                game.animate({
                    opacity:"1",
                },500)
            }, 500)
            // clearInterval(time_set);
            $(".game h4").text("00:00");
            score = 100;
            timer();
            main(8);
        });
        normal.on("touchend",function(){
            game.addClass("normal");
            diff.animate({
                opacity:"0",
            },500);
            setTimeout(function(){
                diff.hide();
                game.show();
                game.animate({
                    opacity:"1",
                },500)
            }, 500)
            // clearInterval(time_set);
            $(".game h4").text("00:00");
            score = 100;
            timer();
            main(12);
        });
        difficult.on("touchend",function(){
            game.addClass("difficult");
            diff.animate({
                opacity:"0",
            },500);
            setTimeout(function(){
                diff.hide();
                game.show();
                game.animate({
                    opacity:"1",
                },500)
            }, 500)
            // clearInterval(time_set);
            $(".game h4").text("00:00");
            score = 100;
            timer();
            main(16);
        });


        //跳转游戏规则页面
        var ruleBtn = $(".index .ruleBtn");
        ruleBtn.on("touchend",function(){
            index.animate({
                opacity:"0",
            },500);
            setTimeout(function(){
                index.hide();
                rule.show();
                rule.animate({
                    opacity:"1",
                },500)
            }, 500);
        })

        //规则页回到主页
        var back = $(".rule .back");
        back.on("touchend",function(){
            rule.animate({
                opacity:"0",
            },500)
            setTimeout(function(){
                rule.hide();
                index.show();
                index.animate({
                    opacity:"1",
                },500)
            },500)
        })
    };
    begin();

    var score = 100;

    //计时函数
    function timer(){
        var game = $(".game");
        var rem_time = $(".game h4"); 
        var n_time = 0;

        //这里没有var代表time_set是一个全局变量
        time_set = setInterval(function(){
            n_time++;
            var min = Math.floor(n_time/60);
            var sec = n_time%60;
            min = min.toString().length<2?"0"+min:min;
            sec = sec.toString().length<2?"0"+sec:sec;
            
            if(game.hasClass("easy")){
                if( parseInt(sec) > 5 && score > 1){
                    score -= 3;
                }
            }
            if(game.hasClass("normal")){
                if( parseInt(sec) > 15 && score > 1){
                    score -= 3;
                }
            }
            if(game.hasClass("difficult")){
                if( parseInt(sec) > 20 && score > 1){
                    score -= 3;
                }
            }
            console.log(parseInt(sec));
            console.log("score为" + score);
            rem_time.text(min+":"+sec);
        },1000);
    }

    //游戏核心函数
    function main(x){

        //将li卡片动态插入ul中
        var game = $(".game");
        var cardBox = $(".game .card-box");
        for(var k=0;k<x;k++){
            var li = $("<li class='block' data-time='0'></li>");
            var img0 = $("<img class='zero' src='img/0.png'>");
            var img1 = $("<img class='one' src='img/0.png'>");
            li.append(img1);
            li.append(img0);
            cardBox.append(li);
        }

        var arr = [];
        var num = x/2;
        // var arr = [1,2,3,4,5,6,1,2,3,4,5,6];
        for(var j=num;j>0;j--){
            arr.unshift(num);
            // arr.unshift(num);
            num -= 1;
        }
        arr = arr.concat(arr);
        var rand = arr.sort(function(){return Math.random()>.5?-1:1;})
        console.log(rand);
        var block = $(".block");
        var blockImg0 = $(".block .zero");
        var blockImg1 = $(".block .one")
        var ts1,ts2;
        var src1,src2;
        for(var i=0;i<x;i++){
            blockImg1.eq(i).attr("src","img/"+rand[i]+".png");
        }


        //time的取值 背面为0 点击第一次为1 翻过来的为-1

        //判断两张牌是不是相同时
        block.on("touchend",function(){
            if($(this).data("time") == 0 && (!block.hasClass("animated"))){
                console.log("第一次点击");
                ts1 = $(this);
                ts1.addClass("animated");
                src1 = ts1.find(".one").attr("src");
                ts1.find("img").css("transform","rotateY(180deg)");
                setTimeout(function(){
                    ts1.find(".zero").css("opacity","0");
                    ts1.data("time",-1);
                    $(".block[data-time='0']").data("time",1);
                    setTimeout(function(){
                        ts1.removeClass("animated");
                    }, 120)
                },130)
                console.log("time" + ts1.data("time"));
                console.log(src1);
                console.log(block.data("time"));
            }else if($(this).data("time") == 1 && (!block.hasClass("animated"))){
                console.log("第二次点击");
                ts2 = $(this);
                ts2.addClass("animated");
                src2 = ts2.find(".one").attr("src");
                console.log("time" + ts2.data("time"));
                console.log(src2);
                ts2.find("img").css("transform","rotateY(180deg)");


                setTimeout(function(){
                    ts2.find(".zero").css("opacity","0");
                    if(src2 == src1){
                        setTimeout(function(){
                            ts2.removeClass("animated");
                        }, 120)
                        ts2.data("time",-1);
                        $(".block[data-time='1']").data("time",0);
                    }else if(src2 != src1){
                        setTimeout(function(){
                            ts2.removeClass("animated");
                        }, 940)
                        setTimeout(function(){
                            ts1.find("img").css("transform","rotateY(0deg)");
                            ts2.find("img").css("transform","rotateY(0deg)");
                            setTimeout(function(){
                                ts1.find(".zero").css("opacity","1");
                                ts2.find(".zero").css("opacity","1");
                                ts1.data("time",0);
                                ts2.data("time",0);
                                $(".block[data-time='1']").data("time",0);
                            }, 120)
                        }, 500)
                    }
                },130)
            }

        })
        

        var rem_time = $(".game h4"); 
        block.on("touchend",function(){
            setTimeout(function(){
                //为什么length是11....T_T
                if($(".block[data-time='-1']").length == x){
                    alert("游戏结束，你的分数是" + score);

                    game.hide();
                    game.removeClass("easy");
                    game.removeClass("normal");
                    game.removeClass("difficult");
                    cardBox.empty();
                    clearInterval(time_set);
                    $(".game h4").text("00:00");
                    $(".index").show();
                    $(".index").animate({
                        opacity:"1",
                    })
                }
            }, 300)
        })
        
    }
    // timer();
    // main(12);

})