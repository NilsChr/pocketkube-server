import{c as C,i as Y,e as R,l as j,p as V,a as h,h as m,b as Z,g as T,d as ee,w as F,o as x,f as E,n as A,j as te,k as H,m as ne,q as oe,r as p,s as I,t as Q,u as q,v as $,x as ie,y as re,z as K,A as U,B as le,C as ae,D as se,E as ce,F as D,G as z}from"./index.29a68900.js";import{_ as ue}from"./plugin-vue_export-helper.21dcd24c.js";var de=C({name:"QPageContainer",setup(t,{slots:c}){const{proxy:{$q:n}}=T(),e=Y(j,R);if(e===R)return console.error("QPageContainer needs to be child of QLayout"),R;V(ee,!0);const i=h(()=>{const a={};return e.header.space===!0&&(a.paddingTop=`${e.header.size}px`),e.right.space===!0&&(a[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${e.right.size}px`),e.footer.space===!0&&(a.paddingBottom=`${e.footer.size}px`),e.left.space===!0&&(a[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${e.left.size}px`),a});return()=>m("div",{class:"q-page-container",style:i.value},Z(c.default))}});const{passive:N}=H,fe=["both","horizontal","vertical"];var ve=C({name:"QScrollObserver",props:{axis:{type:String,validator:t=>fe.includes(t),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(t,{emit:c}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let e=null,i,a;F(()=>t.scrollTarget,()=>{s(),d()});function l(){e!==null&&e();const g=Math.max(0,ne(i)),y=oe(i),f={top:g-n.position.top,left:y-n.position.left};if(t.axis==="vertical"&&f.top===0||t.axis==="horizontal"&&f.left===0)return;const S=Math.abs(f.top)>=Math.abs(f.left)?f.top<0?"up":"down":f.left<0?"left":"right";n.position={top:g,left:y},n.directionChanged=n.direction!==S,n.delta=f,n.directionChanged===!0&&(n.direction=S,n.inflectionPoint=n.position),c("scroll",{...n})}function d(){i=te(a,t.scrollTarget),i.addEventListener("scroll",r,N),r(!0)}function s(){i!==void 0&&(i.removeEventListener("scroll",r,N),i=void 0)}function r(g){if(g===!0||t.debounce===0||t.debounce==="0")l();else if(e===null){const[y,f]=t.debounce?[setTimeout(l,t.debounce),clearTimeout]:[requestAnimationFrame(l),cancelAnimationFrame];e=()=>{f(y),e=null}}}const{proxy:v}=T();return F(()=>v.$q.lang.rtl,l),x(()=>{a=v.$el.parentNode,d()}),E(()=>{e!==null&&e(),s()}),Object.assign(v,{trigger:r,getPosition:()=>n}),A}});function he(){const t=p(!I.value);return t.value===!1&&x(()=>{t.value=!0}),t}const G=typeof ResizeObserver!="undefined",B=G===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var W=C({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(t,{emit:c}){let n=null,e,i={width:-1,height:-1};function a(s){s===!0||t.debounce===0||t.debounce==="0"?l():n===null&&(n=setTimeout(l,t.debounce))}function l(){if(n!==null&&(clearTimeout(n),n=null),e){const{offsetWidth:s,offsetHeight:r}=e;(s!==i.width||r!==i.height)&&(i={width:s,height:r},c("resize",i))}}const{proxy:d}=T();if(G===!0){let s;const r=v=>{e=d.$el.parentNode,e?(s=new ResizeObserver(a),s.observe(e),l()):v!==!0&&Q(()=>{r(!0)})};return x(()=>{r()}),E(()=>{n!==null&&clearTimeout(n),s!==void 0&&(s.disconnect!==void 0?s.disconnect():e&&s.unobserve(e))}),A}else{let v=function(){n!==null&&(clearTimeout(n),n=null),r!==void 0&&(r.removeEventListener!==void 0&&r.removeEventListener("resize",a,H.passive),r=void 0)},g=function(){v(),e&&e.contentDocument&&(r=e.contentDocument.defaultView,r.addEventListener("resize",a,H.passive),l())};const s=he();let r;return x(()=>{Q(()=>{e=d.$el,e&&g()})}),E(v),d.trigger=a,()=>{if(s.value===!0)return m("object",{style:B.style,tabindex:-1,type:"text/html",data:B.url,"aria-hidden":"true",onLoad:g})}}}}),ge=C({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:t=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(t.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(t,{slots:c,emit:n}){const{proxy:{$q:e}}=T(),i=p(null),a=p(e.screen.height),l=p(t.container===!0?0:e.screen.width),d=p({position:0,direction:"down",inflectionPoint:0}),s=p(0),r=p(I.value===!0?0:q()),v=h(()=>"q-layout q-layout--"+(t.container===!0?"containerized":"standard")),g=h(()=>t.container===!1?{minHeight:e.screen.height+"px"}:null),y=h(()=>r.value!==0?{[e.lang.rtl===!0?"left":"right"]:`${r.value}px`}:null),f=h(()=>r.value!==0?{[e.lang.rtl===!0?"right":"left"]:0,[e.lang.rtl===!0?"left":"right"]:`-${r.value}px`,width:`calc(100% + ${r.value}px)`}:null);function S(o){if(t.container===!0||document.qScrollPrevented!==!0){const u={position:o.position.top,direction:o.direction,directionChanged:o.directionChanged,inflectionPoint:o.inflectionPoint.top,delta:o.delta.top};d.value=u,t.onScroll!==void 0&&n("scroll",u)}}function J(o){const{height:u,width:b}=o;let w=!1;a.value!==u&&(w=!0,a.value=u,t.onScrollHeight!==void 0&&n("scrollHeight",u),k()),l.value!==b&&(w=!0,l.value=b),w===!0&&t.onResize!==void 0&&n("resize",o)}function X({height:o}){s.value!==o&&(s.value=o,k())}function k(){if(t.container===!0){const o=a.value>s.value?q():0;r.value!==o&&(r.value=o)}}let _=null;const M={instances:{},view:h(()=>t.view),isContainer:h(()=>t.container),rootRef:i,height:a,containerHeight:s,scrollbarWidth:r,totalWidth:h(()=>l.value+r.value),rows:h(()=>{const o=t.view.toLowerCase().split(" ");return{top:o[0].split(""),middle:o[1].split(""),bottom:o[2].split("")}}),header:$({size:0,offset:0,space:!1}),right:$({size:300,offset:0,space:!1}),footer:$({size:0,offset:0,space:!1}),left:$({size:300,offset:0,space:!1}),scroll:d,animate(){_!==null?clearTimeout(_):document.body.classList.add("q-body--layout-animate"),_=setTimeout(()=>{_=null,document.body.classList.remove("q-body--layout-animate")},155)},update(o,u,b){M[o][u]=b}};if(V(j,M),q()>0){let b=function(){o=null,u.classList.remove("hide-scrollbar")},w=function(){if(o===null){if(u.scrollHeight>e.screen.height)return;u.classList.add("hide-scrollbar")}else clearTimeout(o);o=setTimeout(b,300)},L=function(O){o!==null&&O==="remove"&&(clearTimeout(o),b()),window[`${O}EventListener`]("resize",w)},o=null;const u=document.body;F(()=>t.container!==!0?"add":"remove",L),t.container!==!0&&L("add"),ie(()=>{L("remove")})}return()=>{const o=re(c.default,[m(ve,{onScroll:S}),m(W,{onResize:J})]),u=m("div",{class:v.value,style:g.value,ref:t.container===!0?void 0:i,tabindex:-1},o);return t.container===!0?m("div",{class:"q-layout-container overflow-hidden",ref:i},[m(W,{onResize:X}),m("div",{class:"absolute-full",style:y.value},[m("div",{class:"scroll",style:f.value},[u])])]):u}}});const me=K({__name:"Stars",props:{stars:{type:Number,required:!0},size:{type:Number,required:!0},duration:{type:Number,required:!0},color:{type:String,required:!0}},setup(t){const c=t,n=p();x(()=>{});const e=h(()=>{const i=[];for(let l=0;l<c.stars;l++){let d=Math.round(Math.random()*window.innerWidth),s=Math.round(Math.random()*window.innerHeight*2);i.push([d,s])}let a="";for(let l=0;l<i.length;l++)l<i.length-1?a+=`${i[l][0]}px ${i[l][1]}px ${c.color},`:a+=`${i[l][0]}px ${i[l][1]}px ${c.color}`;return{position:"absolute",background:"transparent",zIndex:0,left:0,top:0,backgroundColor:c.color,width:`${c.size}px`,height:`${c.size}px`,boxShadow:a,animationDuration:`${c.duration}s`}});return(i,a)=>(U(),le("div",{ref_key:"container",ref:n,class:"animated",style:ae(e.value)},null,4))}});var P=ue(me,[["__scopeId","data-v-47e1758b"]]);const ye=K({__name:"MainLayout",setup(t){return(c,n)=>{const e=se("router-view");return U(),ce(ge,{view:"lHh Lpr lFf"},{default:D(()=>[z(P,{stars:15,size:3,color:"#C89DFF",duration:160}),z(P,{stars:10,size:2,color:"#C89DFF",duration:130}),z(P,{stars:50,size:1,color:"#C89DFF",duration:100}),z(de,null,{default:D(()=>[z(e)]),_:1})]),_:1})}}});export{ye as default};