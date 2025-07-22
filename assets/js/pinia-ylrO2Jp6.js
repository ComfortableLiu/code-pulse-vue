import{a2 as r,r as l,a3 as p}from"./@vue-BkYI8UWU.js";/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const u=Symbol();var o;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(o||(o={}));function h(){const t=r(!0),s=t.run(()=>l({}));let c=[],n=[];const a=p({install(e){a._a=e,e.provide(u,a),e.config.globalProperties.$pinia=a,n.forEach(i=>c.push(i)),n=[]},use(e){return this._a?c.push(e):n.push(e),this},_p:c,_a:null,_e:t,_s:new Map,state:s});return a}export{h as c};
