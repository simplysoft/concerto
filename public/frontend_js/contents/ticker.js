goog.provide('concerto.frontend.Content.Ticker');

goog.require('concerto.frontend.Content');
goog.require('concerto.frontend.Helpers');
goog.require('goog.dom');



/**
 * Ticker Text.
 *
 * @param {Object} data Properties for this piece of content.
 * @constructor
 * @extends {concerto.frontend.Content}
 */
concerto.frontend.Content.Ticker = function(data) {
  concerto.frontend.Content.call(this, data);

/**
 * We are casting the 0 or 1 into true or false with the !!+, do not remove it.
 * This is because we need to negate the variable for our internal code, which
 * was making javascript upset when it had to negate a numeric value.
 */
var disable_text_autosize = !!+(data.field.config ?
                                data.field.config['disable_text_autosize'] : 0);

/**
 * Should the font size be automatically adjusted to optimize
 * display within the field?
 * @type {boolean}
 */
this.autosize_font = !disable_text_autosize;

  /**
   * The text.
   * @type {string}
   */
  this.text = data['render_details']['data'];

  /**
   * The height of the field the ticker is being shown in.
   * @type {number}
   * @private
   */
  this.field_height_ = data.field.size.height;

  /**
   * The width of the field the ticker is being shown in.
   * @type {number}
   * @private
   */
  this.field_width_ = data.field.size.width;

};
goog.inherits(concerto.frontend.Content.Ticker, concerto.frontend.Content);

// Register the content type.
concerto.frontend.ContentTypeRegistry['Ticker'] =
    concerto.frontend.Content.Ticker;


/**
 * Load the text.
 * @private
 */
concerto.frontend.Content.Ticker.prototype.load_ = function() {
  // plain text ticker
  // goog.dom.setTextContent(this.div_, this.text);

  // html ticker, wrapped in single node
  goog.dom.removeChildren(this.div_);
  var frag = goog.dom.htmlToDocumentFragment('<div>' + this.text + '</div>');
  goog.dom.appendChild(this.div_, frag);
  this.finishLoad();
};
