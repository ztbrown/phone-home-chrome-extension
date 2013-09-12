// Popup UI Handlers:

console.log("document ready");

window.port = chrome.runtime.connect({name: "content_script"});
window.contents;

function createAndActivate(){

    window.port.postMessage({message: "create_tracker"})

}

var rootElement = $(document);

function getContents(form, event){
    //g_editable is intended to work with Gmail's new broken out window approach.
    //we search based on event because it works well in case multiple compose windows are open
    var msg;
    var g_editable = $(event.currentTarget).parents().find('[g_editable]').first();
    if (g_editable && g_editable.length > 0 && g_editable.html()) {
        msg = g_editable.html().replace(/(<div>)/g,'\n');
        msg = msg.replace(/(<\/div>)/g,'');
        return {g_editable: g_editable, msg: msg};
    }
    var textarea = $('textarea[spellcheck="true"]',form);
    var iframe = $('iframe',form).contents().find('body');
    try{
        msg = iframe.html().replace(/(<div>)/g,'\n');
        msg = msg.replace(/(<\/div>)/g,'');
    }
    catch(e){
        msg = textarea.val();
    }
    return {textarea: textarea, iframe: iframe, msg: msg };
}

function create(event){
    var form = rootElement.find('form');
    form.find('.alert').hide();

    var contents = getContents(form, event);
    window.contents = contents
    createAndActivate();
}

function composeIntercept(ev) {
    console.log('HELLO')
    var composeBoxes = $('.n1tfz');
    console.log(composeBoxes)
    if (composeBoxes && composeBoxes.length > 0) {
        composeBoxes.each(function(){
            var composeMenu = $(this).parent().parent().parent();
            if (composeMenu && composeMenu.length> 0 && composeMenu.find('#gCryptEncrypt').length === 0) {
                useComposeSubWindows = true;
                var maxSizeCheck = composeMenu.parent().parent().parent().parent().parent().find('[style*="max-height"]');
                //We have to check again because of rapidly changing elements
                if(composeMenu.find('#gCryptEncrypt').length === 0) {
                    //The below logic is for inserting the form into the windows, different behavior for in window compose and popout compose.
                    var encryptionFormOptions = '<span id="gCryptEncrypt" class="btn-group" style="margin-left:10px"><button id="createAndActivate">Track with PhoneHome</button></span>';

                    if (maxSizeCheck && maxSizeCheck.length > 0 && maxSizeCheck.css('max-height') === maxSizeCheck.css('height')) {
                        composeMenu.find('.n1tfz :nth-child(6)').after('<td class="gU" style="min-width: 360px;">' + encryptionFormOptions + '</td>');
                    }
                    else {
                        composeMenu.append(encryptionFormOptions);
                        composeMenu.css("height","80px");
                    }
                    composeMenu.find('#createAndActivate').click(create);
                }
            }
        });
    }

}

//Took this from seancolyer/gmail-crypt
//Will not work without gmail-animation.css
 insertListener = function(event) {
    if (event.animationName == "composeInserted") {
        composeIntercept();
    }
};

function onLoadAnimation() {
    document.addEventListener("webkitAnimationStart", insertListener, false);
};

$(document).ready(onLoadAnimation);

    window.port.onMessage.addListener(function(msg) {
        if (msg.message == "activated")
        {
            $(window.contents.g_editable).append("<img src='" + msg.url +"'/>" );
        }
        else if (msg.message == "createsuccess")
        {
            console.log("success!")
            port.postMessage({message: "activate_tracker", id: msg.id})
        }
    });


