var ALARM_NAME = 'MoEGarden';
var counter = 0;

chrome.browserAction.setBadgeText( { 'text': String( counter ) } );

chrome.alarms.onAlarm.addListener( function ( alarm ) {
    switch ( alarm.name ) {
        case ALARM_NAME:
            counter++;
            if ( 9999 < counter ) counter = 0;
            chrome.browserAction.setBadgeText( { 'text': String( counter ) } );
            break;
    }
} );

function startAlarm() {
    chrome.alarms.clear( ALARM_NAME );
    chrome.alarms.create( ALARM_NAME, { when: 0, periodInMinutes: 1 / 60 } );
}

function stopAlarm() {
    chrome.alarms.clear( ALARM_NAME );
}