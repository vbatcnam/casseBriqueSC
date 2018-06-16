import * as SCInternals from './SugarCubesInternals.js';

window.SC = {
  evt: function(name){
    return new SCInternals.SC_Event(name);
    },
  sensor: function(name){
    return new SCInternals.SC_Sensor(name);
    },
  machine: function(delay, initParams){
    return new SCInternals.SC_Machine(delay, initParams);
    },
  pauseForever: function(){
    return SCInternals.SC_PauseForever;
  },
  nothing: function(){
    return SCInternals.SC_Nothing;
    },
  purge: function(prg){
    return (undefined == prg)?VOID_NODE:prg;
    },
  nop: function(){
    return SCInternals.SC_Nothing;
    },
  pauseRT: function(n){
    return new SCInternals.SC_PauseRT(SCInternals._SC.b_(n));
  },
  myPause: function(cell){
    return new SCInternals.SC_CubePause(SCInternals._SC.b_(cell));
  },
  pause: function(n){
    return new SCInternals.SC_Pause(SCInternals._SC.b_(n));
  },
  await: function(config){
    if(undefined == config){
      throw "config not defined";
      }
    return new SCInternals.SC_Await(SCInternals._SC.b_(config));
  },
  seq: function(){
    return new SCInternals.SC_Seq(arguments);
  },
  action: function(fun, times){
    return new SCInternals.SC_Action(SCInternals._SC.b_(fun), SCInternals._SC.b_(times));
  },
  actionWhen: function(c, fun, deffun, times){
    if(undefined == c){
      throw "config not defined";
      }
    return new SC_ActionOnEvent(SCInternals._SC.b_(c), SCInternals._SC.b_(fun), SCInternals._SC.b_(deffun), SCInternals._SC.b_(times));
  },
  actionOn: function(c, fun, deffun, times){
    if(undefined == c){
      throw "config not defined";
      }
    return new SCInternals.SC_ActionOnEvent(SCInternals._SC.b_(c), SCInternals._SC.b_(fun), SCInternals._SC.b_(deffun), SCInternals._SC.b_(times));
  },
  act: function(fun){
    return new SCInternals.SC_Action(fun);
  },
  par: function(){
    return new SCInternals.SC_Par(arguments, undefined);
  },
  NO_ACTION: SCInternals.NO_FUN,
  parex: function(evt){
    var prgs = [];
    for(var i = 1 ; i < arguments.length; i++){
      prgs.push(arguments[i]);
    }
    return new SCInternals.SC_Par(prgs, evt);
  },
  nextInput: function(evt, v, t){
    return new SCInternals.SC_Send(SCInternals._SC.b_(evt), v, SCInternals._SC.b_(t));
  },
  generateForever: function(evt, v){
    return new SCInternals.SC_GenerateForever(SCInternals._SC.b_(evt), v);
  },
  generate: function(evt, v, times){
    return new SCInternals.SC_Generate(SCInternals._SC.checkStrictEvent(evt)
                                , v, SCInternals._SC.b_(times));
  },
  generateWrapped: function(evt, v, times){
    return new SCInternals.SC_Generate(SCInternals._SC.b_(evt), SCInternals._SC.b_(v), SCInternals._SC.b_(times));
  },
  function(n){
    var prgs = [];
    var jump = 1;
    prgs[0] = new SCInternals.SC_LoopPoint(n);
    for(var i = 1 ; i < arguments.length; i++){
      prgs[i] = arguments[i];
      if(prgs[i] instanceof SCInternals.SC_Seq){
        jump+= prgs[i].seqElements.length;
        }
      else{
        jump++;
        }
    }
    var end = new SCInternals.SC_RelativeJump(-(jump+1));
    prgs[prgs.length] = end;
    //end.relativeJump = -prgs.length;
    prgs[0].end = jump;
    //var t = new Repeat(n, prgs);
    var t = new SCInternals.SC_Seq(prgs);
    return t;
  },
  repeat: function(n){
    var prgs = [];
    var jump = 1;
    prgs[0] = new SCInternals.SC_RepeatPoint(n);
    for(var i = 1 ; i < arguments.length; i++){
      prgs[i] = arguments[i];
      if(prgs[i] instanceof SCInternals.SC_Seq){
        jump+= prgs[i].seqElements.length;
        }
      else{
        jump++;
        }
    }
    var end = new SCInternals.SC_RelativeJump(-(jump+1));
    prgs[prgs.length] = end;
    //end.relativeJump = -prgs.length;
    prgs[0].end = jump;
    //var t = new Repeat(n, prgs);
    var t = new SCInternals.SC_Seq(prgs);
    return t;
  },
  exit: function(n){
    return new SCInternals.SC_Exit(n);
  },
  and: function(){
    var tmp = [];
    for(var i in arguments){
      tmp.push(SCInternals._SC.b_(arguments[i]));
      }
    return new SCInternals.SC_And(tmp);
  },
  or: function(){
    var tmp = [];
    for(var i in arguments){
      tmp.push(SCInternals._SC.b_(arguments[i]));
      }
    //console.log("or with ", tmp);
    return new SCInternals.SC_Or(tmp);
  },
  kill: function(c,p,h){
    SCInternals._SC.checkConfig(c);
    return new SCInternals.Kill(c, p, h);
  },
  control: function(c){
    SCInternals._SC.checkConfig(c);
    var prgs = [];
    for(var i = 1 ; i < arguments.length; i++){
      prgs[i-1] = arguments[i];
    }
   return new SCInternals.Control(c, new SCInternals.SC_Seq(prgs));
  },
  when: function(c,t,e){
    SCInternals._SC.checkConfig(c);
    return new SCInternals.When(c,t,e);
  },
  test: function(b,t,e){
    return new SCInternals.SC_Test(b,t,(null == e)?SC_Nothing:e);
  },
  match: function(val){
    var prgs = [];
    for(var i = 1 ; i < arguments.length; i++){
      prgs[i-1] = arguments[i];
    }
    return new SCInternals.Match(val, prgs);
  },
  matches: function(val,branches){
    return new SCInternals.Match(val, branches);
  },
  filter: function(s,e,f,t,n){
    return new SCInternals.SC_Filter(_SC.b_(s)
                       , _SC.b_(e)
                       , _SC.b_(f)
                       , _SC.b_(t)
                       , _SC.b_(n));
  },
  cube: function(o, p, lastWill){
    return new SCInternals.SC_Cube(o, p, lastWill);
  },
  mark: function(f){
    return new SCInternals.Mark(f);
  },
  cell: function(params){
    return new SCInternals.SC_Cell(params);
    },
  traceEvent: function(msg){
    return new SCInternals.SC_GenerateOne(null, msg);
    },
  trace: function(msg){
    return new SCInternals.SC_GenerateOne(null, msg);
    },
  log: function(msg){
    function act(msg){
      console.log(msg);
      }
    //console.log("preparing log for : ",msg);
    return SC.action(act.bind(null, msg));
    },
  cellify: function(tgt, nom, fun, el, sub){
    var t = tgt;
    if(Array.isArray(sub)){
      for(var i = 0; i < sub.length; i++){
        t = t[sub[i]];
        }
      }
    else{
      t = (undefined == sub)?tgt:tgt[sub];
      }
    if(undefined != fun){
      tgt["_"+nom] = fun;
      }
    if(undefined == tgt["_"+nom]){
      throw "no affectator for "+nom+" cell";
      }
    tgt["$"+nom] = SC.cell({target:t, field:nom, sideEffect: SC._(tgt,"_"+nom), eventList: el});
    },
  simpleCellFun : function(tgt, evt, trace){
    return function(e, trace, val, evts){
      var v = evts[e];
      if(trace){
        console.log("simpleFun", this, evts, evt)
      }
      if(undefined != v){
        var newVal = v[0];
        if(newVal instanceof SCInternals.SC_ValueWrapper){
          newVal = newVal.getVal();
          }
        return newVal;
        }
      return val;
      }.bind(tgt, evt, trace);
    },
  addCell: function(tgt, nom, init, el, fun){
    if(tgt instanceof SCInternals.SC_Cube){
      tgt = tgt.o;
      }
    if(undefined !== fun){
      tgt["_"+nom] = fun;
      }
    if(undefined === tgt["_"+nom]){
      throw "no affectator for "+nom+" cell is defined";
      }
    tgt["$"+nom] = SC.cell({init:init, sideEffect: SC._(tgt,"_"+nom), eventList: el});
    Object.defineProperty(tgt, nom,{get : (function(nom){
      return tgt["$"+nom].val();
    }).bind(tgt, nom)});
    },
  _: function(tgt, fun){
    return (tgt[fun]).bind(tgt);
    },
  linkToCube:function(s){
    return SCInternals._SC.b_(s);
    },
  power: function(field){
    return SCInternals._SC.b_(field);
    },
  myCell: function(c){
    return new SCInternals.SC_CubeCell("$"+c);
  },
  myFun: function(field){
    var prgs = [];
    for(var i = 1 ; i < arguments.length; i++){
      prgs[i-1] = arguments[i];
    }
    return SCInternals._SC.b__(field, prgs);
    },
  my: function(field){
    return SCInternals._SC.b_(field);
    },
  send: function(m, evt, v){
    return SC.action(function(evt, v){
      //console.log("sending ",evt, v);
      this.generateEvent(evt, v);
      }.bind(m, evt, v))
    },
  next: function(delay){
    if(undefined === delay){
      delay = 0;
      }
    if(delay < 0){
      throw "invalid delay : "+delay;
      }
    return SC.action(function(delay, m){
      setTimeout(m.react.bind(m), delay);
      }.bind(null, delay));
    },
  writeInConsole:function(){
    console.log.call(console,arguments);
    },
  forever: -1
};

// export {SC}
window.SC = SC;