(this["webpackJsonpKRMN-UI"]=this["webpackJsonpKRMN-UI"]||[]).push([[0],{129:function(e,t,n){},229:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(45),r=n.n(s),a=n(2),i=n(3),l=(n(108),n(8)),o=n(15),d=n(32),u=n.n(d),j=n(93),b=n.n(j).a.create({baseURL:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_API_BASE_URL||"http://localhost:6868/api",headers:{"Content-type":"application/json"}});function m(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}var p,h,O={getAll:function(){return b.get("/tasks",{headers:m()})},get:function(e){return b.get("/tasks/".concat(e),{headers:m()})},create:function(e){return b.post("/tasks",e,{headers:m()})},update:function(e,t){return b.put("/tasks/".concat(e),t,{headers:m()})},remove:function(e){return b.delete("/tasks/".concat(e),{headers:m()})},removeAll:function(){return b.delete("/tasks",{headers:m()})},findByDesc:function(e){return b.get("/tasks?description=".concat(e),{headers:m()})},getCurrentUserTasks:function(){return b.get("/user/tasks",{headers:m()})}},f=n(6),x=n(4),v=n.n(x),g=n(12),N=n(9),w=Object(N.c)({name:"message",initialState:{},reducers:{setMessage:function(e,t){return{message:t.payload}},clearMessage:function(){return{message:""}}}}),k=w.reducer,S=w.actions,y=S.setMessage,I=S.clearMessage,T=k,C=Object(N.b)("task/create",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a,i,l,o,d;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.description,s=t.minutesSpent,r=t.date,a=t.completed,i=t.clientId,l=t.reviewerId,e.prev=1,e.next=4,O.create({description:c,minutesSpent:s,date:r,completed:a,clientId:i,reviewerId:l});case 4:return o=e.sent,e.abrupt("return",o.data);case 8:return e.prev=8,e.t0=e.catch(1),d=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(d)),e.abrupt("return",n.rejectWithValue());case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),A=Object(N.b)("Tasks/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),D=Object(N.b)("currentUsertasks/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),E=Object(N.b)("Tasks/update",function(){var e=Object(g.a)(v.a.mark((function e(t){var n,c,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.data,e.next=3,O.update(n,c);case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),R=Object(N.b)("Tasks/delete",function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,O.remove(n);case 3:return e.abrupt("return",{id:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L=Object(N.b)("Tasks/deleteAll",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.removeAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),F=Object(N.b)("Tasks/findByTitle",function(){var e=Object(g.a)(v.a.mark((function e(t){var n,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,e.next=3,O.findByDesc(n);case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),M=Object(N.c)({name:"Task",initialState:[],extraReducers:(p={},Object(l.a)(p,C.fulfilled,(function(e,t){e.push(t.payload)})),Object(l.a)(p,A.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),Object(l.a)(p,D.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),Object(l.a)(p,E.fulfilled,(function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));e[n]=Object(o.a)(Object(o.a)({},e[n]),t.payload)})),Object(l.a)(p,R.fulfilled,(function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));e.splice(n,1)})),Object(l.a)(p,L.fulfilled,(function(e,t){return[]})),Object(l.a)(p,F.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),p)}).reducer,q=n(0),_=function(e){var t=Object(a.c)((function(e){return e.client})),n=Object(a.c)((function(e){return e.user})),s=Object(c.useState)({id:null,clientId:null,date:null,description:"",minutesSpent:null,completed:!1,reviewerId:null}),r=Object(i.a)(s,2),d=r[0],j=r[1],b=Object(c.useState)(""),m=Object(i.a)(b,2),p=m[0],h=m[1],f=Object(a.b)();Object(c.useEffect)((function(){var t;t=e.match.params.id,O.get(t).then((function(e){j(e.data)})).catch((function(e){console.log(e)}))}),[e.match.params.id]);var x=function(e){var t=e.target,n=t.name,c=t.value;j(Object(o.a)(Object(o.a)({},d),{},Object(l.a)({},n,c)))},v=function(e){var t={id:d.id,clientId:d.clientId,reviewerId:d.reviewerId,description:d.description,completed:e,minutesSpent:d.minutesSpent,date:d.date};f(E({id:d.id,data:t})).unwrap().then((function(t){console.log(t),j(Object(o.a)(Object(o.a)({},d),{},{completed:e},!e&&{reviewerId:null})),h("The status was updated successfully!")})).catch((function(e){console.log(e)}))};return Object(q.jsx)("div",{children:d?Object(q.jsxs)("div",{className:"edit-form",children:[Object(q.jsx)("h4",{children:"Task"}),Object(q.jsxs)("form",{children:[Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"client",children:"Choose client:"}),Object(q.jsxs)("select",{className:"form-control",onChange:x,name:"clientId",id:"clients",children:[Object(q.jsx)("option",{value:"",children:"Select Client"}),t.map((function(e){return Object(q.jsx)("option",{selected:d.clientId===e.id,value:e.id,children:e.name},"client-".concat(e.id))}))]})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"taskDate",children:"Date:"}),Object(q.jsx)("input",{className:"form-control",type:"date",value:u()(d.date).format("YYYY-MM-DD"),id:"taskDate",name:"date",onChange:x})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"description",children:"Description"}),Object(q.jsx)("input",{type:"text",className:"form-control",id:"description",name:"description",value:d.description,onChange:x})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"minutesSpent",children:"Time Spent:"}),Object(q.jsx)("input",{type:"number",className:"form-control",id:"minutesSpent",required:!0,value:d.minutesSpent||"",onChange:x,name:"minutesSpent"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{children:Object(q.jsx)("strong",{children:"Status:"})}),d.completed?"Completed":"In-progress"]}),d.completed&&Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"reviewers",children:"Reviewer:"}),Object(q.jsxs)("select",{className:"form-control",onChange:x,name:"reviewerId",id:"reviewers",children:[Object(q.jsx)("option",{value:null,children:"Select Reviewer"}),n.map((function(e){return Object(q.jsx)("option",{selected:d.reviewerId===e.id,value:e.id,children:e.username},"reviewer-".concat(e.id))}))]})]})]}),d.completed?Object(q.jsx)("button",{className:"btn btn-md btn-primary mr-2",onClick:function(){return v(!1)},children:"In-Progress"}):Object(q.jsx)("button",{className:"btn btn-md btn-info mr-2",onClick:function(){return v(!0)},children:"Completed"}),Object(q.jsx)("button",{className:"btn btn-md btn-danger mr-2",onClick:function(){f(R({id:d.id})).unwrap().then((function(){e.history.push("/tasks")})).catch((function(e){console.log(e)}))},children:"Delete"}),Object(q.jsx)("button",{type:"submit",className:"btn btn-md mr-2 btn-success",onClick:function(){f(E({id:d.id,data:d})).unwrap().then((function(e){console.log(e),h("The task was updated successfully!")})).catch((function(e){console.log(e)}))},children:"Update"}),Object(q.jsx)("p",{children:p})]}):Object(q.jsxs)("div",{children:[Object(q.jsx)("br",{}),Object(q.jsx)("p",{children:"Please click on a Task to view..."})]})})},B=n(13),P=n(10),U=(n(129),{on:function(e,t){document.addEventListener(e,(function(e){return t(e.detail)}))},dispatch:function(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove:function(e,t){document.removeEventListener(e,t)}}),Y={getAll:function(){return b.get("/clients")}},V=Object(N.b)("clients/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),W=Object(N.c)({name:"client",initialState:[],extraReducers:Object(l.a)({},V.fulfilled,(function(e,t){return Object(f.a)(t.payload)}))}).reducer,K={getPublicContent:function(){return b.get("/all")},getUserBoard:function(){return b.get("/user",{headers:m()})},getModeratorBoard:function(){return b.get("/mod",{headers:m()})},getAdminBoard:function(){return b.get("/admin",{headers:m()})},retrieveReviewers:function(){return b.get("/reviewer")}},H=Object(N.b)("users/reviewer",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.retrieveReviewers();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),J=Object(N.c)({name:"client",initialState:[],extraReducers:Object(l.a)({},H.fulfilled,(function(e,t){return Object(f.a)(t.payload)}))}).reducer,z=n(7),G=n(17),Q=function(e){var t=Object(a.c)((function(e){return e.client})),n=Object(a.c)((function(e){return e.user})),s=Object(c.useState)(!1),r=Object(i.a)(s,2),d=r[0],j=r[1],b={description:"",completed:!1,date:u()().format("YYYY-MM-DD"),clientId:"",reviewerId:null,minutesSpent:""},m=Object(c.useState)(b),p=Object(i.a)(m,2),h=p[0],O=p[1],f=Object(c.useState)(!1),x=Object(i.a)(f,2),v=x[0],g=x[1],N=Object(a.c)((function(e){return e.message})).message,w=Object(a.b)();Object(c.useEffect)((function(){w(I())}),[w]);var k=function(e){var t=e.target,n=t.name,c=t.value;O(Object(o.a)(Object(o.a)({},h),{},Object(l.a)({},n,c)))},S=function(e,t){e.preventDefault(),j(t),O(Object(o.a)(Object(o.a)({},h),{},{completed:t}))},y=G.b().shape({clientId:G.c().required("This field is required!"),description:G.c().required("This field is required!"),minutesSpent:G.a().required("This field is required!")});return Object(q.jsx)(z.d,{initialValues:b,validationSchema:y,onSubmit:function(t){var n=t.description,c=t.minutesSpent,s=t.clientId;g(!0),e.saveTask(Object(o.a)(Object(o.a)({},h),{},{description:n,minutesSpent:c,clientId:s})).then((function(){g(!1)}))},children:Object(q.jsx)(z.c,{children:Object(q.jsxs)("div",{children:[N&&Object(q.jsx)("div",{className:"form-group",children:Object(q.jsx)("div",{className:"alert alert-danger",role:"alert",children:N})}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{htmlFor:"client",children:["Choose client",Object(q.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(q.jsxs)(z.b,{as:"select",className:"form-control",name:"clientId",id:"clientId",children:[Object(q.jsx)("option",{value:"",children:"Select Client"}),t.map((function(e){return Object(q.jsx)("option",{value:e.id,children:e.name},"client-".concat(e.id))}))]}),Object(q.jsx)(z.a,{name:"description",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{htmlFor:"taskDate",children:["Date",Object(q.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(q.jsx)("input",{className:"form-control",type:"date",value:h.date,id:"taskDate",name:"date",onChange:k})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{htmlFor:"description",children:["Description",Object(q.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(q.jsx)(z.b,{type:"text",className:"form-control",id:"description",name:"description"}),Object(q.jsx)(z.a,{name:"description",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{htmlFor:"minutesSpent",children:["Time Spent",Object(q.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(q.jsx)(z.b,{type:"number",className:"form-control",id:"minutesSpent",name:"minutesSpent"}),Object(q.jsx)(z.a,{name:"minutesSpent",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{children:["Status",Object(q.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(q.jsxs)("button",{className:"btn btn-md btn-info mr-2",onClick:function(e){return S(e,!d)},children:["In-progress ",!d&&Object(q.jsx)("input",{type:"checkbox",defaultChecked:!0})]}),Object(q.jsxs)("button",{className:"btn btn-md mr-2 btn-primary",onClick:function(e){return S(e,!d)},children:["completed ",d&&Object(q.jsx)("input",{type:"checkbox",defaultChecked:!0})]})]}),d&&Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsxs)("label",{htmlFor:"reviewers",children:["Reviewer By: ",Object(q.jsx)("small",{className:"text-center text-muted",children:"(optional)"}),": "]}),Object(q.jsxs)("select",{className:"form-control",onChange:k,name:"reviewerId",id:"reviewers",children:[Object(q.jsx)("option",{value:null,children:"Select Reviewer"}),n.map((function(e){return Object(q.jsx)("option",{value:e.id,children:e.username},"reviewer-".concat(e.id))}))]})]}),Object(q.jsx)("div",{className:"form-group",children:Object(q.jsxs)("button",{type:"submit",className:"btn btn-primary btn-block",children:[v&&!N&&Object(q.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(q.jsx)("span",{children:"Submit"})]})})]})})})},X=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)([]),l=Object(i.a)(r,2),o=l[0],d=l[1],u=Object(a.b)(),j=function(e){var t=e.description,n=e.completed,c=e.date,r=e.minutesSpent,a=e.reviewerId,i=e.clientId;u(C({description:t,date:c,completed:n,minutesSpent:r,reviewerId:a,clientId:i})).unwrap().then((function(){d([]),s(!0)})).catch((function(e){console.log("\ud83d\ude80 ~ file: AddTask.js ~ line 34 ~ saveTask ~ e",e.message)}))},b=Object(c.useCallback)(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u(V()),u(H()),d([Object(q.jsx)(Q,{saveTask:j},"task-1")]);case 3:case"end":return e.stop()}}),e)}))),[u]);Object(c.useEffect)((function(){b()}),[b]);return Object(q.jsx)("div",{className:"submit-form",children:n?Object(q.jsxs)("div",{children:[Object(q.jsx)("h4",{children:"You submitted successfully!"}),Object(q.jsx)("button",{className:"btn btn-success",onClick:function(e,t){return d([].concat(Object(f.a)(o),[Object(q.jsx)(Q,{saveTask:j},"task1")])),void s(!1)},children:"Add"})]}):Object(q.jsx)("div",{className:"row",children:Object(q.jsx)("div",{className:"col-md-12",style:{display:"flex",flexDirection:"column"},children:o.map((function(e){return e}))})})})},Z=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){K.getAdminBoard().then((function(e){s(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();s(t),e.response&&401===e.response.status&&U.dispatch("logout")}))}),[]),Object(q.jsx)("div",{className:"container",children:Object(q.jsx)("header",{className:"jumbotron",children:Object(q.jsx)("h3",{children:n})})})},$=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){K.getModeratorBoard().then((function(e){s(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();s(t),e.response&&401===e.response.status&&U.dispatch("logout")}))}),[]),Object(q.jsx)("div",{className:"container",children:Object(q.jsx)("header",{className:"jumbotron",children:Object(q.jsx)("h3",{children:n})})})},ee=function(){return Object(q.jsxs)("div",{className:"row",children:[Object(q.jsx)("div",{className:"col-sm-12",children:Object(q.jsx)("div",{className:"card",children:Object(q.jsxs)("div",{className:"card-body",children:[Object(q.jsx)("h5",{className:"card-title",children:"Thought for the Day!"}),Object(q.jsxs)("p",{className:"card-text",children:["Failures are the stepping stones for ",Object(q.jsx)("span",{style:{color:"green"},children:"success"})]}),Object(q.jsx)("button",{href:"#",className:"btn btn-primary",children:"Have a nice day"})]})})}),Object(q.jsx)("div",{className:"col-sm-12",children:Object(q.jsx)("div",{className:"card",children:Object(q.jsxs)("div",{className:"card-body",children:[Object(q.jsx)("h5",{className:"card-title",children:"Action Items for December"}),Object(q.jsx)("p",{className:"card-text",children:"With supporting text below as a natural lead-in to additional content."})]})})})]})},te={register:function(e,t,n){return b.post("auth/signup",{username:e,email:t,password:n})},login:function(e,t){return b.post("auth/signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))},logout:function(){localStorage.removeItem("user")}},ne=JSON.parse(localStorage.getItem("user")),ce=Object(N.b)("auth/register",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.username,s=t.email,r=t.password,e.prev=1,e.next=4,te.register(c,s,r);case 4:return a=e.sent,n.dispatch(y(a.data.message)),e.abrupt("return",a.data);case 9:return e.prev=9,e.t0=e.catch(1),i=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(i)),e.abrupt("return",n.rejectWithValue());case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}()),se=Object(N.b)("auth/login",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.username,s=t.password,e.prev=1,e.next=4,te.login(c,s);case 4:return r=e.sent,e.abrupt("return",{user:r});case 8:return e.prev=8,e.t0=e.catch(1),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(a)),e.abrupt("return",n.rejectWithValue());case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),re=Object(N.b)("auth/logout",(function(){te.logout()})),ae=ne?{isLoggedIn:!0,user:ne}:{isLoggedIn:!1,user:null},ie=Object(N.c)({name:"auth",initialState:ae,extraReducers:(h={},Object(l.a)(h,ce.fulfilled,(function(e,t){e.isLoggedIn=!1})),Object(l.a)(h,ce.rejected,(function(e,t){e.isLoggedIn=!1})),Object(l.a)(h,se.fulfilled,(function(e,t){e.isLoggedIn=!0,e.user=t.payload.user})),Object(l.a)(h,se.rejected,(function(e,t){e.isLoggedIn=!1,e.user=null})),Object(l.a)(h,re.fulfilled,(function(e,t){e.isLoggedIn=!1,e.user=null})),h)}).reducer,le=function(e){var t=Object(c.useState)(!1),n=Object(i.a)(t,2),s=n[0],r=n[1],l=Object(a.c)((function(e){return e.auth})).isLoggedIn,o=Object(a.c)((function(e){return e.message})).message,d=Object(a.b)();Object(c.useEffect)((function(){d(I())}),[d]);var u=G.b().shape({username:G.c().required("This field is required!"),password:G.c().required("This field is required!")});return l?Object(q.jsx)(P.a,{to:"/profile"}):Object(q.jsxs)("div",{className:"col-md-12 login-form",children:[Object(q.jsxs)("div",{className:"card card-container",children:[Object(q.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(q.jsx)(z.d,{initialValues:{username:"",password:""},validationSchema:u,onSubmit:function(t){var n=t.username,c=t.password;r(!0),d(se({username:n,password:c})).unwrap().then((function(){e.history.push("/profile"),window.location.reload()})).catch((function(){r(!1)}))},children:Object(q.jsxs)(z.c,{children:[Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"username",children:"Username"}),Object(q.jsx)(z.b,{name:"username",type:"text",className:"form-control"}),Object(q.jsx)(z.a,{name:"username",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"password",children:"Password"}),Object(q.jsx)(z.b,{name:"password",type:"password",className:"form-control"}),Object(q.jsx)(z.a,{name:"password",component:"div",className:"alert alert-danger"})]}),Object(q.jsx)("div",{className:"form-group",children:Object(q.jsxs)("button",{type:"submit",className:"btn btn-primary btn-block",disabled:s,children:[s&&Object(q.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(q.jsx)("span",{children:"Login"})]})})]})})]}),o&&Object(q.jsx)("div",{className:"form-group",children:Object(q.jsx)("div",{className:"alert alert-danger",role:"alert",children:o})})]})},oe=function(){var e=Object(a.c)((function(e){return e.auth})).user;return e?Object(q.jsxs)("div",{className:"container",children:[Object(q.jsx)("header",{className:"jumbotron",children:Object(q.jsxs)("h3",{children:[Object(q.jsx)("strong",{children:e.username})," Profile"]})}),Object(q.jsxs)("p",{children:[Object(q.jsx)("strong",{children:"Token:"})," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)]}),Object(q.jsxs)("p",{children:[Object(q.jsx)("strong",{children:"Id:"})," ",e.id]}),Object(q.jsxs)("p",{children:[Object(q.jsx)("strong",{children:"Email:"})," ",e.email]}),Object(q.jsx)("strong",{children:"Authorities:"}),Object(q.jsx)("ul",{children:e.roles&&e.roles.map((function(e,t){return Object(q.jsx)("li",{children:e},t)}))})]}):Object(q.jsx)(P.a,{to:"/login"})},de=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(a.c)((function(e){return e.message})).message,l=Object(a.b)();Object(c.useEffect)((function(){l(I())}),[l]);var o=G.b().shape({username:G.c().test("len","The username must be between 3 and 20 characters.",(function(e){return e&&e.toString().length>=3&&e.toString().length<=20})).required("This field is required!"),email:G.c().email("This is not a valid email.").required("This field is required!"),password:G.c().test("len","The password must be between 6 and 40 characters.",(function(e){return e&&e.toString().length>=6&&e.toString().length<=40})).required("This field is required!")});return Object(q.jsxs)("div",{className:"col-md-12 signup-form",children:[Object(q.jsxs)("div",{className:"card card-container",children:[Object(q.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(q.jsx)(z.d,{initialValues:{username:"",email:"",password:""},validationSchema:o,onSubmit:function(e){var t=e.username,n=e.email,c=e.password;s(!1),l(ce({username:t,email:n,password:c})).unwrap().then((function(){s(!0)})).catch((function(){s(!1)}))},children:Object(q.jsx)(z.c,{children:!n&&Object(q.jsxs)("div",{children:[Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"username",children:"Username"}),Object(q.jsx)(z.b,{name:"username",type:"text",className:"form-control"}),Object(q.jsx)(z.a,{name:"username",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"email",children:"Email"}),Object(q.jsx)(z.b,{name:"email",type:"email",className:"form-control"}),Object(q.jsx)(z.a,{name:"email",component:"div",className:"alert alert-danger"})]}),Object(q.jsxs)("div",{className:"form-group",children:[Object(q.jsx)("label",{htmlFor:"password",children:"Set Password"}),Object(q.jsx)(z.b,{name:"password",type:"text",className:"form-control"}),Object(q.jsx)(z.a,{name:"password",component:"div",className:"alert alert-danger"})]}),Object(q.jsx)("div",{className:"form-group",children:Object(q.jsx)("button",{type:"submit",className:"btn btn-primary btn-block",children:"Create"})})]})})})]}),r&&Object(q.jsx)("div",{className:"form-group",children:Object(q.jsx)("div",{className:n?"alert alert-success":"alert alert-danger",role:"alert",children:r})})]})},ue=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(a.c)((function(e){return e.tasks})),l=Object(a.c)((function(e){return e.client})),o=Object(a.c)((function(e){return e.user})),d=Object(a.b)(),j=Object(c.useCallback)((function(){l.length||d(V()),o.length||d(H()),d(A())}),[d]);Object(c.useEffect)((function(){j()}),[j]);return Object(q.jsxs)("div",{className:" row",children:[Object(q.jsx)("div",{className:"col-md-12",children:Object(q.jsxs)("div",{className:"input-group mb-3",children:[Object(q.jsx)("input",{type:"text",className:"form-control",placeholder:"Search by description",value:n,onChange:function(e){var t=e.target.value;s(t)}}),Object(q.jsx)("div",{className:"input-group-append",children:Object(q.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:function(){d(F({description:n}))},children:"Search"})})]})}),Object(q.jsxs)("div",{className:"col-md-12",children:[Object(q.jsx)("h4",{children:"Task List"}),r&&Object(q.jsxs)("table",{className:"table",children:[Object(q.jsx)("thead",{children:Object(q.jsxs)("tr",{children:[Object(q.jsx)("th",{children:"#"}),Object(q.jsx)("th",{children:"Client"}),Object(q.jsx)("th",{children:"Desc"}),Object(q.jsx)("th",{children:"Date"}),Object(q.jsx)("th",{children:"Time Spent"}),Object(q.jsx)("th",{children:"Status"}),Object(q.jsx)("th",{children:"Reviewer"}),Object(q.jsx)("th",{colSpan:"2",children:"Actions"})]})}),Object(q.jsx)("tbody",{children:r.map((function(e,t){var n="";l.map((function(t){return t.id===e.clientId&&(n=t.name),!0}));var c="";return o.map((function(t){return t.id===e.reviewerId&&(c=t.username),!0})),Object(q.jsxs)("tr",{className:e.completed?"table-success":"table-warning",children:[Object(q.jsx)("td",{children:t+1}),Object(q.jsx)("td",{children:n}),Object(q.jsx)("td",{children:e.description.substr(0,10)}),Object(q.jsx)("td",{children:u()(e.date).format("DD/MM/yyyy")}),Object(q.jsxs)("td",{children:[e.minutesSpent," mins"]}),Object(q.jsx)("td",{children:e.completed?"Completed":"In-Progress"}),Object(q.jsx)("td",{children:c}),Object(q.jsxs)("td",{style:{display:"inline-flex"},children:[Object(q.jsx)(B.c,{to:"/tasks/"+e.id,className:"btn btn-sm btn-warning mr-2 mt-0",children:"Edit"}),Object(q.jsx)("button",{className:"btn btn-sm btn-danger mr-2 mt-0",onClick:function(){return t=e.id,void(window.confirm("Are you sure you want to delete the task ?")&&d(R({id:t})).unwrap().catch((function(e){console.log(e)})));var t},children:"Delete"})]})]},"task-row-".concat(t))}))})]}),0===r.length?Object(q.jsx)("h5",{className:"text-center text-info",children:"No Records Found"}):Object(q.jsx)("button",{className:"m-3 btn btn-sm btn-danger",onClick:function(){window.confirm("Are you sure you want to delete all tasks ?")&&d(L()).catch((function(e){console.log(e)}))},children:"Remove All"})]})]})},je=n(14),be=Object(je.a)(),me=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),l=Object(i.a)(r,2),o=l[0],d=l[1],u=Object(a.c)((function(e){return e.auth})).user,j=Object(a.b)();Object(c.useEffect)((function(){be.listen((function(e){j(I())}))}),[j]);var b=Object(c.useCallback)((function(){j(re())}),[j]);return Object(c.useEffect)((function(){return u?(s(u.roles.includes("ROLE_MODERATOR")),d(u.roles.includes("ROLE_ADMIN"))):(s(!1),d(!1)),U.on("logout",(function(){b()})),function(){U.remove("logout")}}),[u,b]),Object(q.jsx)(B.a,{history:be,children:Object(q.jsxs)("div",{children:[Object(q.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(q.jsx)(B.c,{to:"/",className:"navbar-brand",children:"KRMN & Associates"}),Object(q.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/home",className:"nav-link",children:"Home"})}),n&&Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/mod",className:"nav-link",children:"Moderator Board"})}),o&&Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/admin",className:"nav-link",children:"Admin Board"})}),u&&Object(q.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/taskList",className:"nav-link",children:"Task List"})}),Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/addTask",className:"nav-link",children:"Add Task"})}),o&&Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/register",className:"nav-link",children:"Add Staff Member"})})]})]}),u?Object(q.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/profile",className:"nav-link",children:u.username})}),Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)("a",{href:"/login",className:"nav-link",onClick:b,children:"LogOut"})})]}):Object(q.jsx)("div",{className:"navbar-nav ml-auto",children:Object(q.jsx)("li",{className:"nav-item",children:Object(q.jsx)(B.c,{to:"/login",className:"nav-link",children:"Login"})})})]}),Object(q.jsx)("div",{className:"container mt-3",children:Object(q.jsxs)(P.d,{children:[Object(q.jsx)(P.b,{exact:!0,path:["/","/home"],component:ee}),Object(q.jsx)(P.b,{exact:!0,path:"/login",component:le}),Object(q.jsx)(P.b,{exact:!0,path:"/register",component:de}),Object(q.jsx)(P.b,{exact:!0,path:"/profile",component:oe}),Object(q.jsx)(P.b,{path:"/taskList",component:ue}),Object(q.jsx)(P.b,{path:"/addTask",component:X}),Object(q.jsx)(P.b,{path:"/mod",component:$}),Object(q.jsx)(P.b,{path:"/admin",component:Z}),Object(q.jsx)(P.b,{path:"/tasks/:id",component:_})]})})]})})},pe={auth:ie,message:T,tasks:M,user:J,client:W},he=Object(N.a)({reducer:pe,devTools:!0});r.a.render(Object(q.jsx)(a.a,{store:he,children:Object(q.jsx)(B.b,{basename:"/#",children:Object(q.jsx)(me,{})})}),document.getElementById("root"))}},[[229,1,2]]]);
//# sourceMappingURL=main.914a6aea.chunk.js.map