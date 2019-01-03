/*!
 * editorJs v1.0 is a jQuery extension to create html content
 * https://github.com/martini224/calendarJs
 *
 * Includes jquery.js
 * https://jquery.com/
 *
 * Includes poppbootster.js
 * https://popper.js.org
 *
 * Includes bootstrap.js
 * https://getbootstrap.com/
 *
 * Copyright Martin Rouffiange (martini224) 2018
 * Released under the MIT license (http://opensource.org/licenses/MIT)
 */
(function(e) { e.fn.editorJs = function (options) {

    let eOptions,
        container = $(this),
        editcontainer = null,
        editcodecontainer = null,
        lastchanges = [],
        maxchanges = 50,
        currentRange = null,
        supportedLanguages = ["fr", "en"],
        defaultLanguage = "en",
        defaultFonts = ["Georgia", "Palatino Linotype", "Times New Roman", "Arial", "Arial Black", "Comic Sans MS", "Impact", "Lucida Sans Unicode", "Tahoma", "Trebuchet MS", "Verdana", "Courier New", "Lucida Console"],
        defaultFontSizes = ["8", "10", "12", "14", "16", "18", "22", "26", "30", "36", "42", "54", "63", "72"],
        defaultHeaders = ["h1", "h2", "h3", "h4", "h5", "h6"],
        messages = initMessages();

    $(document).ready(function() {
        init();
    });

    function init(){
        initOptions();

        createPanel();
        createEditZone();

        initListeners();
    }

    function initOptions(){
        // handle passed options to calendarJs
        if (options !== null && typeof(options) !== 'undefined') {
            eOptions = {
                lang : (typeof options.lang === 'string' || options.lang instanceof String) && isSupportedLanguage(options.lang) ? options.lang : defaultLanguage,
                fonts : Array.isArray(options.fonts) && options.fonts.length > 0 ? options.fonts : defaultFonts,
                fontsizes : Array.isArray(options.fontsizes) && options.fontsizes.length > 0 ? options.fontsizes : defaultFontSizes,
                headers : Array.isArray(options.headers) && options.headers.length > 0 ? options.headers : defaultHeaders
            };
        } else {
            eOptions = {
                lang : defaultLanguage,
                fonts : defaultFonts,
                fontsizes : defaultFontSizes,
                headers : defaultHeaders
            };
        }
    }

    function isSupportedLanguage(lang){
        return supportedLanguages.find(function(l){return l === lang}) !== undefined;
    }

    function initMessages() {
        return {
            "header.label" : {"fr": "Titre", "en": "Header"},
        }
    }

    function getMessage(code){
        console.log();
        return messages[code][eOptions.lang];
    }

    function recordChange(){
        if(editcontainer.is(":visible")){
            lastchanges.push(editcontainer.html());
        }else{
            lastchanges.push(editcodecontainer.text());
        }

        if(lastchanges.length >= maxchanges){
            lastchanges.shift();
        }
    }

    function initListeners(){
        let panel = container.find(".editor-panel");
        let editor = container.find(".editor-body");
        let timeoutID;
        let i;

        /*
         * SAVE
         */
        panel.find(".editor-save").on("click", function(){

        });

        panel.find(".editor-close").on("click", function(){

        });

        /*
		 * EDIT
		 */
        panel.find(".editor-undo").on("click", function(){

        });

        panel.find(".editor-redo").on("click", function(){

        });

        panel.find(".editor-reload").on("click", function(){

        });

        panel.find(".editor-code").on("click", function(){

            editcodecontainer.text(editcontainer.html());

            panel.find(".buttons-styles").hide();
            editcodecontainer.show();
            editcontainer.hide();

            $(this).next().show();
            $(this).hide();
        });

        panel.find(".editor-classic").on("click", function(){

            editcontainer.html(editcodecontainer.text());

            panel.find(".buttons-styles").show();
            editcontainer.show();
            editcodecontainer.hide();

            $(this).prev().show();
            $(this).hide();
        });

        /*
		 * FONT STYLE
		 */
        panel.find(".editor-bold").on("click", function(){
            treatTextSelection(["font-weight", "bold"]);
        });

        panel.find(".editor-italic").on("click", function(){
            treatTextSelection(["font-style", "italic"]);
        });

        panel.find(".editor-underline").on("click", function(){
            treatTextSelection(["text-decoration", "underline"]);
        });

        /*
		 * ALIGN
		 */
        panel.find(".editor-left").on("click", function(){

        });

        panel.find(".editor-center").on("click", function(){

        });

        panel.find(".editor-right").on("click", function(){

        });

        panel.find(".editor-justify").on("click", function(){

        });

        /*
		 * COLOR
		 */
        panel.find(".editor-color-background").on("click", function(){

        });

        panel.find(".editor-color-text").on("click", function(){

        });

        /*
		 * FONTS
		 */
        panel.find(".editor-fonts").on("click", function(){

        });

        /*
		 * FONT SIZES
		 */
        panel.find(".editor-fontsizes").on("click", function(){

        });

        /*
		 * HEADER
		 */
        panel.find(".editor-header").on("click", function(){

        });

        /*
         * EDITOR
         */
        editor.on("keyup", function(){
            clearTimeout(timeoutID );
            timeoutID = setTimeout(recordChange, 1000);
        });
    }

    function treatTextSelection(tabStyle){

        if(editcontainer.is(":visible")) {

            let selection = window.getSelection();
            console.log($(selection.anchorNode));
            let node = selection.anchorNode.nodeType === 3 && !$(selection.getRangeAt(0).startContainer.parentNode).hasClass("editor-body")
                ? $(selection.getRangeAt(0).startContainer.parentNode) : $(selection.anchorNode);
            if (node.hasClass("editor-body")) node = currentRange;
            console.log(node);

            if (node != null && node !== undefined && node.length > 0 && (node.hasClass("ditor-body") || node.is(""))
                && editcontainer.is(node) || node.parents(editcontainer).length > 0) {

                let selectedText = selection.toString();
                let fullText = node.text();

                console.log(selection);

                console.log(selectedText);
                console.log(fullText);

                if (fullText !== selectedText) {
                    let startIndex = selection.anchorOffset < selection.focusOffset ? selection.anchorOffset : selection.focusOffset;
                    let endIndex = selection.anchorOffset < selection.focusOffset ? selection.focusOffset : selection.anchorOffset;

                    let newNode = $('<span>' + selection + '</span>');
                    node.replaceWith(newNode);

                    let str_before = fullText.substr(0, startIndex);
                    let str_after = fullText.substr(endIndex);

                    if (str_before.length > 0)
                        newNode.before('<span>' + str_before + '</span>');
                    if (str_after.length > 0)
                        newNode.after('<span>' + str_after + '</span>');

                    setWindowSelection(newNode, selection);
                    node = newNode;
                }

                recordChange();
                node.css(tabStyle[0], (checkThatElementHasCssPropertyValue(node, tabStyle[0], tabStyle[1]) ? '' : tabStyle[1]));
            }

        }
    }

    function checkThatElementHasCssPropertyValue(node, property, value){
        console.log(node);
        let str = node[0].style.cssText;

        if(str.indexOf(property) >= 0) {
            str = str.substr(str.indexOf(property) + property.length);
            str = str.substr(str.indexOf(":") + 2);
            str = str.substr(0, str.indexOf(";"));
            return str === value;
        }

        return false;
    }

    function setWindowSelection(node){
        let range = document.createRange();
        range.setStartBefore(node[0]);
        range.setEndAfter(node[0]);

        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        currentRange = node;
    }

    function createPanel(){
        let panel = $('<div class="d-flex justify-content-center form-inline editor-panel"></div>');

        panel.append(createSaveGroup());

        panel.append(createEditGroup());

        panel.append(createFontStyleGroup());

        panel.append(createAlignGroup());

        panel.append(createColorGroup());

        panel.append(createSelect('editor-fonts buttons-styles', eOptions.fonts));

        panel.append(createSelect('editor-fontsizes buttons-styles', eOptions.fontsizes));

        panel.append(createBtnDropDown(getMessage("header.label"), 'buttons-styles', 'editor-header', eOptions.headers));

        container.append(panel);
    }

    function createSaveGroup(){
        let group = createBtnGroup("buttons-settings");

        group.append(createPanelBtn('editor-save', '<i class="fas fa-save" style="color : #3b4bc5"></i>'));

        group.append(createPanelBtn('editor-close', '<i class="fas fa-ban" style="color : red"></i>'));

        return group;
    }

    function createEditGroup(){
        let group = createBtnGroup("buttons-settings");

        group.append(createPanelBtn('editor-undo', '<i class="fas fa-undo"></i>'));

        group.append(createPanelBtn('editor-redo', '<i class="fas fa-redo"></i>'));

        group.append(createPanelBtn('editor-reload', '<i class="fas fa-sync-alt"></i>'));

        group.append(createPanelBtn('editor-code', '<i class="fas fa-code"></i>'));

        group.append(createPanelBtn('editor-classic', '<i class="fas fa-pencil-alt"></i>', true));

        return group;
    }

    function createFontStyleGroup(){
        let group = createBtnGroup("buttons-styles");

        group.append(createPanelBtn('editor-bold', '<b>G</b>'));

        group.append(createPanelBtn('editor-italic', '<i>I</i>'));

        group.append(createPanelBtn('editor-underline', '<u>S</u>'));

        return group;
    }

    function createAlignGroup(){
        let group = createBtnGroup("buttons-styles");

        group.append(createPanelBtn('editor-align-left', '<i class="fas fa-align-left"></i>'));

        group.append(createPanelBtn('editor-align-center', '<i class="fas fa-align-center"></i>'));

        group.append(createPanelBtn('editor-align-right', '<i class="fas fa-align-right"></i>'));

        group.append(createPanelBtn('editor-align-justify', '<i class="fas fa-align-justify"></i>'));

        return group;
    }

    function createColorGroup(){
        let group = createBtnGroup("buttons-styles");

        group.append(createPanelBtn('editor-color-background', '<span style="background-color : yellow; padding-left: 5px;  padding-right: 5px">A</span>'));

        group.append(createPanelBtn('editor-color-text', '<span style="color : red">A</span>'));

        return group;
    }

    function createFormGroup(){
        return $('<div class="form-group"></div>');
    }

    function createBtnGroup(groupClass){
        return $('<div class="btn-group ' + groupClass + '"></div>');
    }

    function createPanelBtn(btnClass, content, hidden){
        hidden = hidden || false;
        return $('<button type="button" class="btn ' + btnClass + '" ' + (hidden ? 'style="display:none;"' : '') + '>' + content + '</button>');
    }

    function createBtnDropDown(title, groupClass, btnClass, options){
        let group = createBtnGroup(groupClass);

        group.append('<button type="button" class="btn">' + title + '</button>');
        group.append('<button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"><span class="caret"></span></button>');

        let dropdown = $('<div class="dropdown-menu"></div>').appendTo(group);

        options.forEach(function(option) {
            dropdown.append('<a class="dropdown-item ' + btnClass + '-' + option + '" href="#"> ' + option + '</a>');
        });

        return group;
    }


    function createSelect(btnClass, options){
        let group = createFormGroup();
        let select = $('<select class="form-control ' + btnClass + '"></select>').appendTo(group);

        options.forEach(function(option) {
            select.append('<option value="' + option + '">' + option + '</option>');
        });

        return group;
    }

    function createEditZone(){
        editcontainer = $('<div class="editor-body" contenteditable="true">Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes. Vous obtenez alors un texte aléatoire que vous pourrez ensuite utiliser librement dans vos maquettes.\n' +
            '\n' +
            'Le texte généré est du pseudo latin et peut donner l\'impression d\'être du vrai texte.\n' +
            '\n' +
            'Faux-Texte est une réalisation du studio de création de sites internet indépendant Prélude Prod.\n' +
            '\n' +
            'Si vous aimez la photographie d\'art et l\'esprit zen, jetez un œil sur le site de ce photographe à Palaiseau, en Essonne (France).</div>');

        editcodecontainer = $('<div class="editor-body" contenteditable="true" style="display: none"></div>');

        container.append(editcontainer);
        container.append(editcodecontainer);
    }


};}(jQuery));