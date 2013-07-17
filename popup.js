(function ( window ) {
    var items = [
        { text: '120分 (ハーブ等)', times: [ 120, 110, 80, 30, 0 ] },
        { text: '180分 (キノコ類)', times: [ 180, 120, 60, 0 ] },
        { text: '180分 (キノコ以外?)', times: [ 180, 160, 120, 60, 0 ] },
        { text: '240分 (栽培全般?)', times: [ 240, 180, 120, 60, 0 ] },
        { text: '300分 (イチゴ、稲等)', times: [ 300, 240, 180, 60, 0 ] },
        { text: '300分 (こんにゃく等)', times: [ 300, 240, 150, 60, 0 ] },
        { text: '360分 (フルーク)', times: [ 360, 300, 210, 90, 0 ] },
        { text: '360分 (スイカ名等)', times: [ 360, 300, 180, 60, 0 ] }
    ];
    
    function createSelect() {
        var type = window.document.getElementById( 'type' );
        type.length = items.length;
        for ( var key in items ) {
            var text = items[ key ].text;
            var times = items[ key ].times;
            
            type.options[ key ].text = items[ key ].text;
            type.options[ key ].value = key;
        }
    }
    
    function createCheckbox() {
        var checkboxes = window.document.getElementById( 'checkboxes' );
        var element = window.document.createElement( 'input' );
        element.type = 'checkbox';
        
        var text = window.document.createTextNode( '5回目' );
        
        checkboxes.appendChild( element );
        checkboxes.appendChild( text );
    }
    
    window.document.addEventListener( 'DOMContentLoaded', function () {
        createSelect();
        createCheckbox();
    } );
} ( window ));