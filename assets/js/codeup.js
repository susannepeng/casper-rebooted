$.fn.codeUp = function (heightLimit) {
  var options = {};
  options.heightLimit = heightLimit || 300;

  function Classes ($elem) {
    this.classes = [];

    var str = $elem.attr('class').trim();
    this.classes = str.split(' ');
  }
  Classes.prototype.contains = function (regex) {
    var res = { result: null };
    for (var i = 0, j = this.classes.length; i < j; i++) {
      if (regex.test(this.classes[i])) res.result = this.classes[i];
    }
    return res;
  }

function addLangBar ($elem, classes) {
    var match = classes.contains(/^language-/);
    if (match.result) {
      var clipboard = '<svg class="clipboard" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 24 24" xml:space="preserve"> <g id="Layer_1"> <path d="M17,3H7C5.346,3,4,4.346,4,6v12c0,1.654,1.346,3,3,3h10c1.654,0,3-1.346,3-3V6C20,4.346,18.654,3,17,3z M9,5h6v1 c0,0.551-0.449,1-1,1h-4C9.449,7,9,6.551,9,6V5z M18,18c0,0.551-0.449,1-1,1H7c-0.551,0-1-0.449-1-1V6c0-0.551,0.449-1,1-1h1 c0,0.262,0,0.601,0,1c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2c0-0.399,0-0.738,0-1h1c0.551,0,1,0.449,1,1V18z"/> <g> <path d="M16,17H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,16,8,16h8c0.276,0,0.5,0.224,0.5,0.5S16.276,17,16,17z"/> </g> <g> <path d="M16,14H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,13,8,13h8c0.276,0,0.5,0.224,0.5,0.5S16.276,14,16,14z"/> </g> <g> <path d="M16,11H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,10,8,10h8c0.276,0,0.5,0.224,0.5,0.5S16.276,11,16,11z"/> </g> </g> <g id="nyt_x5F_exporter_x5F_info" display="none"> </g> </svg>';
      var result = match.result.split('');
      result.splice(0,9);
      var lang = result.join('') + ' <span class="bullet">&#149;</span> ';

      var $langBarWrap = $('<div class="langBarWrap"></div>');
      var $langBar = $('<div class="langBar"></div>');
      var $lang = $('<div class="lang"></div>');

      $clipboard = $(clipboard);
      $clipboard.attr('data-clipboard-text', getCode($elem));

      $lang.html(lang);
      $lang.append($clipboard);
      $langBar.append($lang);
      $elem.wrap($langBarWrap);
      $langBar.insertBefore($elem);
    }
  }

  function hideIfTooLong ($elem) {
    if ($elem.height() >= options.heightLimit) {
      $elem.height(options.heightLimit);
    }
  }

function getCode ($elem) {
    var code = $elem.find('code').text().trim();
    return code;
  }

  return this.each(function () {
    var classes = new Classes($(this));
    var langBar = addLangBar($(this), classes);

    hideIfTooLong($(this));
  });
};

Prism.hooks.add('after-highlight', function (env) {
	var $codeArea = $(env.element).closest('pre');
	$codeArea.codeUp();
	ZeroClipboard.config( { swfPath: 'http://107.170.134.32/assets/swf/ZeroClipboard.swf' } );
	new ZeroClipboard( $('.clipboard') );
});
