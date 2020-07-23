
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





//Web3.js

		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(web3.currentProvider);
		} else {
		  // Set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

		var Swap_Contract;
		var STO_Contract;
		var coinbase;

		async function printPostsToConsole() {

			//取得帳號
			coinbase = await web3.eth.getCoinbase();

			//取得帳號餘額
			var balance = await web3.eth.getBalance(coinbase);
			$("#my_address").text(coinbase);
			$("#ETH_VOL").text(toPoint_2(web3.utils.fromWei(balance)));  //wei 轉換成 ether web3.utils.fromWei()




			$(document).ready(function(){
			    $.ajax({
			        method:"GET",
			        url: "https://api.coinlore.net/api/ticker/?id=80",        
			      }).done(function(msg) {  
			        var ETH_price = (msg[0].price_usd);
			        $("#ETH_USD").text(toPoint_2(ETH_price*(web3.utils.fromWei(balance)))); 			      
			      });
			  }) 

			

			



				

		};

		printPostsToConsole();


		// function invest(){
		// 	Swap_Contract.methods.swap().send({from: coinbase, value: "438000000000000000"}).then(function(receipt){			   
		// 		location.reload();
		// 	});
		// }

		

