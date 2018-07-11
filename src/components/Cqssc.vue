<template>
  <div id="cqssc">


    <!--头部-->
    <div class="header">
      <div class="mt15">
        <span class="pull-left pre-expect">{{lastExpect}}</span>
        <span class="balls" v-for="v in lastOpenCode">{{v}}</span>
        <div class="clear"></div>
      </div>

      <div class="mt10">
        <span>{{$store.state.cqssc.thisExpect}}</span> &nbsp;&nbsp;
        <span>{{$store.state.cqssc.open_time<60?'准备开盘':'距离封盘'}} ：{{$store.state.cqssc.hours}}:{{$store.state.cqssc.minute}}:{{$store.state.cqssc.seconds}}</span>
      </div>

      <div class="choose-handicaps">
        <select name="handicaps" id="handicaps" v-model="which_handicap">
          <option v-for="(v,k) in handicaps" v-bind:value="v.ratewin_name">
            {{return_upper(v.ratewin_name)}}盘
            <span class="pull-right chongtian" >返水{{return_percent(fanshui)}}</span>
          </option>

        </select>
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
        <li v-for="(v,k) in double_handicaps_data">
          <h2 class="title">{{v.name}}</h2>
          <span class="bet-details mr2"
                v-for="(val,key) in v.data"
                :class="bet_content.double['ball_' + (k + 1) + '_half'][key]?'active':''"
                @click="betOne(k,key)"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds.double_aspect['ball_' + (k + 1) + '_half'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.double['ball_' + (k + 1) + '_half'][key]">
                      ￥{{bet_content.double['ball_' + (k + 1) + '_half'][key]}}
                    </i>
                </span>

        </li>
      </ul>

      <!--总和-->
      <ul v-show="isShowThisDiv[1]">
        <li v-for="(v,k) in total_data">
          <h2 class="title">{{v.name}}</h2>
          <span class="bet-details mr2" v-for="(val,key) in v.data"
                @click="sumBetOne(key)"
                :class="bet_content['dragon_and_tiger'][key]?'active':''"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds['dragon_and_tiger'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content['dragon_and_tiger'][key]"
                    >￥{{bet_content['dragon_and_tiger'][key]}}</i>
                </span>
        </li>
      </ul>

      <!--单球1-5-->
      <ul v-show="isShowThisDiv[2]">
        <li v-for="(v,k) in single_ball_data">
          <h2 class="title">{{v.name}}</h2>
          <span class="bet-details mr2"
                v-for="(val,key) in v.data"
                @click="singleBallBet(k,key)"
                :class="bet_content.single_ball_1_5['ball_' + (k+1) + '_digit'][key]?'active':''"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds.single_ball_1_5['ball_' + (k+1) + '_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.single_ball_1_5['ball_' + (k+1) + '_digit'][key]"
                    >￥{{bet_content.single_ball_1_5['ball_' + (k+1) + '_digit'][key]}}</i>
                </span>
        </li>
      </ul>

      <!--第一球-->
      <ul v-show="isShowThisDiv[3]">
        <li>
          <h2 class="title">{{first_ball_data[0].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in first_ball_data[0].data"
            :class="bet_content.firstToFifthBall['firstBall']['digit'][key]?'active':''"
            @click="firstBallBet(key)"
          >
                    <b>{{first_ball_data[0].name}} {{val}}  <i>{{odds.single_ball_1_5['ball_1_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['firstBall']['digit'][key]"
                    >￥{{bet_content.firstToFifthBall['firstBall']['digit'][key]}}</i>
              </span>
        </li>

        <li>
          <h2 class="title">{{first_ball_data[1].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in first_ball_data[1].data"
            :class="bet_content.firstToFifthBall['firstBall']['half'][key]?'active':''"

            @click="firstBallBet2(key)"
          >
                    <b>{{first_ball_data[1].name}} {{val}}  <i>{{odds.double_aspect['ball_1_half'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['firstBall']['half'][key]">
                      ￥{{bet_content.firstToFifthBall['firstBall']['half'][key]}}
                    </i>

              </span>
        </li>
      </ul>

      <!--第二球-->
      <ul v-show="isShowThisDiv[4]">
        <li>
          <h2 class="title">{{second_ball_data[0].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in second_ball_data[0].data"
            :class="bet_content.firstToFifthBall['secondBall']['digit'][key]?'active':''"
            @click="secondBallBet(key)"
          >
                    <b>{{second_ball_data[0].name}} {{val}}  <i>{{odds.single_ball_1_5['ball_2_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['secondBall']['digit'][key]"
                    >￥{{bet_content.firstToFifthBall['secondBall']['digit'][key]}}</i>
              </span>
        </li>

        <li>
          <h2 class="title">{{second_ball_data[1].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in second_ball_data[1].data"
            :class="bet_content.firstToFifthBall['secondBall']['half'][key]?'active':''"

            @click="secondBallBet2(key)"
          >
                    <b>{{second_ball_data[1].name}} {{val}}  <i>{{odds.double_aspect['ball_2_half'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['secondBall']['half'][key]">
                      ￥{{bet_content.firstToFifthBall['secondBall']['half'][key]}}
                    </i>

              </span>
        </li>
      </ul>

      <!--第三球-->
      <ul v-show="isShowThisDiv[5]">
        <li>
          <h2 class="title">{{third_ball_data[0].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in third_ball_data[0].data"
            :class="bet_content.firstToFifthBall['thirdBall']['digit'][key]?'active':''"
            @click="thirdBallBet(key)"
          >
                    <b>{{third_ball_data[0].name}} {{val}}  <i>{{odds.single_ball_1_5['ball_3_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['thirdBall']['digit'][key]"
                    >￥{{bet_content.firstToFifthBall['thirdBall']['digit'][key]}}</i>
              </span>
        </li>

        <li>
          <h2 class="title">{{third_ball_data[1].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in third_ball_data[1].data"
            :class="bet_content.firstToFifthBall['thirdBall']['half'][key]?'active':''"
            @click="thirdBallBet2(key)"
          >
                    <b>{{third_ball_data[1].name}} {{val}}  <i>{{odds.double_aspect['ball_3_half'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['thirdBall']['half'][key]">
                      ￥{{bet_content.firstToFifthBall['thirdBall']['half'][key]}}
                    </i>
              </span>
        </li>
      </ul>

      <!--第四球-->
      <ul v-show="isShowThisDiv[6]">
        <li>
          <h2 class="title">{{fourth_ball_data[0].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in fourth_ball_data[0].data"
            :class="bet_content.firstToFifthBall['fourthBall']['digit'][key]?'active':''"
            @click="fourthBallBet(key)"
          >
                    <b>{{fourth_ball_data[0].name}} {{val}}  <i>{{odds.single_ball_1_5['ball_4_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['fourthBall']['digit'][key]"
                    >￥{{bet_content.firstToFifthBall['fourthBall']['digit'][key]}}</i>
              </span>
        </li>

        <li>
          <h2 class="title">{{fourth_ball_data[1].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in fourth_ball_data[1].data"
            :class="bet_content.firstToFifthBall['fourthBall']['half'][key]?'active':''"
            @click="fourthBallBet2(key)"
          >
                    <b>{{fourth_ball_data[1].name}} {{val}}  <i>{{odds.double_aspect['ball_4_half'][key]}}
</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['fourthBall']['half'][key]">
                      ￥{{bet_content.firstToFifthBall['fourthBall']['half'][key]}}
                    </i>
              </span>
        </li>
      </ul>

      <!--第五球-->
      <ul v-show="isShowThisDiv[7]">
        <li>
          <h2 class="title">{{fifth_ball_data[0].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in fifth_ball_data[0].data"
            :class="bet_content.firstToFifthBall['fifthBall']['digit'][key]?'active':''"
            @click="fifthBallBet(key)"
          >
                    <b>{{fifth_ball_data[0].name}} {{val}}  <i>{{odds.single_ball_1_5['ball_5_digit'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['fifthBall']['digit'][key]"
                    >￥{{bet_content.firstToFifthBall['fifthBall']['digit'][key]}}</i>
              </span>
        </li>

        <li>
          <h2 class="title">{{fifth_ball_data[1].name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in fifth_ball_data[1].data"
            :class="bet_content.firstToFifthBall['fifthBall']['half'][key]?'active':''"
            @click="fifthBallBet2(key)"
          >
                    <b>{{fifth_ball_data[1].name}} {{val}}  <i>{{odds.double_aspect['ball_5_half'][key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.firstToFifthBall['fifthBall']['half'][key]">
                      ￥{{bet_content.firstToFifthBall['fifthBall']['half'][key]}}
                    </i>
              </span>
        </li>
      </ul>

      <!--前三-->
      <ul v-show="isShowThisDiv[8]">
        <li v-for="(v,k) in preThree_data">
          <h2 class="title">{{v.name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in v.data"
            @click="frontThree(key)"
            :class="bet_content.ball_3['front3'][key]?'active':''"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds.ball_3.front3[key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.ball_3['front3'][key]"
                    >
                       ￥{{bet_content.ball_3['front3'][key]}}
                    </i>
                </span>
        </li>
      </ul>


      <!--中三-->
      <ul v-show="isShowThisDiv[9]">
        <li v-for="(v,k) in midThree_data">
          <h2 class="title">{{v.name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in v.data"
            @click="middleThree(key)"
            :class="bet_content.ball_3['medium3'][key]?'active':''"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds.ball_3.medium3[key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.ball_3['medium3'][key]"
                    >
                       ￥{{bet_content.ball_3['medium3'][key]}}
                    </i>
                </span>
        </li>
      </ul>

      <!--后三-->
      <ul v-show="isShowThisDiv[10]">
        <li v-for="(v,k) in lastThree_data">
          <h2 class="title">{{v.name}}</h2>
          <span
            class="bet-details mr2"
            v-for="(val,key) in v.data"
            @click="lastThree(key)"
            :class="bet_content.ball_3['end3'][key]?'active':''"
          >
                    <b>{{v.name}} {{val}}  <i>{{odds.ball_3.end3[key]}}</i></b>
                    <i class="ml5 color-white mr2"
                       v-show="bet_content.ball_3['end3'][key]"
                    >
                       ￥{{bet_content.ball_3['end3'][key]}}
                    </i>
                </span>
        </li>
      </ul>


    </div>
    <!--/下注选择区-->

    <!--当前的下注列表-->
    <div class="bet-money">
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
              @click="delete_one(v.which,v.money,k)">X</span>

          </li>
        </ul>
      </div>


      <div class="btns">
        <!--<a class="clear-all">重置金额</a>-->
        <a class="submit-all" @click="post_bet_data">提交</a>
      </div>
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
    name: "Cqssc",
    data() {
      return {
        tab1: ['两面盘', '总和', '单球1-5', '第一球', '第二球', '第三球', '第四球', '第五球', '前三', '中三', '后三'],
        isActive: [1, 0, 0, 0, 0, 0, 0],
        isShowThisDiv: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        timeId1: 1,
        lastExpect: 20180808049,
        lastOpenCode: [1, 2, 3, 4, 5],
        rangeValue: 0,
        outSide: false,
        fs: 0,
        //下注的内容，赔率 金额 fs
        data:
          [
            {content: "第一球单", odds: 1.9851, odds2: 1.985, money: 100, fs: 0},
            {content: "第二球单", odds: 1.9951, odds2: 1.985, money: 200, fs: 0},
            {content: "第三球单", odds: 1.9451, odds2: 1.985, money: 600, fs: 0},
            {content: "第四球单", odds: 1.9751, odds2: 1.985, money: 300, fs: 0},
            {content: "第五球单", odds: 1.9650, odds2: 1.985, money: 900000, fs: 0},
          ],
        // 两面盘的数据
        double_handicaps_data:
          [
            {name: "第一球", data: ['大', '小', '单', '双']},
            {name: "第二球", data: ['大', '小', '单', '双']},
            {name: "第三球", data: ['大', '小', '单', '双']},
            {name: "第四球", data: ['大', '小', '单', '双']},
            {name: "第五球", data: ['大', '小', '单', '双']},
          ],
        //单球1-5的数据
        single_ball_data:
          [
            {name: "第一球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第二球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第三球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第四球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第五球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
          ],
        //第一球的数据
        first_ball_data:
          [
            {name: "第一球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第一球", data: ['大', '小', '单', '双']},
          ],
        //第二球的数据
        second_ball_data:
          [
            {name: "第二球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第二球", data: ['大', '小', '单', '双']},
          ],
        //第三球的数据
        third_ball_data:
          [
            {name: "第三球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第三球", data: ['大', '小', '单', '双']},
          ],
        //第四球的数据
        fourth_ball_data:
          [
            {name: "第四球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第四球", data: ['大', '小', '单', '双']},
          ],
        //第五球的数据
        fifth_ball_data:
          [
            {name: "第五球", data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
            {name: "第五球", data: ['大', '小', '单', '双']},
          ],
        //前三的数据
        preThree_data:
          [
            {name: "前三", data: ['豹子', '对子', '顺子', '半顺', '杂六']},
          ],
        //中三的数据
        midThree_data:
          [
            {name: "中三", data: ['豹子', '对子', '顺子', '半顺', '杂六']},
          ],
        //后三的数据
        lastThree_data:
          [
            {name: "后三", data: ['豹子', '对子', '顺子', '半顺', '杂六']},
          ],
        //总和的数据
        total_data:
          [
            {name: "总和", data: ['大', '小', '单', '双', '龙', '虎', '和']},
          ],

        bet_money: 10,//下注金额

        //下注内容对应的下注金额
        bet_content:
          {
            //两面盘
            double:
              {
                ball_1_half: ['', '', '', ''],
                ball_2_half: ['', '', '', ''],
                ball_3_half: ['', '', '', ''],
                ball_4_half: ['', '', '', ''],
                ball_5_half: ['', '', '', ''],
              },
            //总和
            dragon_and_tiger: ['', '', '', '', '', '', ''],
            //单球1-5
            single_ball_1_5:
              {
                ball_1_digit: ['', '', '', '', '', '', '', '', '', ''],
                ball_2_digit: ['', '', '', '', '', '', '', '', '', ''],
                ball_3_digit: ['', '', '', '', '', '', '', '', '', ''],
                ball_4_digit: ['', '', '', '', '', '', '', '', '', ''],
                ball_5_digit: ['', '', '', '', '', '', '', '', '', ''],
              },
            firstToFifthBall:
              {
                firstBall:
                  {
                    half: ['', '', '', ''],
                    digit: ['', '', '', '', '', '', '', '', '', ''],
                  },
                secondBall:
                  {
                    half: ['', '', '', ''],
                    digit: ['', '', '', '', '', '', '', '', '', ''],
                  },
                thirdBall:
                  {
                    half: ['', '', '', ''],
                    digit: ['', '', '', '', '', '', '', '', '', ''],
                  },
                fourthBall:
                  {
                    half: ['', '', '', ''],
                    digit: ['', '', '', '', '', '', '', '', '', ''],
                  },
                fifthBall:
                  {
                    half: ['', '', '', ''],
                    digit: ['', '', '', '', '', '', '', '', '', ''],
                  },
              },


            ball_1_half: ['', '', '', ''],
            ball_2_half: ['', '', '', ''],
            ball_3_half: ['', '', '', ''],
            ball_4_half: ['', '', '', ''],
            ball_5_half: ['', '', '', ''],


            ball_3:
              {
                front3: ['', '', '', '', ''],
                medium3: ['', '', '', '', ''],
                end3: ['', '', '', '', ''],
              },

          },
        //这个玩法是否有下注
        hasBetCount:
          {
            double_handicaps: 0,
            total: 0,
            single_ball: 0,
            first_ball: 0,
            second_ball: 0,
            third_ball: 0,
            fourth_ball: 0,
            fifth_ball: 0,
            preThree: 0,
            midThree: 0,
            lastThree: 0,
          },
        //下注内容的合集
        bets: [],


        //下注字典1
        dicrationaries:
          [
            'ball_1_half__K', 'ball_1_half__L', 'ball_1_half__M', 'ball_1_half__N',
            'dragon_and_tiger__A', 'dragon_and_tiger__B', 'dragon_and_tiger__C', 'dragon_and_tiger__D', 'dragon_and_tiger__E', 'dragon_and_tiger__F', 'dragon_and_tiger__G',
            'ball_2_half__K', 'ball_2_half__L', 'ball_2_half__M', 'ball_2_half__N',
            'ball_3_half__K', 'ball_3_half__L', 'ball_3_half__M', 'ball_3_half__N',
            'ball_4_half__K', 'ball_4_half__L', 'ball_4_half__M', 'ball_4_half__N',
            'ball_5_half__K', 'ball_5_half__L', 'ball_5_half__M', 'ball_5_half__N',
            'ball_1_digit__A', 'ball_1_digit__B', 'ball_1_digit__C', 'ball_1_digit__D', 'ball_1_digit__E', 'ball_1_digit__F', 'ball_1_digit__G', 'ball_1_digit__H', 'ball_1_digit__I', 'ball_1_digit__J',
            'ball_2_digit__A', 'ball_2_digit__B', 'ball_2_digit__C', 'ball_2_digit__D', 'ball_2_digit__E', 'ball_2_digit__F', 'ball_2_digit__G', 'ball_2_digit__H', 'ball_2_digit__I', 'ball_2_digit__J',
            'ball_3_digit__A', 'ball_3_digit__B', 'ball_3_digit__C', 'ball_3_digit__D', 'ball_3_digit__E', 'ball_3_digit__F', 'ball_3_digit__G', 'ball_3_digit__H', 'ball_3_digit__I', 'ball_3_digit__J',
            'ball_4_digit__A', 'ball_4_digit__B', 'ball_4_digit__C', 'ball_4_digit__D', 'ball_4_digit__E', 'ball_4_digit__F', 'ball_4_digit__G', 'ball_4_digit__H', 'ball_4_digit__I', 'ball_4_digit__J',
            'ball_5_digit__A', 'ball_5_digit__B', 'ball_5_digit__C', 'ball_5_digit__D', 'ball_5_digit__E', 'ball_5_digit__F', 'ball_5_digit__G', 'ball_5_digit__H', 'ball_5_digit__I', 'ball_5_digit__J',
            'front_3__A', 'front_3__B', 'front_3__C', 'front_3__D', 'front_3__E',
            'medium_3__A', 'medium_3__B', 'medium_3__C', 'medium_3__D', 'medium_3__E',
            'end_3__A', 'end_3__B', 'end_3__C', 'end_3__D', 'end_3__E',
          ],
        //下注字典2
        dicrationaries_2:
          [
            '第一球大', '第一球小', '第一球单', '第一球双',
            '总和-大', '总和-小', '总和-单', '总和-双', '总和-龙', '总和-虎', '总和-和',
            '第二球大', '第二球小', '第二球单', '第二球双',
            '第三球大', '第三球小', '第三球单', '第三球双',
            '第四球大', '第四球小', '第四球单', '第四球双',
            '第五球大', '第五球小', '第五球单', '第五球双',
            '第一球-特码-0', '第一球-特码-1', '第一球-特码-2', '第一球-特码-3', '第一球-特码-4', '第一球-特码-5', '第一球-特码-6', '第一球-特码-7', '第一球-特码-8', '第一球-特码-9',
            '第二球-特码-0', '第二球-特码-1', '第二球-特码-2', '第二球-特码-3', '第二球-特码-4', '第二球-特码-5', '第二球-特码-6', '第二球-特码-7', '第二球-特码-8', '第二球-特码-9',
            '第三球-特码-0', '第三球-特码-1', '第三球-特码-2', '第三球-特码-3', '第三球-特码-4', '第三球-特码-5', '第三球-特码-6', '第三球-特码-7', '第三球-特码-8', '第三球-特码-9',
            '第四球-特码-0', '第四球-特码-1', '第四球-特码-2', '第四球-特码-3', '第四球-特码-4', '第四球-特码-5', '第四球-特码-6', '第四球-特码-7', '第四球-特码-8', '第四球-特码-9',
            '第五球-特码-0', '第五球-特码-1', '第五球-特码-2', '第五球-特码-3', '第五球-特码-4', '第五球-特码-5', '第五球-特码-6', '第五球-特码-7', '第五球-特码-8', '第五球-特码-9',
            '前三-豹子', '前三-对子', '前三-顺子', '前三-半顺', '前三-杂六',
            '中三-豹子', '中三-对子', '中三-顺子', '中三-半顺', '中三-杂六',
            '后三-豹子', '后三-对子', '后三-顺子', '后三-半顺', '后三-杂六',
          ],


        which_handicap: '',//当前是哪个盘口

        //查看用户可选的盘口
        handicaps: [],
        //用户返水
        fanshui: 0,


        //备用数据  用于两面盘的
        back_data:[],


        //跌倍
        dec_limit:
          {
            //7里面找
            ball_1_digit: {},
            ball_2_digit: {},
            ball_3_digit: {},
            ball_4_digit: {},
            ball_5_digit: {},
            //6页面找
            ball_1_half: {},
            ball_2_half: {},
            ball_3_half: {},
            ball_4_half: {},
            ball_5_half: {},
            dragon_and_tiger: {},
            //1页面找
            front_3: {},
            medium_3: {},
            end_3: {},
          },


        //赔率的集合
        odds:
          {
            double_aspect:
              {
                ball_1_half: [1.9430, 1.9430, 1.9430, 1.9430],
                ball_2_half: [1.9430, 1.9430, 1.9430, 1.9430],
                ball_3_half: [1.9430, 1.9430, 1.9430, 1.9430],
                ball_4_half: [1.9430, 1.9430, 1.9430, 1.9430],
                ball_5_half: [1.9430, 1.9430, 1.9430, 1.9430],
              },
            ball_5_half_str: ["大", "小", "单", "双"],
            dragon_and_tiger: [1.9000, 1.9000, 1.9000, 1.9000, 1.9000, 1.9000, 1.9000],
            dragon_and_tiger_str: ["总和大", "总和小", "总和单", "总和双", "龙", "虎", "和"],
            single_ball_1_5:
              {
                ball_1_digit: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ball_2_digit: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ball_3_digit: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ball_4_digit: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                ball_5_digit: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              },
            single_ball_1_5_str: ['第一球', '第二球', '第三球', '第四球', '第五球'],
            ball_3:
              {
                front3: [1, 2, 3, 4, 5],
                medium3: [1, 2, 3, 4, 5],
                end3: [1, 2, 3, 4, 5],
              },
            ball_3_str: ['豹子', '对子', '顺子', '半顺', '杂六']
          },

        //纯赔率列表
        all_odds: [],

        //所有的下注数据
        all_data:[],





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
        test() {
          if (!this.outSide) {
            let BrowserHeight = document.body.clientWidth;
            let betContent = document.querySelector('.bet-money');
            let startLeft = betContent.offsetLeft;
            let that = this;
            this.timeId1 = setInterval(function () {

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
          else {
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
            this.join_bet_list();
          }


        },
        //两面盘选中一个下注
        betOne: function (k, key) {
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.double['ball_' + (k + 1) + '_half'][key] =
            this.bet_content.double['ball_' + (k + 1) + '_half'][key] ?
              this.bet_content.double['ball_' + (k + 1) + '_half'][key] + this.bet_money :
              this.bet_money;

          this.hasBetCount.double_handicaps = 0;
          //查看这个玩法下了多少个了
          for (let i = 1; i <= 5; i++) {
            for (let j = 0; j < this.bet_content.double['ball_' + i + '_half'].length; j++) {
              if (this.bet_content.double['ball_' + i + '_half'][j]) {
                this.hasBetCount.double_handicaps += 1;
              }
            }
          }


          //更新视图用的方法
          this.bet_content['ball_' + (k + 1) + '_half'].reverse().reverse();
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          this.bets.push(
            {
              content: 'ball_' + (k + 1) + '_half' + '__' + keys[key],
              money: this.bet_content.double['ball_' + (k + 1) + '_half'][key]
            });//添加到下注内容区

          //过滤掉相同的数组
          this.filter_same();

        },




        //总和选中一个下注
        sumBetOne: function (k) {
          let keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];//组织数组
          let key = 'dragon_and_tiger';//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content['dragon_and_tiger'][k] =
            this.bet_content['dragon_and_tiger'][k] ?
              this.bet_content['dragon_and_tiger'][k] + this.bet_money :
              this.bet_money;
          this.hasBetCount.total = 0;
          //查看这个玩法下了多少个了

          for (let j = 0; j < this.bet_content['dragon_and_tiger'].length; j++) {
            if (this.bet_content['dragon_and_tiger'][j]) {
              this.hasBetCount.total += 1;
            }
          }

          //更新视图用的方法
          this.bet_content['dragon_and_tiger'].reverse().reverse();

          this.bets.push({content: 'dragon_and_tiger__' + keys[k], money: this.bet_content['dragon_and_tiger'][k]});//添加到下注内容区

          //过滤掉相同的数组
          this.filter_same();
        },


        //单球1-5的下注
        singleBallBet: function (index, k) {

          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          let keys = ['ball_1_digit', 'ball_2_digit', 'ball_3_digit', 'ball_4_digit', 'ball_5_digit'];

          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.single_ball_1_5[keys[index]][k] =
            this.bet_content.single_ball_1_5[keys[index]][k] ?
              this.bet_content.single_ball_1_5[keys[index]][k] + this.bet_money :
              this.bet_money;
          this.hasBetCount.single_ball = 0;
          //查看这个玩法下了多少个了
          for (let i = 0; i < 5; i++) {

            for (let j = 0; j < this.bet_content['single_ball_1_5'][keys[index]].length; j++) {
              if (this.bet_content['single_ball_1_5']['ball_' + (i + 1) + '_digit'][j]) {
                this.hasBetCount.single_ball += 1;
              }
            }
          }

          //更新视图用的方法
          this.bet_content['single_ball_1_5'][keys[index]].reverse().reverse();

          this.bets.push({
            content: keys[index] + '__' + Alphabet[k],
            money: this.bet_content.single_ball_1_5[keys[index]][k]
          });//添加到下注内容区
          //过滤掉相同的数组
          this.filter_same();
        },


        //第一球的下注内容
        firstBallBet: function (k)
        {
          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.firstBall.digit[k] =
            this.bet_content.firstToFifthBall.firstBall.digit[k] ?
              this.bet_content.firstToFifthBall.firstBall.digit[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.firstBall.digit.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
             if(this.back_data[i].content == 'ball_1_digit' + '__' + Alphabet[k])
             {
               num = i;
               f   = true;
               break;
             }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.firstBall.digit[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_1_digit' + '__' + Alphabet[k],
              money: this.bet_content.firstToFifthBall.firstBall.digit[k]
            });//添加到下注内容区

          }
          this.hasBetCount.first_ball = this.back_data.length;
          //过滤掉相同的数组
          this.filter_same();
        },

        firstBallBet2: function (k)
        {
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.firstBall.half[k] =
            this.bet_content.firstToFifthBall.firstBall.half[k] ?
              this.bet_content.firstToFifthBall.firstBall.half[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.firstBall.half.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_1_half' + '__' + keys[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.firstBall.half[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_1_half' + '__' + keys[k],
              money: this.bet_content.firstToFifthBall.firstBall.half[k]
            });//添加到下注内容区
          }
          this.hasBetCount.first_ball = this.back_data.length;
          this.filter_same();
        },

        //第2球的下注内容
        secondBallBet: function (k)
        {
          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.secondBall.digit[k] =
            this.bet_content.firstToFifthBall.secondBall.digit[k] ?
              this.bet_content.firstToFifthBall.secondBall.digit[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.secondBall.digit.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_2_digit' + '__' + Alphabet[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.secondBall.digit[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_2_digit' + '__' + Alphabet[k],
              money: this.bet_content.firstToFifthBall.secondBall.digit[k]
            });//添加到下注内容区

          }
          this.hasBetCount.first_ball = this.back_data.length;
          //过滤掉相同的数组
          this.filter_same();
        },

        secondBallBet2: function (k)
        {
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.secondBall.half[k] =
            this.bet_content.firstToFifthBall.secondBall.half[k] ?
              this.bet_content.firstToFifthBall.secondBall.half[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.secondBall.half.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_2_half' + '__' + keys[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.secondBall.half[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_2_half' + '__' + keys[k],
              money: this.bet_content.firstToFifthBall.secondBall.half[k]
            });//添加到下注内容区
          }

          this.filter_same();
        },

        //第3球的下注内容
        thirdBallBet: function (k)
        {
          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.thirdBall.digit[k] =
            this.bet_content.firstToFifthBall.thirdBall.digit[k] ?
              this.bet_content.firstToFifthBall.thirdBall.digit[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.thirdBall.digit.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_3_digit' + '__' + Alphabet[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.thirdBall.digit[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_3_digit' + '__' + Alphabet[k],
              money: this.bet_content.firstToFifthBall.thirdBall.digit[k]
            });//添加到下注内容区

          }
          //过滤掉相同的数组
          this.filter_same();
        },

        thirdBallBet2: function (k)
        {
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.thirdBall.half[k] =
            this.bet_content.firstToFifthBall.thirdBall.half[k] ?
              this.bet_content.firstToFifthBall.thirdBall.half[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.thirdBall.half.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_3_half' + '__' + keys[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.thirdBall.half[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_3_half' + '__' + keys[k],
              money: this.bet_content.firstToFifthBall.thirdBall.half[k]
            });//添加到下注内容区
          }
          this.filter_same();
        },

        //第4球的下注内容
        fourthBallBet: function (k)
        {
          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.fourthBall.digit[k] =
            this.bet_content.firstToFifthBall.fourthBall.digit[k] ?
              this.bet_content.firstToFifthBall.fourthBall.digit[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.fourthBall.digit.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_4_digit' + '__' + Alphabet[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.fourthBall.digit[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_4_digit' + '__' + Alphabet[k],
              money: this.bet_content.firstToFifthBall.fourthBall.digit[k]
            });//添加到下注内容区

          }
          //过滤掉相同的数组
          this.filter_same();
        },

        fourthBallBet2: function (k)
        {
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.fourthBall.half[k] =
            this.bet_content.firstToFifthBall.fourthBall.half[k] ?
              this.bet_content.firstToFifthBall.fourthBall.half[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.fourthBall.half.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_4_half' + '__' + keys[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.fourthBall.half[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_4_half' + '__' + keys[k],
              money: this.bet_content.firstToFifthBall.fourthBall.half[k]
            });//添加到下注内容区
          }
          this.filter_same();
        },


        //第3球的下注内容
        fifthBallBet: function (k)
        {
          let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//组织数组  ball_1_digit
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.fifthBall.digit[k] =
            this.bet_content.firstToFifthBall.fifthBall.digit[k] ?
              this.bet_content.firstToFifthBall.fifthBall.digit[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.fifthBall.digit.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_5_digit' + '__' + Alphabet[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.fifthBall.digit[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_5_digit' + '__' + Alphabet[k],
              money: this.bet_content.firstToFifthBall.fifthBall.digit[k]
            });//添加到下注内容区

          }
          //过滤掉相同的数组
          this.filter_same();
        },

        fifthBallBet2: function (k)
        {
          let keys = ['K', 'L', 'M', 'N'];//组织数组
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.firstToFifthBall.fifthBall.half[k] =
            this.bet_content.firstToFifthBall.fifthBall.half[k] ?
              this.bet_content.firstToFifthBall.fifthBall.half[k] + this.bet_money :
              this.bet_money;
          //更新视图用的方法
          this.bet_content.firstToFifthBall.fifthBall.half.reverse().reverse();
          let num = 0;
          let f   = false;
          for(let i=0;i<this.back_data.length;i++)
          {
            if(this.back_data[i].content == 'ball_5_half' + '__' + keys[k])
            {
              num = i;
              f   = true;
              break;
            }
          }
          if(f)
          {
            //更新金钱
            this.back_data[num].money = this.bet_content.firstToFifthBall.fifthBall.half[k];
          }
          else
          {
            //更新金钱加入到下注列表
            this.back_data.push({
              content: 'ball_5_half' + '__' + keys[k],
              money: this.bet_content.firstToFifthBall.fifthBall.half[k]
            });//添加到下注内容区
          }
          this.filter_same();
        },





        /**
         * 获取用户的盘口
         */
        get_odds: function (which_handicap = null) {
          //获取两面盘的赔率
          if (which_handicap || this.which_handicap) {
            this.$http.get(`${this.api}/ssc/odds/6?pan=${which_handicap ? which_handicap : this.which_handicap}`).then(function (response) {
              if (response.data.status == 200) {
                let data = response.data.data;
                let odds = data.odds;
                // console.log(odds);
                //获取趺背数据
                this.dec_limit.ball_1_half = odds.ball_1_half.dec_odds;
                this.dec_limit.ball_2_half = odds.ball_2_half.dec_odds;
                this.dec_limit.ball_3_half = odds.ball_3_half.dec_odds;
                this.dec_limit.ball_4_half = odds.ball_4_half.dec_odds;
                this.dec_limit.ball_5_half = odds.ball_5_half.dec_odds;
                this.dec_limit.dragon_and_tiger = odds.dragon_and_tiger.dec_odds;
                let bet_area = Object.keys(odds);//["ball_1_half", "ball_2_half", "ball_3_half", "ball_4_half", "ball_5_half", "dragon_and_tiger"]
                let Alphabet = ['K', 'L', 'M', 'N'];
                for (let i = 0; i < this.odds.double_aspect.ball_1_half.length; i++) {
                  this.odds.double_aspect.ball_1_half[i] = data.odds.ball_1_half[Alphabet[i]];
                  this.odds.double_aspect.ball_2_half[i] = data.odds.ball_2_half[Alphabet[i]];
                  this.odds.double_aspect.ball_3_half[i] = data.odds.ball_3_half[Alphabet[i]];
                  this.odds.double_aspect.ball_4_half[i] = data.odds.ball_4_half[Alphabet[i]];
                  this.odds.double_aspect.ball_5_half[i] = data.odds.ball_5_half[Alphabet[i]];
                  //全部赔率
                  this.all_odds[i] = data.odds.ball_1_half[Alphabet[i]];
                  this.all_odds[(i + 11)] = data.odds.ball_2_half[Alphabet[i]];
                  this.all_odds[(i + 15)] = data.odds.ball_3_half[Alphabet[i]];
                  this.all_odds[(i + 19)] = data.odds.ball_4_half[Alphabet[i]];
                  this.all_odds[(i + 23)] = data.odds.ball_5_half[Alphabet[i]];

                }
                //由于直接给vue的data赋值，不会触发视图层更新，所以使用reverser来更新视图层
                this.odds.double_aspect.ball_1_half.reverse().reverse();
                Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
                for (let i = 0; i < this.odds.dragon_and_tiger.length; i++) {
                  this.odds.dragon_and_tiger[i] = data.odds.dragon_and_tiger[Alphabet[i]];
                  this.all_odds[(i + 4)] = data.odds.dragon_and_tiger[Alphabet[i]];
                }
              }

            });

            //获取单球1-5的赔率
            this.$http.get(`${this.api}/ssc/odds/7?pan=${which_handicap ? which_handicap : this.which_handicap}`).then(function (response) {
              if (response.data.status == 200) {
                let data = response.data.data.odds;
                //获取趺背数据
                this.dec_limit.ball_1_digit = data.ball_1_digit.dec_odds;
                this.dec_limit.ball_2_digit = data.ball_2_digit.dec_odds;
                this.dec_limit.ball_3_digit = data.ball_3_digit.dec_odds;
                this.dec_limit.ball_4_digit = data.ball_4_digit.dec_odds;
                this.dec_limit.ball_5_digit = data.ball_5_digit.dec_odds;
                let Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
                for (let i = 0; i < Alphabet.length; i++) {
                  this.odds.single_ball_1_5.ball_1_digit[i] = data.ball_1_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_2_digit[i] = data.ball_2_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_3_digit[i] = data.ball_3_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_4_digit[i] = data.ball_4_digit[Alphabet[i]];
                  this.odds.single_ball_1_5.ball_5_digit[i] = data.ball_5_digit[Alphabet[i]];
                  this.all_odds[(i + 27)] = data.ball_1_digit[Alphabet[i]];
                  this.all_odds[(i + 37)] = data.ball_2_digit[Alphabet[i]];
                  this.all_odds[(i + 47)] = data.ball_3_digit[Alphabet[i]];
                  this.all_odds[(i + 57)] = data.ball_4_digit[Alphabet[i]];
                  this.all_odds[(i + 67)] = data.ball_5_digit[Alphabet[i]];
                }
                this.odds.single_ball_1_5.ball_1_digit.reverse().reverse();
              }
            });

            //获取第一球的赔率
            this.$http.get(`${this.api}/ssc/odds/1?pan=${which_handicap ? which_handicap : this.which_handicap}`).then(function (response) {
              if (response.data.status == 200) {
                this.dec_limit.end_3 = response.data.data.odds.end_3.dec_odds;
                this.dec_limit.front_3 = response.data.data.odds.front_3.dec_odds;
                this.dec_limit.medium_3 = response.data.data.odds.medium_3.dec_odds;
                let Alphabet = ['A', 'B', 'C', 'D', 'E'];
                for (let i = 0; i < this.odds.ball_3.front3.length; i++) {
                  this.odds.ball_3.front3[i] = response.data.data.odds.front_3[Alphabet[i]];
                  this.odds.ball_3.medium3[i] = response.data.data.odds.medium_3[Alphabet[i]];
                  this.odds.ball_3.end3[i] = response.data.data.odds.end_3[Alphabet[i]];
                  this.all_odds[(i + 77)] = response.data.data.odds.front_3[Alphabet[i]];
                  this.all_odds[(i + 82)] = response.data.data.odds.medium_3[Alphabet[i]];
                  this.all_odds[(i + 87)] = response.data.data.odds.end_3[Alphabet[i]];
                }
              }

            });
          }
        },
        /**
         * 查看用户可选盘口
         */
        get_users_handicaps: function () {
          this.$http.get(`${this.api}/ssc/pans`)
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


        //前三的下注
        frontThree: function (k) {

          let keys = ['A', 'B', 'C', 'D', 'E'];
          this.hasBetCount.preThree = 0;
          //这个下注内容的下注金额为 当前选中的金额
          this.bet_content.ball_3['front3'][k] =
            this.bet_content.ball_3['front3'][k] ?
              this.bet_content.ball_3['front3'][k] + this.bet_money :
              this.bet_money;
          for (let i = 0; i < this.bet_content.ball_3.front3.length; i++) {
            if (this.bet_content.ball_3.front3[i]) {
              this.hasBetCount.preThree += 1;
            }
          }

          //更新视图用的方法
          this.bet_content.ball_3['front3'].reverse().reverse();

          this.bets.push({content: 'front_3' + '__' + keys[k], money: this.bet_content.ball_3['front3'][k]});//添加到下注内容区
          //过滤掉相同的数组
          this.filter_same();
        },

        middleThree: function (k) {

          let keys = ['A', 'B', 'C', 'D', 'E'];

          //这个下注内容的下注金额为 当前选中的金额
          this.hasBetCount.midThree = 0;
          this.bet_content.ball_3['medium3'][k] =
            this.bet_content.ball_3['medium3'][k] ?
              this.bet_content.ball_3['medium3'][k] + this.bet_money :
              this.bet_money;

          for (let i = 0; i < this.bet_content.ball_3.medium3.length; i++) {
            if (this.bet_content.ball_3.medium3[i]) {
              this.hasBetCount.midThree += 1;
            }
          }
          //更新视图用的方法
          this.bet_content.ball_3['medium3'].reverse().reverse();

          this.bets.push({content: 'medium_3' + '__' + keys[k], money: this.bet_content.ball_3['medium3'][k]});//添加到下注内容区
          //过滤掉相同的数组
          this.filter_same();
        },

        lastThree: function (k) {

          let keys = ['A', 'B', 'C', 'D', 'E'];

          //这个下注内容的下注金额为 当前选中的金额

          this.hasBetCount.lastThree = 0;
          this.bet_content.ball_3['end3'][k] =
            this.bet_content.ball_3['end3'][k] ?
              this.bet_content.ball_3['end3'][k] + this.bet_money :
              this.bet_money;

          for (let i = 0; i < this.bet_content.ball_3.end3.length; i++) {
            if (this.bet_content.ball_3.end3[i]) {
              this.hasBetCount.lastThree += 1;
            }
          }

          //更新视图用的方法
          this.bet_content.ball_3['end3'].reverse().reverse();

          this.bets.push({content: 'end_3' + '__' + keys[k], money: this.bet_content.ball_3['end3'][k]});//添加到下注内容区
          //过滤掉相同的数组
          this.filter_same();
        },


        //加入到下注列表中
        join_bet_list: function ()
        {
          //清空下注内容
          this.data = [];
          this.all_data = this.bets.concat(this.back_data);
          for (let i = 0; i < this.all_data.length; i++)
          {
            //赔率
            let str = '';
            //下注内容的下标，对应可以找到下注内容的中文，和赔率
            //赔率
            var index = this.dicrationaries.indexOf(this.all_data[i].content);
            //是否趺倍，子盘才有的趺倍
            if(this.$store.state.son_off)
            {
              if(this.is_dec(this.all_data[i].content,this.all_data[i].money))
              {
                let odds = (Number(this.all_odds[index]) - Number(this.is_dec(this.all_data[i].content,this.all_data[i].money))).toFixed(4);
                str += `${odds}`;
              }
              else
              {
                str += `${this.all_odds[index]}`;
              }
            }
            else
            {
              str += `${this.all_odds[index]}`;
            }
            this.data.push({
              content: this.dicrationaries_2[index],
              odds: str,
              odds2: 1.985,
              money: this.all_data[i].money,
              fs: 0,
              which:this.all_data[i].content,
            });

            //算下注的总金额
            let sumMoney = 0;
            sumMoney += parseInt(this.all_data[i].money);
          }
        },


        //从下注列表中删除一个下注内容
        delete_one(content,money,data_index)
        {

          let index = null;
          for(let i = 0; i < this.all_data.length;i++)
          {
            if(content == this.all_data[i].content && money == this.all_data[i].money)
            {
                index = i;
                break;
            }
          }
          this.all_data.splice(index,1);
          this.data.splice(data_index,1);
          return 0;

        },

        //过滤掉相同的数组
        filter_same: function () {
          for (let i = 0; i < this.bets.length; i++) {
            let key = this.bets[i].content;
            var flag = false;
            for (let j = i + 1; j < this.bets.length; j++) {
              if (key == this.bets[j].content) {
                this.bets.splice(i, 1);
                flag = true;
                break;
              }
            }
            if (!this.bets[i].money) {
              this.bets.splice(i, 1);
              flag = true;
            }
            if (flag) {
              this.filter_same();
              break;
            }
          }

        },


        //改变下注金额
        changeBetMoney: function (money) {
          this.bet_money = money;
        },

        //重置所有数据
        reset() {
          //清空数据
          this.bets = [];
          //重置ui
          this.bet_content =
            {
              //两面盘
              double:
                {
                  ball_1_half: ['', '', '', ''],
                  ball_2_half: ['', '', '', ''],
                  ball_3_half: ['', '', '', ''],
                  ball_4_half: ['', '', '', ''],
                  ball_5_half: ['', '', '', ''],
                },
              //总和
              dragon_and_tiger: ['', '', '', '', '', '', ''],
              //单球1-5
              single_ball_1_5:
                {
                  ball_1_digit: ['', '', '', '', '', '', '', '', '', ''],
                  ball_2_digit: ['', '', '', '', '', '', '', '', '', ''],
                  ball_3_digit: ['', '', '', '', '', '', '', '', '', ''],
                  ball_4_digit: ['', '', '', '', '', '', '', '', '', ''],
                  ball_5_digit: ['', '', '', '', '', '', '', '', '', ''],
                },
              firstToFifthBall:
                {
                  firstBall:
                    {
                      half: ['', '', '', ''],
                      digit: ['', '', '', '', '', '', '', '', '', ''],
                    },
                  secondBall:
                    {
                      half: ['', '', '', ''],
                      digit: ['', '', '', '', '', '', '', '', '', ''],
                    },
                  thirdBall:
                    {
                      half: ['', '', '', ''],
                      digit: ['', '', '', '', '', '', '', '', '', ''],
                    },
                  fourthBall:
                    {
                      half: ['', '', '', ''],
                      digit: ['', '', '', '', '', '', '', '', '', ''],
                    },
                  fifthBall:
                    {
                      half: ['', '', '', ''],
                      digit: ['', '', '', '', '', '', '', '', '', ''],
                    },
                },


              ball_1_half: ['', '', '', ''],
              ball_2_half: ['', '', '', ''],
              ball_3_half: ['', '', '', ''],
              ball_4_half: ['', '', '', ''],
              ball_5_half: ['', '', '', ''],


              ball_3:
                {
                  front3: ['', '', '', '', ''],
                  medium3: ['', '', '', '', ''],
                  end3: ['', '', '', '', ''],
                },

            },
            //更新视图层
            this.bet_content.ball_1_half.reverse().reverse();

          this.all_data = [];
          this.data = [];
        },
        //获取最后一期的开奖号码
        get_last_code: function ()
        {
            this.$http.get(this.api + '/ssc/lastLty', {}).then(function (res) {
            //获取到最新一期的数据
            let data = res.data;
            this.lastOpenCode = data.opencode;
            this.lastExpect = `${data.expect}`;
          });
        },


        //向服务器提交下注内容
        post_bet_data()
        {
          if(this.all_data.length <1)
          {
            this.$toast({message: '请选择下注内容'});
            return false;
          }
          this.$http.post(`${this.api}/ssc/order`, {bets: this.all_data, odds_table: this.which_handicap}).then(function (res)
          {
            if (res.data.status == 200)
            {
              //清除下注内容
              this.reset();
              //从服务器上获取余额
              this.$http.get(this.api + "/user/" + window.sessionStorage.user_id).then(function (response) {
                let data = response.data.data.user;
                this.$set(this.$store.state, 'cash_money', data.money.cash_money)
              });

              //提示下注成功
              this.$toast({message: res.data.msg});
              this.data = [];
            }
            else {
              this.$toast({message: res.data.msg});
            }

          });
        },





        return_percent:function(str)
        {
          return str;
        },
        return_upper:function(str)
        {
          return str.toUpperCase();
        },


      },//methods end

    created() {
      this.$http.get(this.api + "/user/" + window.sessionStorage.user_id).then(function (response) {
        let data = response.data.data.user;
        this.vaild_lotteries = data.valid_types;//用户拥有哪些彩种
        if (this.vaild_lotteries.indexOf('cqssc') != -1) {
          // 1 获取重庆时时彩的时间和期数
          //this.get_time();
          // 2 获取最新的开奖号码
          this.get_last_code();
          // 3 获取用户拥有哪些盘口
          this.get_users_handicaps();
          // 4 获取用户的赔率
          //this.get_odds();
          // 5 获取开奖历史
          //this.get_history();
          // 6 获取未结算清单
          //.get_ssc_unclear();
          // 7.获取长龙出数据
          //this.get_londDragon_data();
        }
        else {
          this.$toast({message: '请先登录！',});
          //this.$router.push('usercenter');
        }

      });


      //为右边的下注列表的特效
      let that = this;
      setTimeout(() => {
        that.test();
      }, 300);
    },// end created();
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
  @import "../assets/css/cqssc.css";
</style>
