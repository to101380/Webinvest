
//AOS動畫
AOS.init();

//navbar animation
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}


//cryptocurrency price
var ETH_price;

$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://api.coinlore.net/api/ticker/?id=80",        
      }).done(function(msg) {   
        console.log(msg);
        ETH_price = (msg[0].price_usd); 
      });
  }) 



//千分數逗點
var thousandComma = function(number)

{
 var num = number.toString();
 var pattern = /(-?\d+)(\d{3})/;
  
 while(pattern.test(num))
 {
  num = num.replace(pattern, "$1,$2");
  
 }
 return num;
 
}
  



// 換成百分比
function toPercent_5(point){
		  var str=Number(point*100).toFixed(5);
		  str+="%";
		  return str;
		}

function toPercent_2(point){
		  var str=Number(point*100).toFixed(2);
		  str+="%";
		  return str;
		}

// 進位	


function toPoint_2(point){
    var str=Number(point).toFixed(2);          
    return str;
  }	

function toPoint_3(point){
    var str=Number(point).toFixed(3);          
    return str;
  }		



// 數字跳動動畫
(function($) {
	 $.fn.animateNumbers = function(stop, commas, duration, ease) {
		return this.each(function() {
			var $this = $(this);
			var start = parseInt($this.text().replace(/,/g, ""));
				commas = (commas === undefined) ? true : commas;
			    $({value: start}).animate({value: stop}, {
			        duration: duration == undefined ? 1000 : duration,
			        easing: ease == undefined ? "swing" : ease,
			        step: function() {
			           	$this.text(Math.floor(this.value));
							if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
			            },
			            complete: function() {
			            	if (parseInt($this.text()) !== stop) {
			            	    $this.text(stop);
							if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
			            	   }
			            	}
			            });
			        });
			    };
})(jQuery);



//時間倒數
  /* Set the date we're counting down to */
    // var countDownDate = new Date('SEP 25, 2020 00:00:00').getTime();
    // var countDownDateTXT = '';
    // function mytime() {
    //     countDownDateTxt = document.getElementById('txt').value;
    //     countDownDate = new Date(countDownDateTxt).getTime();
    //     document.getElementById('now-time').innerHTML = countDownDateTxt;
    // }

/* Update the count down every 1 second */

// var x = setInterval(function() {
//     /* Get todays date and time */
//     var now = new Date().getTime();

//     /* Find the distance between now and the count down date */
//     var distance = countDownDate - now;

//     /* Time calculations for days, hours, minutes and seconds */
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     /* Display the result in the element with id="demo" */
//     document.getElementById('timer_day').innerHTML = days + 'D ';    
//     document.getElementById('timer_hr').innerHTML =  hours + 'h ';
//     document.getElementById('timer_min').innerHTML = minutes + 'm ';
//     document.getElementById('timer_sec').innerHTML = seconds + 's ';
    
//     if(days+hours+minutes+seconds<0){      
//       $("#timer_day").text("0D");
//       $("#timer_hr").text("0h");
//       $("#timer_min").text("0m");
//       $("#timer_sec").text("0s");
//       $(".reciprocal").css("background-color","#e8e8e8");      
//      }

//     /* If the count down is finished, write some text */
//     if (distance < 0) {
//         clearInterval(x);
//         document.getElementById('timer').innerHTML = 'EXPIRED';
//     }
// }, 1000);




//loading page

function myload() {
    $(".load-5").fadeOut(3000);        
}
window.onload = myload;



// invest

function invest(a,b,c){	
	document.getElementById('project_price').innerHTML = a+" ETH";
	document.getElementById('project_lv').innerHTML = "專案方案 : " + b;
	document.getElementById('return').innerHTML = c;	
	document.getElementById('project_USD').innerHTML =thousandComma(toPoint_2(a*ETH_price));
}


// agree button Boolean

$("#agree").click(function(){	
  var checked = $(this).prop( "checked" );

  if (checked) {
  	$("#comfirm").attr("class","btn btn-primary btn-sm");
  }else{
  	$("#comfirm").attr("class","btn btn-primary btn-sm disabled");
  }
 
});

//Web3.js

		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(web3.currentProvider);
		  $("#wallets").css("display","none");	
		  $("#more").css("display","none");		  
		  $("button").attr("data-target","#project"); 		  
		} else {
		  // Set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	
		  $("#_STO_general").css("display","none");	
		  $("#more_info").css("display","none");
		  $(".progress_bar").css("display","none");
		  $("button").attr("data-target","#wallets_downlaod"); 
		}

		var Webs_ERC20;		
		var coinbase;
		var decimal = 10**18;
				

		async function printPostsToConsole() {

			//取得帳號
			coinbase = await web3.eth.getCoinbase();				
			var hidden_str = (coinbase.substring(6,38));
		    var replace_part = coinbase.replace(hidden_str,"...");	
		  
				

			//取得帳號餘額
			var balance = await web3.eth.getBalance(coinbase);
			$("#my_address").text(replace_part);
			$("#my_balance").text(web3.utils.fromWei(balance));  //wei 轉換成 ether web3.utils.fromWei()

			var Webs_address = "0xe2432C9D8D668A5B1Eeb1d7e75D6e49D3952980D";
			var Webs_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"Shares_outstanding","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
			Webs_ERC20 = new web3.eth.Contract(Webs_abi, Webs_address);


			var hidden_str = (Webs_address.substring(6,38));
		    var replace_part = Webs_address.replace(hidden_str,"...");		    
			var result =  replace_part.link("https://etherscan.io/token/"+Webs_address);
			document.getElementById("webs_address").innerHTML = result;			

				

			var total_supply = await  Webs_ERC20.methods.totalSupply().call({});	
			$("#total_supply").text(thousandComma(total_supply/decimal));
		

			var webs_balance = await  Webs_ERC20.methods.balances(coinbase).call({});	
			$("#webs_balance").text(toPoint_2(webs_balance/decimal));				
			$("#hold_rate").text(toPercent_2(webs_balance/total_supply));
			if(webs_balance>0){
				 $("").css("display","none"); 
			}
		
			

				    			    
			


		};

		printPostsToConsole();




		function ins(){
			Swap_Contract.methods.swap().send({from: coinbase, value: "438000000000000000"}).then(function(receipt){			   
				location.reload();
			});
		}

		

