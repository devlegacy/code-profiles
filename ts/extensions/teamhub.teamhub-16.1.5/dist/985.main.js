/*! For license information please see 985.main.js.LICENSE.txt */
exports.id=985,exports.ids=[985],exports.modules={24985:function(e,n,t){!function(e,n,t,a){"use strict";function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=_interopDefaultLegacy(t),i="REAL_TIME",o="NEAR_REAL_TIME",s="BEST_EFFORT",u="POST",c="Microsoft_ApplicationInsights_BypassAjaxInstrumentation",l="drop",d="send",f="requeue",h="rspFail",v="oth",_="no-cache, no-store",p="application/x-json-stream",y="cache-control",m="content-type",g="kill-tokens",T="kill-duration",S="kill-duration-seconds",E="time-delta-millis",b="client-version",P="client-id",C="time-delta-to-apply-millis",R="upload-time",B="apikey",w="AuthMsaDeviceTicket",M="AuthXToken",A="NoResponseBody",x="msfpc",F="trace",O="user";function _getEventMsfpc(e){var n=(e.ext||{}).intweb;return n&&a.isValueAssigned(n[x])?n[x]:null}function _getMsfpc(e){for(var n=null,t=0;null===n&&t<e.length;t++)n=_getEventMsfpc(e[t]);return n}var H=function(){function EventBatch(e,n){var t=n?[].concat(n):[],r=this,i=_getMsfpc(t);r.iKey=function(){return e},r.Msfpc=function(){return i||""},r.count=function(){return t.length},r.events=function(){return t},r.addEvent=function(e){return!!e&&(t.push(e),i||(i=_getEventMsfpc(e)),!0)},r.split=function(n,r){var o;if(n<t.length){var s=t.length-n;a.isNullOrUndefined(r)||(s=r<s?r:s),o=t.splice(n,s),i=_getMsfpc(t)}return new EventBatch(e,o)}}return EventBatch.create=function(e,n){return new EventBatch(e,n)},EventBatch}(),k=function(){function ClockSkewManager(){var e=!0,n=!0,t=!0,a="use-collector-delta",i=!1;r(ClockSkewManager,this,(function(r){r.allowRequestSending=function(){return e},r.firstRequestSent=function(){t&&(t=!1,i||(e=!1))},r.shouldAddClockSkewHeaders=function(){return n},r.getClockSkewHeaderValue=function(){return a},r.setClockSkew=function(t){i||(t?(a=t,n=!0,i=!0):n=!1,e=!0)}}))}return ClockSkewManager.__ieDyn=1,ClockSkewManager}(),K=1e3,N=function(){function KillSwitch(){var e={};function _normalizeTenants(e){var n=[];return e&&a.arrForEach(e,(function(e){n.push(a.strTrim(e))})),n}r(KillSwitch,this,(function(n){n.setKillSwitchTenants=function(n,t){if(n&&t)try{var r=_normalizeTenants(n.split(","));if("this-request-only"===t)return r;for(var i=parseInt(t,10)*K,o=0;o<r.length;++o)e[r[o]]=a.dateNow()+i}catch(e){return[]}return[]},n.isTenantKilled=function(n){var t=e,r=a.strTrim(n);return void 0!==t[r]&&t[r]>a.dateNow()||(delete t[r],!1)}}))}return KillSwitch.__ieDyn=1,KillSwitch}(),D=.8,L=1.2,I=3e3,q=6e5;function retryPolicyShouldRetryForStatus(e){return!(e>=300&&e<500&&408!=e&&429!=e||501==e||505==e)}function retryPolicyGetMillisToBackoffForRetry(e){var n=0,t=I*D,a=I*L,r=Math.floor(Math.random()*(a-t))+t;return n=Math.pow(2,e)*r,Math.min(n,q)}var Q,z=20,U=3984588,j=65e3,W=2e6,V=Math.min(W,j),X="metadata",J="f",G=/\./,Y=function(){function Serializer(e,n,t,i){var o="data",s="baseData",u="ext",c=!!i,l=!0,d=n,f={};r(Serializer,this,(function(n){function _isReservedField(e,n){var t=f[e];return void 0===t&&(e.length>=7&&(t=a.strStartsWith(e,"ext.metadata")||a.strStartsWith(e,"ext.web")),f[e]=t),t}function _processPathKeys(e,n,r,i,o,s,u){a.objForEachKey(e,(function(e,l){var f=null;if(l||a.isValueAssigned(l)){var h=r,v=e,_=o,p=n;if(c&&!i&&G.test(e)){var y=e.split("."),m=y.length;if(m>1){_&&(_=_.slice());for(var g=0;g<m-1;g++){var T=y[g];p=p[T]=p[T]||{},h+="."+T,_&&_.push(T)}v=y[m-1]}}if(f=i&&_isReservedField(h)||!d||!d.handleField(h,v)?a.sanitizeProperty(v,l,t):d.value(h,v,l,t)){var S=f.value;if(p[v]=S,s&&s(_,v,f),u&&"object"==typeof S&&!a.isArray(S)){var E=_;E&&(E=E.slice()).push(v),_processPathKeys(l,S,h+"."+v,i,E,s,u)}}}}))}n.createPayload=function(e,n,t,a,r,i){return{apiKeys:[],payloadBlob:"",overflow:null,sizeExceed:[],failedEvts:[],batches:[],numEvents:0,retryCnt:e,isTeardown:n,isSync:t,isBeacon:a,sendType:i,sendReason:r}},n.appendPayload=function(t,r,i){var o=t&&r&&!t.overflow;return o&&a.doPerf(e,(function(){return"Serializer:appendPayload"}),(function(){for(var e=r.events(),o=t.payloadBlob,s=t.numEvents,u=!1,c=[],l=[],d=t.isBeacon,f=d?j:U,h=d?V:W,v=0,_=0;v<e.length;){var p=e[v];if(p){if(s>=i){t.overflow=r.split(v);break}var y=n.getEventBlob(p);if(y&&y.length<=h){var m=y.length;if(o.length+m>f){t.overflow=r.split(v);break}o&&(o+="\n"),o+=y,++_>z&&(o.substr(0,1),_=0),u=!0,s++}else y?c.push(p):l.push(p),e.splice(v,1),v--}v++}if(c&&c.length>0&&t.sizeExceed.push(H.create(r.iKey(),c)),l&&l.length>0&&t.failedEvts.push(H.create(r.iKey(),l)),u){t.batches.push(r),t.payloadBlob=o,t.numEvents=s;var g=r.iKey();-1===a.arrIndexOf(t.apiKeys,g)&&t.apiKeys.push(g)}}),(function(){return{payload:t,theBatch:{iKey:r.iKey(),evts:r.events()},max:i}})),o},n.getEventBlob=function(n){try{return a.doPerf(e,(function(){return"Serializer.getEventBlob"}),(function(){var e={};e.name=n.name,e.time=n.time,e.ver=n.ver,e.iKey="o:"+a.getTenantId(n.iKey);var t={},r=n[u];r&&(e[u]=t,a.objForEachKey(r,(function(e,n){_processPathKeys(n,t[e]={},"ext."+e,!0,null,null,!0)})));var i=e[o]={};i.baseType=n.baseType;var c=i[s]={};return _processPathKeys(n.baseData,c,s,!1,[s],(function(e,n,a){_addJSONPropertyMetaData(t,e,n,a)}),l),_processPathKeys(n.data,i,o,!1,[],(function(e,n,a){_addJSONPropertyMetaData(t,e,n,a)}),l),JSON.stringify(e)}),(function(){return{item:n}}))}catch(e){return null}}}))}return Serializer.__ieDyn=1,Serializer}();function _addJSONPropertyMetaData(e,n,t,r){if(r&&e){var i=a.getCommonSchemaMetaData(r.value,r.kind,r.propertyType);if(i>-1){var o=e[X];o||(o=e[X]={f:{}});var s=o[J];if(s||(s=o[J]={}),n)for(var u=0;u<n.length;u++){var c=n[u];s[c]||(s[c]={f:{}});var l=s[c][J];l||(l=s[c][J]={}),s=l}s=s[t]={},a.isArray(r.value)?s.a={t:i}:s.t=i}}}var Z="sendAttempt",$="&"+A+"=true",ee=((Q={})[1]=f,Q[100]=f,Q[200]="sent",Q[8004]=l,Q[8003]=l,Q),ne={},te={};function _addCollectorHeaderQsMapping(e,n,t){ne[e]=n,!1!==t&&(te[n]=e)}function _getResponseText(e){try{return e.responseText}catch(e){}return""}function _hasHeader(e,n){var t=!1;if(e&&n){var r=a.objKeys(e);if(r&&r.length>0)for(var i=n.toLowerCase(),o=0;o<r.length;o++){var s=r[o];if(s&&a.hasOwnProperty(n,s)&&s.toLowerCase()===i){t=!0;break}}}return t}function _addRequestDetails(e,n,t,a){n&&t&&t.length>0&&(a&&ne[n]?(e.hdrs[ne[n]]=t,e.useHdrs=!0):e.url+="&"+n+"="+t)}_addCollectorHeaderQsMapping(w,w,!1),_addCollectorHeaderQsMapping(b,b),_addCollectorHeaderQsMapping(P,"Client-Id"),_addCollectorHeaderQsMapping(B,B),_addCollectorHeaderQsMapping(C,C),_addCollectorHeaderQsMapping(R,R),_addCollectorHeaderQsMapping(M,M);var ae=function(){function HttpManager(e,n,t,i,o){this._responseHandlers=[];var s,f,w,M,A,F,O,H="?cors=true&"+m.toLowerCase()+"="+p,K=new N,D=!1,L=new k,I=!1,q=0,Q=!0,z=[],U={},j=[],W=null,V=!1,X=!1,J=!1;r(HttpManager,this,(function(r){var k=!0;function _getSenderInterface(e,n){for(var t=0,r=null,i=0;null==r&&i<e.length;)1===(t=e[i])?a.useXDomainRequest()?r=_xdrSendPost:a.isXhrSupported()&&(r=_xhrSendPost):2===t&&a.isFetchSupported(n)?r=_fetchSendPost:I&&3===t&&a.isBeaconsSupported()&&(r=_beaconSendPost),i++;return r?{_transport:t,_isSync:n,sendPOST:r}:null}function _xdrSendPost(e,n,t){var a=new XDomainRequest;a.open(u,e.urlString),e.timeout&&(a.timeout=e.timeout),a.onload=function(){var e=_getResponseText(a);_doOnComplete(n,200,{},e),_handleCollectorResponse(e)},a.onerror=function(){_doOnComplete(n,400,{})},a.ontimeout=function(){_doOnComplete(n,500,{})},a.onprogress=function(){},t?a.send(e.data):o.set((function(){a.send(e.data)}),0)}function _fetchSendPost(e,n,t){var r,i=e.urlString,s=!1,l=!1,d=((r={body:e.data,method:u})[c]=!0,r);t&&(d.keepalive=!0,2===e._sendReason&&(s=!0,i+=$)),k&&(d.credentials="include"),e.headers&&a.objKeys(e.headers).length>0&&(d.headers=e.headers),fetch(i,d).then((function(e){var t={},a="",r=e.headers;r&&r.forEach((function(e,n){t[n]=e})),e.body&&e.text().then((function(e){a=e})),l||(l=!0,_doOnComplete(n,e.status,t,a),_handleCollectorResponse(a))})).catch((function(e){l||(l=!0,_doOnComplete(n,0,{}))})),s&&!l&&(l=!0,_doOnComplete(n,200,{})),!l&&e.timeout>0&&o.set((function(){l||(l=!0,_doOnComplete(n,500,{}))}),e.timeout)}function _xhrSendPost(e,n,t){var r=e.urlString;function _appendHeader(e,n,t){if(!e[t]&&n&&n.getResponseHeader){var r=n.getResponseHeader(t);r&&(e[t]=a.strTrim(r))}return e}function _getAllResponseHeaders(e){var n={};return e.getAllResponseHeaders?n=_convertAllHeadersToMap(e.getAllResponseHeaders()):(n=_appendHeader(n,e,E),n=_appendHeader(n,e,T),n=_appendHeader(n,e,S)),n}function xhrComplete(e,t){_doOnComplete(n,e.status,_getAllResponseHeaders(e),t)}t&&e.disableXhrSync&&(t=!1);var i=a.openXhr(u,r,k,!0,t,e.timeout);a.objForEachKey(e.headers,(function(e,n){i.setRequestHeader(e,n)})),i.onload=function(){var e=_getResponseText(i);xhrComplete(i,e),_handleCollectorResponse(e)},i.onerror=function(){xhrComplete(i)},i.ontimeout=function(){xhrComplete(i)},i.send(e.data)}function _doOnComplete(e,n,t,r){try{e(n,t,r)}catch(e){a._throwInternal(f,2,518,a.dumpObj(e))}}function _beaconSendPost(e,n,t){var r=200,i=e._thePayload,o=e.urlString+$;try{var s=a.getNavigator();if(!s.sendBeacon(o,e.data))if(i){var u=[];a.arrForEach(i.batches,(function(e){if(u&&e&&e.count()>0){for(var n=e.events(),t=0;t<n.length;t++)if(!s.sendBeacon(o,W.getEventBlob(n[t]))){u.push(e.split(t));break}}else u.push(e.split(0))})),_sendBatchesNotification(u,8003,i.sendType,!0)}else r=0}catch(e){a._warnToConsole(f,"Failed to send telemetry using sendBeacon API. Ex:"+a.dumpObj(e)),r=0}finally{_doOnComplete(n,r,{},"")}}function _isBeaconPayload(e){return 2===e||3===e}function _adjustSendType(e){return X&&_isBeaconPayload(e)&&(e=2),e}function _hasIdleConnection(){return!D&&q<n}function _clearQueue(){var e=j;return j=[],e}function _canSendPayload(e,n,t){var a=!1;return e&&e.length>0&&!D&&w[n]&&W&&(a=0!==n||_hasIdleConnection()&&(t>0||L.allowRequestSending())),a}function _createDebugBatches(e){var n={};return e&&a.arrForEach(e,(function(e,t){n[t]={iKey:e.iKey(),evts:e.events()}})),n}function _sendBatches(n,t,r,i,o){if(n&&0!==n.length)if(D)_sendBatchesNotification(n,1,i);else{i=_adjustSendType(i);try{var s=n,u=0!==i;a.doPerf(M,(function(){return"HttpManager:_sendBatches"}),(function(s){s&&(n=n.slice(0));for(var c=[],l=null,d=a.getTime(),f=w[i]||(u?w[1]:w[0]),h=(X||_isBeaconPayload(i)||f&&3===f._transport)&&_canUseSendBeaconApi();_canSendPayload(n,i,t);){var v=n.shift();v&&v.count()>0&&(K.isTenantKilled(v.iKey())?c.push(v):(l=l||W.createPayload(t,r,u,h,o,i),W.appendPayload(l,v,e)?null!==l.overflow&&(n=[l.overflow].concat(n),l.overflow=null,_doPayloadSend(l,d,a.getTime(),o),d=a.getTime(),l=null):(_doPayloadSend(l,d,a.getTime(),o),d=a.getTime(),n=[v].concat(n),l=null)))}l&&_doPayloadSend(l,d,a.getTime(),o),n.length>0&&(j=n.concat(j)),_sendBatchesNotification(c,8004,i)}),(function(){return{batches:_createDebugBatches(s),retryCount:t,isTeardown:r,isSynchronous:u,sendReason:o,useSendBeacon:_isBeaconPayload(i),sendType:i}}),!u)}catch(e){a._throwInternal(f,2,48,"Unexpected Exception sending batch: "+a.dumpObj(e))}}}function _buildRequestDetails(e,n){var t={url:H,hdrs:{},useHdrs:!1};n?(t.hdrs=a.extend(t.hdrs,U),t.useHdrs=a.objKeys(t.hdrs).length>0):a.objForEachKey(U,(function(e,n){te[e]?_addRequestDetails(t,te[e],n,!1):(t.hdrs[e]=n,t.useHdrs=!0)})),_addRequestDetails(t,P,"NO_AUTH",n),_addRequestDetails(t,b,a.FullVersionString,n);var r="";a.arrForEach(e.apiKeys,(function(e){r.length>0&&(r+=","),r+=e})),_addRequestDetails(t,B,r,n),_addRequestDetails(t,R,a.dateNow().toString(),n);var i=_getMsfpc(e);if(a.isValueAssigned(i)&&(t.url+="&ext.intweb.msfpc="+i),L.shouldAddClockSkewHeaders()&&_addRequestDetails(t,C,L.getClockSkewHeaderValue(),n),M.getWParam){var o=M.getWParam();o>=0&&(t.url+="&w="+o)}for(var s=0;s<z.length;s++)t.url+="&"+z[s].name+"="+z[s].value;return t}function _canUseSendBeaconApi(){return!Q&&I&&a.isBeaconsSupported()}function _setTimingValue(e,n,t){e[n]=e[n]||{},e[n][s.identifier]=t}function _doPayloadSend(e,n,t,i){if(e&&e.payloadBlob&&e.payloadBlob.length>0){var o=!!r.sendHook,s=w[e.sendType];!_isBeaconPayload(e.sendType)&&e.isBeacon&&2===e.sendReason&&(s=w[2]||w[3]||s);var u=J;(e.isBeacon||3===s._transport)&&(u=!1);var c=_buildRequestDetails(e,u);u=u||c.useHdrs;var l=a.getTime();a.doPerf(M,(function(){return"HttpManager:_doPayloadSend"}),(function(){for(var d=0;d<e.batches.length;d++)for(var h=e.batches[d].events(),v=0;v<h.length;v++){var g=h[v];if(V){var T=g.timings=g.timings||{};_setTimingValue(T,"sendEventStart",l),_setTimingValue(T,"serializationStart",n),_setTimingValue(T,"serializationCompleted",t)}g[Z]>0?g[Z]++:g[Z]=1}_sendBatchesNotification(e.batches,1e3+(i||0),e.sendType,!0);var S={data:e.payloadBlob,urlString:c.url,headers:c.hdrs,_thePayload:e,_sendReason:i,timeout:F};a.isUndefined(O)||(S.disableXhrSync=!!O),u&&(_hasHeader(S.headers,y)||(S.headers[y]=_),_hasHeader(S.headers,m)||(S.headers[m]=p));var E=null;s&&(E=function(n){L.firstRequestSent();var onComplete=function(n,t){_retryRequestIfNeeded(n,t,e,i)},t=e.isTeardown||e.isSync;try{s.sendPOST(n,onComplete,t),r.sendListener&&r.sendListener(S,n,t,e.isBeacon)}catch(e){a._warnToConsole(f,"Unexpected exception sending payload. Ex:"+a.dumpObj(e)),_doOnComplete(onComplete,0,{})}}),a.doPerf(M,(function(){return"HttpManager:_doPayloadSend.sender"}),(function(){if(E)if(0===e.sendType&&q++,o&&!e.isBeacon&&3!==s._transport){var n={data:S.data,urlString:S.urlString,headers:a.extend({},S.headers),timeout:S.timeout,disableXhrSync:S.disableXhrSync},t=!1;a.doPerf(M,(function(){return"HttpManager:_doPayloadSend.sendHook"}),(function(){try{r.sendHook(n,(function(e){t=!0,Q||e._thePayload||(e._thePayload=e._thePayload||S._thePayload,e._sendReason=e._sendReason||S._sendReason),E(e)}),e.isSync||e.isTeardown)}catch(e){t||E(S)}}))}else E(S)}))}),(function(){return{thePayload:e,serializationStart:n,serializationCompleted:t,sendReason:i}}),e.isSync)}e.sizeExceed&&e.sizeExceed.length>0&&_sendBatchesNotification(e.sizeExceed,8003,e.sendType),e.failedEvts&&e.failedEvts.length>0&&_sendBatchesNotification(e.failedEvts,8002,e.sendType)}function _addEventCompletedTimings(e,n){V&&a.arrForEach(e,(function(e){_setTimingValue(e.timings=e.timings||{},"sendEventCompleted",n)}))}function _retryRequestIfNeeded(e,n,r,i){var o=9e3,s=null,u=!1,c=!1;try{var l=!0;if(typeof e!==a.strUndefined){if(n){L.setClockSkew(n[E]);var d=n[T]||n["kill-duration-seconds"];a.arrForEach(K.setKillSwitchTenants(n[g],d),(function(e){a.arrForEach(r.batches,(function(n){if(n.iKey()===e){s=s||[];var t=n.split(0);r.numEvents-=t.count(),s.push(t)}}))}))}if(200==e||204==e)return void(o=200);(!retryPolicyShouldRetryForStatus(e)||r.numEvents<=0)&&(l=!1),o=9e3+e%1e3}if(l){o=100;var f=r.retryCnt;0===r.sendType&&(f<t?(u=!0,_doAction((function(){0===r.sendType&&q--,_sendBatches(r.batches,f+1,r.isTeardown,X?2:r.sendType,5)}),X,retryPolicyGetMillisToBackoffForRetry(f))):(c=!0,X&&(o=8001)))}}finally{u||(L.setClockSkew(),_handleRequestFinished(r,o,i,c)),_sendBatchesNotification(s,8004,r.sendType)}}function _handleRequestFinished(e,n,t,a){try{a&&s._backOffTransmission(),200===n&&(a||e.isSync||s._clearBackOff(),_addCompleteTimings(e.batches)),_sendBatchesNotification(e.batches,n,e.sendType,!0)}finally{0===e.sendType&&(q--,5!==t&&r.sendQueuedRequests(e.sendType,t))}}function _addCompleteTimings(e){if(V){var n=a.getTime();a.arrForEach(e,(function(e){e&&e.count()>0&&_addEventCompletedTimings(e.events(),n)}))}}function _doAction(e,n,t){n?e():o.set(e,t)}function _convertAllHeadersToMap(e){var n={};if(a.isString(e)){var t=a.strTrim(e).split(/[\r\n]+/);a.arrForEach(t,(function(e){if(e){var t=e.indexOf(": ");if(-1!==t){var r=a.strTrim(e.substring(0,t)).toLowerCase(),i=a.strTrim(e.substring(t+1));n[r]=i}else n[a.strTrim(e)]=1}}))}return n}function _getMsfpc(e){for(var n=0;n<e.batches.length;n++){var t=e.batches[n].Msfpc();if(t)return encodeURIComponent(t)}return""}function _handleCollectorResponse(e){var n=r._responseHandlers;try{for(var t=0;t<n.length;t++)try{n[t](e)}catch(e){a._throwInternal(f,1,519,"Response handler failed: "+e)}if(e){var i=JSON.parse(e);a.isValueAssigned(i.webResult)&&a.isValueAssigned(i.webResult[x])&&A.set("MSFPC",i.webResult[x],31536e3)}}catch(e){}}function _sendBatchesNotification(e,n,t,r){if(e&&e.length>0&&i){var o=i[_getNotificationAction(n)];if(o){var s=0!==t;a.doPerf(M,(function(){return"HttpManager:_sendBatchesNotification"}),(function(){_doAction((function(){try{o.call(i,e,n,s,t)}catch(e){a._throwInternal(f,1,74,"send request notification failed: "+e)}}),r||s,0)}),(function(){return{batches:_createDebugBatches(e),reason:n,isSync:s,sendSync:r,sendType:t}}),!s)}}}function _getNotificationAction(e){var n=ee[e];return a.isValueAssigned(n)||(n=v,e>=9e3&&e<=9999?n=h:e>=8e3&&e<=8999?n=l:e>=1e3&&e<=1999&&(n=d)),n}r.initialize=function(e,n,t,r,i){var o;i||(i={}),H=e+H,J=!!a.isUndefined(i.avoidOptions)||!i.avoidOptions,M=n,A=n.getCookieMgr(),V=!M.config.disableEventTimings;var u=!!M.config.enableCompoundKey;f=(s=t).diagLog();var c=i.valueSanitizer,l=i.stringifyObjects;a.isUndefined(i.enableCompoundKey)||(u=!!i.enableCompoundKey),F=i.xhrTimeout,O=i.disableXhrSync,I=!a.isReactNative(),W=new Y(M,c,l,u);var d=r,h=i.alwaysUseXhrOverride?r:null,v=i.alwaysUseXhrOverride?r:null;if(!r){Q=!1;var _=a.getLocation();_&&_.protocol&&"file:"===_.protocol.toLowerCase()&&(k=!1);var p=[];p=a.isReactNative()?[2,1]:[1,2,3];var y=i.transports;y&&(a.isNumber(y)?p=[y].concat(p):a.isArray(y)&&(p=y.concat(p))),r=_getSenderInterface(p,!1),d=_getSenderInterface(p,!0),r||a._warnToConsole(f,"No available transport to send events")}(o={})[0]=r,o[1]=d||_getSenderInterface([1,2,3],!0),o[2]=h||_getSenderInterface([3,2],!0)||d||_getSenderInterface([1],!0),o[3]=v||_getSenderInterface([2,3],!0)||d||_getSenderInterface([1],!0),w=o},r._getDbgPlgTargets=function(){return[w[0],K,W,w]},r.addQueryStringParameter=function(e,n){for(var t=0;t<z.length;t++)if(z[t].name===e)return void(z[t].value=n);z.push({name:e,value:n})},r.addHeader=function(e,n){U[e]=n},r.canSendRequest=function(){return _hasIdleConnection()&&L.allowRequestSending()},r.sendQueuedRequests=function(e,n){a.isUndefined(e)&&(e=0),X&&(e=_adjustSendType(e),n=2),_canSendPayload(j,e,0)&&_sendBatches(_clearQueue(),0,!1,e,n||0)},r.isCompletelyIdle=function(){return!D&&0===q&&0===j.length},r.setUnloading=function(e){X=e},r.addBatch=function(e){if(e&&e.count()>0){if(K.isTenantKilled(e.iKey()))return!1;j.push(e)}return!0},r.teardown=function(){j.length>0&&_sendBatches(_clearQueue(),0,!0,2,2)},r.pause=function(){D=!0},r.resume=function(){D=!1,r.sendQueuedRequests(0,4)},r.sendSynchronousBatch=function(e,n,t){e&&e.count()>0&&(a.isNullOrUndefined(n)&&(n=1),X&&(n=_adjustSendType(n),t=2),_sendBatches([e],0,!1,n,t||0))}}))}return HttpManager.__ieDyn=1,HttpManager}();function defaultSetTimeout(e,n){for(var t=[],a=2;a<arguments.length;a++)t[a-2]=arguments[a];return setTimeout(e,n,t)}function defaultClearTimeout(e){clearTimeout(e)}function createTimeoutWrapper(e,n){return{set:e||defaultSetTimeout,clear:n||defaultClearTimeout}}var re=.25,ie=500,oe=20,se=6,ue=2,ce=4,le=2,de=1,fe="eventsDiscarded",he="overrideInstrumentationKey",ve="maxEventRetryAttempts",_e="maxUnloadEventRetryAttempts",pe="addUnloadCb",ye=function(e){function PostChannel(){var n,t=e.call(this)||this;t.identifier="PostChannel",t.priority=1011,t.version="3.2.6";var u,c,l,d,f,h,v,_=!1,p=[],y=null,m=!1,g=0,T=500,S=0,E=1e4,b={},P=i,C=null,R=null,B=0,M=0,A={},x=-1,k=!0,K=!1,N=se,D=ue;return r(PostChannel,t,(function(e,t){function _hookWParam(e){var t=e.getWParam;e.getWParam=function(){var e=0;return n.ignoreMc1Ms0CookieProcessing&&(e|=2),e|t()}}function _handleUnloadEvents(e){"beforeunload"!==(e||a.getWindow().event).type&&(K=!0,c.setUnloading(K)),_releaseAllQueues(2,2)}function _handleShowEvents(e){K=!1,c.setUnloading(K)}function _addEventToQueues(e,n){if(e.sendAttempt||(e.sendAttempt=0),e.latency||(e.latency=1),e.ext&&e.ext[F]&&delete e.ext[F],e.ext&&e.ext[O]&&e.ext[O].id&&delete e.ext[O].id,k&&(e.ext=a.optimizeObject(e.ext),e.baseData&&(e.baseData=a.optimizeObject(e.baseData)),e.data&&(e.data=a.optimizeObject(e.data))),e.sync)if(B||m)e.latency=3,e.sync=!1;else if(c)return k&&(e=a.optimizeObject(e)),void c.sendSynchronousBatch(H.create(e.iKey,[e]),!0===e.sync?1:e.sync,3);var t=e.latency,r=S,i=E;4===t&&(r=g,i=T);var o=!1;if(r<i)o=!_addEventToProperQueue(e,n);else{var s=1,u=oe;4===t&&(s=4,u=1),o=!0,_dropEventWithLatencyOrLess(e.iKey,e.latency,s,u)&&(o=!_addEventToProperQueue(e,n))}o&&_notifyEvents(fe,[e],a.EventsDiscardedReason.QueueFull)}function _sendEventsForLatencyAndAbove(e,n,t){var a=_queueBatches(e,n,t);return c.sendQueuedRequests(n,t),a}function _hasEvents(){return S>0}function _scheduleTimer(){if(x>=0&&_queueBatches(x,0,f)&&c.sendQueuedRequests(0,f),g>0&&!R&&!m){var e=b[P][2];e>=0&&(R=_createTimer((function(){R=null,_sendEventsForLatencyAndAbove(4,0,1),_scheduleTimer()}),e))}var n=b[P][1];!C&&!y&&n>=0&&!m&&(_hasEvents()?C=_createTimer((function(){C=null,_sendEventsForLatencyAndAbove(0===M?3:1,0,1),M++,M%=2,_scheduleTimer()}),n):M=0)}function _initDefaults(){n=null,_=!1,p=[],y=null,m=!1,g=0,T=500,S=0,E=1e4,b={},P=i,C=null,R=null,B=0,M=0,u=null,A={},l=void 0,d=0,x=-1,f=null,k=!0,K=!1,N=se,D=ue,h=null,v=createTimeoutWrapper(),c=new ae(ie,le,de,{requeue:_requeueEvents,send:_sendingEvent,sent:_eventsSentEvent,drop:_eventsDropped,rspFail:_eventsResponseFail,oth:_otherEvent},v),_initializeProfiles(),_clearQueues(),_setAutoLimits()}function _createTimer(e,n){0===n&&B&&(n=1);var t=1e3;return B&&(t=retryPolicyGetMillisToBackoffForRetry(B-1)),v.set(e,n*t)}function _clearScheduledTimer(){return null!==C&&(v.clear(C),C=null,M=0,!0)}function _releaseAllQueues(e,n){_clearScheduledTimer(),y&&(v.clear(y),y=null),m||_sendEventsForLatencyAndAbove(1,e,n)}function _clearQueues(){A[4]={batches:[],iKeyMap:{}},A[3]={batches:[],iKeyMap:{}},A[2]={batches:[],iKeyMap:{}},A[1]={batches:[],iKeyMap:{}}}function _getEventBatch(e,n,t){var a=A[n];a||(a=A[n=1]);var r=a.iKeyMap[e];return!r&&t&&(r=H.create(e),a.batches.push(r),a.iKeyMap[e]=r),r}function _performAutoFlush(n,t){c.canSendRequest()&&!B&&(l>0&&S>l&&(t=!0),t&&null==y&&e.flush(n,null,20))}function _addEventToProperQueue(e,n){k&&(e=a.optimizeObject(e));var t=e.latency,r=_getEventBatch(e.iKey,t,!0);return!!r.addEvent(e)&&(4!==t?(S++,n&&0===e.sendAttempt&&_performAutoFlush(!e.sync,d>0&&r.count()>=d)):g++,!0)}function _dropEventWithLatencyOrLess(e,n,t,r){for(;t<=n;){var i=_getEventBatch(e,n,!0);if(i&&i.count()>0){var o=i.split(0,r),s=o.count();if(s>0)return 4===t?g-=s:S-=s,_notifyBatchEvents(fe,[o],a.EventsDiscardedReason.QueueFull),!0}t++}return _resetQueueCounts(),!1}function _resetQueueCounts(){for(var e=0,n=0,_loop_1=function(t){var r=A[t];r&&r.batches&&a.arrForEach(r.batches,(function(a){4===t?e+=a.count():n+=a.count()}))},t=1;t<=4;t++)_loop_1(t);S=n,g=e}function _queueBatches(n,t,r){var i=!1,o=0===t;return!o||c.canSendRequest()?a.doPerf(e.core,(function(){return"PostChannel._queueBatches"}),(function(){for(var e=[],t=4;t>=n;){var r=A[t];r&&r.batches&&r.batches.length>0&&(a.arrForEach(r.batches,(function(n){c.addBatch(n)?i=i||n&&n.count()>0:e=e.concat(n.events()),4===t?g-=n.count():S-=n.count()})),r.batches=[],r.iKeyMap={}),t--}e.length>0&&_notifyEvents(fe,e,a.EventsDiscardedReason.KillSwitch),i&&x>=n&&(x=-1,f=0)}),(function(){return{latency:n,sendType:t,sendReason:r}}),!o):(x=x>=0?Math.min(x,n):n,f=Math.max(f,r)),i}function _flushImpl(e,n){_sendEventsForLatencyAndAbove(1,0,n),_resetQueueCounts(),_waitForIdleManager((function(){e&&e(),p.length>0?y=_createTimer((function(){y=null,_flushImpl(p.shift(),n)}),0):(y=null,_scheduleTimer())}))}function _waitForIdleManager(e){c.isCompletelyIdle()?e():y=_createTimer((function(){y=null,_waitForIdleManager(e)}),re)}function _resetTransmitProfiles(){_clearScheduledTimer(),_initializeProfiles(),P=i,_scheduleTimer()}function _initializeProfiles(){(b={})[i]=[2,1,0],b[o]=[6,3,0],b[s]=[18,9,0]}function _requeueEvents(n,t){var r=[],i=N;K&&(i=D),a.arrForEach(n,(function(n){n&&n.count()>0&&a.arrForEach(n.events(),(function(n){n&&(n.sync&&(n.latency=4,n.sync=!1),n.sendAttempt<i?(a.setProcessTelemetryTimings(n,e.identifier),_addEventToQueues(n,!1)):r.push(n))}))})),r.length>0&&_notifyEvents(fe,r,a.EventsDiscardedReason.NonRetryableStatus),K&&_releaseAllQueues(2,2)}function _callNotification(n,t){var r=e._notificationManager||{},i=r[n];if(i)try{i.apply(r,t)}catch(t){a._throwInternal(e.diagLog(),1,74,n+" notification failed: "+t)}}function _notifyEvents(e,n){for(var t=[],a=2;a<arguments.length;a++)t[a-2]=arguments[a];n&&n.length>0&&_callNotification(e,[n].concat(t))}function _notifyBatchEvents(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];n&&n.length>0&&a.arrForEach(n,(function(n){n&&n.count()>0&&_callNotification(e,[n.events()].concat(t))}))}function _sendingEvent(e,n,t){e&&e.length>0&&_callNotification("eventsSendRequest",[n>=1e3&&n<=1999?n-1e3:0,!0!==t])}function _eventsSentEvent(e,n){_notifyBatchEvents("eventsSent",e,n),_scheduleTimer()}function _eventsDropped(e,n){_notifyBatchEvents(fe,e,n>=8e3&&n<=8999?n-8e3:a.EventsDiscardedReason.Unknown)}function _eventsResponseFail(e){_notifyBatchEvents(fe,e,a.EventsDiscardedReason.NonRetryableStatus),_scheduleTimer()}function _otherEvent(e,n){_notifyBatchEvents(fe,e,a.EventsDiscardedReason.Unknown),_scheduleTimer()}function _setAutoLimits(){d=n&&n.disableAutoBatchFlushLimit?0:Math.max(ie*(le+1),E/6)}_initDefaults(),e._getDbgPlgTargets=function(){return[c]},e.initialize=function(r,i,o){a.doPerf(i,(function(){return"PostChannel:initialize"}),(function(){var s=i;t.initialize(r,i,o);try{i[pe],h=a.mergeEvtNamespace(a.createUniqueNamespace(e.identifier),i.evtNamespace&&i.evtNamespace());var d=e._getTelCtx();r.extensionConfig[e.identifier]=r.extensionConfig[e.identifier]||{},n=d.getExtCfg(e.identifier),v=createTimeoutWrapper(n.setTimeoutOverride,n.clearTimeoutOverride),k=!n.disableOptimizeObj&&a.isChromium(),_hookWParam(s),n.eventsLimitInMem>0&&(E=n.eventsLimitInMem),n.immediateEventLimit>0&&(T=n.immediateEventLimit),n.autoFlushEventsLimit>0&&(l=n.autoFlushEventsLimit),a.isNumber(n[ve])&&(N=n[ve]),a.isNumber(n[_e])&&(D=n[_e]),_setAutoLimits(),n.httpXHROverride&&n.httpXHROverride.sendPOST&&(u=n.httpXHROverride),a.isValueAssigned(r.anonCookieName)&&c.addQueryStringParameter("anoncknm",r.anonCookieName),c.sendHook=n.payloadPreprocessor,c.sendListener=n.payloadListener;var f=n.overrideEndpointUrl?n.overrideEndpointUrl:r.endpointUrl;e._notificationManager=r.extensionConfig.NotificationManager,c.initialize(f,e.core,e,u,n);var _=r.disablePageUnloadEvents||[];a.addPageUnloadEventListener(_handleUnloadEvents,_,h),a.addPageHideEventListener(_handleUnloadEvents,_,h),a.addPageShowEventListener(_handleShowEvents,r.disablePageShowEvents,h)}catch(n){throw e.setInitialized(!1),n}}),(function(){return{coreConfig:r,core:i,extensions:o}}))},e.processTelemetry=function(t,r){a.setProcessTelemetryTimings(t,e.identifier);var i=(r=e._getTelCtx(r)).getExtCfg(e.identifier),o=!!n.disableTelemetry;i&&(o=o||!!i.disableTelemetry);var s=t;o||_||(n[he]&&(s.iKey=n[he]),i&&i[he]&&(s.iKey=i[he]),_addEventToQueues(s,!0),K?_releaseAllQueues(2,2):_scheduleTimer()),e.processNext(s,r)},e._doTeardown=function(e,n){_releaseAllQueues(2,2),_=!0,c.teardown(),a.removePageUnloadEventListener(null,h),a.removePageHideEventListener(null,h),a.removePageShowEventListener(null,h),_initDefaults()},e.setEventQueueLimits=function(e,n){E=e>0?e:1e4,l=n>0?n:0,_setAutoLimits();var t=S>e;if(!t&&d>0)for(var r=1;!t&&r<=3;r++){var i=A[r];i&&i.batches&&a.arrForEach(i.batches,(function(e){e&&e.count()>=d&&(t=!0)}))}_performAutoFlush(!0,t)},e.pause=function(){_clearScheduledTimer(),m=!0,c.pause()},e.resume=function(){m=!1,c.resume(),_scheduleTimer()},e.addResponseHandler=function(e){c._responseHandlers.push(e)},e._loadTransmitProfiles=function(e){_resetTransmitProfiles(),a.objForEachKey(e,(function(e,n){var t=n.length;if(t>=2){var a=t>2?n[2]:0;if(n.splice(0,t-2),n[1]<0&&(n[0]=-1),n[1]>0&&n[0]>0){var r=n[0]/n[1];n[0]=Math.ceil(r)*n[1]}a>=0&&n[1]>=0&&a>n[1]&&(a=n[1]),n.push(a),b[e]=n}}))},e.flush=function(e,n,t){if(void 0===e&&(e=!0),!m)if(t=t||1,e)null==y?(_clearScheduledTimer(),_queueBatches(1,0,t),y=_createTimer((function(){y=null,_flushImpl(n,t)}),0)):p.push(n);else{var a=_clearScheduledTimer();_sendEventsForLatencyAndAbove(1,1,t),null!=n&&n(),a&&_scheduleTimer()}},e.setMsaAuthTicket=function(e){c.addHeader(w,e)},e.hasEvents=_hasEvents,e._setTransmitProfile=function(e){P!==e&&void 0!==b[e]&&(_clearScheduledTimer(),P=e,_scheduleTimer())},e._backOffTransmission=function(){B<ce&&(B++,_clearScheduledTimer(),_scheduleTimer())},e._clearBackOff=function(){B&&(B=0,_clearScheduledTimer(),_scheduleTimer())},a.objDefineAccessors(e,"_setTimeoutOverride",(function(){return v.set}),(function(e){v=createTimeoutWrapper(e,v.clear)})),a.objDefineAccessors(e,"_clearTimeoutOverride",(function(){return v.clear}),(function(e){v=createTimeoutWrapper(v.set,e)}))})),t}return n.__extendsFn(PostChannel,e),PostChannel.__ieDyn=1,PostChannel}(a.BaseTelemetryPlugin);e.BE_PROFILE=s,e.NRT_PROFILE=o,e.PostChannel=ye,e.RT_PROFILE=i,function(e,n,t){var a=Object.defineProperty;if(a)try{return a(e,n,t)}catch(e){}t&&void 0!==typeof t.value&&(e[n]=t.value)}(e,"__esModule",{value:!0})}(n,t(57253),t(56866),t(91479))}};
//# sourceMappingURL=985.16.1.5.dc45bd40e40192a7fcd7.map