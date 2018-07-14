<template>
    <div id="egg">
      <!--头部-->
      <div class="header">
        <div class="mt15">
          <!--上期开奖-->
          <span class="pull-left pre-expect">{{lastExpect}}</span>
          <div class="balls_box">
            <span class="color-white" :class="returnColor(lastOpenCode[0])">{{lastOpenCode[0]}}</span>
            <span class="bg-none color-white">+</span>
            <span class="color-white" :class="returnColor(lastOpenCode[1])">{{lastOpenCode[1]}}</span>
            <span class="bg-none color-white">+</span>
            <span  class="color-white" :class="returnColor(lastOpenCode[2])">{{lastOpenCode[2]}}</span>
            <span class="bg-none color-white">=</span>
            <span class="color-white" :class="returnColor(lastOpenCode[0]+lastOpenCode[1]+lastOpenCode[2])">{{lastOpenCode[0]+lastOpenCode[1]+lastOpenCode[2]}}</span>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <!--时间-->
        <div class="mt10 expect-time">
          <span>{{$store.state.egg.thisExpect}}</span> &nbsp;&nbsp;
          <span>{{$store.state.egg.open_time<60?'准备开盘':'距离封盘'}} ：{{$store.state.egg.hours}}:{{$store.state.egg.minute}}:{{$store.state.egg.seconds}}</span>
        </div>
        <!--盘口选中-->
        <div class="choose-handicaps">
          <select name="handicaps" id="handicaps" v-model="which_handicap">
            <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">
              {{return_upper(v.ratewin_name)}}盘
              <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>
            </option>
          </select>
        </div>
      </div>
      <!--head end-->
      <!--选项卡-->
      <div class="tabs" style="margin-bottom: 55px;">
        <ul>
          <li v-for="(v,k) in tab1" :class="isActive[k]?'active':''" @click="tabs(k)">{{v}}</li>
        </ul>
      </div>
      <!--/选项卡-->
      <!--下注内容-->
      <div class="bet-content">
        <!--总和/两面-->
        <ul v-show="isShowThisDiv[0]">
          <h2 class="title">总和/两面</h2>
          <li v-for="(v,k) in odds.mixture">
            <span class="bet-details"
                  @click="bet_db(k)"
                  v-if="k < 10"
                  :class="addActiveClass('mixture','ball_2__e'+(k+1))"
            >
              <b>总和{{odds.mixture_str[k]}} <i>{{v}}</i></b>
              <i class="ml5 color-white mr2"
                 v-show="howMuch('mixture','ball_2__e'+(k+1))"
              >
                          ￥{{howMuch('mixture','ball_2__e'+(k+1))}}
                    </i>
            </span>
            <span class="bet-details"
                  v-if="k>=10"
                  @click="bet_db(k)"
                  :class="addActiveClass('mixture','ball_4__e1')"
            >
              <b>{{odds.mixture_str[k]}} <i>{{v}}</i></b>
               <i class="ml5 color-white mr2"
                  v-show="howMuch('mixture','ball_4__e1')"
               >
                          ￥{{howMuch('mixture','ball_4__e1')}}
                    </i>
            </span>
          </li>
        </ul>
        <!--波色-->
        <ul v-show="isShowThisDiv[1]">
          <h2 class="title">波色</h2>
          <li v-for="(v,k) in odds.color">
            <span class="bet-details"
                  @click="bt_color(k)"
                  :class="addActiveClass('color','ball_3__e'+(k+1))"
            >
              <b>{{odds.color_str[k]}}<i>{{v}}</i></b>
              <i class="ml5 color-white mr2"
                 v-show="howMuch('color','ball_3__e'+(k+1))"
              >
                          ￥{{howMuch('color','ball_3__e'+(k+1))}}
                    </i>
            </span>
          </li>
        </ul>
        <!--总和特码-->
        <ul v-show="isShowThisDiv[2]">
          <h2 class="title">总和特码</h2>
          <li v-for="(v,k) in odds.special">
            <span class="bet-details"
                  @click="bt_special(k)"
                  :class="addActiveClass('special','ball_1__e'+(k+1))"
            >
              <b>总和{{k}}&nbsp;<i>{{v}}</i></b>
              <i class="ml5 color-white mr2"
                 v-show="howMuch('special','ball_1__e'+(k+1))"
              >
                          ￥{{howMuch('special','ball_1__e'+(k+1))}}
                    </i>
            </span>
          </li>
        </ul>
      </div>
      <!--当前下注列表-->
      <div class="bet-money">
        <span class="btn-pull1" @click="test">下注</span>
        <div>
          <!--反水设置-->
          <mt-range v-model="rangeValue" :min="0" :max="140" :step="1" style="width: 100%;">
            <div slot="start" style="text-indent:10px;">返水:&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div slot="end" style="margin-right: 5px;">14%</div>
          </mt-range>
        </div>
        <!--下注列表-->
        <div class="bet-list mt15">
          <p class="color-white text-left" style="margin-bottom: 5px;text-indent: 10px;">
            下注列表 <span class="pull-right" style="margin-right: 5px;"> 返水{{rangeValue/10}}%</span>
          </p>
          <ul class="text-left nmbd-ul">
            <li v-for="(v,k) in data">
              <span style="width: 6.5rem;">{{v.content}}</span>
              <span style="width: 2.4rem;text-align: left;">{{v.odds}}</span>
              <span class="color-white bet-one-money">￥{{v.money}}</span>
              <span>返{{v.fs}}</span>
              <span
                class="pull-right mr10 color-red"
                style="margin-right: 25px;"
                @click="delete_one(v.content1)">X</span>
            </li>
          </ul>
        </div>
        <div class="btns">
          <a class="submit-all"  @click="do_bet()">提交</a>
        </div>
      </div>
      <!--下注金额选择-->
      <div class="choose-money" style='position:fixed;bottom: 56px;left: 0;'>
        <!--<a class="clear-all">重置金额</a>-->
        <span class="bg-white reset" @click="reset">重置</span>
        <!--<span></span>-->
        <span style="background-position: -32px 0;" :class="bet_money == 5?'selected':''"
              @click="changeBetMoney(5)"></span>
        <span style="background-position: -61px 0;" :class="bet_money == 10?'selected':''"
              @click="changeBetMoney(10)"></span>
        <span style="background-position: -91px 0;" :class="bet_money == 50?'selected':''"
              @click="changeBetMoney(50)"></span>
        <span style="background-position: -121px 0;" :class="bet_money == 100?'selected':''"
              @click="changeBetMoney(100)"></span>
        <span style="background-position: -151px 0;" :class="bet_money == 500?'selected':''"
              @click="changeBetMoney(500)"></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Pcegg",
      data(){
          return{
            tab1:['总和/两面','波色','总和'],//选项卡
            isActive:[1,0,0],//选中哪个
            isShowThisDiv:[1,0,0],//对应的投注栏显示
            lastOpenCode:[1,2,3],//上期开奖数据
            OpenCodeSum:'',
            lastExpect:'20180808052',//上期
            handicaps:[],//用户已有的盘口
            which_handicap:'',//用户当前所选的盘口是哪个  a  b  c  d ...
            fanshui:0,//反水
            bet_money:10,//默认下注金额
            rangeValue: 0,//下注返水百分比
            outSide: false,//右侧投注列表是否显示（false：隐藏；true:显示）
            timeId1:0,//打开  隐藏的动画
            //下注列表展示的数据
            data:
              [
                // {content: "第一球单", odds: 1.9851, odds2: 1.985, money: 100, fs: 0},
                // {content: "第二球单", odds: 1.9951, odds2: 1.985, money: 200, fs: 0},
                // {content: "第三球单", odds: 1.9451, odds2: 1.985, money: 600, fs: 0},
                // {content: "第四球单", odds: 1.9751, odds2: 1.985, money: 300, fs: 0},
                // {content: "第五球单", odds: 1.9650, odds2: 1.985, money: 900000, fs: 0},
              ],
            //赔率
            odds:{
                mixture: [],//两面赔率数组
                mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],//两面的名称
                color: [],//波色赔率
                color_str: ['红波', '绿波', '蓝波'],//波色名称
                special: [],//总和 特码赔率数组
              },
            //下注保存的内容
            bet_content:
              {
                mixture: [],//保存两面的下注数据
                color: [],//保存波色的下注数据
                special: [],//保存特码的下注数据
              },
            all:[],//所有要下注的内容原样合集，用于向服务器提交使用
            bet_son_content:[],//子盘下注集合
            //迭倍吧
            dec_limit:
              {
                ball_1:{},
                ball_2:{},
                ball_3:{},
                ball_4:{},
                ball_5:{},
              },
            all_odds:[],
            long_dragon:[],
            //字典1
            dicrationaries:[
              'ball_1__e1','ball_1__e2','ball_1__e3','ball_1__e4','ball_1__e5','ball_1__e6',
              'ball_1__e7','ball_1__e8','ball_1__e9','ball_1__e10','ball_1__e11','ball_1__e12',
              'ball_1__e13','ball_1__e14','ball_1__e15','ball_1__e16','ball_1__e17','ball_1__e18',
              'ball_1__e19','ball_1__e20','ball_1__e21','ball_1__e22','ball_1__e23',
              'ball_1__e24','ball_1__e25','ball_1__e26','ball_1__e27','ball_1__e28',
              'ball_2__e1','ball_2__e2','ball_2__e3','ball_2__e4','ball_2__e5','ball_2__e6',
              'ball_2__e7','ball_2__e8','ball_2__e9','ball_2__e10',
              'ball_4__e1',
              'ball_3__e1','ball_3__e2','ball_3__e3',
            ],
            //字典2
            dicrationaries_2:[
                '特码-0','特码-1','特码-2','特码-3','特码-4','特码-5','特码-6','特码-7','特码-8','特码-9',
                '特码-10','特码-11','特码-12','特码-13','特码-14','特码-15','特码-16','特码-17','特码-18','特码-19',
                '特码-20','特码-21','特码-22','特码-23','特码-24','特码-25','特码-26','特码-27',

                '混合-大','混合-小','混合-单','混合-双','混合-大单','混合-大双','混合-小单','混合-小双','混合-极大','混合-极小','混合-豹子',

                '波色-红波','波色-绿波','波色-蓝波',
              ],
          }
      },
      methods:{
        //切换选项卡
        tabs(index) {
          this.isActive = [0,0,0];
          this.isShowThisDiv = [0,0,0];
          this.isActive[index] = 1;
          this.isShowThisDiv[index] = 1;
        },
        //右边下注的（弹框显示用户选中的相）
        test() {
          if (!this.outSide) {
            let BrowserHeight = document.body.clientWidth;
            let betContent = document.querySelector('.bet-money');
            let startLeft = betContent.offsetLeft;
            let that = this;
            this.timeId1 = setInterval(function ()
            {

              if (startLeft < BrowserHeight) {
                startLeft += 4;
                betContent.style.left = startLeft + "px";
              }
              else {
                clearInterval(that.timeId1);
                that.outSide = !that.outSide;
              }
            }, 3);
          }
          else
          {
            let BrowserHeight = document.body.clientWidth;
            let betContent = document.querySelector('.bet-money');
            let startLeft = betContent.offsetLeft;
            let that = this;
            this.timeId1 = setInterval(function () {

              if (startLeft > 100) {
                startLeft -= 4;
                betContent.style.left = startLeft + "px";
              }
              else {
                clearInterval(that.timeId1);
                that.outSide = !that.outSide;
              }
            }, 3);
            this.addToBetDataList();
          }
        },
        //将选中的数据加入到右侧下注列表中
        addToBetDataList(){
          var array = Object.keys(this.bet_content);
          this.data = [];
          var all = [];
          for(var i = 0;i<array.length;i++){
            for(var j=0;j<this.bet_content[array[i]].length;j++){
              all.push(
                {
                  content:this.bet_content[array[i]][j].content,
                  money:this.bet_content[array[i]][j].money,
                }
              );
              //找对应的中文下标
              var index = this.dicrationaries.indexOf(this.bet_content[array[i]][j].content);
              var str = '';//赔率
              //是否子盘开启
              if(this.$store.state.son_off){
                if(this.is_dec(this.bet_son_content[i].content,this.bet_son_content[i].money)){
                  var odds =(Number(this.all_odds[index]) - Number(this.is_dec(this.bet_son_content[i].content,this.bet_son_content[i].money))).toFixed(4);
                  str += odds;
                }else{
                  str += `${this.all_odds[index]}`;
                }
              }else{
                str += `${this.all_odds[index]}`;
              }
              //push 到列表展示
              this.data.push(
                {
                  content1:this.bet_content[array[i]][j].content,
                  content:this.dicrationaries_2[index],
                  odds:str,
                  odds2:1.985,
                  money:this.bet_content[array[i]][j].money,
                  fs:0
                }
              )
            }
          }
          this.all = all;
          // console.log(this.bet_content);
          return;
        },
        //删除选中行
        delete_one:function(val){
          var array = Object.keys(this.bet_content);
          for(var i=0; i<array.length;i++){
            for(var j = 0;j<this.bet_content[array[i]].length;j++){
              if(this.bet_content[array[i]][j].content == val){
                // console.log(this.bet_content[array[i]][j].content);
                this.bet_content[array[i]].splice(j,1);
              }else{
                // console.log(val);
              }
            }
          }
          this.addToBetDataList();
        },
        //用户点击选项，添加class  active;
        addActiveClass(type,key){
          for(var i = 0;i<this.bet_content[type].length;i++){
            if(this.bet_content[type][i].content == key){
              return 'active';
            }
          }
        },
        //显示金额
        howMuch:function(type,key){
          for(var i = 0;i<this.bet_content[type].length;i++){
            if(this.bet_content[type][i].content == key){
              return this.bet_content[type][i].money;
            }
          }
        },
        /*下注区
        *总和 两面下注格式(大--极小)：ball_2__(e1-e10)、、(豹子)：ball_4__e1
        * 波色格式：ball_3__(e1-e3)
        *总和特码：ball_1__(e1-e28)
        * */
        /***************两面盘下注******************/
        bet_db:function(k){
          var a =null;
          var money = this.bet_money;
          var flag = false;
          var str = '';//对比的字符串
          if(k < 10){
            str = 'ball_2__e'+(k+1);
          }else{
            str = 'ball_4__e1';
          }
          for(var i =0;i<this.bet_content.mixture.length; i++){
            if(this.bet_content.mixture[i].content == str){
              a = i;
              flag = true;
              money = this.bet_content.mixture[i].money + this.bet_money;
              break;
            }
          }
          if(flag){
            this.bet_content.mixture[a].money = money;
          }else{
            var data = {
              content : str,
              money :money,
            };
            this.bet_content.mixture.push(data);
          }
          // console.log(this.bet_content.mixture);
          this.bet_content.mixture.reverse().reverse();
          return;
        },
        /*************波色下注************************/
        bt_color(k){
          var flag = false;
          var a = '';
          var money =this.bet_money;
          var str = 'ball_3__e'+(k+1);
          for(var i =0;i<this.bet_content.color.length;i++){
            if(this.bet_content.color[i].content == str){
              flag = true;
              a = i;
              money = this.bet_content.color[i].money + this.bet_money;
              break;
            }
          }
          if(flag){
            this.bet_content.color[a].money = money;
          }else{
            var data = {
              content:str,
              money:money,
            };
            this.bet_content.color.push(data);
          }
          this.bet_content.color.reverse().reverse();
          return;
        },
        /*********************总和特码下注************************/
        bt_special(k){
          var flag = false;
          var a = '';
          var money = this.bet_money;
          var str = 'ball_1__e'+(k+1);
          for(var i = 0;i<this.bet_content.special.length;i++){
            if(this.bet_content.special[i].content == str){
              flag = true;
              a = i;
              money = this.bet_content.special[i].money + this.bet_money;
              break;
            }
          }
          if(flag){
            this.bet_content.special[a].money = money;
          }else{
            var data ={
              content:str,
              money:money,
            };
            this.bet_content.special.push(data);
          }
          this.bet_content.special.reverse().reverse();
          return;
        },
        /**********************************************/
        //获取最后一期的开奖号码
        get_last_code: function () {
          this.$http.get(this.api + '/egg/lastLty', {}).then(function (res) {
            //获取到最新一期的数据
            // console.log(res);
            let data = res.data;
            this.lastOpenCode = data.details.ball_0;
            this.OpenCodeSum = data.details.ball_1[0];
            this.lastExpect = `${data.expect}`;
          });
        },
        //查看用户可选盘口
        get_users_handicaps: function () {
          this.$http.get(`${this.api}/egg/pans`)
            .then(function (res) {
              this.handicaps = [];
              if (res.data.status == 200) {
                for (let i = 0; i < res.data.data.ratelist.length; i++) {
                  this.handicaps.push(res.data.data.ratelist[i]);
                  this.which_handicap = res.data.data.ratelist[0].ratewin_name;
                  this.fanshui = res.data.data.ratelist[0].fs;
                }
              }
            });
        },
        //获取赔率
        get_odds: function (which_handicap = null)
        {
          if(which_handicap || this.which_handicap)
          {
            this.$http.get(`${this.api}/egg/odds?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function (response)
            {
              // console.log(response);
              let data = response.data.data;
              let odds = data.odds;
              this.odds = {
                mixture: [],
                mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],
                color: [],
                color_str: ['红波', '绿波', '蓝波'],
                special: [],

              };
              this.dec_limit.ball_1 = odds.ball_1.dec_odds;
              this.dec_limit.ball_2 = odds.ball_2.dec_odds;
              this.dec_limit.ball_3 = odds.ball_3.dec_odds;
              this.dec_limit.ball_4 = odds.ball_4.dec_odds;
              this.dec_limit.ball_5 = odds.ball_5.dec_odds;
              for (let i = 0; i < 30; i++)
              {
                if (data.odds.ball_2['e' + i])
                {
                  this.odds.mixture.push(data.odds.ball_2['e' + i]);//混合的赔率
                  if(data.odds.ball_2['e' + i] && data.odds.ball_2['e' + i] != '0.0000')
                  {
                    this.all_odds[i+27] = data.odds.ball_2['e' + i];
                  }


                }
                if (data.odds.ball_1['e' + i])
                {
                  this.odds.special.push(data.odds.ball_1['e' + i]);//特码的赔率
                  if(data.odds.ball_1['e' + i] && data.odds.ball_1['e' + i] != '0.0000')
                  {
                    this.all_odds[i-1] = data.odds.ball_1['e' + i];
                  }

                }
                if (data.odds.ball_3['e' + i])
                {
                  this.odds.color.push(data.odds.ball_3['e' + i]);//波色的赔率
                  if(data.odds.ball_3['e' + i] && data.odds.ball_3['e' + i] != '0.0000')
                  {
                    this.all_odds[i+38] = data.odds.ball_3['e' + i];
                  }
                }
              }
              this.odds.mixture[10] = data.odds.ball_4['e1'];//混合的赔率添加豹子
              this.all_odds[38] = data.odds.ball_4['e1'];
              //console.log(data.odds.ball_4['e1']);
              //this.all_odds.splice(0,1);
            });
          }

        },
        //球的背景颜色
        returnColor:function(num)
        {
          let className = '';
          num = parseInt(num);
          if(num%3 == 0)
          {
            className = 'bg-red';
          }
          if(num%3 == 1)
          {
            className = 'bg-green';
          }
          if(num%3 == 2)
          {
            className = 'bg-blue';
          }
          if(num == 0 || num == 13 || num == 14 || num ==27)
          {
            className = 'bg-white';
          }
          return className;

        },
        //改变下注金额
        changeBetMoney: function (money) {
          this.bet_money = money;
        },
        //确定下注  ==>发送数据
        do_bet(){
          if(this.all.length <1){
            this.$toast({message:'请选择下注内容'});
            return false;
          }
          this.$http.post(this.api+'/egg/order',{bets:this.all,odds_table:this.which_handicap}).then(function(res){
            // console.log(res);
            if(res.status == 200){
              //清除下注内容
              this.clear_bet();
              //获取用余额
              this.$http.get(this.api + '/user/'+ window.sessionStorage.user_id).then(function(result){
                var data = result.data.data.user;
                this.$set(this.$store.state,'cash_money',data.money.cash_money)
              });
              //tips
              this.$toast({message:res.data.msg});
            }else{
              this.$toast({message:res.data.msg});
            }
          })
        },
        //清除所有下注内容，包括UI也需要
        clear_bet()
        {
          this.all = [];
          this.data = [];
          this.bet_content  = {
              mixture: [],//保存两面的下注数据
              color: [],//保存波色的下注数据
              special: [],//保存特码的下注数据
            };
        },
        //清空数据
        reset() {
          this.bets = [];
        },
        //用户盘口
        return_percent:function(str){
          return str;
        },
        return_upper:function(str){
          return str.toUpperCase();
        },
      },
        created(){
          //关闭右侧下注列表
          let that = this;
          setTimeout(() => {
            that.test();
          }, 300);
          //获取最后一期的开奖号码
          this.get_last_code();
          //获取用户可选盘口
          this.get_users_handicaps();
        },

        watch:
        //试试监听函数
        {
          "rangeValue": function (n, o) {
          for (let i = 0; i < this.data.length; i++) {
            this.data[i].odds = Math.floor(this.data[i].odds2 * (1000 - n)) / 1000;
            this.data[i].fs = Math.floor(this.data[i].money * (n)) / 1000;
          }
        },
          /**
           *  监听用户选择的盘口，切换盘口时，获取对应盘口的赔率
           * @param n
           * @param o
           */
          "which_handicap": function (n, o) {
          this.get_odds(n);
          for (let i = 0; i < this.handicaps.length; i++) {
            if (n == this.handicaps[i].ratewin_name) {
              this.fanshui = this.handicaps[i].fs;
            }
          }
        },
        }

    }
</script>

<style scoped>
  @import "../assets/css/pcegg.css";
</style>
