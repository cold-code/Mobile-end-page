var oUl = document.getElementById('goodslist'),
			aLi = document.querySelectorAll('#goodslist li'),
			aCheck = document.querySelectorAll('#goodslist li .up'),
			len = aCheck.length,//代表与li相关的各个项目的单类总数
			allCheck = document.querySelector('.footer .allcheck .up'),
			aUnitPrice = document.getElementsByClassName('Uprice'),//单价
			aAdd = document.getElementsByClassName('add'),
			aMinus = document.getElementsByClassName('minus'),
			aNum = document.querySelectorAll('.num span'),//单项商品总数
			ototalNum = document.getElementById('num'),//全列表商品总数
			ototalPrice = document.getElementById('totalPrice'),//总价
			aDel = document.getElementsByClassName('del'),//从购物清单删除该项商品
			index = 0,//设定序号，判断选定个数
			arr = [];//储存小计值

		//加减运算
		for (i = 0; i < len; i++) {
			aAdd[i].i = i;
			arr[i] = 0;
			aAdd[i].onclick = function () {
				var j = this.i;
				var val = aNum[j].innerHTML;
				// val ++;
				aNum[j].innerHTML = ++val;
				txtChange(j)
			}
			aMinus[i].i = i;
			aMinus[i].onclick = function () {
				var j = this.i;
				var val = aNum[j].innerHTML;
				val --;
				if(val < 0) val = 0;
				aNum[j].innerHTML = val;
				txtChange(j);
			}
		}
		//加法运算
		function sum (bool) {
			var x = 0;
			for (i = 0,len = aNum.length; i < len; i++) {
				aNum = document.querySelectorAll('.num span');
				console.log(aNum);
				var y = bool?aNum[i].innerHTML:arr[i];
				x += y*1
			}
			return x;
		}
		
		//总值变化函数
		function txtChange (j) {
			arr[j] = aNum[j].innerHTML * aUnitPrice[j].innerHTML;
				if(aCheck[j].ifCheck){//判断是否选中该商品，只有选中才加值
					ototalNum.innerHTML = sum(true);
				    ototalPrice.innerHTML = sum(false);
				}
		}

		for (var i = 0;i < len; i++) {
			//单个点击
			aCheck[i].index = i;
			aCheck[i].ifCheck = false;//自定义属性，判断是否被选中
			aCheck[i].onclick = function () {
				var j = this.index;
				aNum = document.querySelectorAll('.num span');
				if (this.ifCheck) {
					this.className = 'up';
					index--;
					ototalNum.innerHTML -= aNum[j].innerHTML*1;//取消选择时，移除购物车中商品
					aNum[j].innerHTML = 0;//同时清空该项购物篮
				    ototalPrice.innerHTML -= arr[j];//清空某项商品，总价钱同时减少
				    arr[j] = 0;//存入的该商品小计归零
					ifAll();
				}else{
					index++;//选中的同时序号+1
					this.className = 'down';
					aDel[j].ifCheck = true;
					ototalNum.innerHTML = sum(true);
					ototalPrice.innerHTML = sum(false);
					for (var k = 0; k < len; k++) {
						aDel[k].index = k;
						aDel[k].onclick = function () {
							oUl.removeChild(aLi[this.index]);//寻父除子
							ototalNum.innerHTML -= aNum[j].innerHTML*1;//取消选择时，移除购物车中商品
							aNum[j].innerHTML = 0;//同时清空该项购物篮
				    		ototalPrice.innerHTML -= arr[j];//清空某项商品，总价钱同时减少
				    		arr[j] = 0;//存入的该商品小计归零		
						};	
					}
				}
				this.ifCheck = !this.ifCheck;
				
			}
		}
		for (var k = 0; k < len; k++) {
			aDel[k].onclick = function () {
				alert('请先选中希望删除的商品！');
			};	
		}
			

		
		
		//全选按钮的操作
		for (i = 0; i < len; i++) {
			allCheck.onclick = function () {
				if(index == len) {
					allCheck.className = 'up';
					allClear();
					index = 0;
				}else{
					allCheck.className = 'down';
					allPick();
					index = len;
				}
				ifAll();
			}
		}
		

		//判断是否全被选中
		function ifAll () {
			index == len?allCheck.className = 'down':allCheck.className = 'up';
		}

		//全选函数
		function allPick () {
			for (i = 0;i < len; i++) {
				aCheck[i].className = 'down';
				aCheck[i].ifCheck = true;
				
			}
			index = length;//序号成为全选状态
			ifAll();//激活全选状态
			ototalNum.innerHTML = sum(true);
			ototalPrice.innerHTML = sum(false);
		}

		//清空函数
		function allClear () {
			for (i = 0; i < len;i++) {
				aCheck[i].className = 'up';
				aCheck[i].ifCheck = false;
				aNum[i].innerHTML = 0;
				arr[i] = 0;
			}
			index = 0;
			ifAll();
			ototalPrice.innerHTML = 0; 
			ototalNum.innerHTML = 0;
		}