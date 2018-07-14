import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';

import Randw from '@/components/Randw';
import Usercenter from '@/components/Usercenter';
import MoneyChange from '@/components/MoneyChange';
import Unclear from '@/components/Unclear';
import Clear from '@/components/Clear';
import DiagramClear from '@/components/DiagramClear';
import DiagramDetails from '@/components/DiagramDetails';
import OneDayBill from '@/components/OneDayBill';

import Cqssc from '@/components/Cqssc';
import Pk10 from '@/components/Pk10';
import Pcegg from '@/components/Pcegg';
import cake from '@/components/cake';

import OpenCodes from '@/components/open_codes/OpenCodes';
import OpenCodesCqssc from '@/components/open_codes/OpenCodesCqssc';
import OpenCodesPk10 from '@/components/open_codes/OpenCodesPk10';
import OpenCodesCake28 from '@/components/open_codes/OpenCodesCake28';
import OpenCodesPcegg from '@/components/open_codes/OpenCodesPcegg';

import BetMoneyLimit from '@/components/bet_limit/BetMoneyLimit';
import BetLimitCqssc from '@/components/bet_limit/BetLimitCqssc';
import BetLimitPk10 from '@/components/bet_limit/BetLimitPk10';
import BetLimitCake28 from '@/components/bet_limit/BetLimitCake28';
import BetLimitPcegg from '@/components/bet_limit/BetLimitPcegg';



import BetRules from '@/components/bet_rules/BetRules';
import BetRulesCqssc from '@/components/bet_rules/BetRulesCqssc';
import BetRulesPk10 from '@/components/bet_rules/BetRulesPk10';
import BetRulesCake28 from '@/components/bet_rules/BetRulesCake28';
import BetRulesPcegg from '@/components/bet_rules/BetRulesPcegg';


import Subordinate from '@/components/subordinate/Subordinate';
import AddSubordinate from '@/components/subordinate/AddSubordinate';

Vue.use(Router);

export default new Router({
  routes:
  [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/cqssc',
        name: 'Cqssc',
        component: Cqssc
    },
    {
      path: '/pk10',
      name: 'Pk10',
      component: Pk10
    },
    {
      path: '/Pcegg',
      name: 'Pcegg',
      component: Pcegg
    },
    {
      path: '/cake',
      name: 'cake',
      component: cake
    },
    {
        path: '/randw',
        name: 'Randw',
        component: Randw
    },
    {
        path: '/usercenter',
        name: 'Usercenter',
        component: Usercenter
    },
    {
      path: '/money_change',
      name: 'MoneyChange',
      component: MoneyChange
    },
    {
      path: '/unclear',
      name: 'Unclear',
      component: Unclear
    },
    {
      path: '/clear',
      name: 'Clear',
      component: Clear
    },
    {
      path: '/diagram_clear',
      name: 'DiagramClear',
      component: DiagramClear
    },
    {
      path: '/diagram_details',
      name: 'DiagramDetails',
      component: DiagramDetails
    },
    {
      path: '/one_day',
      name: 'OneDayBill',
      component: OneDayBill
    },
    {
      path: '/open_codes',
      name: 'OpenCodes',
      component: OpenCodes
    },
    {
      path: '/open_codes_cqssc',
      name: 'OpenCodesCqssc',
      component: OpenCodesCqssc
    },
    {
      path: '/open_codes_pk10',
      name: 'OpenCodesPk10',
      component: OpenCodesPk10
    },
    {
      path: '/open_codes_cake28',
      name: 'OpenCodesCake28',
      component: OpenCodesCake28
    },
    {
      path: '/open_codes_pcegg',
      name: 'OpenCodesPcegg',
      component: OpenCodesPcegg
    },
    {
      path: '/bet_money_limit',
      name: 'BetMoneyLimit',
      component: BetMoneyLimit
    },
    {
      path: '/bet_limit_cqssc',
      name: 'BetLimitCqssc',
      component: BetLimitCqssc
    },
    {
      path: '/bet_limit_pk10',
      name: 'BetLimitPk10',
      component: BetLimitPk10
    },
    {
      path: '/bet_limit_cake28',
      name: 'BetLimitCake28',
      component: BetLimitCake28
    },
    {
      path: '/bet_limit_pcegg',
      name: 'BetLimitPcegg',
      component: BetLimitPcegg
    },
    {
      path: '/bet_rules',
      name: 'BetRules',
      component: BetRules
    },
    {
      path: '/bet_rules_cqssc',
      name: 'BetRulesCqssc',
      component: BetRulesCqssc
    },
    {
      path: '/bet_rules_pk10',
      name: 'BetRulesPk10',
      component: BetRulesPk10
    },
    {
      path: '/bet_rules_cake28',
      name: 'BetRulesCake28',
      component: BetRulesCake28
    },
    {
      path: '/bet_rules_pcegg',
      name: 'BetRulesPcegg',
      component: BetRulesPcegg
    },
    {
      path: '/subordinate',
      name: 'Subordinate',
      component: Subordinate
    },
    {
      path: '/add_subordinate',
      name: 'AddSubordinate',
      component: AddSubordinate
    },
  ]
})
