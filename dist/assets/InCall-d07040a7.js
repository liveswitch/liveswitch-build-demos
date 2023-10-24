import{d as de,t as T,r as O,o as V,b as L,e as n,c as t,f as U,B,w as b,A as G,C as J,F as ee,D as te,n as $,E as be,h as Ce,a as le,m as ve,G as De,u as se,p as ue,I as ae,H as ye,J as Ge,K as Ye,L as P,M as Fe,N as je,O as Ke,P as X,Q as ce,R as We,y as $e,S as Ae,T as Xe,s as re,U as Qe,V as Ze,W as Je,X as et,k as tt,l as at,q as nt,j as lt,v as st,z as Z}from"./index-76956830.js";import{_ as ze,V as me,e as w,a as ne,d as Y,b as ke,g as Se,h as xe,i as Me,j as ge,k as it,l as ot,n as ct,o as ut,p as rt,q as dt,r as vt,s as mt,t as ht,R as gt,u as ft,v as bt,w as Ne,x as Ct,y as yt,z as kt,A as St,B as xt,C as Vt,D as pt,L as wt,E as At,F as Mt,G as Lt,H as Pt,I as Tt,J as It,K as Rt,M as Le,N as Pe,O as Dt,P as Be,Q as W,S as Ee}from"./VSelect-68bd5d0f.js";const $t={class:"container"},zt={class:"left-column"},Nt={class:"flex-center"},Bt={class:"row-spread"},Et={class:"user-counter"},Ht=n("i",{class:"icon-users users"},null,-1),Ot={class:"channel-label"},Ut={class:"video-grid"},_t={class:"right-column"},qt={class:"settings-menu-in-call"},Gt={class:"basic-flex"},Yt={class:"basic-flex"},Ft={class:"basic-flex"},jt={class:"chat-container"},Kt=n("div",{class:"chat-header"},[n("h2",{class:"margin"},"Chat")],-1),Wt={class:"chat-body"},Xt={class:"chat-footer"},Qt=de({__name:"InCall",props:{store:{type:Object,required:!0},remoteCounter:{type:Number,required:!0},videoDimensions:{type:String,required:!0},downstreamConnections:{type:Object,required:!0}},emits:["leaveCall","changeCamera","changeMicrophone","changeSpeaker","sendChat"],setup(e,{emit:a}){const l=e,s=T(l,"remoteCounter"),y=T(l,"videoDimensions"),c=O(""),m=T(l,"downstreamConnections"),o=S=>{a("leaveCall",S)},v=S=>{a("changeCamera",S)},r=S=>{a("changeMicrophone",S)},f=S=>{a("changeSpeaker",S)},k=()=>{a("sendChat",c.value),c.value=""};return(S,g)=>(V(),L("div",$t,[n("div",zt,[n("div",Nt,[t(me,{src:ze,class:"logo-in-call"})]),n("div",Bt,[n("div",Et,[Ht,U(" "+B(s.value),1)]),n("div",Ot," Channel: "+B(e.store.state.channelId),1),t(w,{class:"leave-button liveswitch",onClick:o},{default:b(()=>[U("Leave Call")]),_:1})]),n("div",Ut,[e.store.state.localMedia?(V(),G(ne,{key:0,class:"video","local-video":e.store.state.localMedia,userName:"Me",askHeight:y.value,askWidth:y.value},null,8,["local-video","askHeight","askWidth"])):J("",!0),m.value?(V(!0),L(ee,{key:1},te(m.value,u=>(V(),G(ne,{class:"video",remoteVideo:u.remoteMedia,index:u.index,userName:u.displayName,maxLabelLength:10,connection:u.connection,askHeight:y.value,askWidth:y.value},null,8,["remoteVideo","index","userName","connection","askHeight","askWidth"]))),256)):J("",!0)])]),n("div",_t,[n("div",qt,[n("div",Gt,[t(Y,{label:"Camera",class:"margin input liveswitch","hide-details":"auto",items:e.store.state.cameraList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeVideoDevice,"onUpdate:modelValue":[g[0]||(g[0]=u=>e.store.state.activeVideoDevice=u),v]},null,8,["items","modelValue"]),t(w,{class:"margin button liveswitch",icon:"",onClick:g[1]||(g[1]=u=>e.store.commit("toggleLocalVideoMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.videoMuted?"icon-video-slash":"icon-video"])},null,2)]),_:1})]),n("div",Yt,[t(Y,{label:"Microphone",class:"margin input liveswitch","hide-details":"auto",items:e.store.state.microphoneList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeAudioDevice,"onUpdate:modelValue":[g[2]||(g[2]=u=>e.store.state.activeAudioDevice=u),r]},null,8,["items","modelValue"]),t(w,{class:"margin button liveswitch",icon:"",onClick:g[3]||(g[3]=u=>e.store.commit("toggleLocalAudioMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.audioMuted?"icon-audio-mic-slash":"icon-audio-mic"])},null,2)]),_:1})]),n("div",Ft,[t(Y,{label:"Speaker",class:"margin input liveswitch","hide-details":"auto",items:e.store.state.speakerList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeSpeakerDevice,"onUpdate:modelValue":[g[4]||(g[4]=u=>e.store.state.activeSpeakerDevice=u),f]},null,8,["items","modelValue"])])]),n("div",jt,[Kt,n("div",Wt,[(V(!0),L(ee,null,te(e.store.state.messages,u=>(V(),L("div",null,[n("div",{class:$(["chat-message",u.user===e.store.state.displayName?"my-chat":"other-chat"])},B(u.user)+": "+B(u.message),3)]))),256))]),n("div",Xt,[t(ke,{label:"Chat Message",clearable:"",class:"margin chat-input liveswitch","hide-details":"auto",modelValue:c.value,"onUpdate:modelValue":g[5]||(g[5]=u=>c.value=u),onKeydown:be(Ce(k,["prevent"]),["enter"])},null,8,["modelValue","onKeydown"]),t(w,{class:"chat-button liveswitch",onClick:k},{default:b(()=>[U(" Send ")]),_:1})])])])]))}});const Zt=le()({name:"VCardActions",props:ve(),setup(e,a){let{slots:l}=a;return De({VBtn:{variant:"text"}}),se(()=>{var s;return t("div",{class:["v-card-actions",e.class],style:e.style},[(s=l.default)==null?void 0:s.call(l)])}),{}}}),Jt=Se("v-card-subtitle"),ea=Se("v-card-title"),ta=ue({appendAvatar:String,appendIcon:ae,prependAvatar:String,prependIcon:ae,subtitle:String,title:String,...ve(),...xe()},"VCardItem"),aa=le()({name:"VCardItem",props:ta(),setup(e,a){let{slots:l}=a;return se(()=>{var r;const s=!!(e.prependAvatar||e.prependIcon),y=!!(s||l.prepend),c=!!(e.appendAvatar||e.appendIcon),m=!!(c||l.append),o=!!(e.title||l.title),v=!!(e.subtitle||l.subtitle);return t("div",{class:["v-card-item",e.class],style:e.style},[y&&t("div",{key:"prepend",class:"v-card-item__prepend"},[l.prepend?t(ge,{key:"prepend-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},l.prepend):s&&t(Me,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),t("div",{class:"v-card-item__content"},[o&&t(ea,{key:"title"},{default:()=>{var f;return[((f=l.title)==null?void 0:f.call(l))??e.title]}}),v&&t(Jt,{key:"subtitle"},{default:()=>{var f;return[((f=l.subtitle)==null?void 0:f.call(l))??e.subtitle]}}),(r=l.default)==null?void 0:r.call(l)]),m&&t("div",{key:"append",class:"v-card-item__append"},[l.append?t(ge,{key:"append-defaults",disabled:!c,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},l.append):c&&t(Me,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),na=Se("v-card-text"),la=ue({appendAvatar:String,appendIcon:ae,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:ae,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...it(),...ve(),...xe(),...ot(),...ct(),...ut(),...rt(),...dt(),...vt(),...mt(),...ye(),...Ge(),...ht({variant:"elevated"})},"VCard"),He=le()({name:"VCard",directives:{Ripple:gt},props:la(),setup(e,a){let{attrs:l,slots:s}=a;const{themeClasses:y}=Ye(e),{borderClasses:c}=ft(e),{colorClasses:m,colorStyles:o,variantClasses:v}=bt(e),{densityClasses:r}=Ne(e),{dimensionStyles:f}=Ct(e),{elevationClasses:k}=yt(e),{loaderClasses:S}=kt(e),{locationStyles:g}=St(e),{positionClasses:u}=xt(e),{roundedClasses:h}=Vt(e),i=pt(e,l),z=P(()=>e.link!==!1&&i.isLink.value),A=P(()=>!e.disabled&&e.link!==!1&&(e.link||i.isClickable.value));return se(()=>{const I=z.value?"a":e.tag,N=!!(s.title||e.title),_=!!(s.subtitle||e.subtitle),F=N||_,R=!!(s.append||e.appendAvatar||e.appendIcon),E=!!(s.prepend||e.prependAvatar||e.prependIcon),j=!!(s.image||e.image),D=F||E||R,q=!!(s.text||e.text);return Fe(t(I,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":A.value},y.value,c.value,m.value,r.value,k.value,S.value,u.value,h.value,v.value,e.class],style:[o.value,f.value,g.value,e.style],href:i.href.value,onClick:A.value&&i.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var K;return[j&&t("div",{key:"image",class:"v-card__image"},[s.image?t(ge,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},s.image):t(me,{key:"image-img",cover:!0,src:e.image},null)]),t(wt,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:s.loader}),D&&t(aa,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:s.item,prepend:s.prepend,title:s.title,subtitle:s.subtitle,append:s.append}),q&&t(na,{key:"text"},{default:()=>{var d;return[((d=s.text)==null?void 0:d.call(s))??e.text]}}),(K=s.default)==null?void 0:K.call(s),s.actions&&t(Zt,null,{default:s.actions}),At(A.value,"v-card")]}}),[[je("ripple"),A.value&&e.ripple]])}),{}}});const Oe=Symbol.for("vuetify:v-tabs"),sa=ue({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...Ke(Mt({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),fe=le()({name:"VTab",props:sa(),setup(e,a){let{slots:l,attrs:s}=a;const{textColorClasses:y,textColorStyles:c}=Lt(e,"sliderColor"),m=P(()=>e.direction==="horizontal"),o=X(!1),v=O(),r=O();function f(k){var g,u;let{value:S}=k;if(o.value=S,S){const h=(u=(g=v.value)==null?void 0:g.$el.parentElement)==null?void 0:u.querySelector(".v-tab--selected .v-tab__slider"),i=r.value;if(!h||!i)return;const z=getComputedStyle(h).color,A=h.getBoundingClientRect(),I=i.getBoundingClientRect(),N=m.value?"x":"y",_=m.value?"X":"Y",F=m.value?"right":"bottom",R=m.value?"width":"height",E=A[N],j=I[N],D=E>j?A[F]-I[F]:A[N]-I[N],q=Math.sign(D)>0?m.value?"right":"bottom":Math.sign(D)<0?m.value?"left":"top":"center",d=(Math.abs(D)+(Math.sign(D)<0?A[R]:I[R]))/Math.max(A[R],I[R])||0,p=A[R]/I[R]||0,M=1.5;Pt(i,{backgroundColor:[z,"currentcolor"],transform:[`translate${_}(${D}px) scale${_}(${p})`,`translate${_}(${D/M}px) scale${_}(${(d-1)/M+1})`,"none"],transformOrigin:Array(3).fill(q)},{duration:225,easing:Tt})}}return se(()=>{const[k]=w.filterProps(e);return t(w,ce({symbol:Oe,ref:v,class:["v-tab",e.class],style:e.style,tabindex:o.value?0:-1,role:"tab","aria-selected":String(o.value),active:!1},k,s,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":f}),{default:()=>{var S;return[((S=l.default)==null?void 0:S.call(l))??e.text,!e.hideSlider&&t("div",{ref:r,class:["v-tab__slider",y.value],style:c.value},null)]}})}),{}}});function Te(e){const l=Math.abs(e);return Math.sign(e)*(l/((1/.501-2)*(1-l)+1))}function Ie(e){let{selectedElement:a,containerSize:l,contentSize:s,isRtl:y,currentScrollOffset:c,isHorizontal:m}=e;const o=m?a.clientWidth:a.clientHeight,v=m?a.offsetLeft:a.offsetTop,r=y&&m?s-v-o:v,f=l+c,k=o+r,S=o*.4;return r<=c?c=Math.max(r-S,0):f<=k&&(c=Math.min(c-(f-k-S),s-l)),c}function ia(e){let{selectedElement:a,containerSize:l,contentSize:s,isRtl:y,isHorizontal:c}=e;const m=c?a.clientWidth:a.clientHeight,o=c?a.offsetLeft:a.offsetTop,v=y&&c?s-o-m/2-l/2:o+m/2-l/2;return Math.min(s-l,Math.max(0,v))}const oa=Symbol.for("vuetify:v-slide-group"),Ue=ue({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:oa},nextIcon:{type:ae,default:"$next"},prevIcon:{type:ae,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...ve(),...ye(),...It({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),Re=le()({name:"VSlideGroup",props:Ue(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a;const{isRtl:s}=We(),{mobile:y}=$e(),c=Rt(e,e.symbol),m=X(!1),o=X(0),v=X(0),r=X(0),f=P(()=>e.direction==="horizontal"),{resizeRef:k,contentRect:S}=Ae(),{resizeRef:g,contentRect:u}=Ae(),h=P(()=>c.selected.value.length?c.items.value.findIndex(C=>C.id===c.selected.value[0]):-1),i=P(()=>c.selected.value.length?c.items.value.findIndex(C=>C.id===c.selected.value[c.selected.value.length-1]):-1);if(Xe){let C=-1;re(()=>[c.selected.value,S.value,u.value,f.value],()=>{cancelAnimationFrame(C),C=requestAnimationFrame(()=>{if(S.value&&u.value){const x=f.value?"width":"height";v.value=S.value[x],r.value=u.value[x],m.value=v.value+1<r.value}if(h.value>=0&&g.value){const x=g.value.children[i.value];h.value===0||!m.value?o.value=0:e.centerActive?o.value=ia({selectedElement:x,containerSize:v.value,contentSize:r.value,isRtl:s.value,isHorizontal:f.value}):m.value&&(o.value=Ie({selectedElement:x,containerSize:v.value,contentSize:r.value,isRtl:s.value,currentScrollOffset:o.value,isHorizontal:f.value}))}})})}const z=X(!1);let A=0,I=0;function N(C){const x=f.value?"clientX":"clientY";I=(s.value&&f.value?-1:1)*o.value,A=C.touches[0][x],z.value=!0}function _(C){if(!m.value)return;const x=f.value?"clientX":"clientY",H=s.value&&f.value?-1:1;o.value=H*(I+A-C.touches[0][x])}function F(C){const x=r.value-v.value;o.value<0||!m.value?o.value=0:o.value>=x&&(o.value=x),z.value=!1}function R(){k.value&&(k.value[f.value?"scrollLeft":"scrollTop"]=0)}const E=X(!1);function j(C){if(E.value=!0,!(!m.value||!g.value)){for(const x of C.composedPath())for(const H of g.value.children)if(H===x){o.value=Ie({selectedElement:H,containerSize:v.value,contentSize:r.value,isRtl:s.value,currentScrollOffset:o.value,isHorizontal:f.value});return}}}function D(C){E.value=!1}function q(C){var x;!E.value&&!(C.relatedTarget&&((x=g.value)!=null&&x.contains(C.relatedTarget)))&&d()}function K(C){g.value&&(f.value?C.key==="ArrowRight"?d(s.value?"prev":"next"):C.key==="ArrowLeft"&&d(s.value?"next":"prev"):C.key==="ArrowDown"?d("next"):C.key==="ArrowUp"&&d("prev"),C.key==="Home"?d("first"):C.key==="End"&&d("last"))}function d(C){var x,H,Ve,pe,we;if(g.value)if(!C)(x=Qe(g.value)[0])==null||x.focus();else if(C==="next"){const Q=(H=g.value.querySelector(":focus"))==null?void 0:H.nextElementSibling;Q?Q.focus():d("first")}else if(C==="prev"){const Q=(Ve=g.value.querySelector(":focus"))==null?void 0:Ve.previousElementSibling;Q?Q.focus():d("last")}else C==="first"?(pe=g.value.firstElementChild)==null||pe.focus():C==="last"&&((we=g.value.lastElementChild)==null||we.focus())}function p(C){const x=o.value+(C==="prev"?-1:1)*v.value;o.value=Ze(x,0,r.value-v.value)}const M=P(()=>{let C=o.value>r.value-v.value?-(r.value-v.value)+Te(r.value-v.value-o.value):-o.value;o.value<=0&&(C=Te(-o.value));const x=s.value&&f.value?-1:1;return{transform:`translate${f.value?"X":"Y"}(${x*C}px)`,transition:z.value?"none":"",willChange:z.value?"transform":""}}),ie=P(()=>({next:c.next,prev:c.prev,select:c.select,isSelected:c.isSelected})),he=P(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!y.value;case!0:return m.value||Math.abs(o.value)>0;case"mobile":return y.value||m.value||Math.abs(o.value)>0;default:return!y.value&&(m.value||Math.abs(o.value)>0)}}),_e=P(()=>Math.abs(o.value)>0),qe=P(()=>r.value>Math.abs(o.value)+v.value);return se(()=>t(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!f.value,"v-slide-group--has-affixes":he.value,"v-slide-group--is-overflowing":m.value},e.class],style:e.style,tabindex:E.value||c.selected.value.length?-1:0,onFocus:q},{default:()=>{var C,x,H;return[he.value&&t("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!_e.value}],onClick:()=>p("prev")},[((C=l.prev)==null?void 0:C.call(l,ie.value))??t(Le,null,{default:()=>[t(Pe,{icon:s.value?e.nextIcon:e.prevIcon},null)]})]),t("div",{key:"container",ref:k,class:"v-slide-group__container",onScroll:R},[t("div",{ref:g,class:"v-slide-group__content",style:M.value,onTouchstartPassive:N,onTouchmovePassive:_,onTouchendPassive:F,onFocusin:j,onFocusout:D,onKeydown:K},[(x=l.default)==null?void 0:x.call(l,ie.value)])]),he.value&&t("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!qe.value}],onClick:()=>p("next")},[((H=l.next)==null?void 0:H.call(l,ie.value))??t(Le,null,{default:()=>[t(Pe,{icon:s.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:c.selected,scrollTo:p,scrollOffset:o,focus:d}}});function ca(e){return e?e.map(a=>typeof a=="string"?{title:a,value:a}:a):[]}const ua=ue({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...Ue({mandatory:"force"}),...xe(),...ye()},"VTabs"),ra=le()({name:"VTabs",props:ua(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a;const s=Je(e,"modelValue"),y=P(()=>ca(e.items)),{densityClasses:c}=Ne(e),{backgroundColorClasses:m,backgroundColorStyles:o}=Dt(T(e,"bgColor"));return De({VTab:{color:T(e,"color"),direction:T(e,"direction"),stacked:T(e,"stacked"),fixed:T(e,"fixedTabs"),sliderColor:T(e,"sliderColor"),hideSlider:T(e,"hideSlider")}}),se(()=>{const[v]=Re.filterProps(e);return t(Re,ce(v,{modelValue:s.value,"onUpdate:modelValue":r=>s.value=r,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},c.value,m.value,e.class],style:[{"--v-tabs-height":et(e.height)},o.value,e.style],role:"tablist",symbol:Oe}),{default:()=>[l.default?l.default():y.value.map(r=>t(fe,ce(r,{key:r.title}),null))]})}),{}}}),da={class:"container"},va={class:"column"},ma={class:"channel-label"},ha={class:"margin spread"},ga={class:"row-in-call"},fa=n("i",{class:"center icon-cog-gear"},null,-1),ba=n("h3",null,"Settings",-1),Ca={class:"users-container"},ya=n("i",{class:"icon-users users"},null,-1),ka={class:"button-wrapper"},Sa={class:"tab-container"},xa={key:0},Va={class:"basic-flex"},pa={class:"even-spacing"},wa={class:"video-container"},Aa={class:"video-container"},Ma={class:"controls-container"},La=n("i",{class:"center icon-caret-left-md"},null,-1),Pa={class:"row-center"},Ta=n("i",{class:"center icon-caret-right-md"},null,-1),Ia={key:1,class:"chat-container"},Ra=n("div",{class:"chat-header"},[n("h3",null,"Chat")],-1),Da={class:"chat-body"},$a={class:"chat-footer"},za={class:"tab-buttons"},Na=de({__name:"InCallPortrait",props:{store:{type:Object,required:!0},remoteCounter:{type:Number,required:!0},currentTab:{type:String,required:!0},showLocal:{type:Boolean,required:!0},pageNumber:{type:Number,required:!0},lastPage:{type:Number,required:!0}},emits:["leaveCall","changeCamera","changeMicrophone","changeSpeaker","sendChat","prevPage","nextPage","switchTab"],setup(e,{emit:a}){const l=e,s=T(l,"remoteCounter"),y=T(l,"currentTab"),c=O(""),m=u=>{a("leaveCall",u)},o=u=>{a("changeCamera",u)},v=u=>{a("changeMicrophone",u)},r=u=>{a("changeSpeaker",u)},f=()=>{a("sendChat",c.value),c.value=""},k=()=>{a("prevPage")},S=()=>{a("nextPage")},g=u=>{a("switchTab",u.target.innerText)};return(u,h)=>(V(),L("div",da,[n("div",va,[t(me,{src:ze,class:"logo-in-call liveswitch"}),n("div",ma," Channel: "+B(e.store.state.channelId),1),n("div",ha,[n("div",ga,[t(Ee,{"close-on-content-click":!1,location:"bottom"},{activator:b(({props:i})=>[t(w,ce(i,{icon:"",class:"icon liveswitch",flat:""}),{default:b(()=>[fa]),_:2},1040)]),default:b(()=>[t(He,{class:"settings-menu-in-call"},{default:b(()=>[t(Be,null,{default:b(()=>[t(W,null,{default:b(()=>[ba]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Camera",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.cameraList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeVideoDevice,"onUpdate:modelValue":[h[0]||(h[0]=i=>e.store.state.activeVideoDevice=i),o]},null,8,["items","modelValue"])]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Microphone",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.microphoneList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeAudioDevice,"onUpdate:modelValue":[h[1]||(h[1]=i=>e.store.state.activeAudioDevice=i),v]},null,8,["items","modelValue"])]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Speaker",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.speakerList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeSpeakerDevice,"onUpdate:modelValue":[h[2]||(h[2]=i=>e.store.state.activeSpeakerDevice=i),r]},null,8,["items","modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),n("div",Ca,[ya,U(" "+B(s.value),1)])]),n("div",ka,[t(w,{class:"leave-button liveswitch",onClick:m},{default:b(()=>[U("Leave")]),_:1})])]),n("div",Sa,[y.value==="GALLERY"?(V(),L("div",xa,[n("div",Va,[n("div",pa,[n("div",wa,[e.store.state.localMedia&&e.showLocal?(V(),G(ne,{key:0,"ask-height":"235px","ask-width":"320px",maxLabelLength:7,"local-video":e.store.state.localMedia,userName:"Me"},null,8,["local-video"])):J("",!0)]),n("div",Aa,[e.store.state.videoList?(V(!0),L(ee,{key:0},te(e.store.state.videoList,i=>(V(),G(ne,{remoteVideo:i.media,index:i.index,userName:i.displayName,connection:i.connection,maxLabelLength:7,"ask-height":"235px","ask-width":"320px",maxIndex:2},null,8,["remoteVideo","index","userName","connection"]))),256)):J("",!0)])])]),n("div",Ma,[t(w,{class:$(["margin align-left liveswitch",e.pageNumber===1?"inactive-button":"active-button"]),icon:"",onClick:k},{default:b(()=>[La]),_:1},8,["class"]),n("div",Pa,[t(w,{class:"margin active-button liveswitch",icon:"",onClick:h[3]||(h[3]=i=>e.store.commit("toggleLocalVideoMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.videoMuted?"icon-video-slash":"icon-video"])},null,2)]),_:1}),t(w,{class:"margin active-button liveswitch",icon:"",onClick:h[4]||(h[4]=i=>e.store.commit("toggleLocalAudioMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.audioMuted?"icon-audio-mic-slash":"icon-audio-mic"])},null,2)]),_:1})]),t(w,{class:$(["margin active-button align-right liveswitch",e.pageNumber===e.lastPage?"inactive-button":"active-button"]),icon:"",onClick:S},{default:b(()=>[Ta]),_:1},8,["class"])])])):(V(),L("div",Ia,[Ra,n("div",Da,[(V(!0),L(ee,null,te(e.store.state.messages,i=>(V(),L("div",null,[n("div",{class:$(["chat-message",i.user===e.store.state.displayName?"my-chat":"other-chat"])},B(i.user)+": "+B(i.message),3)]))),256))]),n("div",$a,[t(ke,{label:"Chat Message",clearable:"",class:"margin chat-input liveswitch","hide-details":"auto",modelValue:c.value,"onUpdate:modelValue":h[5]||(h[5]=i=>c.value=i),onKeydown:be(Ce(f,["prevent"]),["enter"])},null,8,["modelValue","onKeydown"]),t(w,{class:"chat-button liveswitch",onClick:f},{default:b(()=>[U("Send")]),_:1})])]))]),n("div",za,[t(ra,{"fixed-tabs":"","selected-class":"activeTab",class:"tabs",onClick:g},{default:b(()=>[t(fe,{value:"gallery"},{default:b(()=>[U("Gallery")]),_:1}),t(fe,{value:"chat"},{default:b(()=>[U("Chat")]),_:1})]),_:1})])])]))}}),Ba="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAzCAYAAADVY1sUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATLSURBVHgBzVrtcdw2EH3U+L/jCkKlgERxA6bVQKQKxLgB0S4goSqQ1EBySgGR3UDCVCC5gYgd+FwBjMclxY8jsCB5N3dvBpwTAQJ8u4vdxVIRDgGZ4fU7RLiAwZn9fVL9LXis2x1uosI1RYR9Q0j8zl9oX96Ff217ZwmVw479ERECx7b9DdFAKIx9619xHd11b+6HSEviH9tiTMcGmTAimaHE2Na2FVa1a8xFOIkb264g5pZCzK+LL7a9bszsBdwLcoJL9G13bR98hWWg8P6An8SVXSd/XjMzJPTGtqQz5lU9zyn/OBqdJjOxvT7YlqO/AUssQbuxE8+opw6JLj6P3EtqgY8QERL0DvHIg/NNSkCTuvT0k+k7x/3PjmdSXsY0kmPeBgwBteFzsaUvVoyAZvojf/SJiDYusAvoc9MTXXn6XQKIeRlqJMHukKsjDP7z9L709G0Q0QJTjPl4o/R/GovYNWhCP3me3SCipQhx4yUmITNn8AuBZvURfriE/JWXIZEQrzQlnWig7bv1MOV4hrjsGG5BVN5sSOQROs4wBbLJtWc0bSSO+9Qk490GEW1C4mKieSVKP0X+l6ef++M3z9OVg+gTkRyqgB8kkSEcl0q/O3aIWSVwm9Vz3jcWEH2+vH05MRk/ZIy2pz55+nzaoFk976tNIiKdW/hBrdxDh6Y541xLtJHCbZpl10EcOQbl0Df+iV3sT2XML0p/MRo72lTfp42e5YwTEbs7h57tpnbR+9HNn5kEeuy4c/RpqX45dNcujaCW1FvoZOhaH0b2TAoNYylJZhoSieMpHqhOhzfdRAgh8zPglFyDGDxH0NRaQppZ9VMSmlNmmsNS6nhG0vxFxYfMcONeIizfKuCPH/0zt+wJan/KybGHacUHkXaO5an+k20/QF46qedLPONpTh8siZVrwDQiDbZHKARMQWhOXi86j0gDIZRAl+gc0HPeukxpiO3VtVpS19CPAz4UVUpvqhJpcI0g8rwYXyZGm2Ks61Y6D0BC5gnhKOs56YZpOh/n1sxeDF6kW0hOnE9lZl0vzBcoOklfSEryGiKMpRWZHqLOy1HyzJ9iTEeJ1uXGnnGU+Dl2ANGIpBMkMde2Y4RE8ggr7AiRUpBrUKBNVTiu+/0iFDSnY+wI1EgOX3IGG4HHDj6ixRThsURLcxaBGqGXiR3955aE//grGmU6n8CP0q6WO4sMC0EiBq6FQ03BL4whnF+dloDZr8sNhrnHzKSY5umYHA4z5cUgEZeqT9SFxGVfYx5S8GPPe7OVfI1EbuCW/r2TzHvDlJ5m4q+u+zV7bEPkyq7x/1LtSECUs4ZPsis78tEuyvIktUApau6Xkf9tPU5z7+06cuYoMRHdyJ5j8zvdXDBrzTpzxxBBhVYpV5hIqJ80hgVHH0q44o7Mn2OasFYQoail3MixYIppZ4yiSj+0GCFHWtYA+G09Rjge7Py3VbHCoaVIWZj2nUD2xfedxUtIOX966t1W13PMO2GW9brdb4ovt3ewmgohlGM7+/Jhf0SI5f8BQXCSD/sl0kCKcvRqWuV+DEyPTg+DCCHaoXsmoTjwKak6Wq92hEPBTSVTZtoMoiEZcqWJxjUfjka6aD/wpJDSazeLGK2yHCaRLpr/rmPzRPpvTn6IoHFFRiQAAAAASUVORK5CYII=",Ea={class:"container"},Ha={key:0,class:"tab-container"},Oa={class:"channel-label"},Ua={class:"video-container"},_a={class:"basic-flex"},qa={class:"controls-container"},Ga=n("i",{class:"center icon-caret-left-md"},null,-1),Ya={class:"row-center"},Fa=n("i",{class:"center icon-caret-right-md"},null,-1),ja={key:1},Ka={class:"chat-container"},Wa=n("div",{class:"chat-header"},[n("h3",null,"Chat")],-1),Xa={class:"chat-body"},Qa={class:"basic-flex"},Za={class:"right-column"},Ja={class:"center users-container"},en=n("i",{class:"icon-users users"},null,-1),tn=n("i",{class:"center icon-cog-gear"},null,-1),an=n("h3",null,"Settings",-1),nn=n("i",{class:"center icon-chat"},null,-1),ln=n("i",{class:"center icon-video"},null,-1),sn=de({__name:"InCallLandscape",props:{store:{type:Object,required:!0},remoteCounter:{type:Number,required:!0},currentTab:{type:String,required:!0},showLocal:{type:Boolean,required:!0},pageNumber:{type:Number,required:!0},lastPage:{type:Number,required:!0}},emits:["leaveCall","changeCamera","changeMicrophone","changeSpeaker","sendChat","prevPage","nextPage","switchTab"],setup(e,{emit:a}){const l=e,s=T(l,"remoteCounter"),y=T(l,"currentTab"),c=O(""),m=u=>{a("leaveCall",u)},o=u=>{a("changeCamera",u)},v=u=>{a("changeMicrophone",u)},r=u=>{a("changeSpeaker",u)},f=()=>{a("sendChat",c.value),c.value=""},k=()=>{a("prevPage")},S=()=>{a("nextPage")},g=u=>{a("switchTab",u)};return(u,h)=>(V(),L("div",Ea,[n("div",null,[y.value=="GALLERY"?(V(),L("div",Ha,[n("div",Oa," Channel: "+B(e.store.state.channelId),1),n("div",Ua,[n("div",null,[e.store.state.localMedia&&e.showLocal?(V(),G(ne,{key:0,"ask-height":"240px","ask-width":"280px",maxLabelLength:5,"local-video":e.store.state.localMedia,userName:"Me"},null,8,["local-video"])):J("",!0)]),n("div",_a,[e.store.state.videoList?(V(!0),L(ee,{key:0},te(e.store.state.videoList,i=>(V(),G(ne,{remoteVideo:i.media,index:i.index,userName:i.displayName,connection:i.connection,"ask-height":"240px","ask-width":"280px",maxLabelLength:5,maxIndex:2},null,8,["remoteVideo","index","userName","connection"]))),256)):J("",!0)])]),n("div",qa,[t(w,{class:$(["margin align-left liveswitch",e.pageNumber===1?"inactive-button":"active-button"]),icon:"",onClick:k},{default:b(()=>[Ga]),_:1},8,["class"]),n("div",Ya,[t(w,{class:"margin active-button liveswitch",icon:"",onClick:h[0]||(h[0]=i=>e.store.commit("toggleLocalVideoMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.videoMuted?"icon-video-slash":"icon-video"])},null,2)]),_:1}),t(w,{class:"margin active-button liveswitch",icon:"",onClick:h[1]||(h[1]=i=>e.store.commit("toggleLocalAudioMute"))},{default:b(()=>[n("i",{class:$(["center",e.store.state.audioMuted?"icon-audio-mic-slash":"icon-audio-mic"])},null,2)]),_:1})]),t(w,{class:$(["margin align-right liveswitch",e.pageNumber===e.lastPage?"inactive-button":"active-button"]),icon:"",onClick:S},{default:b(()=>[Fa]),_:1},8,["class"])])])):(V(),L("div",ja,[n("div",Ka,[Wa,n("div",Xa,[(V(!0),L(ee,null,te(e.store.state.messages,i=>(V(),L("div",null,[n("div",{class:$(["chat-message",i.user===e.store.state.displayName?"my-chat":"other-chat"])},B(i.user)+": "+B(i.message),3)]))),256))]),n("div",Qa,[t(ke,{label:"Chat Message",clearable:"",class:"chat-input liveswitch","hide-details":"auto",modelValue:c.value,"onUpdate:modelValue":h[2]||(h[2]=i=>c.value=i),onKeydown:be(Ce(f,["prevent"]),["enter"])},null,8,["modelValue","onKeydown"]),t(w,{class:"chat-button liveswitch",onClick:f},{default:b(()=>[U("Send")]),_:1})])])]))]),n("div",Za,[t(me,{src:Ba,class:"logo-in-call liveswitch"}),n("span",Ja,[en,U(" "+B(s.value),1)]),t(Ee,{"close-on-content-click":!1,location:"left"},{activator:b(({props:i})=>[t(w,ce({class:"margin center icon liveswitch"},i,{icon:"",flat:""}),{default:b(()=>[tn]),_:2},1040)]),default:b(()=>[t(He,{class:"settings-menu-in-call"},{default:b(()=>[t(Be,null,{default:b(()=>[t(W,null,{default:b(()=>[an]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Camera",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.cameraList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeVideoDevice,"onUpdate:modelValue":[h[3]||(h[3]=i=>e.store.state.activeVideoDevice=i),o]},null,8,["items","modelValue"])]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Microphone",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.microphoneList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeAudioDevice,"onUpdate:modelValue":[h[4]||(h[4]=i=>e.store.state.activeAudioDevice=i),v]},null,8,["items","modelValue"])]),_:1}),t(W,null,{default:b(()=>[t(Y,{label:"Speaker",class:"margin input-in-call liveswitch","hide-details":"auto",items:e.store.state.speakerList,"item-title":"name","item-value":"id",modelValue:e.store.state.activeSpeakerDevice,"onUpdate:modelValue":[h[5]||(h[5]=i=>e.store.state.activeSpeakerDevice=i),r]},null,8,["items","modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(w,{icon:"",class:"center icon liveswitch",flat:"",onClick:h[6]||(h[6]=i=>g("CHAT"))},{default:b(()=>[nn]),_:1}),t(w,{icon:"",class:"center icon liveswitch",flat:"",onClick:h[7]||(h[7]=i=>g("GALLERY"))},{default:b(()=>[ln]),_:1}),t(w,{class:"center leave-button liveswitch",onClick:m},{default:b(()=>[U("Leave")]),_:1})])]))}}),oe=2,un=de({__name:"InCall",setup(e){const a=tt(),l=at(),s=nt(),y=lt("liveSwitch");let c=null,m=null;const o=a.state.localMedia;let v=O({});const r=O(1);let f=O("100%");const k=O(1),S=O("GALLERY"),{mobile:g}=$e(),u=O(g&&window.innerHeight>window.innerWidth);re(r,function(){const d=Math.ceil(Math.sqrt(r.value)),p=100/d;f.value="calc("+p+"% - "+d*5+"px)"});async function h(){await y.disconnectFromMeeting(v.value,c,o),o.destroy(),a.commit("resetStore"),l.push("/")}function i(d){a.commit("changeCamera",d)}function z(d){a.commit("changeMicrophone",d)}async function A(d){const p=Object.keys(v.value)[0],M=v.value[p],ie=await y.getAudioSink(d,M);y.updateSpeaker(v.value,ie),a.commit("setActiveSpeakerDevice",d)}function I(d){v.value[d.getId()].remoteMedia.destroy(),delete v.value[d.getId()],r.value--}function N(d){d.length!==0&&y.sendChat(m,a.state.displayName,d)}function _(d,p){let M=d.getRemoteConnectionInfo().getUserAlias();g&&r.value===1&&a.commit("setVideoList",[{connection:d,media:p,index:r.value,displayName:M}]),v.value[d.getId()]={connection:d,remoteMedia:p,index:r.value++,displayName:M},A(a.state.activeSpeakerDevice),y.createDownStreamCloseHandler(d,I)}function F(d){var p=JSON.parse(d);a.commit("addChatMessage",p)}st(async()=>{if(!a.state.channelId){s.params.channelId?l.push({name:"Lobby",params:{channelId:s.params.channelId}}):l.push("/");return}a.state.upstreamConnection||(c=await y.registerClient(a.state.displayName,a.state.channelId),m=await y.getChannel(c),y.openSfuUpstreamConnection(a.state.localMedia,m),y.createDownStreamOpenHandler(m,_)),a.commit("setLocalMedia",o),a.commit("populateCameraList"),a.commit("populateMicrophoneList"),a.commit("setActiveVideoDevice",o.getVideoSourceInput().getId()),a.commit("setActiveAudioDevice",o.getAudioSourceInput().getId()),a.commit("setVideoMuted",o.getVideoMuted()),a.commit("setAudioMuted",o.getAudioMuted()),y.addIncomingChatHandler(m,F)});const R=P(()=>a.state.pinLocal||k.value===1),E=P(()=>a.state.pinLocal?r.value-1:Math.ceil(r.value/oe));re(a.state.pinLocal,q);function j(){k.value*oe-1<r.value&&(k.value++,q())}function D(){k.value>1&&(k.value--,q())}function q(){let d=new Array;if(a.state.pinLocal||k.value===1)for(let p in v.value){let M=v.value[p];M.index===k.value&&d.push(M)}else for(let p in v.value){let M=v.value[p];(M.index===k.value*oe-oe||M.index===k.value*oe-1)&&d.push(M)}a.commit("setVideoList",d)}function K(d){S.value=d}return re(r,function(){const d=Math.ceil(Math.sqrt(r.value)),p=100/d;f.value="calc("+p+"% - "+d*5+"px)"}),(d,p)=>Z(g)?u.value?(V(),G(Na,{key:1,store:Z(a),remoteCounter:r.value,currentTab:S.value,showLocal:R.value,pageNumber:k.value,lastPage:E.value,onLeaveCall:h,onChangeCamera:i,onChangeMicrophone:z,onChangeSpeaker:A,onSendChat:N,onPrevPage:D,onNextPage:j,onSwitchTab:K},null,8,["store","remoteCounter","currentTab","showLocal","pageNumber","lastPage"])):(V(),G(sn,{key:2,store:Z(a),remoteCounter:r.value,currentTab:S.value,showLocal:R.value,pageNumber:k.value,lastPage:E.value,onLeaveCall:h,onChangeCamera:i,onChangeMicrophone:z,onChangeSpeaker:A,onSendChat:N,onPrevPage:D,onNextPage:j,onSwitchTab:K},null,8,["store","remoteCounter","currentTab","showLocal","pageNumber","lastPage"])):(V(),G(Qt,{key:0,store:Z(a),remoteCounter:r.value,videoDimensions:Z(f),downstreamConnections:Z(v),onLeaveCall:h,onChangeCamera:i,onChangeMicrophone:z,onChangeSpeaker:A,onSendChat:N},null,8,["store","remoteCounter","videoDimensions","downstreamConnections"]))}});export{un as default};
