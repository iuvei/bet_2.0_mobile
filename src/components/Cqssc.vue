<template>
    <div id="cqssc">


        <!--头部-->
        <div class="header">
            <div class="mt15">
                <span class="pull-left pre-expect">2018034506</span>
                <span class="balls">1</span>
                <span class="balls">3</span>
                <span class="balls">5</span>
                <span class="balls">8</span>
                <span class="balls">6</span>
                <div class="clear"></div>
            </div>

            <div class="mt10">
                <span>2018034507</span> &nbsp;&nbsp;<span>距离封盘：00:05:06</span>
            </div>
        </div>
        <!--/头部-->


        <!--选项卡-->
        <div class="tabs" style="margin-bottom: 55px;">
            <ul>
                <li v-for="(v,k) in tab1" :class="isActive[k]?'active':''" @click="tabs(k)">{{v}}</li>
            </ul>
        </div>
        <!--/选项卡-->

        <!--下注选择区-->
        <div class="bet-content">

          <!--两面盘-->
            <ul v-show="isShowThisDiv[0]">
              <li v-for="(v,k) in double_handicaps_data" >
                <h2 class="title" >{{v.name}}</h2>
                <span class="bet-details mr2" v-for="(val,key) in v.data"  :class="bet_content['ball_' + (k+1) + '_half'][key]?'active':''"    @click="betOne(k,key)">
                    <b>{{v.name}} {{val}}  <i >1.978</i></b>
                    <i class="ml5 color-white mr2" v-show="bet_content['ball_' + (k+1) + '_half'][key]">￥{{bet_content['ball_' + (k+1) + '_half'][key]}}</i>
                </span>

              </li>
            </ul>

          <!--总和-->
          <ul v-show="isShowThisDiv[1]" >
            <li v-for="(v,k) in total_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--单球1-5-->
          <ul v-show="isShowThisDiv[2]">
            <li v-for="(v,k) in single_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2"  v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--第一球-->
          <ul v-show="isShowThisDiv[3]">
            <li v-for="(v,k) in first_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--第二球-->
          <ul v-show="isShowThisDiv[4]">
            <li v-for="(v,k) in second_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--第三球-->
          <ul v-show="isShowThisDiv[5]">
            <li v-for="(v,k) in third_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--第四球-->
          <ul v-show="isShowThisDiv[6]">
            <li v-for="(v,k) in fourth_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--第五球-->
          <ul v-show="isShowThisDiv[7]" >
            <li v-for="(v,k) in fifth_ball_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--前三-->
          <ul v-show="isShowThisDiv[8]" >
            <li v-for="(v,k) in preThree_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>


          <!--中三-->
          <ul v-show="isShowThisDiv[9]" >
            <li v-for="(v,k) in midThree_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>

          <!--后三-->
          <ul v-show="isShowThisDiv[10]" >
            <li v-for="(v,k) in lastThree_data">
              <h2 class="title" >{{v.name}}</h2>
              <span class="bet-details mr2" v-for="(val,key) in v.data">
                    <b >{{v.name}} {{val}}  <i >1.978</i></b>
                </span>
            </li>
          </ul>



        </div>
        <!--/下注选择区-->

        <!--当前的下注列表-->
        <div class="bet-money" >
                <span class="btn-pull1" @click="test">
                    下注
                </span>
            <div>
                <mt-range v-model="rangeValue" :min="0"
                          :max="140" :step="1" style="width: 100%;">
                    <div slot="start" style="text-indent:10px;">返水:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <div slot="end" style="margin-right: 5px;">14%</div>


                </mt-range>
            </div>



            <div class="bet-list mt15" >


                <p class="color-white text-left" style="margin-bottom: 5px;text-indent: 10px;">下注列表  <span class="pull-right" style="margin-right: 5px;"> 返水{{rangeValue/10}}%</span></p>
                <ul class="text-left nmbd-ul" >
                    <li v-for="(v,k) in data" >
                        <span style="width: 63px;">{{v.content}}</span>
                        <span style="width: 40px;text-align: left;">{{v.odds}}</span>
                        <span class="color-white bet-one-money">￥{{v.money}}</span>
                        <span >返{{v.fs}}</span>
                        <span class="pull-right mr10 color-red" style="margin-right: 25px;">X</span></li>
                </ul>
            </div>





            <div class="btns">
                <!--<a class="clear-all">重置金额</a>-->
                <a class="submit-all">提交</a>
            </div>
        </div>

        <!--下注金额选择-->
        <div class="choose-money"  style='position:fixed;bottom: 56px;left: 0;'>
                <span class="bg-white reset" @click="reset">重置</span>
                <!--<span></span>-->
                <span style="background-position: -32px 0;" :class="bet_money == 5?'selected':''" @click="changeBetMoney(5)"></span>
                <span style="background-position: -61px 0;" :class="bet_money == 10?'selected':''" @click="changeBetMoney(10)"></span>
                <span style="background-position: -91px 0;" :class="bet_money == 50?'selected':''" @click="changeBetMoney(50)"></span>
                <span style="background-position: -121px 0;" :class="bet_money == 100?'selected':''" @click="changeBetMoney(100)"></span>
                <span style="background-position: -151px 0;"  :class="bet_money == 500?'selected':''" @click="changeBetMoney(500)"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cqssc",
        data() {
            return {
                tab1: ['两面盘','总和', '单球1-5','第一球','第二球', '第三球', '第四球', '第五球','前三','中三','后三'],

                isActive: [1, 0, 0, 0, 0, 0, 0],
                isShowThisDiv: [1, 0, 0, 0, 0, 0, 0, 0, 0],
                timeId1:1,
                rangeValue:0,
                outSide:false,
                fs:0,
                //下注的内容，赔率 金额 fs
                data:
                [
                    {content:"第一球单", odds:1.9851,odds2:1.985, money:100,fs:0},
                    {content:"第二球单", odds:1.9951,odds2:1.985, money:200,fs:0},
                    {content:"第三球单", odds:1.9451,odds2:1.985, money:600,fs:0},
                    {content:"第四球单", odds:1.9751,odds2:1.985, money:300,fs:0},
                    {content:"第五球单", odds:1.9650,odds2:1.985, money:900000,fs:0},
                ],
                // 两面盘的数据
                double_handicaps_data:
                [
                  {name:"第一球",data:['大','小','单','双']},
                  {name:"第二球",data:['大','小','单','双']},
                  {name:"第三球",data:['大','小','单','双']},
                  {name:"第四球",data:['大','小','单','双']},
                  {name:"第五球",data:['大','小','单','双']},
                ],
                //单球1-5的数据
                single_ball_data:
                [
                  {name:"第一球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第二球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第三球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第四球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第五球",data:[0,1,2,3,4,5,6,7,8,9]},
                ],
                //第一球的数据
                first_ball_data:
                [
                  {name:"第一球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第一球",data:['大','小','单','双']},
                ],
                //第二球的数据
                second_ball_data:
                [
                  {name:"第二球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第二球",data:['大','小','单','双']},
                ],
                //第三球的数据
                third_ball_data:
                [
                  {name:"第三球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第三球",data:['大','小','单','双']},
                ],
                //第四球的数据
                fourth_ball_data:
                [
                  {name:"第四球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第四球",data:['大','小','单','双']},
                ],
                //第五球的数据
                fifth_ball_data:
                [
                  {name:"第五球",data:[0,1,2,3,4,5,6,7,8,9]},
                  {name:"第五球",data:['大','小','单','双']},
                ],
                //前三的数据
                preThree_data:
                [
                  {name:"前三",data:['豹子','对子','顺子','半顺','杂六']},
                ],
                //中三的数据
                midThree_data:
                [
                  {name:"中三",data:['豹子','对子','顺子','半顺','杂六']},
                ],
                //后三的数据
                lastThree_data:
                [
                  {name:"后三",data:['豹子','对子','顺子','半顺','杂六']},
                ],
                //总和的数据
                total_data:
                [
                  {name:"总和",data:['大','小','单','双','龙','虎','和']},
                ],

                bet_money:10,//下注金额

                //下注内容对应的下注金额
                bet_content:
                {
                  ball_1_half:['','','',''],
                  ball_2_half:['','','',''],
                  ball_3_half:['','','',''],
                  ball_4_half:['','','',''],
                  ball_5_half:['','','',''],
                  dragon_and_tiger:['','','','','','',''],
                  single_ball_1_5:
                  {
                      ball_1_digit:['','','','','','','','','',''],
                      ball_2_digit:['','','','','','','','','',''],
                      ball_3_digit:['','','','','','','','','',''],
                      ball_4_digit:['','','','','','','','','',''],
                      ball_5_digit:['','','','','','','','','',''],
                  },
                  ball_3:
                    {
                      front3:['','','','',''],
                      medium3:['','','','',''],
                      end3:['','','','',''],
                    },
                },
                //这个玩法是否有下注
                hasBetCount:
                {
                  double_handicaps:0,
                  total:0,
                  single_ball:0,
                  first_ball:0,
                  second_ball:0,
                  third_ball:0,
                  fourth_ball:0,
                  fifth_ball:0,
                  preThree:0,
                  midThree:0,
                  lastThree:0,
                },
                //下注内容的合集
                bets:[],


                //下注字典1
                dicrationaries:
                [
                  'ball_1_half__K','ball_1_half__L','ball_1_half__M','ball_1_half__N',
                  'dragon_and_tiger__A','dragon_and_tiger__B','dragon_and_tiger__C','dragon_and_tiger__D','dragon_and_tiger__E','dragon_and_tiger__F','dragon_and_tiger__G',
                  'ball_2_half__K','ball_2_half__L','ball_2_half__M','ball_2_half__N',
                  'ball_3_half__K','ball_3_half__L','ball_3_half__M','ball_3_half__N',
                  'ball_4_half__K','ball_4_half__L','ball_4_half__M','ball_4_half__N',
                  'ball_5_half__K','ball_5_half__L','ball_5_half__M','ball_5_half__N',
                  'ball_1_digit__A','ball_1_digit__B','ball_1_digit__C','ball_1_digit__D','ball_1_digit__E','ball_1_digit__F','ball_1_digit__G','ball_1_digit__H','ball_1_digit__I','ball_1_digit__J',
                  'ball_2_digit__A','ball_2_digit__B','ball_2_digit__C','ball_2_digit__D','ball_2_digit__E','ball_2_digit__F','ball_2_digit__G','ball_2_digit__H','ball_2_digit__I','ball_2_digit__J',
                  'ball_3_digit__A','ball_3_digit__B','ball_3_digit__C','ball_3_digit__D','ball_3_digit__E','ball_3_digit__F','ball_3_digit__G','ball_3_digit__H','ball_3_digit__I','ball_3_digit__J',
                  'ball_4_digit__A','ball_4_digit__B','ball_4_digit__C','ball_4_digit__D','ball_4_digit__E','ball_4_digit__F','ball_4_digit__G','ball_4_digit__H','ball_4_digit__I','ball_4_digit__J',
                  'ball_5_digit__A','ball_5_digit__B','ball_5_digit__C','ball_5_digit__D','ball_5_digit__E','ball_5_digit__F','ball_5_digit__G','ball_5_digit__H','ball_5_digit__I','ball_5_digit__J',
                  'front_3__A','front_3__B','front_3__C','front_3__D','front_3__E',
                  'medium_3__A','medium_3__B','medium_3__C','medium_3__D','medium_3__E',
                  'end_3__A','end_3__B','end_3__C','end_3__D','end_3__E',
                ],
                //下注字典2
                dicrationaries_2:
                [
                  '第一球大','第一球小','第一球单','第一球双',
                  '总和-单','总和-双','总和-大','总和-小','总和-龙','总和-虎','总和-和',
                  '第二球大','第二球小','第二球单','第二球双',
                  '第三球大','第三球小','第三球单','第三球双',
                  '第四球大','第四球小','第四球单','第四球双',
                  '第五球大','第五球小','第五球单','第五球双',
                  '第一球-特码-0','第一球-特码-1','第一球-特码-2','第一球-特码-3','第一球-特码-4','第一球-特码-5','第一球-特码-6','第一球-特码-7','第一球-特码-8','第一球-特码-9',
                  '第二球-特码-0','第二球-特码-1','第二球-特码-2','第二球-特码-3','第二球-特码-4','第二球-特码-5','第二球-特码-6','第二球-特码-7','第二球-特码-8','第二球-特码-9',
                  '第三球-特码-0','第三球-特码-1','第三球-特码-2','第三球-特码-3','第三球-特码-4','第三球-特码-5','第三球-特码-6','第三球-特码-7','第三球-特码-8','第三球-特码-9',
                  '第四球-特码-0','第四球-特码-1','第四球-特码-2','第四球-特码-3','第四球-特码-4','第四球-特码-5','第四球-特码-6','第四球-特码-7','第四球-特码-8','第四球-特码-9',
                  '第五球-特码-0','第五球-特码-1','第五球-特码-2','第五球-特码-3','第五球-特码-4','第五球-特码-5','第五球-特码-6','第五球-特码-7','第五球-特码-8','第五球-特码-9',
                  '前三-豹子','前三-顺子','前三-对子','前三-半顺','前三-杂六',
                  '中三-豹子','中三-顺子','中三-对子','中三-半顺','中三-杂六',
                  '后三-豹子','后三-顺子','后三-对子','后三-半顺','后三-杂六',
                ],
            };
        },
        methods:
                {
                /**
                 * 切换选项卡
                 */
                tabs(index) {
                    this.isActive = [0, 0, 0, 0, 0, 0, 0];
                    this.isShowThisDiv = [0, 0, 0, 0, 0, 0, 0];
                    this.isActive[index] = 1;
                    this.isShowThisDiv[index] = 1;
                },
                test()
                {
                    if(!this.outSide)
                    {
                        let BrowserHeight = document.body.clientWidth;
                        let betContent = document.querySelector('.bet-money');
                        let startLeft = betContent.offsetLeft;
                        let that = this;
                        this.timeId1 = setInterval(function(){

                            if(startLeft < BrowserHeight)
                            {
                                startLeft  += 4;
                                betContent.style.left = startLeft + "px";
                            }
                            else
                            {
                                clearInterval(that.timeId1);
                                that.outSide = !that.outSide;
                            }
                        },3);
                    }
                    else
                    {
                        let BrowserHeight = document.body.clientWidth;
                        let betContent = document.querySelector('.bet-money');
                        let startLeft = betContent.offsetLeft;
                        let that = this;
                        this.timeId1 = setInterval(function(){

                            if(startLeft > 100)
                            {
                                startLeft  -= 4;
                                betContent.style.left = startLeft + "px";
                            }
                            else
                            {
                                clearInterval(that.timeId1);
                                that.outSide = !that.outSide;
                            }

                        },3);
                        this.join_bet_list();
                    }


                },
                //选中一个下注
                betOne:function(k,key)
                {
                  //这个下注内容的下注金额为 当前选中的金额
                  this.bet_content['ball_' + (k + 1) + '_half'][key] = this.bet_money;
                  this.hasBetCount.double_handicaps = 0;
                  //查看这个玩法下了多少个了
                  for(let i=1; i<=5;i++)
                  {
                    for(let j=0;j<this.bet_content['ball_' + i + '_half'].length;j++)
                    {
                      if(this.bet_content['ball_' + i + '_half'][j])
                      {
                        this.hasBetCount.double_handicaps += 1;
                      }
                    }
                  }



                  //更新视图用的方法
                  this.bet_content['ball_' + (k + 1) + '_half'].reverse().reverse();
                  let keys = ['K','L','M','N'];//组织数组
                  this.bets.push({content:'ball_' + (k + 1) + '_half' + '__' + keys[key],money:this.bet_money});//添加到下注内容区

                  //过滤掉相同的数组
                  this.filter_same();

                },


                //加入到下注列表中
                join_bet_list:function()
                {
                  //清空下注内容
                  this.data = [];

                  for(let i = 0; i<this.bets.length;i++)
                  {
                    //赔率
                    let str = '';
                    //下注内容的下标，对应可以找到下注内容的中文，和赔率
                    let index = this.dicrationaries.indexOf(this.bets[i].content);
                    this.data.push({content:this.dicrationaries_2[index], odds:1.9851,odds2:1.985, money:this.bets[i].money,fs:0});

                    //算下注的总金额
                    let sumMoney = 0;
                    sumMoney += parseInt(this.bets[i].money);
                  }
                },


                //过滤掉相同的数组
                filter_same:function ()
                {
                  for(let i = 0; i < this.bets.length;i++)
                  {
                    let key =  this.bets[i].content;
                    var flag = false;
                    for(let j = i+1;j<this.bets.length;j++)
                    {
                      if(key == this.bets[j].content)
                      {
                        this.bets.splice(i,1);
                        flag = true;
                        break;
                      }
                    }
                    if(!this.bets[i].money)
                    {
                      this.bets.splice(i,1);
                      flag = true;
                    }
                    if(flag)
                    {
                      this.filter_same();
                      break;
                    }
                  }

                },


                //改变下注金额
                changeBetMoney:function(money)
                {
                  this.bet_money = money;
                },

                //重置所有数据
                reset()
                {
                  //清空数据
                  this.bets = [];
                  //重置ui
                  this.bet_content =
                    {
                      ball_1_half:['','','',''],
                      ball_2_half:['','','',''],
                      ball_3_half:['','','',''],
                      ball_4_half:['','','',''],
                      ball_5_half:['','','',''],
                      dragon_and_tiger:['','','','','','',''],
                      single_ball_1_5:
                        {
                          ball_1_digit:['','','','','','','','','',''],
                          ball_2_digit:['','','','','','','','','',''],
                          ball_3_digit:['','','','','','','','','',''],
                          ball_4_digit:['','','','','','','','','',''],
                          ball_5_digit:['','','','','','','','','',''],
                        },
                      ball_3:
                        {
                          front3:['','','','',''],
                          medium3:['','','','',''],
                          end3:['','','','',''],
                        },
                    };
                  //更新视图层
                  this.bet_content.ball_1_half.reverse().reverse();
                },
            }
            ,
        created()
        {
           let that = this;
           setTimeout(()=>{
             that.test();
           },300)
        },
        watch:
        {
            "rangeValue":function(n,o)
            {
                for(let i = 0;i<this.data.length;i++)
                {
                    this.data[i].odds = Math.floor(this.data[i].odds2 * (1000-n)) / 1000;
                    this.data[i].fs = Math.floor(this.data[i].money * (n)) / 1000;
                }
            },
        }
    }
</script>



<style scoped>
  @import "../assets/css/cqssc.css";
</style>
