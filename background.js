var counter = 0;

//function update() {
//    chrome.browserAction.setBadgeText( { 'text': String( counter ) } );
//    chrome.alarms.create( 'MoEGarden', { delayInMinutes: 5 / 60 } );
//}

//chrome.runtime.onInstalled.addListener( function () {
//chrome.runtime.onStartup.addListener( function () {
//    update();
//} );

chrome.browserAction.setBadgeText( { 'text': String( counter ) } );

chrome.alarms.create( 'MoEGarden', { when: 0, periodInMinutes: 1 / 60 } );
chrome.alarms.onAlarm.addListener( function ( alarm ) {
    if ( !alarm )
        return;
    
    switch ( alarm.name ) {
        case 'MoEGarden':
            counter++;
            if ( 9999 < counter ) counter = 0;
            chrome.browserAction.setBadgeText( { 'text': String( counter ) } );
            break;
    }
} );
