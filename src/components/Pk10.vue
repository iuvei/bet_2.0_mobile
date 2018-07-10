<template>
   <div id="pk10">
     <!--头部-->
     <div class="header">
       <div class="mt15">
         <span class="pull-left pre-expect">{{lastExpect}}</span>
         <span class="balls" v-for="v in lastOpenCode" :class="'hao' + (v/10*10)" >{{v/10*10}}</span>

         <div class="clear"></div>
       </div>

       <div class="mt10 expect-time">
         <span>{{$store.state.pk10.thisExpect}}</span> &nbsp;&nbsp;
         <span>{{$store.state.pk10.open_time<60?'准备开盘':'距离封盘'}} ：{{$store.state.pk10.hours}}:{{$store.state.pk10.minute}}:{{$store.state.pk10.seconds}}</span>
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

     <div class="bet-content">
       <!--两面盘-->
       <ul v-show="isShowThisDiv[0]">
         <li v-for="(v,k) in double_handicaps_data">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b v-if="key < 6">{{v.name}} {{val}}  <i>{{odds.double_aspect['ball_' + (k+1) + '_half'][keys1[key]]}}</i></b>
                    <b v-else >{{v.name}} {{val}}  <i>{{odds.double_aspect['ball_' + (k+1) + '_half'][keys2[key]]}}</i></b>

            </span>

         </li>
       </ul>


       <!--数字盘-->
       <ul v-show="isShowThisDiv[1]">
         <li v-for="(v,k) in single_ball_data">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"

           >
                    <b>{{v.name}} {{val}}  <i>{{odds.single_ball['ball_'+(k+1)+'_digit'][keys3[key]]}}</i></b>

                </span>

         </li>
       </ul>

       <!--冠亚军和-->
       <ul v-show="isShowThisDiv[2]">
         <li v-for="(v,k) in firstAndSecond">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2" v-for="(val,key) in v.data">
             <b>{{v.name}} {{val}}  <i>{{odds.sum_digit[keys4[key]]}}</i></b>
           </span>

         </li>
       </ul>


       <!--冠、亚军-->
       <ul v-show="isShowThisDiv[3]">
         <li v-for="(v,k) in first_second">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b>{{v.name}} {{val}}  <i>1.943</i></b>

                </span>

         </li>
       </ul>


       <!--3、4名-->
       <ul v-show="isShowThisDiv[4]">
         <li v-for="(v,k) in third_fourth">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b>{{v.name}} {{val}}  <i>1.943</i></b>

                </span>

         </li>
       </ul>


       <!--5、6名-->
       <ul v-show="isShowThisDiv[5]">
         <li v-for="(v,k) in fifth_sixth">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b>{{v.name}} {{val}}  <i>1.943</i></b>

                </span>

         </li>
       </ul>


       <!--7、8名-->
       <ul v-show="isShowThisDiv[6]">
         <li v-for="(v,k) in seventh_eighth">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b>{{v.name}} {{val}}  <i>1.943</i></b>

                </span>

         </li>
       </ul>



       <!--9、10名-->
       <ul v-show="isShowThisDiv[7]">
         <li v-for="(v,k) in ninth_tenth">
           <h2 class="title">{{v.name}}</h2>
           <span class="bet-details mr2"
                 v-for="(val,key) in v.data"
           >
                    <b>{{v.name}} {{val}}  <i>1.943</i></b>

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
        name: "Pk10",
        data()
        {
          let data =
          {
            tab1: ['两面盘', '数字盘', '冠、亚和', '冠、亚军','三、四名','五、六名', '七、八名','九、十名'],
            isActive: [1, 0, 0, 0, 0, 0, 0],
            isShowThisDiv: [1, 0, 0, 0, 0, 0, 0, 0, 0],
            bet_money:10,
            lastOpenCode:[1,2,3,4,5,6,7,9,10],
            lastExpect:'20180808052',
            //两面盘数据
            double_handicaps_data:
            [
              {name: "冠军",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "亚军",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "第三名", data: ['大', '小', '单', '双','龙','虎']},
              {name: "第四名", data: ['大', '小', '单', '双','龙','虎']},
              {name: "第五名", data: ['大', '小', '单', '双','龙','虎']},
              {name: "第六名", data: ['大', '小', '单', '双']},
              {name: "第七名", data: ['大', '小', '单', '双']},
              {name: "第八名", data: ['大', '小', '单', '双']},
              {name: "第九名", data: ['大', '小', '单', '双']},
              {name: "第十名", data: ['大', '小', '单', '双']},
            ],

            //数字盘数据
            single_ball_data:
            [
                {name: "冠军",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "亚军",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第三名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第四名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第五名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第六名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第七名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第八名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第九名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第十名", data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
            ],

            //冠亚军组合
            firstAndSecond:
            [
              {name: "特码",   data: [3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19]},
              {name: "两面",   data: ['大', '小', '单', '双']},
            ],

            //冠、亚军
            first_second:
            [
              {name: "冠军特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "冠军两面",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "亚军特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "亚军两面",   data: ['大', '小', '单', '双','龙','虎']},
            ],
            //3、4名
            third_fourth:
            [
              {name: "第三名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第三名两面",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "第四名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第四名两面",   data: ['大', '小', '单', '双','龙','虎']},
            ],
            //5、6名
            fifth_sixth:
            [
              {name: "第五名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第五名两面",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "第六名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第六名两面",   data: ['大', '小', '单', '双','龙','虎']},
            ],
            //7、8名
            seventh_eighth:
            [
              {name: "第七名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第七名两面",   data: ['大', '小', '单', '双','龙','虎']},
              {name: "第八名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
              {name: "第八名两面",   data: ['大', '小', '单', '双','龙','虎']},
            ],
            //9、10名
            ninth_tenth:
              [
                {name: "第九名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第九名两面",   data: ['大', '小', '单', '双','龙','虎']},
                {name: "第十名特码",   data: [1, 2, 3, 4, 5, 6, 7, 8, 9,10]},
                {name: "第十名两面",   data: ['大', '小', '单', '双','龙','虎']},
              ],

            handicaps:[],//用户已有的盘口
            which_handicap:'',//用户当前所选的盘口是哪个  a  b  c  d ...
            fanshui:0,





            //赔率
            odds:{
              single_ball:{
                'ball_1_digit':{'A':0,},
                'ball_2_digit':{'A':0,},
                'ball_3_digit':{'A':0,},
                'ball_4_digit':{'A':0,},
                'ball_5_digit':{'A':0,},
                'ball_6_digit':{'A':0,},
                'ball_7_digit':{'A':0,},
                'ball_8_digit':{'A':0,},
                'ball_9_digit':{'A':0,},
                'ball_10_digit':{'A':0,},
              },
              double_aspect:{
                'ball_1_half':{'K':0,},
                'ball_2_half':{'K':0,},
                'ball_3_half':{'K':0,},
                'ball_4_half':{'K':0,},
                'ball_5_half':{'K':0,},
                'ball_6_half':{'K':0,},
                'ball_7_half':{'K':0,},
                'ball_8_half':{'K':0,},
                'ball_9_half':{'K':0,},
                'ball_10_half':{'K':0,},
              },
              sum_digit:{},
              sum_half:{},
            },
            //下注金额
            bets:
              {
                single_ball:{
                  'ball_1_digit':['','','','','','','','','','',],
                  'ball_2_digit':['','','','','','','','','','',],
                  'ball_3_digit':['','','','','','','','','','',],
                  'ball_4_digit':['','','','','','','','','','',],
                  'ball_5_digit':['','','','','','','','','','',],
                  'ball_6_digit':['','','','','','','','','','',],
                  'ball_7_digit':['','','','','','','','','','',],
                  'ball_8_digit':['','','','','','','','','','',],
                  'ball_9_digit':['','','','','','','','','','',],
                  'ball_10_digit':['','','','','','','','','','',],
                },
                double_aspect:{
                  'ball_1_half':['','','','','',''],
                  'ball_2_half':['','','','','',''],
                  'ball_3_half':['','','','','',''],
                  'ball_4_half':['','','','','',''],
                  'ball_5_half':['','','','','',''],
                  'ball_6_half': ['','','',''],
                  'ball_7_half': ['','','',''],
                  'ball_8_half': ['','','',''],
                  'ball_9_half': ['','','',''],
                  'ball_10_half':['','','',''],
                },
                sum_digit:['','','','','','','','','','','','','','','','',''],
                sum_half:['','','',''],
              },
            bet_content:[],//下注内容的集合
            //纯赔率列表
            all_odds:[],
            //参照表1
            dicrationaries:[
              //两面
              'ball_1_half__K','ball_1_half__L','ball_1_half__M','ball_1_half__N','ball_1_half__O','ball_1_half__P',
              'ball_2_half__K','ball_2_half__L','ball_2_half__M','ball_2_half__N','ball_2_half__O','ball_2_half__P',
              'ball_3_half__K','ball_3_half__L','ball_3_half__M','ball_3_half__N','ball_3_half__O','ball_3_half__P',
              'ball_4_half__K','ball_4_half__L','ball_4_half__M','ball_4_half__N','ball_4_half__O','ball_4_half__P',
              'ball_5_half__K','ball_5_half__L','ball_5_half__M','ball_5_half__N','ball_5_half__O','ball_5_half__P',
              'ball_6_half__K','ball_6_half__L','ball_6_half__M','ball_6_half__N',
              'ball_7_half__K','ball_7_half__L','ball_7_half__M','ball_7_half__N',
              'ball_8_half__K','ball_8_half__L','ball_8_half__M','ball_8_half__N',
              'ball_9_half__K','ball_9_half__L','ball_9_half__M','ball_9_half__N',
              'ball_10_half__K','ball_10_half__L','ball_10_half__M','ball_10_half__N',
              //特码
              'ball_1_digit__A','ball_1_digit__B','ball_1_digit__C',
              'ball_1_digit__D','ball_1_digit__E','ball_1_digit__F',
              'ball_1_digit__G','ball_1_digit__H','ball_1_digit__I','ball_1_digit__J',
              'ball_2_digit__A','ball_2_digit__B','ball_2_digit__C',
              'ball_2_digit__D','ball_2_digit__E','ball_2_digit__F',
              'ball_2_digit__G','ball_2_digit__H','ball_2_digit__I','ball_2_digit__J',
              'ball_3_digit__A','ball_3_digit__B','ball_3_digit__C',
              'ball_3_digit__D','ball_3_digit__E','ball_3_digit__F',
              'ball_3_digit__G','ball_3_digit__H','ball_3_digit__I','ball_3_digit__J',
              'ball_4_digit__A','ball_4_digit__B','ball_4_digit__C',
              'ball_4_digit__D','ball_4_digit__E','ball_4_digit__F',
              'ball_4_digit__G','ball_4_digit__H','ball_4_digit__I','ball_4_digit__J',
              'ball_5_digit__A','ball_5_digit__B','ball_5_digit__C',
              'ball_5_digit__D','ball_5_digit__E','ball_5_digit__F',
              'ball_5_digit__G','ball_5_digit__H','ball_5_digit__I','ball_5_digit__J',
              'ball_6_digit__A','ball_6_digit__B','ball_6_digit__C',
              'ball_6_digit__D','ball_6_digit__E','ball_6_digit__F',
              'ball_6_digit__G','ball_6_digit__H','ball_6_digit__I','ball_6_digit__J',
              'ball_7_digit__A','ball_7_digit__B','ball_7_digit__C',
              'ball_7_digit__D','ball_7_digit__E','ball_7_digit__F',
              'ball_7_digit__G','ball_7_digit__H','ball_7_digit__I','ball_7_digit__J',
              'ball_8_digit__A','ball_8_digit__B','ball_8_digit__C',
              'ball_8_digit__D','ball_8_digit__E','ball_8_digit__F',
              'ball_8_digit__G','ball_8_digit__H','ball_8_digit__I','ball_8_digit__J',
              'ball_9_digit__A','ball_9_digit__B','ball_9_digit__C',
              'ball_9_digit__D','ball_9_digit__E','ball_9_digit__F',
              'ball_9_digit__G','ball_9_digit__H','ball_9_digit__I','ball_9_digit__J',
              'ball_10_digit__A','ball_10_digit__B','ball_10_digit__C',
              'ball_10_digit__D','ball_10_digit__E','ball_10_digit__F',
              'ball_10_digit__G','ball_10_digit__H','ball_10_digit__I','ball_10_digit__J',

              //冠亚军总和
              'sum_half__A','sum_half__B','sum_half__C','sum_half__D',
              'sum_digit__A','sum_digit__B','sum_digit__C','sum_digit__D', 'sum_digit__E',
              'sum_digit__F','sum_digit__G','sum_digit__H','sum_digit__I',
              'sum_digit__J','sum_digit__K','sum_digit__L','sum_digit__M','sum_digit__N',
              'sum_digit__O','sum_digit__P','sum_digit__Q'
            ],
            //参照表2
            dicrationaries_2:[
              //两面
              '第一名-大','第一名-小','第一名-单','第一名-双','第一名-龙','第一名-虎',
              '第二名-大','第二名-小','第二名-单','第二名-双','第二名-龙','第二名-虎',
              '第三名-大','第三名-小','第三名-单','第三名-双','第三名-龙','第三名-虎',
              '第四名-大','第四名-小','第四名-单','第四名-双','第四名-龙','第四名-虎',
              '第五名-大','第五名-小','第五名-单','第五名-双','第五名-龙','第五名-虎',
              '第六名-大','第六名-小','第六名-单','第六名-双',
              '第七名-大','第七名-小','第七名-单','第七名-双',
              '第八名-大','第八名-小','第八名-单','第八名-双',
              '第九名-大','第九名-小','第九名-单','第九名-双',
              '第十名-大','第十名-小','第十名-单','第十名-双',
              //特码
              '第一名-特码-1','第一名-特码-2','第一名-特码-3','第一名-特码-4',
              '第一名-特码-5','第一名-特码-6','第一名-特码-7','第一名-特码-8','第一名-特码-9','第一名-特码-10',
              '第二名-特码-1','第二名-特码-2','第二名-特码-3','第二名-特码-4',
              '第二名-特码-5','第二名-特码-6','第二名-特码-7','第二名-特码-8','第二名-特码-9','第二名-特码-10',
              '第三名-特码-1','第三名-特码-2','第三名-特码-3','第三名-特码-4',
              '第三名-特码-5','第三名-特码-6','第三名-特码-7','第三名-特码-8','第三名-特码-9','第三名-特码-10',
              '第四名-特码-1','第四名-特码-2','第四名-特码-3','第四名-特码-4',
              '第四名-特码-5','第四名-特码-6','第四名-特码-7','第四名-特码-8','第四名-特码-9','第四名-特码-10',
              '第五名-特码-1','第五名-特码-2','第五名-特码-3','第五名-特码-4',
              '第五名-特码-5','第五名-特码-6','第五名-特码-7','第五名-特码-8','第五名-特码-9','第五名-特码-10',
              '第六名-特码-1','第六名-特码-2','第六名-特码-3','第六名-特码-4',
              '第六名-特码-5','第六名-特码-6','第六名-特码-7','第六名-特码-8','第六名-特码-9','第六名-特码-10',
              '第七名-特码-1','第七名-特码-2','第七名-特码-3','第七名-特码-4',
              '第七名-特码-5','第七名-特码-6','第七名-特码-7','第七名-特码-8','第七名-特码-9','第七名-特码-10',
              '第八名-特码-1','第八名-特码-2','第八名-特码-3','第八名-特码-4',
              '第八名-特码-5','第八名-特码-6','第八名-特码-7','第八名-特码-8','第八名-特码-9','第八名-特码-10',
              '第九名-特码-1','第九名-特码-2','第九名-特码-3','第九名-特码-4',
              '第九名-特码-5','第九名-特码-6','第九名-特码-7','第九名-特码-8','第九名-特码-9','第九名-特码-10',
              '第十名-特码-1','第十名-特码-2','第十名-特码-3','第十名-特码-4',
              '第十名-特码-5','第十名-特码-6','第十名-特码-7','第十名-特码-8','第十名-特码-9','第十名-特码-10',
              //冠亚军总和
              '冠亚军-大','冠亚军-小','冠亚军-单','冠亚军-双',
              '冠亚军-特码-3','冠亚军-特码-4','冠亚军-特码-5','冠亚军-特码-6','冠亚军-特码-7',
              '冠亚军-特码-8','冠亚军-特码-9','冠亚军-特码-10','冠亚军-特码-11','冠亚军-特码-12',
              '冠亚军-特码-13','冠亚军-特码-14','冠亚军-特码-15','冠亚军-特码-16','冠亚军-特码-17',
              '冠亚军-特码-18','冠亚军-特码-19',

            ],


            //趺背的数据
            dec_limit:
            {
                //1里面找
                ball_1_digit:{},
                ball_2_digit:{},
                ball_3_digit:{},
                ball_4_digit:{},
                ball_5_digit:{},
                ball_6_digit:{},
                ball_7_digit:{},
                ball_8_digit:{},
                ball_9_digit:{},
                ball_10_digit:{},
                //6页面找
                ball_1_half:{},
                ball_2_half:{},
                ball_3_half:{},
                ball_4_half:{},
                ball_5_half:{},
                ball_6_half:{},
                ball_7_half:{},
                ball_8_half:{},
                ball_9_half:{},
                ball_10_half:{},
                //1页面找
                sum_half:{},
                sum_digit:{},
            },

            //keys1
            keys1 : ['K','L','M','N','O','P'],
            keys2 : ['K','L','M','N'],
            keys3:['A','B','C','D','E','F','G','H','I','J'],
            keys4:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'],


          };
          return data;
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

          //获取最后一期的开奖号码
          get_last_code: function () {
            this.$http.get(this.api + '/pk10/lastLty', {}).then(function (res) {
              //获取到最新一期的数据
              let data = res.data;
              this.lastOpenCode = data.opencode;
              this.lastExpect = `${data.expect}`;
            });
          },



          /**
           * 查看用户可选盘口
           */
          get_users_handicaps: function () {
            this.$http.get(`${this.api}/pk10/pans`)
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


          //获取用户赔率
          get_odds:function(which_handicap = null)
          {
            if(which_handicap || this.which_handicap)
            {
              this.$http.get(`${this.api}/pk10/odds/1?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
              {
                let data = res.data.data.odds;
                this.odds.single_ball = data;
                let Alphabet = ['A','B','C','D','E','F','G','H','I','J'];
                for(let i=0;i<Alphabet.length;i++)
                {
                  this.dec_limit['ball_'+ (i+1) +'_digit'] = data['ball_'+ (i+1) +'_digit'].dec_odds;
                  this.all_odds[(i+50)] = data['ball_1_digit'][Alphabet[i]];
                  this.all_odds[(i+60)] = data['ball_2_digit'][Alphabet[i]];
                  this.all_odds[(i+70)] = data['ball_3_digit'][Alphabet[i]];
                  this.all_odds[(i+80)] = data['ball_4_digit'][Alphabet[i]];
                  this.all_odds[(i+90)] = data['ball_5_digit'][Alphabet[i]];
                  this.all_odds[(i+100)] = data['ball_5_digit'][Alphabet[i]];
                  this.all_odds[(i+110)] = data['ball_6_digit'][Alphabet[i]];
                  this.all_odds[(i+120)] = data['ball_7_digit'][Alphabet[i]];
                  this.all_odds[(i+130)] = data['ball_8_digit'][Alphabet[i]];
                  this.all_odds[(i+140)] = data['ball_9_digit'][Alphabet[i]];
                }

              });
              this.$http.get(`${this.api}/pk10/odds/2?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
              {
                let data = res.data.data.odds;
                this.odds.double_aspect = data;
                let Alphabet = ['K','L','M','N','O','P'];
                this.dec_limit['ball_7_half'] = data['ball_7_half'].dec_odds;
                this.dec_limit['ball_8_half'] = data['ball_8_half'].dec_odds;
                this.dec_limit['ball_9_half'] = data['ball_9_half'].dec_odds;
                this.dec_limit['ball_10_half'] = data['ball_10_half'].dec_odds;
                for(let i=0;i<Alphabet.length;i++)
                {
                  this.dec_limit['ball_'+ (i+1) +'_half'] = data['ball_'+ (i+1) +'_half'].dec_odds;
                  this.all_odds[i]    = data['ball_1_half'][Alphabet[i]];
                  this.all_odds[i+6]  = data['ball_2_half'][Alphabet[i]];
                  this.all_odds[i+12] = data['ball_3_half'][Alphabet[i]];
                  this.all_odds[i+18] = data['ball_4_half'][Alphabet[i]];
                  this.all_odds[i+24] = data['ball_5_half'][Alphabet[i]];
                }
                let Alphabet1 = ['K','L','M','N'];
                for(let i=0;i<Alphabet1.length;i++)
                {
                  this.all_odds[i+30] = data['ball_6_half'][Alphabet[i]];
                  this.all_odds[i+34] = data['ball_7_half'][Alphabet[i]];
                  this.all_odds[i+38] = data['ball_8_half'][Alphabet[i]];
                  this.all_odds[i+42] = data['ball_9_half'][Alphabet[i]];
                  this.all_odds[i+46] = data['ball_10_half'][Alphabet[i]];
                }

              });
              this.$http.get(`${this.api}/pk10/odds/3?pan=${which_handicap?which_handicap:this.which_handicap}`).then(function(res)
              {
                let data = res.data.data.odds;
                this.odds.sum_digit = data.sum_digit;
                console.log(this.odds.sum_digit);
                for(let i in this.odds.sum_digit){

                }
                this.odds.sum_half = data.sum_half;
                this.dec_limit.sum_digit = data.sum_digit.dec_odds;
                this.dec_limit.sum_half = data.sum_half.dec_odds;
                let Alphabet1 = ['A','B','C','D'];
                for(let i=0;i<Alphabet1.length;i++)
                {
                  this.all_odds[i+150] = data['sum_half'][Alphabet1[i]];
                }
                let Alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];
                for(let i=0;i<Alphabet.length;i++)
                {
                  this.all_odds[i+154] = data['sum_digit'][Alphabet[i]];
                }
              });
            }
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
  @import "../assets/css/pk10.css";
</style>
