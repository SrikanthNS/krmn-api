(this["webpackJsonpKRMN-UI"]=this["webpackJsonpKRMN-UI"]||[]).push([[0],{129:function(e,t,n){},229:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n(45),r=n.n(s),a=n(2),i=n(3),l=(n(108),n(8)),o=n(15),d=n(32),u=n.n(d),j=n(93),b=n.n(j).a.create({baseURL:"/api",headers:{"Content-type":"application/json"}});function m(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}var p,h,O={getAll:function(){return b.get("/tasks",{headers:m()})},get:function(e){return b.get("/tasks/".concat(e),{headers:m()})},create:function(e){return b.post("/tasks",e,{headers:m()})},update:function(e,t){return b.put("/tasks/".concat(e),t,{headers:m()})},remove:function(e){return b.delete("/tasks/".concat(e),{headers:m()})},removeAll:function(){return b.delete("/tasks",{headers:m()})},findByDesc:function(e){return b.get("/tasks?description=".concat(e),{headers:m()})},getCurrentUserTasks:function(){return b.get("/user/tasks",{headers:m()})}},f=n(6),x=n(4),v=n.n(x),g=n(12),N=n(9),w=Object(N.c)({name:"message",initialState:{},reducers:{setMessage:function(e,t){return{message:t.payload}},clearMessage:function(){return{message:""}}}}),k=w.reducer,S=w.actions,y=S.setMessage,I=S.clearMessage,T=k,C=Object(N.b)("task/create",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a,i,l,o,d;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.description,s=t.minutesSpent,r=t.date,a=t.completed,i=t.clientId,l=t.reviewerId,e.prev=1,e.next=4,O.create({description:c,minutesSpent:s,date:r,completed:a,clientId:i,reviewerId:l});case 4:return o=e.sent,e.abrupt("return",o.data);case 8:return e.prev=8,e.t0=e.catch(1),d=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(d)),e.abrupt("return",n.rejectWithValue());case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),D=Object(N.b)("Tasks/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),A=Object(N.b)("currentUsertasks/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),E=Object(N.b)("Tasks/update",function(){var e=Object(g.a)(v.a.mark((function e(t){var n,c,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.data,e.next=3,O.update(n,c);case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),R=Object(N.b)("Tasks/delete",function(){var e=Object(g.a)(v.a.mark((function e(t){var n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,O.remove(n);case 3:return e.abrupt("return",{id:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),L=Object(N.b)("Tasks/deleteAll",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.removeAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),M=Object(N.b)("Tasks/findByTitle",function(){var e=Object(g.a)(v.a.mark((function e(t){var n,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.description,e.next=3,O.findByDesc(n);case 3:return c=e.sent,e.abrupt("return",c.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),q=Object(N.c)({name:"Task",initialState:[],extraReducers:(p={},Object(l.a)(p,C.fulfilled,(function(e,t){e.push(t.payload)})),Object(l.a)(p,D.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),Object(l.a)(p,A.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),Object(l.a)(p,E.fulfilled,(function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));e[n]=Object(o.a)(Object(o.a)({},e[n]),t.payload)})),Object(l.a)(p,R.fulfilled,(function(e,t){var n=e.findIndex((function(e){return e.id===t.payload.id}));e.splice(n,1)})),Object(l.a)(p,L.fulfilled,(function(e,t){return[]})),Object(l.a)(p,M.fulfilled,(function(e,t){return Object(f.a)(t.payload)})),p)}).reducer,F=n(0),B=function(e){var t=Object(a.c)((function(e){return e.client})),n=Object(a.c)((function(e){return e.user})),s=Object(c.useState)({id:null,clientId:null,date:null,description:"",minutesSpent:null,completed:!1,reviewerId:null}),r=Object(i.a)(s,2),d=r[0],j=r[1],b=Object(c.useState)(""),m=Object(i.a)(b,2),p=m[0],h=m[1],f=Object(a.b)();Object(c.useEffect)((function(){var t;t=e.match.params.id,O.get(t).then((function(e){j(e.data)})).catch((function(e){console.log(e)}))}),[e.match.params.id]);var x=function(e){var t=e.target,n=t.name,c=t.value;j(Object(o.a)(Object(o.a)({},d),{},Object(l.a)({},n,c)))},v=function(e){var t={id:d.id,clientId:d.clientId,reviewerId:d.reviewerId,description:d.description,completed:e,minutesSpent:d.minutesSpent,date:d.date};f(E({id:d.id,data:t})).unwrap().then((function(t){console.log(t),j(Object(o.a)(Object(o.a)({},d),{},{completed:e},!e&&{reviewerId:null})),h("The status was updated successfully!")})).catch((function(e){console.log(e)}))};return Object(F.jsx)("div",{children:d?Object(F.jsxs)("div",{className:"edit-form",children:[Object(F.jsx)("h4",{children:"Task"}),Object(F.jsxs)("form",{children:[Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"client",children:"Choose client:"}),Object(F.jsxs)("select",{className:"form-control",onChange:x,name:"clientId",id:"clients",children:[Object(F.jsx)("option",{value:"",children:"Select Client"}),t.map((function(e){return Object(F.jsx)("option",{selected:d.clientId===e.id,value:e.id,children:e.name},"client-".concat(e.id))}))]})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"taskDate",children:"Date:"}),Object(F.jsx)("input",{className:"form-control",type:"date",value:u()(d.date).format("YYYY-MM-DD"),id:"taskDate",name:"date",onChange:x})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"description",children:"Description"}),Object(F.jsx)("input",{type:"text",className:"form-control",id:"description",name:"description",value:d.description,onChange:x})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"minutesSpent",children:"Time Spent:"}),Object(F.jsx)("input",{type:"number",className:"form-control",id:"minutesSpent",required:!0,value:d.minutesSpent||"",onChange:x,name:"minutesSpent"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{children:Object(F.jsx)("strong",{children:"Status:"})}),d.completed?"Completed":"In-progress"]}),d.completed&&Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"reviewers",children:"Reviewer:"}),Object(F.jsxs)("select",{className:"form-control",onChange:x,name:"reviewerId",id:"reviewers",children:[Object(F.jsx)("option",{value:null,children:"Select Reviewer"}),n.map((function(e){return Object(F.jsx)("option",{selected:d.reviewerId===e.id,value:e.id,children:e.username},"reviewer-".concat(e.id))}))]})]})]}),d.completed?Object(F.jsx)("button",{className:"btn btn-md btn-primary mr-2",onClick:function(){return v(!1)},children:"In-Progress"}):Object(F.jsx)("button",{className:"btn btn-md btn-info mr-2",onClick:function(){return v(!0)},children:"Completed"}),Object(F.jsx)("button",{className:"btn btn-md btn-danger mr-2",onClick:function(){f(R({id:d.id})).unwrap().then((function(){e.history.push("/tasks")})).catch((function(e){console.log(e)}))},children:"Delete"}),Object(F.jsx)("button",{type:"submit",className:"btn btn-md mr-2 btn-success",onClick:function(){f(E({id:d.id,data:d})).unwrap().then((function(e){console.log(e),h("The task was updated successfully!")})).catch((function(e){console.log(e)}))},children:"Update"}),Object(F.jsx)("p",{children:p})]}):Object(F.jsxs)("div",{children:[Object(F.jsx)("br",{}),Object(F.jsx)("p",{children:"Please click on a Task to view..."})]})})},U=n(13),Y=n(10),P=(n(129),{on:function(e,t){document.addEventListener(e,(function(e){return t(e.detail)}))},dispatch:function(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove:function(e,t){document.removeEventListener(e,t)}}),V={getAll:function(){return b.get("/clients")}},J=Object(N.b)("clients/retrieve",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.getAll();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),W=Object(N.c)({name:"client",initialState:[],extraReducers:Object(l.a)({},J.fulfilled,(function(e,t){return Object(f.a)(t.payload)}))}).reducer,_={getPublicContent:function(){return b.get("/all")},getUserBoard:function(){return b.get("/user",{headers:m()})},getModeratorBoard:function(){return b.get("/mod",{headers:m()})},getAdminBoard:function(){return b.get("/admin",{headers:m()})},retrieveReviewers:function(){return b.get("/reviewer")}},K=Object(N.b)("users/reviewer",Object(g.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.retrieveReviewers();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),H=Object(N.c)({name:"client",initialState:[],extraReducers:Object(l.a)({},K.fulfilled,(function(e,t){return Object(f.a)(t.payload)}))}).reducer,z=n(7),G=n(17),Q=function(e){var t=Object(a.c)((function(e){return e.client})),n=Object(a.c)((function(e){return e.user})),s=Object(c.useState)(!1),r=Object(i.a)(s,2),d=r[0],j=r[1],b={description:"",completed:!1,date:u()().format("YYYY-MM-DD"),clientId:"",reviewerId:null,minutesSpent:""},m=Object(c.useState)(b),p=Object(i.a)(m,2),h=p[0],O=p[1],f=Object(c.useState)(!1),x=Object(i.a)(f,2),v=x[0],g=x[1],N=Object(a.c)((function(e){return e.message})).message,w=Object(a.b)();Object(c.useEffect)((function(){w(I())}),[w]);var k=function(e){var t=e.target,n=t.name,c=t.value;O(Object(o.a)(Object(o.a)({},h),{},Object(l.a)({},n,c)))},S=function(e,t){e.preventDefault(),j(t),O(Object(o.a)(Object(o.a)({},h),{},{completed:t}))},y=G.b().shape({clientId:G.c().required("This field is required!"),description:G.c().required("This field is required!"),minutesSpent:G.a().required("This field is required!")});return Object(F.jsx)(z.d,{initialValues:b,validationSchema:y,onSubmit:function(t){var n=t.description,c=t.minutesSpent,s=t.clientId;g(!0),e.saveTask(Object(o.a)(Object(o.a)({},h),{},{description:n,minutesSpent:c,clientId:s})).then((function(){g(!1)}))},children:Object(F.jsx)(z.c,{children:Object(F.jsxs)("div",{children:[N&&Object(F.jsx)("div",{className:"form-group",children:Object(F.jsx)("div",{className:"alert alert-danger",role:"alert",children:N})}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{htmlFor:"client",children:["Choose client",Object(F.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(F.jsxs)(z.b,{as:"select",className:"form-control",name:"clientId",id:"clientId",children:[Object(F.jsx)("option",{value:"",children:"Select Client"}),t.map((function(e){return Object(F.jsx)("option",{value:e.id,children:e.name},"client-".concat(e.id))}))]}),Object(F.jsx)(z.a,{name:"description",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{htmlFor:"taskDate",children:["Date",Object(F.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(F.jsx)("input",{className:"form-control",type:"date",value:h.date,id:"taskDate",name:"date",onChange:k})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{htmlFor:"description",children:["Description",Object(F.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(F.jsx)(z.b,{type:"text",className:"form-control",id:"description",name:"description"}),Object(F.jsx)(z.a,{name:"description",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{htmlFor:"minutesSpent",children:["Time Spent",Object(F.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(F.jsx)(z.b,{type:"number",className:"form-control",id:"minutesSpent",name:"minutesSpent"}),Object(F.jsx)(z.a,{name:"minutesSpent",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{children:["Status",Object(F.jsx)("sup",{className:"text-center text-danger",children:"*"}),":"]}),Object(F.jsxs)("button",{className:"btn btn-md btn-info mr-2",onClick:function(e){return S(e,!d)},children:["In-progress ",!d&&Object(F.jsx)("input",{type:"checkbox",defaultChecked:!0})]}),Object(F.jsxs)("button",{className:"btn btn-md mr-2 btn-primary",onClick:function(e){return S(e,!d)},children:["completed ",d&&Object(F.jsx)("input",{type:"checkbox",defaultChecked:!0})]})]}),d&&Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsxs)("label",{htmlFor:"reviewers",children:["Reviewer By: ",Object(F.jsx)("small",{className:"text-center text-muted",children:"(optional)"}),": "]}),Object(F.jsxs)("select",{className:"form-control",onChange:k,name:"reviewerId",id:"reviewers",children:[Object(F.jsx)("option",{value:null,children:"Select Reviewer"}),n.map((function(e){return Object(F.jsx)("option",{value:e.id,children:e.username},"reviewer-".concat(e.id))}))]})]}),Object(F.jsx)("div",{className:"form-group",children:Object(F.jsxs)("button",{type:"submit",className:"btn btn-primary btn-block",children:[v&&!N&&Object(F.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(F.jsx)("span",{children:"Submit"})]})})]})})})},X=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)([]),l=Object(i.a)(r,2),o=l[0],d=l[1],u=Object(a.b)(),j=function(e){var t=e.description,n=e.completed,c=e.date,r=e.minutesSpent,a=e.reviewerId,i=e.clientId;u(C({description:t,date:c,completed:n,minutesSpent:r,reviewerId:a,clientId:i})).unwrap().then((function(){d([]),s(!0)})).catch((function(e){console.log("\ud83d\ude80 ~ file: AddTask.js ~ line 34 ~ saveTask ~ e",e.message)}))},b=Object(c.useCallback)(Object(g.a)(v.a.mark((function e(){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u(J()),u(K()),d([Object(F.jsx)(Q,{saveTask:j},"task-1")]);case 3:case"end":return e.stop()}}),e)}))),[u]);Object(c.useEffect)((function(){b()}),[b]);return Object(F.jsx)("div",{className:"submit-form",children:n?Object(F.jsxs)("div",{children:[Object(F.jsx)("h4",{children:"You submitted successfully!"}),Object(F.jsx)("button",{className:"btn btn-success",onClick:function(e,t){return d([].concat(Object(f.a)(o),[Object(F.jsx)(Q,{saveTask:j},"task1")])),void s(!1)},children:"Add"})]}):Object(F.jsx)("div",{className:"row",children:Object(F.jsx)("div",{className:"col-md-12",style:{display:"flex",flexDirection:"column"},children:o.map((function(e){return e}))})})})},Z=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){_.getAdminBoard().then((function(e){s(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();s(t),e.response&&401===e.response.status&&P.dispatch("logout")}))}),[]),Object(F.jsx)("div",{className:"container",children:Object(F.jsx)("header",{className:"jumbotron",children:Object(F.jsx)("h3",{children:n})})})},$=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){_.getModeratorBoard().then((function(e){s(e.data)}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();s(t),e.response&&401===e.response.status&&P.dispatch("logout")}))}),[]),Object(F.jsx)("div",{className:"container",children:Object(F.jsx)("header",{className:"jumbotron",children:Object(F.jsx)("h3",{children:n})})})},ee=function(){return Object(F.jsxs)("div",{className:"row",children:[Object(F.jsx)("div",{className:"col-sm-12",children:Object(F.jsx)("div",{className:"card",children:Object(F.jsxs)("div",{className:"card-body",children:[Object(F.jsx)("h5",{className:"card-title",children:"Thought for the Day!"}),Object(F.jsxs)("p",{className:"card-text",children:["Failures are the stepping stones for ",Object(F.jsx)("span",{style:{color:"green"},children:"success"})]}),Object(F.jsx)("button",{href:"#",className:"btn btn-primary",children:"Have a nice day"})]})})}),Object(F.jsx)("div",{className:"col-sm-12",children:Object(F.jsx)("div",{className:"card",children:Object(F.jsxs)("div",{className:"card-body",children:[Object(F.jsx)("h5",{className:"card-title",children:"Action Items for December"}),Object(F.jsx)("p",{className:"card-text",children:"With supporting text below as a natural lead-in to additional content."})]})})})]})},te={register:function(e,t,n){return b.post("auth/signup",{username:e,email:t,password:n})},login:function(e,t){return b.post("auth/signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))},logout:function(){localStorage.removeItem("user")}},ne=JSON.parse(localStorage.getItem("user")),ce=Object(N.b)("auth/register",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.username,s=t.email,r=t.password,e.prev=1,e.next=4,te.register(c,s,r);case 4:return a=e.sent,n.dispatch(y(a.data.message)),e.abrupt("return",a.data);case 9:return e.prev=9,e.t0=e.catch(1),i=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(i)),e.abrupt("return",n.rejectWithValue());case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}()),se=Object(N.b)("auth/login",function(){var e=Object(g.a)(v.a.mark((function e(t,n){var c,s,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.username,s=t.password,e.prev=1,e.next=4,te.login(c,s);case 4:return r=e.sent,e.abrupt("return",{user:r});case 8:return e.prev=8,e.t0=e.catch(1),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.message||e.t0.message||e.t0.toString(),n.dispatch(y(a)),e.abrupt("return",n.rejectWithValue());case 13:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),re=Object(N.b)("auth/logout",(function(){te.logout()})),ae=ne?{isLoggedIn:!0,user:ne}:{isLoggedIn:!1,user:null},ie=Object(N.c)({name:"auth",initialState:ae,extraReducers:(h={},Object(l.a)(h,ce.fulfilled,(function(e,t){e.isLoggedIn=!1})),Object(l.a)(h,ce.rejected,(function(e,t){e.isLoggedIn=!1})),Object(l.a)(h,se.fulfilled,(function(e,t){e.isLoggedIn=!0,e.user=t.payload.user})),Object(l.a)(h,se.rejected,(function(e,t){e.isLoggedIn=!1,e.user=null})),Object(l.a)(h,re.fulfilled,(function(e,t){e.isLoggedIn=!1,e.user=null})),h)}).reducer,le=function(e){var t=Object(c.useState)(!1),n=Object(i.a)(t,2),s=n[0],r=n[1],l=Object(a.c)((function(e){return e.auth})).isLoggedIn,o=Object(a.c)((function(e){return e.message})).message,d=Object(a.b)();Object(c.useEffect)((function(){d(I())}),[d]);var u=G.b().shape({username:G.c().required("This field is required!"),password:G.c().required("This field is required!")});return l?Object(F.jsx)(Y.a,{to:"/profile"}):Object(F.jsxs)("div",{className:"col-md-12 login-form",children:[Object(F.jsxs)("div",{className:"card card-container",children:[Object(F.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(F.jsx)(z.d,{initialValues:{username:"",password:""},validationSchema:u,onSubmit:function(t){var n=t.username,c=t.password;r(!0),d(se({username:n,password:c})).unwrap().then((function(){e.history.push("/profile"),window.location.reload()})).catch((function(){r(!1)}))},children:Object(F.jsxs)(z.c,{children:[Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"username",children:"Username"}),Object(F.jsx)(z.b,{name:"username",type:"text",className:"form-control"}),Object(F.jsx)(z.a,{name:"username",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"password",children:"Password"}),Object(F.jsx)(z.b,{name:"password",type:"password",className:"form-control"}),Object(F.jsx)(z.a,{name:"password",component:"div",className:"alert alert-danger"})]}),Object(F.jsx)("div",{className:"form-group",children:Object(F.jsxs)("button",{type:"submit",className:"btn btn-primary btn-block",disabled:s,children:[s&&Object(F.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(F.jsx)("span",{children:"Login"})]})})]})})]}),o&&Object(F.jsx)("div",{className:"form-group",children:Object(F.jsx)("div",{className:"alert alert-danger",role:"alert",children:o})})]})},oe=function(){var e=Object(a.c)((function(e){return e.auth})).user;return e?Object(F.jsxs)("div",{className:"container",children:[Object(F.jsx)("header",{className:"jumbotron",children:Object(F.jsxs)("h3",{children:[Object(F.jsx)("strong",{children:e.username})," Profile"]})}),Object(F.jsxs)("p",{children:[Object(F.jsx)("strong",{children:"Token:"})," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)]}),Object(F.jsxs)("p",{children:[Object(F.jsx)("strong",{children:"Id:"})," ",e.id]}),Object(F.jsxs)("p",{children:[Object(F.jsx)("strong",{children:"Email:"})," ",e.email]}),Object(F.jsx)("strong",{children:"Authorities:"}),Object(F.jsx)("ul",{children:e.roles&&e.roles.map((function(e,t){return Object(F.jsx)("li",{children:e},t)}))})]}):Object(F.jsx)(Y.a,{to:"/login"})},de=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(a.c)((function(e){return e.message})).message,l=Object(a.b)();Object(c.useEffect)((function(){l(I())}),[l]);var o=G.b().shape({username:G.c().test("len","The username must be between 3 and 20 characters.",(function(e){return e&&e.toString().length>=3&&e.toString().length<=20})).required("This field is required!"),email:G.c().email("This is not a valid email.").required("This field is required!"),password:G.c().test("len","The password must be between 6 and 40 characters.",(function(e){return e&&e.toString().length>=6&&e.toString().length<=40})).required("This field is required!")});return Object(F.jsxs)("div",{className:"col-md-12 signup-form",children:[Object(F.jsxs)("div",{className:"card card-container",children:[Object(F.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(F.jsx)(z.d,{initialValues:{username:"",email:"",password:""},validationSchema:o,onSubmit:function(e){var t=e.username,n=e.email,c=e.password;s(!1),l(ce({username:t,email:n,password:c})).unwrap().then((function(){s(!0)})).catch((function(){s(!1)}))},children:Object(F.jsx)(z.c,{children:!n&&Object(F.jsxs)("div",{children:[Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"username",children:"Username"}),Object(F.jsx)(z.b,{name:"username",type:"text",className:"form-control"}),Object(F.jsx)(z.a,{name:"username",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"email",children:"Email"}),Object(F.jsx)(z.b,{name:"email",type:"email",className:"form-control"}),Object(F.jsx)(z.a,{name:"email",component:"div",className:"alert alert-danger"})]}),Object(F.jsxs)("div",{className:"form-group",children:[Object(F.jsx)("label",{htmlFor:"password",children:"Set Password"}),Object(F.jsx)(z.b,{name:"password",type:"text",className:"form-control"}),Object(F.jsx)(z.a,{name:"password",component:"div",className:"alert alert-danger"})]}),Object(F.jsx)("div",{className:"form-group",children:Object(F.jsx)("button",{type:"submit",className:"btn btn-primary btn-block",children:"Create"})})]})})})]}),r&&Object(F.jsx)("div",{className:"form-group",children:Object(F.jsx)("div",{className:n?"alert alert-success":"alert alert-danger",role:"alert",children:r})})]})},ue=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(a.c)((function(e){return e.tasks})),l=Object(a.c)((function(e){return e.client})),o=Object(a.c)((function(e){return e.user})),d=Object(a.b)(),j=Object(c.useCallback)((function(){l.length||d(J()),o.length||d(K()),d(D())}),[d]);Object(c.useEffect)((function(){j()}),[j]);return Object(F.jsxs)("div",{className:" row",children:[Object(F.jsx)("div",{className:"col-md-12",children:Object(F.jsxs)("div",{className:"input-group mb-3",children:[Object(F.jsx)("input",{type:"text",className:"form-control",placeholder:"Search by description",value:n,onChange:function(e){var t=e.target.value;s(t)}}),Object(F.jsx)("div",{className:"input-group-append",children:Object(F.jsx)("button",{className:"btn btn-outline-secondary",type:"button",onClick:function(){d(M({description:n}))},children:"Search"})})]})}),Object(F.jsxs)("div",{className:"col-md-12",children:[Object(F.jsx)("h4",{children:"Task List"}),r&&Object(F.jsxs)("table",{className:"table",children:[Object(F.jsx)("thead",{children:Object(F.jsxs)("tr",{children:[Object(F.jsx)("th",{children:"#"}),Object(F.jsx)("th",{children:"Client"}),Object(F.jsx)("th",{children:"Desc"}),Object(F.jsx)("th",{children:"Date"}),Object(F.jsx)("th",{children:"Time Spent"}),Object(F.jsx)("th",{children:"Status"}),Object(F.jsx)("th",{children:"Reviewer"}),Object(F.jsx)("th",{colSpan:"2",children:"Actions"})]})}),Object(F.jsx)("tbody",{children:r.map((function(e,t){var n="";l.map((function(t){return t.id===e.clientId&&(n=t.name),!0}));var c="";return o.map((function(t){return t.id===e.reviewerId&&(c=t.username),!0})),Object(F.jsxs)("tr",{className:e.completed?"table-success":"table-warning",children:[Object(F.jsx)("td",{children:t+1}),Object(F.jsx)("td",{children:n}),Object(F.jsx)("td",{children:e.description.substr(0,10)}),Object(F.jsx)("td",{children:u()(e.date).format("DD/MM/yyyy")}),Object(F.jsxs)("td",{children:[e.minutesSpent," mins"]}),Object(F.jsx)("td",{children:e.completed?"Completed":"In-Progress"}),Object(F.jsx)("td",{children:c}),Object(F.jsxs)("td",{style:{display:"inline-flex"},children:[Object(F.jsx)(U.c,{to:"/tasks/"+e.id,className:"btn btn-sm btn-warning mr-2 mt-0",children:"Edit"}),Object(F.jsx)("button",{className:"btn btn-sm btn-danger mr-2 mt-0",onClick:function(){return t=e.id,void(window.confirm("Are you sure you want to delete the task ?")&&d(R({id:t})).unwrap().catch((function(e){console.log(e)})));var t},children:"Delete"})]})]},"task-row-".concat(t))}))})]}),0===r.length?Object(F.jsx)("h5",{className:"text-center text-info",children:"No Records Found"}):Object(F.jsx)("button",{className:"m-3 btn btn-sm btn-danger",onClick:function(){window.confirm("Are you sure you want to delete all tasks ?")&&d(L()).catch((function(e){console.log(e)}))},children:"Remove All"})]})]})},je=n(14),be=Object(je.a)(),me=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),l=Object(i.a)(r,2),o=l[0],d=l[1],u=Object(a.c)((function(e){return e.auth})).user,j=Object(a.b)();Object(c.useEffect)((function(){be.listen((function(e){j(I())}))}),[j]);var b=Object(c.useCallback)((function(){j(re())}),[j]);return Object(c.useEffect)((function(){return u?(s(u.roles.includes("ROLE_MODERATOR")),d(u.roles.includes("ROLE_ADMIN"))):(s(!1),d(!1)),P.on("logout",(function(){b()})),function(){P.remove("logout")}}),[u,b]),Object(F.jsx)(U.a,{history:be,children:Object(F.jsxs)("div",{children:[Object(F.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(F.jsx)(U.c,{to:"/",className:"navbar-brand",children:"KRMN & Associates"}),Object(F.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/home",className:"nav-link",children:"Home"})}),n&&Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/mod",className:"nav-link",children:"Moderator Board"})}),o&&Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/admin",className:"nav-link",children:"Admin Board"})}),u&&Object(F.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/taskList",className:"nav-link",children:"Task List"})}),Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/addTask",className:"nav-link",children:"Add Task"})}),o&&Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/register",className:"nav-link",children:"Add Staff Member"})})]})]}),u?Object(F.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/profile",className:"nav-link",children:u.username})}),Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)("a",{href:"/login",className:"nav-link",onClick:b,children:"LogOut"})})]}):Object(F.jsx)("div",{className:"navbar-nav ml-auto",children:Object(F.jsx)("li",{className:"nav-item",children:Object(F.jsx)(U.c,{to:"/login",className:"nav-link",children:"Login"})})})]}),Object(F.jsx)("div",{className:"container mt-3",children:Object(F.jsxs)(Y.d,{children:[Object(F.jsx)(Y.b,{exact:!0,path:["/","/home"],component:ee}),Object(F.jsx)(Y.b,{exact:!0,path:"/login",component:le}),Object(F.jsx)(Y.b,{exact:!0,path:"/register",component:de}),Object(F.jsx)(Y.b,{exact:!0,path:"/profile",component:oe}),Object(F.jsx)(Y.b,{path:"/taskList",component:ue}),Object(F.jsx)(Y.b,{path:"/addTask",component:X}),Object(F.jsx)(Y.b,{path:"/mod",component:$}),Object(F.jsx)(Y.b,{path:"/admin",component:Z}),Object(F.jsx)(Y.b,{path:"/tasks/:id",component:B})]})})]})})},pe={auth:ie,message:T,tasks:q,user:H,client:W},he=Object(N.a)({reducer:pe,devTools:!0});r.a.render(Object(F.jsx)(a.a,{store:he,children:Object(F.jsx)(U.b,{basename:"/#",children:Object(F.jsx)(me,{})})}),document.getElementById("root"))}},[[229,1,2]]]);
//# sourceMappingURL=main.dd7e7d74.chunk.js.map