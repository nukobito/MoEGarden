(function () {
    function startAlarm() {
        startDate = Date.now();
        chrome.storage.local.set( { startDate: startDate } );
        
        chrome.storage.local.get( [
            'selectedIndex',
            'checkedBoxes',
            'startDate'
        ], onGetStorage_Properties );
    };
    
    function stopAlarm() {
        chrome.alarms.clear( 'tick' );
        chrome.alarms.onAlarm.removeListener( onAlarm );
        
        chrome.browserAction.setBadgeText( { text: '' } );
        
        startDate = 0;
        chrome.storage.local.set( { startDate: 0 } );
    }
    
    function updateCheckedBoxes() {
        chrome.storage.local.get( 'checkedBoxes', onGetStorage_CheckedBoxes );
    }
    
    function updateBadge() {
        if ( selectedIndex == 0 )
            return void( 0 );
        
        var nowDate = Date.now();
        var parMinute = 1000 * 60;
        var minute = parseInt( constant[ selectedIndex ].times[ 0 ] - (( nowDate / parMinute ) - ( startDate / parMinute )) );
        
        var i = constant[ selectedIndex ].times.length - 1;
        for ( ; 0 <= i; i-- ) {
            if ( minute < constant[ selectedIndex ].times[ i ] )
                break;
        }
        
        if ( checkedBoxes[ i ] )
            chrome.browserAction.setBadgeBackgroundColor( { color: [ 0, 0, 255, 255 ] } );
        else
            chrome.browserAction.setBadgeBackgroundColor( { color: [ 255, 0, 0, 255 ] } );
        
        chrome.browserAction.setBadgeText( { text: String( minute ) } );
        
        if ( minute <= 0 )
            stopAlarm();
    }
    
    function onGetStorage_CheckedBoxes( items ) {
        if ( items.checkedBoxes )
            checkedBoxes = items.checkedBoxes;
        
        updateBadge();
    }
    
    function onInstalled() {
        stopAlarm();
    }
    
    function onGetStorage_Properties( items ) {
        if ( items.selectedIndex ) {
            selectedIndex = items.selectedIndex;
            
            if ( items.checkedBoxes )
                checkedBoxes = items.checkedBoxes;
            
            if ( items.startDate )
                startDate = items.startDate;
            
            chrome.browserAction.setBadgeText( { text: String( constant[ selectedIndex ].times[ 0 ] ) } );
            chrome.alarms.create( 'tick', { when: 0, periodInMinutes: 5 / 60 } );
            chrome.alarms.onAlarm.addListener( onAlarm );
        }
    }
    
    function onAlarm( alarm ) {
        updateBadge();
    }
    
    var constant = [
        { text: '【タイプを選ぶ】', times: [] },
        { text: '120分 (ハーブ等)', times: [ 120, 110, 80, 30, 0 ] },
        { text: '180分 (キノコ類)', times: [ 180, 120, 60, 0 ] },
        { text: '180分 (キノコ以外?)', times: [ 180, 160, 120, 60, 0 ] },
        { text: '240分 (栽培全般?)', times: [ 240, 180, 120, 60, 0 ] },
        { text: '300分 (イチゴ、稲等)', times: [ 300, 240, 180, 60, 0 ] },
        { text: '300分 (こんにゃく等)', times: [ 300, 240, 150, 60, 0 ] },
        { text: '360分 (フルーク)', times: [ 360, 300, 210, 90, 0 ] },
        { text: '360分 (スイカ名等)', times: [ 360, 300, 180, 60, 0 ] }
    ];
    
    var selectedIndex = 0;
    var checkedBoxes = [];
    var startDate = 0;
    
    chrome.runtime.onInstalled.addListener( onInstalled );
    chrome.storage.local.get( [
        'selectedIndex',
        'checkedBoxes',
        'startDate'
    ], onGetStorage_Properties );
    
    window.constant = constant;
    window.startAlarm = startAlarm;
    window.stopAlarm = stopAlarm;
    window.updateCheckedBoxes = updateCheckedBoxes;
}( window ));