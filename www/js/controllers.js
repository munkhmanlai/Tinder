var swipe = false;
var panTop = false;
var panBottom = false;

$JSView.controller = {
    
    home: function(e){
        $JSView.dataView({},e);

        var card3 = new Hammer(document.getElementById('card3'));
        var backgroundCard3 = $v.select('#backgroundCard3');
        var like3 = $v.select('#card3 .like');
        var nope3 = $v.select('#card3 .nope');

        card3.on("swipeleft swiperight pan", function(ev) {

            //console.log(ev);
            //console.log(ev.deltaX);
            console.log(ev.type);
            
            if(ev.type == 'swipeleft'){                
                swipe = true;
                nope3.style.opacity = 1;
                like3.style.opacity = 0;
                backgroundCard3.style.transformOrigin = "";
                backgroundCard3.style.transform = "";
                backgroundCard3.classList.add('JSVcontainerTransitionRotateLeftCard');
                setTimeout(function(){
                    nope3.style.opacity = 0;
                    swipe = false;
                },150)
            }
            
            if(ev.type == 'swiperight'){                
                swipe = true;
                like3.style.opacity = 1;
                nope3.style.opacity = 0;
                backgroundCard3.style.transformOrigin = "";
                backgroundCard3.style.transform = "";
                backgroundCard3.classList.add('JSVcontainerTransitionRotateRightCard');
                setTimeout(function(){
                    like3.style.opacity = 0;
                    swipe = false;
                },150)
            }

            if(ev.type == 'pan' && swipe == false){
                                
                console.log(ev.changedPointers[0].clientY);
                
                if(ev.deltaX < 0){
                    like3.style.opacity = 0;
                    nope3.style.opacity = Math.abs(ev.deltaX)/100;
                }
                if(ev.deltaX > 0){
                    nope3.style.opacity = 0;
                    like3.style.opacity = Math.abs(ev.deltaX)/100;
                }
                
                if(ev.changedPointers[0].clientY <=250){
                    if(panBottom == false){
                        panTop = true;
                        backgroundCard3.style.transformOrigin = "center top";
                        backgroundCard3.style.transform = "rotate(" + (ev.deltaX / 15 ) + "deg)";
                    }else{
                        backgroundCard3.style.transformOrigin = "center bottom";
                        backgroundCard3.style.transform = "rotate(" + -(ev.deltaX / 15 )+ "deg)";   
                    }
                }else{
                    if(panTop == false){
                        panBottom = true;
                        backgroundCard3.style.transformOrigin = "center bottom";
                        backgroundCard3.style.transform = "rotate(" + -(ev.deltaX / 15 )+ "deg)";
                    }else{
                        backgroundCard3.style.transformOrigin = "center top";
                        backgroundCard3.style.transform = "rotate(" + (ev.deltaX / 15 ) + "deg)";
                    }
                }
                
                backgroundCard3.style.marginLeft = ev.deltaX + 'px';   
                backgroundCard3.style.marginTop = ev.deltaY + 'px';  
                
                if(ev.isFinal == true){
                    panTop = false;
                    panBottom = false;
                    backgroundCard3.classList.add('JSVcontainerTransitionCard');
                    like3.style.opacity = 0;
                    nope3.style.opacity = 0;
                    backgroundCard3.style.transformOrigin = "";
                    backgroundCard3.style.transform = "";
                    backgroundCard3.style.marginTop = '0px'; 
                    backgroundCard3.style.marginLeft = '0px';
                    setTimeout(function(){
                        backgroundCard3.classList.remove('JSVcontainerTransitionCard');
                    },250)
                }
   
            }
            

        });

        mc.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        
    }

}
