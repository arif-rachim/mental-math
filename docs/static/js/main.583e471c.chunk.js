(this["webpackJsonpmental-math"]=this["webpackJsonpmental-math"]||[]).push([[0],{11:function(e,t,n){e.exports={button:"App_button__3Wu2Q",buttonNavigator:"App_buttonNavigator__3DrKD",main:"App_main__3g0VX",input:"App_input__coDI0",questionTitle:"App_questionTitle__1GdSl",questionDescription:"App_questionDescription__1lfpj"}},198:function(e,t,n){e.exports=n(384)},384:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(10),u=n.n(i),o=n(14),l=n(11),c=n.n(l),s=n(174),m=n(37),f=Object(a.createContext)(null);function d(e){var t=e.children,n=Object(a.useState)((function(){var e=localStorage.getItem("config");return e&&e.length>0?JSON.parse(e):{studentName:"RAOUL ARDY",totalSums:200,totalQuestions:6,pauseBetweenQuestionInMs:1e3}})),i=Object(o.a)(n,2),u=i[0],l=i[1],c=Object(a.useState)(0),s=Object(o.a)(c,2),d=s[0],p=s[1];function g(){var e=localStorage.getItem("sessions");return e=e&&e.length>0?JSON.parse(e):[]}Object(a.useEffect)((function(){var e=localStorage.getItem("config");e&&e.length>0?(l(JSON.parse(e)),p(1)):p(0)}),[]);var b=Object(a.useRef)();return r.a.createElement(f.Provider,{value:{setPage:p,setConfig:l,config:u,saveSettings:function(){localStorage.setItem("config",JSON.stringify(u)),window.location.reload()},saveSession:function(e,t){var n=(new Date).getTime()-b.current,a=t.map((function(t,n){return Object(m.a)({},t,{questions:e[n]})})),r={date:new Date,sums:a,duration:n},i=g();i.push(r),localStorage.setItem("sessions",JSON.stringify(i))},getSession:g,markSessionBegin:function(){b.current=(new Date).getTime()},sessionTimer:b}},t(d))}function p(){return Object(a.useContext)(f)}var g=Object(a.createContext)(null),b={"-9":0,"-8":1,"-7":2,"-6":3,"-5":4,"-4":5,"-3":6,"-2":7,"-1":8,1:9,2:10,3:11,4:12,5:13,6:14,7:15,8:16,9:17};function v(e){var t=e.children,n=Object(a.useRef)(),i=p().config;!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform);return r.a.createElement(g.Provider,{value:{playSounds:function(e){var t=i.pauseBetweenQuestionInMs;null!==e&&void 0!==e&&0!==e.length&&e.forEach((function(e,a){setTimeout((function(){n.current.currentTime=b[e.toString()],n.current.play(),setTimeout((function(){n.current.pause()}),800)}),(a+1)*t)}))}}},r.a.createElement("div",{style:{display:"flex",justifyContent:"center",width:"100%",position:"absolute",textAlign:"center",paddingTop:"1rem"}},r.a.createElement("audio",{ref:n,controls:!0,preload:"auto"},r.a.createElement("source",{src:"".concat("/mental-math","/audio/mental-math-v2.mp3"),type:"audio/mpeg"}))),t)}function E(){return{playSounds:Object(a.useContext)(g).playSounds}}var h=n(21),S=n(75),y=n.n(S);function w(e){var t=e.reduce((function(e,t){return e+t}),0),n=Math.random()<=.3,a=(Math.floor(9*Math.random())+1)*(n?-1:1);return t+a>0&&Math.abs(e[e.length-1])!==Math.abs(a)?a:w(e)}function O(e){for(var t=[];t.length<e;)t.push(w(t));return t}function x(e){var t=e.studentName,n=e.setSessionRunning,a=e.numbers,i=p().markSessionBegin,u=E().playSounds;return r.a.createElement("div",{style:{display:"inline-block",margin:"auto",marginTop:"2rem",padding:"1rem",background:"rgba(0,0,0,0.5)"}},r.a.createElement("h1",{style:{textAlign:"center",marginBottom:"5rem"}},t),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("button",{className:c.a.button,onClick:function(){i(),n(!0),u(a)}},"Click Here To Begin Session")))}function j(e){var t=e.setTimerRunning,n=e.setCurrentQuestion,i=e.setCurrentSum,u=e.setAnswers,o=e.isTrial,l=e.currentSum,m=e.questionSet,f=Object(a.useRef)(null),d=Object(a.useRef)(null),p=E().playSounds;return Object(a.useEffect)((function(){d.current=(new Date).getTime(),f.current.focus()}),[]),r.a.createElement("form",{style:{width:"100%",display:"flex",flexDirection:"column"},action:"",onSubmit:function(e){e.preventDefault();var a=parseInt(e.target.elements.answer.value);a>=0&&(!function(e){var t=e.answer,n=e.setTimerRunning,a=e.setCurrentSum,r=e.setCurrentQuestion,i=e.setAnswers,u=e.timeLogger;n(!1),a((function(e){return e+1})),r(-1);var o=(new Date).getTime()-u.current;i((function(e){return[].concat(Object(s.a)(e),[{answer:t,time:o}])}))}({answer:a,setTimerRunning:t,setCurrentQuestion:n,setCurrentSum:i,setAnswers:u,timeLogger:d}),p(m[l+1]))}},r.a.createElement("div",{style:{display:"flex",alignItems:"center",marginTop:"1rem",marginBottom:"1rem"}},r.a.createElement("div",{style:{textAlign:"left",fontSize:"2rem"}},"Answer :"),r.a.createElement("div",{style:{flexGrow:"1"}}),!o&&r.a.createElement("button",{className:c.a.button,type:"submit"},"Enter")),r.a.createElement("input",{ref:f,className:c.a.input,type:"number",style:{marginBottom:"2rem",fontSize:"8rem"},name:"answer"}))}function C(e){var t=e.questionSets,n=e.currentSum,a=e.currentQuestion;return r.a.createElement("div",{style:{fontSize:"18rem",position:"relative",margin:"auto",maxWidth:"18rem",height:"18rem"}},r.a.createElement("div",{style:{background:"rgba(0,0,0,0.5)",boxShadow:"0px 0px 80px 10px rgba(0,0,0,1)",borderRadius:"20rem",position:"absolute",top:0,left:0,width:"100%",height:"100%"}}),r.a.createElement("div",{style:{position:"relative",top:"-4rem",width:"100%",textAlign:"center"}},t[n][a]))}var T=["rgba(255,255,255,1)","rgba(255,255,255,0.5)"];function N(e){return parseInt(e.toString())<=9?"0"+e:e}function D(e){var t=e.isTrial,n=p(),i=n.config,u=n.saveSession,l=n.setPage,c=n.sessionTimer,s=i.studentName,m=i.totalSums,f=i.totalQuestions,d=i.pauseBetweenQuestionInMs,g=Object(a.useState)(function(e,t){for(var n=[],a=0;a<t;a++)n.push(O(e));return n}(f,m)),b=Object(o.a)(g,1)[0],v=Object(a.useState)(!1),E=Object(o.a)(v,2),S=E[0],w=E[1],D=Object(a.useState)(!1),k=Object(o.a)(D,2),I=k[0],M=k[1],R=Object(a.useState)(0),A=Object(o.a)(R,2),Q=A[0],_=A[1],q=Object(a.useState)(-1),B=Object(o.a)(q,2),P=B[0],z=B[1],J=Object(a.useState)([]),V=Object(o.a)(J,2),Y=V[0],F=V[1];Object(a.useEffect)((function(){var e=null;return I&&(S?e=setInterval((function(){z((function(e){return e<f?e+1:e}))}),d):w(!0)),function(){e&&clearInterval(e)}}),[S,I,d,f]),Object(a.useEffect)((function(){Q===m&&(M(!1),w(!1),z(-1),_(0),t||(u(b,Y),l(2)),F([]))}),[Q,m,Y,b,u,l,t]);var G=P===f,H=Q*f+(-1===P?0:P),K=m*f,L=Math.round(H/K*100),W=[{name:"complete",value:L},{name:"incomplete",value:100-L}],U=Object(a.useState)(""),X=Object(o.a)(U,2),Z=X[0],$=X[1],ee=c.current;return Object(a.useEffect)((function(){var e=setInterval((function(){if(ee){var e=(new Date).getTime()-ee,t=y.a.duration(e);$("".concat(t.hours(),":").concat(N(t.minutes()),":").concat(N(t.seconds())))}}),1e3);return function(){clearInterval(e)}}),[ee]),r.a.createElement("div",{style:{maxWidth:"100%",display:"flex",flexDirection:"column"}},r.a.createElement("div",{style:{display:"flex"}},r.a.createElement("div",{style:{flexGrow:"1"}}),r.a.createElement("div",{style:{position:"relative",marginTop:"-1rem",marginRight:"-1rem"}},r.a.createElement(h.f,{width:100,height:100},r.a.createElement(h.e,{animationDuration:100,data:W,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",innerRadius:40,outerRadius:50,fill:"#82ca9d"},W.map((function(e,t){return r.a.createElement(h.d,{key:"cell-".concat(t),fill:T[t],stroke:"none"})})))),r.a.createElement("div",{style:{position:"absolute",top:40,width:"100%",textAlign:"center"}},Z))),!I&&r.a.createElement(x,{studentName:s,setSessionRunning:M,numbers:b[0]}),I&&Q<m&&r.a.createElement("div",{style:{textAlign:"center"}},S&&r.a.createElement("div",null,-1===P&&r.a.createElement("h1",{style:{fontSize:"4rem"}},"Ready !"),P>=0&&!G&&r.a.createElement(C,{questionSets:b,currentSum:Q,currentQuestion:P}),G&&r.a.createElement(j,{setTimerRunning:w,setCurrentQuestion:z,setCurrentSum:_,setAnswers:F,isTrial:t,currentSum:Q,questionSet:b}))))}function k(){return r.a.createElement("div",{style:{padding:"2rem",width:"100%"}},r.a.createElement(D,{isTrial:!1}))}function I(e){var t=e.label,n=e.description,a=e.type,i=e.value,u=e.onValueChange;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("p",{className:c.a.questionTitle},t),r.a.createElement("input",{type:a,className:c.a.input,value:i,onChange:function(e){return u(e.target.value.toUpperCase())}}),r.a.createElement("p",{className:c.a.questionDescription},n))}function M(){var e=p().config,t=e.studentName,n=e.totalSums,i=e.totalQuestions,u=e.pauseBetweenQuestionInMs,l=Object(a.useState)(0),s=Object(o.a)(l,2),f=s[0],d=s[1],g=p(),b=g.setConfig,v=g.saveSettings;return r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("div",{style:{display:"flex",position:"fixed",bottom:0,width:"100vw",backgroundColor:"rgba(0,0,0,0.3)"}},f>0&&r.a.createElement("button",{className:c.a.buttonNavigator,onClick:function(){return d((function(e){return e-1}))}},"Back"),r.a.createElement("div",{style:{flexGrow:"1"}}),f<5&&r.a.createElement("button",{className:c.a.buttonNavigator,onClick:function(){return d((function(e){return e+1}))}},"Next"),5===f&&r.a.createElement("button",{className:c.a.buttonNavigator,onClick:function(){b({studentName:t,totalSums:n,totalQuestions:i,pauseBetweenQuestionInMs:u}),v()}},"Save Changes")),r.a.createElement("div",{style:{padding:"2rem",width:"100%",background:"rgba(0,0,0,0.5)",boxShadow:"0px 30px 80px 10px rgba(0,0,0,0.7)"}},0===f&&r.a.createElement("h1",null,"Mental Math Exercise"),1===f&&r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),d((function(e){return e+1}))}},r.a.createElement(I,{label:"Student name ?",type:"text",value:t,onValueChange:function(e){return b((function(t){return Object(m.a)({},t,{studentName:e})}))},description:"Your name will be recorded and your historical session will be kept in the device"})),2===f&&r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),d((function(e){return e+1}))}},r.a.createElement(I,{label:"Total sums in each session ?",type:"number",value:n,onValueChange:function(e){return b((function(t){return Object(m.a)({},t,{totalSums:parseInt(e)})}))},description:"For competition practice, total sums in a session usually `200`"})),3===f&&r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),d((function(e){return e+1}))}},r.a.createElement(I,{label:"Total questions in each sums ?",type:"number",value:i,onValueChange:function(e){return b((function(t){return Object(m.a)({},t,{totalQuestions:parseInt(e)})}))},description:"For competition practice, recommended total questions in a sum is `6`"})),4===f&&r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),d((function(e){return e+1}))}},r.a.createElement(I,{label:"Pause between question  ?",type:"number",value:u,onValueChange:function(e){return b((function(t){return Object(m.a)({},t,{pauseBetweenQuestionInMs:parseInt(e)})}))},description:"For competition practice, recommended pause is `1000` milliseconds (1 second)"})),5===f&&r.a.createElement(D,{isTrial:!0})))}function R(){var e=p().getSession,t=Object(a.useRef)(e());if(!(t.current&&t.current.length>0))return r.a.createElement("div",{style:{marginTop:"5rem"}},"No Report Yet");var n=t.current[t.current.length-1],i=n.sums.reduce((function(e,t){var n=t.questions.reduce((function(e,t){return e+t}),0);return t.answer===n?++e:e}),0),u=Math.round(i/n.sums.length*100),o=n.duration,l=Math.round(o/1e3),c=Math.floor(l/60),s=l%60;return r.a.createElement("div",{style:{fontSize:"1.5rem",width:"100%",padding:"1rem",paddingTop:"3rem",background:"rgba(0,0,0,0.4)",boxShadow:"0px 30px 30px 0px rgba(0,0,0,0.5)"}},r.a.createElement("table",{style:{fontSize:"1rem"}},r.a.createElement("tr",null,r.a.createElement("td",null,"Date"),r.a.createElement("td",null,y()(new Date(n.date)).format("DD MMM YYYY HH:mm:ss"))),r.a.createElement("tr",null,r.a.createElement("td",null,"Total Sums"),r.a.createElement("td",null,n.sums.length)),r.a.createElement("tr",null,r.a.createElement("td",null,"Total Questions"),r.a.createElement("td",null,n.sums.length*n.sums[0].questions.length)),r.a.createElement("tr",null,r.a.createElement("td",null,"Score"),r.a.createElement("td",null,u," %")),r.a.createElement("tr",null,r.a.createElement("td",null,"Completion time"),r.a.createElement("td",null,c," Min : ",s<9?"0".concat(s):s," Sec"))),r.a.createElement("div",{style:{width:"100%",height:300}},r.a.createElement(h.g,null,r.a.createElement(h.b,{data:n.sums,margin:{top:20,right:20,left:20,bottom:20}},r.a.createElement(h.c,{strokeDasharray:"3 3"}),r.a.createElement(h.h,null),r.a.createElement(h.a,{dataKey:"time",fill:"rgba(255,255,255,0.9)"})))))}var A=n(409),Q=n(173),_=n.n(Q),q=n(410);function B(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],i=t[1],u=p().setPage,l=Object(a.useRef)(function(){var e=localStorage.getItem("config");return!!(e&&e.length>0)}());return r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{anchor:"left",open:n,onClose:function(){return i(!1)}},r.a.createElement("div",{style:{padding:"1rem",backgroundColor:"rgba(0,0,0,1)",height:"100%"}},r.a.createElement("div",{className:c.a.button,onClick:function(){u(1),i(!1)}},"Home"),r.a.createElement("div",{className:c.a.button,style:{marginTop:"2rem"},onClick:function(){u(0),i(!1)}},"Change Settings"),r.a.createElement("div",{className:c.a.button,style:{marginTop:"2rem"},onClick:function(){u(2),i(!1)}},"View Report"))),l.current&&r.a.createElement("div",{style:{position:"absolute",top:"0",left:0}},r.a.createElement(q.a,{onClick:function(){return i(!0)}},r.a.createElement(_.a,{style:{color:"white",fontSize:"2rem"}}))))}function P(){return r.a.createElement(d,null,(function(e){return r.a.createElement(v,null,r.a.createElement("div",{className:c.a.main},0===e&&r.a.createElement(M,null),1===e&&r.a.createElement(k,null),2===e&&r.a.createElement(R,null),r.a.createElement(B,null)))}))}u.a.render(r.a.createElement(P,null),document.getElementById("root"))}},[[198,1,2]]]);
//# sourceMappingURL=main.583e471c.chunk.js.map