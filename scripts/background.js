(function () {
    var items = [
        { text: '【タイプを選ぶ】', times: '' },
        { text: '120分 (ハーブ等)', times: '120,110,80,30,0' },
        { text: '180分 (キノコ類)', times: '180,120,60,0' },
        { text: '180分 (キノコ以外?)', times: '180,160,120,60,0' },
        { text: '240分 (栽培全般?)', times: '240,180,120,60,0' },
        { text: '300分 (イチゴ、稲等)', times: '300,240,180,60,0' },
        { text: '300分 (こんにゃく等)', times: '300,240,150,60,0' },
        { text: '360分 (フルーク)', times: '360,300,210,90,0' },
        { text: '360分 (スイカ名等)', times: '360,300,180,60,0' }
    ];
    
    var times = [];
    var startTime = null;
    
    var startAlarm = function ( index ) {
        times = items[ index ].times.split( ',' );
        startTime = Date.now();
        
        chrome.browserAction.setBadgeText( { text: times[ 0 ] } );
        chrome.alarms.create( 'tick', { when: 0, periodInMinutes: 1 / 60 } );   // TODO
    };
    
    var stopAlarm = function () {
        chrome.alarms.clear( 'tick' );
        chrome.browserAction.setBadgeText( { text: '' } );
    }
    
    function onInstalled() {
        stopAlarm();
    }
    
    function onAlarm( alarm ) {
        // TODO
        var nowTime = Date.now();
        var wk = (1000);    // TODO
        var minute = parseInt( times[ 0 ] ) - (parseInt( nowTime / wk ) - parseInt( startTime / wk ));
        
        chrome.browserAction.setBadgeText( { text: String( minute ) } );
    }
    
    chrome.runtime.onInstalled.addListener( onInstalled );
    chrome.alarms.onAlarm.addListener( onAlarm );
    
    window.items = items;
    window.startAlarm = startAlarm;
    window.stopAlarm = stopAlarm;
}( window ));