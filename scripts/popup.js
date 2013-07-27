(function ( window ) {
    var background = null;
    var select = null;
    var start = null;
    var checkboxes = null;
    
    function createCheckboxes() {
        if ( select.selectedIndex == 0 )
            return void( 0 );
        
        var times = background.items[ select.selectedIndex ].times.split( ',' );
        for ( var key in times ) {
            if ( key == 0 )
                continue;
            
            var inputElement = window.document.createElement( 'input' );
            inputElement.type = 'checkbox';
            inputElement.value = times[ key ];
            checkboxes.appendChild( inputElement );
            
            var text = null;
            if ( key == times.length - 1 ) text = '収穫まで';
            else text = times[ key ] + '分まで';
            
            var textNode = window.document.createTextNode( text );
            checkboxes.appendChild( textNode );
            
            var wbr = window.document.createElement( 'wbr' );
            checkboxes.appendChild( wbr );
        }
    }
    
    function onChange_Select( _ ) {
        background.stopAlarm();
        
        while ( checkboxes.firstChild ) {
            checkboxes.removeChild( checkboxes.firstChild );
        }
        
        chrome.storage.local.set( { selectedIndex: select.selectedIndex } );
        createCheckboxes();
    }
    
    function onClick_Start( _ ) {
        if ( select.selectedIndex == 0 )
            return void( 0 );
        
        background.stopAlarm();
        background.startAlarm( select.selectedIndex );
    }
    
    function onGet_Storage( items ) {
        if ( items.selectedIndex ) {
            select.options[ items.selectedIndex ].selected = true;
            createCheckboxes();
        }
    }
    
    function onDOMContentLoaded( _ ) {
        background = chrome.extension.getBackgroundPage();
        select = window.document.getElementById( 'select' );
        start = window.document.getElementById( 'start' );
        checkboxes = window.document.getElementById( 'checkboxes' );
        
        for ( var key in background.items ) {
            var element = window.document.createElement( 'option' );
            element.innerHTML = background.items[ key ].text;
            
            select.appendChild( element );
        }
        
        chrome.storage.local.get( 'selectedIndex', onGet_Storage );
        
        select.addEventListener( 'change', onChange_Select );
        start.addEventListener( 'click', onClick_Start );
    }
    
    window.document.addEventListener( 'DOMContentLoaded', onDOMContentLoaded );
}( window ));