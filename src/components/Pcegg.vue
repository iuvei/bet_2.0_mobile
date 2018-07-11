<template>
    <div id="egg">
      <!--头部-->
      <div class="header">
        <div class="mt15">
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

        <div class="mt10 expect-time">
          <span>{{$store.state.egg.thisExpect}}</span> &nbsp;&nbsp;
          <span>{{$store.state.egg.open_time<60?'准备开盘':'距离封盘'}} ：{{$store.state.egg.hours}}:{{$store.state.egg.minute}}:{{$store.state.egg.seconds}}</span>
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
      <div class="bet-content">
        <!--总和/两面-->
        <ul v-show="isShowThisDiv[0]">
          <h2 class="title">总和/两面</h2>
          <li v-for="(v,k) in odds.mixture">
            <span class="bet-details">
              <b>{{odds.mixture_str[k]}} <i>{{v}}</i></b>
            </span>
          </li>
        </ul>
        <!--波色-->
        <ul v-show="isShowThisDiv[1]">
          <h2 class="title">波色</h2>
          <li v-for="(v,k) in odds.special">
            <span class="bet-details">
              <b>{{odds.color_str[k]}}<i>{{v}}</i></b>
            </span>
          </li>
        </ul>
        <!--总和特码-->
        <ul v-show="isShowThisDiv[2]">
          <h2 class="title">总和特码</h2>
          <li v-for="(v,k) in odds.special">
            <span class="bet-details">
              <b>{{k}}&nbsp;<i>{{v}}</i></b>
            </span>
          </li>
        </ul>
      </div>
      <!--下注金额选择-->
      <div class="choose-money" style='position:fixed;bottom: 56px;left: 0;'>
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
            odds: //赔率
              {
                mixture: [],//两面赔率数组
                mixture_str: ['大', '小', '单', '双', '大单', '大双', '小单', '小双', '极大', '极小', '豹子'],//两面的名称
                color: [],//波色赔率
                color_str: ['红波', '绿波', '蓝波'],//波色名称
                special: [],//总和 特码赔率数组
              },
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
              // console.log(res);
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
              console.log(response);
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
        reset() {
          //清空数据
          this.bets = [];
        },
      },
        created()
        {
          //获取最后一期的开奖号码
          this.get_last_code();
          //获取用户可选盘口
          this.get_users_handicaps();
        },

        watch:
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
