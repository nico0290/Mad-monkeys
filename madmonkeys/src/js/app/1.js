

var enemy_id = 0;
var tower_id = 0;

var Enemy =  function(time) {
		
	this.id = enemy_id,
	this.time = time,
	this.x = 0,
	this.y = 5,
	this.hp = 3,
	this.alive = true,
	this.last_x,
	this.last_y,
	this.x_after,
	this.y_after,
	this.x_before,
	this.y_before,
	this.bot_check,
	this.up_check,
	this.left_check,
	this.right_check


	enemy_id = enemy_id + 1;


}

var player = {
	hp : 5,
	x : 18,
	y : 4,
	cash : 400,
	score : 0
};


var Tower =  function(y, x, cost){
	
	this.id = tower_id,
	tower_id = tower_id + 1

	if(cost == 200){
		if(player.cash >= 200){
			player.cash = player.cash - cost;
			$('.'+y+'_'+x).append("<div class='tower-1 tow'></div>");
			this.x = x,
			this.y = y,
			this.cat = 1
		}
	}

	if(cost == 500){
		if(player.cash >= 500){
			player.cash = player.cash - cost;
			$('.'+y+'_'+x).append("<div class='tower-2 tow'></div>");
			this.x = x,
			this.y = y,
			this.cat = 2
		}
	}

	if(cost == 1000){
		if(player.cash >= 1000){
			player.cash = player.cash - cost;
			$('.'+y+'_'+x).append("<div class='tower-3 tow'></div>");
			this.x = x,
			this.y = y,
			this.cat = 3
		}
	}

	
}

var left = 0,
	bottom = 0,
	right = 0,
	top = 0;

Enemy.prototype.left = function(){
	var that = $('.'+this.y+'_'+this.x).find('.balle');
	if(left==0){
		that.css('background-position', '-436px -744px');
		left = 1;
	}
	else if(left==1)
	{
		that.css('background-position', '-509px -744px');
		left = 2;
	}
	else if(left==2)
	{
		that.css('background-position', '-573px -744px');
		left = 0;
	}
}

Enemy.prototype.bottom = function(){
	var that = $('.'+this.y+'_'+this.x).find('.balle');
	if(left==0){
		that.css('background-position', '-32px -743px');
		left = 1;
	}
	else if(left==1)
	{
		that.css('background-position', '-98px -743px');
		left = 2;
	}
	else if(left==2)
	{
		that.css('background-position', '-165px -743px');
		left = 0;
	}
}


Enemy.prototype.top = function(){
	var that = $('.'+this.y+'_'+this.x).find('.balle');
	if(left==0){
		that.css('background-position', '-233px -745px');
		left = 1;
	}
	else if(left==1)
	{
		that.css('background-position', '-301px -745px');
		left = 2;
	}
	else if(left==2)
	{
		that.css('background-position', '-368px -745px');
		left = 0;
	}
}


Enemy.prototype.right = function(){
	var that = $('.'+this.y+'_'+this.x).find('.balle');
	if(left==0){
		that.css('background-position', '-843px -740px');
		left = 1;
	}
	else if(left==1)
	{
		that.css('background-position', '-913px -740px');
		left = 2;
	}
	else if(left==2)
	{
		that.css('background-position', '-980px -740px');
		left = 0;
	}
}





Enemy.prototype.detection_obs = function() 
{
	var last_x;
	var last_y;

	this.x_after 	= this.x + 1;
	this.x_before 	= this.x - 1;
	this.y_after 	= this.y + 1;
	this.y_before 	= this.y - 1;
	
	this.bot_check 		= $('.'+this.y_after+'_'+this.x);
	this.left_check 		= $('.'+this.y+'_'+this.x_before);
	this.right_check 	= $('.'+this.y+'_'+this.x_after);
	this.up_check 		= $('.'+this.y_before+'_'+this.x);

	if( (this.x == player.x) && (this.y == player.y) ){

		$('.'+this.y+'_'+this.x).empty();

		this.alive = false;
		this.x = false;
		this.y = false;
		player.hp = player.hp -1;
		return;
	}
	else 
	{
		if( !(this.bot_check.hasClass('obs')) && !(this.bot_check.length == 0) && !(this.last_x == this.x && this.last_y == this.y_after) ){
		$('.'+this.y+'_'+this.x).empty();
		$('.'+this.y_after+'_'+this.x).append("<div class='balle' data-id='"+this.id+"'></div>");

		this.last_x = this.x;
		this.last_y	= this.y;

		this.y = this.y_after;
		this.bottom();
		return;
		}

		if( !(this.left_check.hasClass('obs')) && !(this.left_check.length == 0) && !(this.last_x == this.x_before && this.last_y == this.y) ){
			$('.'+this.y+'_'+this.x).empty();
			$('.'+this.y+'_'+this.x_before).append("<div class='balle' data-id='"+this.id+"'></div>");

			this.last_y = this.y;
			this.last_x = this.x;

			this.x = this.x_before;
			this.left();
			return;
		}


		if(!(this.right_check.hasClass('obs')) && !(this.right_check.length == 0) && !(this.last_x == this.x_after && this.last_y == this.y) ){
			$('.'+this.y+'_'+this.x).empty();
			$('.'+this.y+'_'+this.x_after).append("<div class='balle' data-id='"+this.id+"'></div>");

			this.last_x 	= this.x;
			this.last_y 	= this.y;

			this.x = this.x_after;
			this.right();
			return;
		}

		if(!(this.up_check.hasClass('obs')) && !(this.up_check.length == 0) && !(this.last_x == this.x && this.last_y == this.y_before) ){
			$('.'+this.y+'_'+this.x).empty();
			$('.'+this.y_before+'_'+this.x).append("<div class='balle' data-id='"+this.id+"'></div>");

			this.last_x 	= this.x;
			this.last_y 	= this.y;

			this.y = this.y_before;
			this.top();
			return;
		}
	}
	
}


Tower.prototype.tower_range = function() {


if(this.cat == 1){
		if( $('.'+(this.y+1)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x+1, i);
			return;
		}

		if( $('.'+(this.y)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x+1, i);
			return;
		}

		if( $('.'+(this.y-1)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x+1, i);
			return;
		}



		if( $('.'+(this.y+1)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x, i);
			return;
		}

		if( $('.'+(this.y-1)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x, i);
			return;
		}


		if( $('.'+(this.y-1)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x-1, i);
			return;
		}

		if( $('.'+(this.y+1)+'_'+(this.x-1)+' div.balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x-1, i);
			return;
		}

		if( $('.'+(this.y)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x-1, i);
			return;
		}
	}

	if(this.cat == 2){
		if( $('.'+(this.y+1)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x+1, i);
		}

		if( $('.'+(this.y)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x+1, i);
		}

		if( $('.'+(this.y-1)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x+1, i);
		}



		if( $('.'+(this.y+1)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x, i);
		}

		if( $('.'+(this.y-1)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x, i);
		}


		if( $('.'+(this.y-1)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x-1, i);
		}

		if( $('.'+(this.y+1)+'_'+(this.x-1)+' div.balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x-1, i);
		}

		if( $('.'+(this.y)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x-1, i);
		}
	}


	if(this.cat == 3){


		if( $('.'+(this.y-2)+'_'+(this.x-2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-2)+'_'+(this.x-2)+' .balle').data('id');
			enemies[i].tower_damage(this.y-2, this.x-2, i);
		}
		if( $('.'+(this.y-2)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-2)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-2, this.x-1, i);
		}
		if( $('.'+(this.y-2)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-2)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y-2, this.x, i);
		}
		if( $('.'+(this.y-2)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-2)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y-2, this.x+1, i);
		}
		if( $('.'+(this.y-2)+'_'+(this.x+2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-2)+'_'+(this.x+2)+' .balle').data('id');
			enemies[i].tower_damage(this.y-2, this.x+2, i);
		}




		if( $('.'+(this.y-1)+'_'+(this.x+2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x+2)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x+2, i);
		}
		if( $('.'+(this.y)+'_'+(this.x+2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x+2)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x+2, i);
		}
		if( $('.'+(this.y+1)+'_'+(this.x+2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x+2)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x+2, i);
		}



		if( $('.'+(this.y+2)+'_'+(this.x-2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+2)+'_'+(this.x-2)+' .balle').data('id');
			enemies[i].tower_damage(this.y+2, this.x-2, i);
		}
		if( $('.'+(this.y+2)+'_'+(this.x-1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+2)+'_'+(this.x-1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+2, this.x-1, i);
		}
		if( $('.'+(this.y+2)+'_'+(this.x)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+2)+'_'+(this.x)+' .balle').data('id');
			enemies[i].tower_damage(this.y+2, this.x, i);
		}
		if( $('.'+(this.y+2)+'_'+(this.x+1)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+2)+'_'+(this.x+1)+' .balle').data('id');
			enemies[i].tower_damage(this.y+2, this.x+1, i);
		}
		if( $('.'+(this.y+2)+'_'+(this.x+2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+2)+'_'+(this.x+2)+' .balle').data('id');
			enemies[i].tower_damage(this.y+2, this.x+2, i);
		}



		if( $('.'+(this.y-1)+'_'+(this.x-2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y-1)+'_'+(this.x-2)+' .balle').data('id');
			enemies[i].tower_damage(this.y-1, this.x-2, i);
		}
		if( $('.'+(this.y)+'_'+(this.x-2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y)+'_'+(this.x-2)+' .balle').data('id');
			enemies[i].tower_damage(this.y, this.x-2, i);
		}
		if( $('.'+(this.y+1)+'_'+(this.x-2)+' .balle').size() == 1 ){
			var i = $('.'+(this.y+1)+'_'+(this.x-2)+' .balle').data('id');
			enemies[i].tower_damage(this.y+1, this.x-2, i);
		}

	}

}

Enemy.prototype.tower_damage = function(y, x, id){

	this.hp = this.hp -1;

	if(this.hp > 0) {
		$('.'+y+'_'+x).append("<div class='bang'></div>");
	}
	else {
		$('.'+y+'_'+x+' .balle').css('background-position', '-221px -881px');
		enemies[id].x = false;
		enemies[id].y = false;
		enemies[id].alive = false;
		player.cash = player.cash + 50;
		player.score = player.score + 243;
		setTimeout(function(){
			$('.'+y+'_'+x).empty();
		}, 100);

	}

	setTimeout(function(){
		$('.'+y+'_'+x).find('.bang').empty();
	}, 100);
}



//for each enemies create an object

var enemies = [new Enemy(2000), new Enemy(2600), new Enemy(3200), new Enemy(3800),new Enemy(5000), new Enemy(8000), new Enemy(9000), new Enemy (9900), new Enemy(10000)];

$(".obs").hover(function(){
	if(choice == 200){
		$(this).find(".tower-0").css({'background':"url('src/images/tower1.png') no-repeat", "width":"92px", "height":"67px", "left":"calc(50% - 46px)", "top":"calc(50% - 33.5px)"});
		$(this).find(".circle").css({"left":"calc(100% - 124px)", "top":"calc(100% - 138px)"});
		draw(90);
	}
	else if(choice == 500)
	{
		$(this).find(".tower-0").css({'background':"url('src/images/tower.png') no-repeat", "width":"66px", "height":"103.05px", "background-size":"cover", "left":"calc(50% - 35px)", "top":"calc(50% - 51.5px)"});
		$(this).find(".circle").css({"left":"calc(100% - 124px)", "top":"calc(100% - 138px)"});
		draw(90);
	}
	else
	{
		$(this).find(".tower-0").css({'background':"url('src/images/tower2.png') no-repeat", "width":"108.5px", "height":"102.9px", "background-size":"cover", "left":"calc(50% - 54.25px)", "top":"calc(50% - 50.85px)"});
		$(this).find(".circle").css({"left":"calc(100% - 200px)", "top":"calc(100% - 180px)"});
		draw(170);
	}

	$(this).find(".tower-0").show();
	$(this).find(".circle").show();
}, function(){
	$(this).find(".tower-0").hide();
	$(this).find(".circle").hide();
});

var choice = 200;

$(".choose1").click(function(){
	choice = 200;
});

$(".choose2").click(function(){
	choice = 500;
});

$(".choose3").click(function(){
	choice = 1000;
});

var towers = [];

var stats = setInterval(function(){
	$(".hp").remove();
	$(".cash").remove();
	$("#life").text(player.hp);
	$("#money").text(player.cash + "$");
	$("#score").text(player.score);
}, 200);



var pause = true;

$(window).keydown(function(event){
	  if (event.which == 32) {
	  		if(pause)
	  		{
	  			play_game();
	  			pause = false;
	  		}
	  		else 
	  		{
	  			clearInterval(play);
	  			pause = true;
	  		}
	  }
});

$(".play").click(function(){
	if(pause){
		play_game();
		pause = false;
	}
	else
	{
		clearInterval(play);
		pause = true;
	}
});



function play_game(){
	play = setInterval(function(){
		if(player.hp <= 0){
			clearInterval(play);
		}
		for(i=0; i<enemies.length; i++){
			if(enemies[i].time >= 0){
				enemies[i].time = enemies[i].time - 200;
			}
			else 
			{
				enemies[i].detection_obs();
			}
		}

		for(i=0; i<towers.length; i++){
			towers[i].tower_range();
		}

		if(!enemies[8].alive){
			$(".over-2").show();
			enemies[8].alive = true;
			setCookie("level", 1, 1);
		}
	}, 200);
}



$(".over-1").click(function(){
	$(".over-1").hide();
	$(".over-11").show();
});

$(".over-11").click(function(){
	$(".over-11").hide();
	$(".over-111").show();
});

$(".over-111").click(function(){
	$(".over-111").hide();
});

$(".over-2").click(function(){
	$(".over-2").hide();
	$(".over-22").show();
});

$(".over-22").click(function(){
	$(".over-22").hide();
	$(".over-222").show();
});

$(".over-222").click(function(){
	$(".over-222").hide();
	window.location.replace("2.php");
});

$(".obs").append("<div class='tower-0'></div><canvas class='circle'></canvas>");

$(".obs").hover(function(){
	$(this).find(".tower-0").show();
	$(this).find(".circle").show();
}, function(){
	$(this).find(".tower-0").hide();
	$(this).find(".circle").hide();
});

$(".obs").click(function(){
	if($(this).find('.tow').size() == 0)
		towers.push(new Tower($(this).data('y'), $(this).data('x'), choice));
});

function draw(r) {        
    $('canvas.circle').each(function() {

    	var ctx = this.getContext('2d');

    	ctx.clearRect(0, 0, this.width, this.height);

    	ctx.canvas.height = r*2;
        ctx.canvas.width = r*2;

		ctx.beginPath();
		ctx.arc(r,r, r, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
    });
}

draw();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
