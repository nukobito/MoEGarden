(function ( window ) {
    function getCheckboxesChild() {
        return checkboxes.querySelectorAll( 'input[type="checkbox"]' );
    }
    
    function createCheckboxes() {
        if ( select.selectedIndex == 0 )
            return void( 0 );
        
        var times = background.constant[ select.selectedIndex ].times;
        for ( var key in times ) {
            if ( key == 0 )
                continue;
            
            var input = window.document.createElement( 'input' );
            input.type = 'checkbox';
            input.value = String( key );
            checkboxes.appendChild( input );
            
            var text = null;
            if ( key == times.length - 1 ) text = '収穫まで';
            else text = times[ key ] + '分まで';
            
            var textNode = window.document.createTextNode( text );
            checkboxes.appendChild( textNode );
            
            var wbr = window.document.createElement( 'wbr' );
            checkboxes.appendChild( wbr );
            
            input.addEventListener( 'click', onClick_Checkbox );
        }
    }
    
    function onGetStorage_CheckedBoxes( items ) {
        var childs = getCheckboxesChild();
        for ( var i = 0; i < childs.length; i++ ) {
            childs[ i ].checked = items.checkedBoxes[ i ];
        }
    }
    
    function onClick_Checkbox( _ ) {
        var arr = [];
        var childs = getCheckboxesChild();
        for ( var i = 0; i < childs.length; i++ ) {
            arr.push( childs[ i ].checked );
        }
        
        chrome.storage.local.set( { checkedBoxes: arr } );
        background.updateCheckedBoxes();
    }
    
    function onClick_Start( _ ) {
        if ( select.selectedIndex == 0 )
            return void( 0 );
        
        background.stopAlarm();
        chrome.storage.local.set( { selectedIndex: select.selectedIndex } );
        onClick_Checkbox();
        background.startAlarm();
    }
    
    function onChange_Select( _ ) {
        background.stopAlarm();
        chrome.storage.local.remove( 'checkedBoxes' );
        
        while ( checkboxes.firstChild ) {
            checkboxes.removeChild( checkboxes.firstChild );
        }
        
        chrome.storage.local.set( { selectedIndex: select.selectedIndex } );
        createCheckboxes();
    }
    
    function onGetStorage_SelectedIndex( items ) {
        if ( items.selectedIndex )
            select.options[ items.selectedIndex ].selected = true;
        else
            select.options[ 0 ].selected = true;
        
        createCheckboxes();
        chrome.storage.local.get( 'checkedBoxes', onGetStorage_CheckedBoxes );
        
        select.addEventListener( 'change', onChange_Select );
        start.addEventListener( 'click', onClick_Start );
    }
    
    var background = chrome.extension.getBackgroundPage();
    var select = window.document.getElementById( 'select' );
    var start = window.document.getElementById( 'start' );
    var checkboxes = window.document.getElementById( 'checkboxes' );
    
    var option = null;
    for ( var key in background.constant ) {
        option = window.document.createElement( 'option' );
        option.innerHTML = background.constant[ key ].text;
        select.appendChild( option );
    }
    
    chrome.storage.local.get( 'selectedIndex', onGetStorage_SelectedIndex );
}( window ));