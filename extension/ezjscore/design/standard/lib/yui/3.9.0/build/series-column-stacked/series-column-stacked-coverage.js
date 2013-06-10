/* YUI 3.9.0 (build 5827) Copyright 2013 Yahoo! Inc. http://yuilibrary.com/license/ */
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/series-column-stacked/series-column-stacked.js",
    code: []
};
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"].code=["YUI.add('series-column-stacked', function (Y, NAME) {","","/**"," * Provides functionality for creating a stacked column series."," *"," * @module charts"," * @submodule series-column-stacked"," */","var Y_Lang = Y.Lang;","","/**"," * The StackedColumnSeries renders column chart in which series are stacked vertically to show"," * their contribution to the cumulative total."," *"," * @class StackedColumnSeries"," * @extends ColumnSeries"," * @uses StackingUtil"," * @constructor"," * @param {Object} config (optional) Configuration parameters."," * @submodule series-column-stacked"," */","Y.StackedColumnSeries = Y.Base.create(\"stackedColumnSeries\", Y.ColumnSeries, [Y.StackingUtil], {","    /**","     * Draws the series.","     *","     * @method drawSeries","	 * @protected","	 */","	drawSeries: function()","	{","        if(this.get(\"xcoords\").length < 1)","        {","            return;","        }","        var isNumber = Y_Lang.isNumber,","            style = Y.clone(this.get(\"styles\").marker),","            w = style.width,","            h = style.height,","            xcoords = this.get(\"xcoords\"),","            ycoords = this.get(\"ycoords\"),","            i = 0,","            len = xcoords.length,","            top = ycoords[0],","            type = this.get(\"type\"),","            seriesCollection = this.get(\"seriesTypeCollection\"),","            ratio,","            order = this.get(\"order\"),","            graphOrder = this.get(\"graphOrder\"),","            left,","            marker,","            fillColors,","            borderColors,","            lastCollection,","            negativeBaseValues,","            positiveBaseValues,","            useOrigin = order === 0,","            totalWidth = len * w,","            dimensions = {","                width: [],","                height: []","            },","            xvalues = [],","            yvalues = [],","            groupMarkers = this.get(\"groupMarkers\");","        if(Y_Lang.isArray(style.fill.color))","        {","            fillColors = style.fill.color.concat();","        }","        if(Y_Lang.isArray(style.border.color))","        {","            borderColors = style.border.color.concat();","        }","        this._createMarkerCache();","        if(totalWidth > this.get(\"width\"))","        {","            ratio = this.get(\"width\")/totalWidth;","            w *= ratio;","            w = Math.max(w, 1);","        }","        if(!useOrigin)","        {","            lastCollection = seriesCollection[order - 1];","            negativeBaseValues = lastCollection.get(\"negativeBaseValues\");","            positiveBaseValues = lastCollection.get(\"positiveBaseValues\");","            if(!negativeBaseValues || !positiveBaseValues)","            {","                useOrigin = true;","                positiveBaseValues = [];","                negativeBaseValues = [];","            }","        }","        else","        {","            negativeBaseValues = [];","            positiveBaseValues = [];","        }","        this.set(\"negativeBaseValues\", negativeBaseValues);","        this.set(\"positiveBaseValues\", positiveBaseValues);","        for(i = 0; i < len; ++i)","        {","            left = xcoords[i];","            top = ycoords[i];","","            if(!isNumber(top) || !isNumber(left))","            {","                if(useOrigin)","                {","                    negativeBaseValues[i] = this._bottomOrigin;","                    positiveBaseValues[i] = this._bottomOrigin;","                }","                this._markers.push(null);","                continue;","            }","            if(useOrigin)","            {","                h = Math.abs(this._bottomOrigin - top);","                if(top < this._bottomOrigin)","                {","                    positiveBaseValues[i] = top;","                    negativeBaseValues[i] = this._bottomOrigin;","                }","                else if(top > this._bottomOrigin)","                {","                    positiveBaseValues[i] = this._bottomOrigin;","                    negativeBaseValues[i] = top;","                    top -= h;","                }","                else","                {","                    positiveBaseValues[i] = top;","                    negativeBaseValues[i] = top;","                }","            }","            else","            {","                if(top > this._bottomOrigin)","                {","                    top += (negativeBaseValues[i] - this._bottomOrigin);","                    h = top - negativeBaseValues[i];","                    negativeBaseValues[i] = top;","                    top -= h;","                }","                else if(top <= this._bottomOrigin)","                {","                    top = positiveBaseValues[i] - (this._bottomOrigin - top);","                    h = positiveBaseValues[i] - top;","                    positiveBaseValues[i] = top;","                }","            }","            if(!isNaN(h) && h > 0)","            {","                left -= w/2;","                if(groupMarkers)","                {","                    dimensions.width[i] = w;","                    dimensions.height[i] = h;","                    xvalues.push(left);","                    yvalues.push(top);","                }","                else","                {","                    style.width = w;","                    style.height = h;","                    style.x = left;","                    style.y = top;","                    if(fillColors)","                    {","                        style.fill.color = fillColors[i % fillColors.length];","                    }","                    if(borderColors)","                    {","                        style.border.color = borderColors[i % borderColors.length];","                    }","                    marker = this.getMarker(style, graphOrder, i);","                }","            }","            else if(!groupMarkers)","            {","               this._markers.push(null);","            }","        }","        if(groupMarkers)","        {","            this._createGroupMarker({","                fill: style.fill,","                border: style.border,","                dimensions: dimensions,","                xvalues: xvalues,","                yvalues: yvalues,","                shape: style.shape","            });","        }","        else","        {","            this._clearMarkerCache();","        }","    },","","    /**","     * Resizes and positions markers based on a mouse interaction.","     *","     * @method updateMarkerState","     * @param {String} type state of the marker","     * @param {Number} i index of the marker","     * @protected","     */","    updateMarkerState: function(type, i)","    {","        if(this._markers && this._markers[i])","        {","            var styles,","                markerStyles,","                state = this._getState(type),","                xcoords = this.get(\"xcoords\"),","                marker = this._markers[i],","                offset = 0,","                fillColor,","                borderColor;","            styles = this.get(\"styles\").marker;","            offset = styles.width * 0.5;","            markerStyles = state == \"off\" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]);","            markerStyles.height = marker.get(\"height\");","            markerStyles.x = (xcoords[i] - offset);","            markerStyles.y = marker.get(\"y\");","            markerStyles.id = marker.get(\"id\");","            fillColor = markerStyles.fill.color;","            borderColor = markerStyles.border.color;","            if(Y_Lang.isArray(fillColor))","            {","                markerStyles.fill.color = fillColor[i % fillColor.length];","            }","            else","            {","                markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);","            }","            if(Y_Lang.isArray(borderColor))","            {","                markerStyles.border.color = borderColor[i % borderColor.length];","            }","            else","            {","                markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);","            }","            marker.set(markerStyles);","        }","    },","","    /**","     * Gets the default values for the markers.","     *","     * @method _getPlotDefaults","     * @return Object","     * @protected","     */","    _getPlotDefaults: function()","    {","        var defs = {","            fill:{","                type: \"solid\",","                alpha: 1,","                colors:null,","                alphas: null,","                ratios: null","            },","            border:{","                weight: 0,","                alpha: 1","            },","            width: 24,","            height: 24,","            shape: \"rect\",","","            padding:{","                top: 0,","                left: 0,","                right: 0,","                bottom: 0","            }","        };","        defs.fill.color = this._getDefaultColor(this.get(\"graphOrder\"), \"fill\");","        defs.border.color = this._getDefaultColor(this.get(\"graphOrder\"), \"border\");","        return defs;","    }","}, {","    ATTRS: {","        /**","         * Read-only attribute indicating the type of series.","         *","         * @attribute type","         * @type String","         * @default stackedColumn","         */","        type: {","            value: \"stackedColumn\"","        },","","        /**","         * @attribute negativeBaseValues","         * @type Array","         * @default null","         * @private","         */","        negativeBaseValues: {","            value: null","        },","","        /**","         * @attribute positiveBaseValues","         * @type Array","         * @default null","         * @private","         */","        positiveBaseValues: {","            value: null","        }","","        /**","         * Style properties used for drawing markers. This attribute is inherited from `ColumnSeries`. Below are the default values:","         *  <dl>","         *      <dt>fill</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#66007f\", \"#a86f41\", \"#295454\", \"#996ab2\", \"#e8cdb7\", \"#90bdbd\",\"#000000\",\"#c3b8ca\", \"#968373\", \"#678585\"]`","         *              </dd>","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>border</dt><dd>A hash containing the following values:","         *          <dl>","         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color","         *              will be retrieved from the below array:<br/>","         *              `[\"#205096\", \"#b38206\", \"#000000\", \"#94001e\", \"#9d6fa0\", \"#e55b00\", \"#5e85c9\", \"#adab9e\", \"#6ac291\", \"#006457\"]`","         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>","         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>","         *          </dl>","         *      </dd>","         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 24.</dd>","         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default","         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,","         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>","         *  </dl>","         *","         * @attribute styles","         * @type Object","         */","    }","});","","","","}, '3.9.0', {\"requires\": [\"series-stacked\", \"series-column\"]});"];
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"].lines = {"1":0,"9":0,"22":0,"31":0,"33":0,"35":0,"65":0,"67":0,"69":0,"71":0,"73":0,"74":0,"76":0,"77":0,"78":0,"80":0,"82":0,"83":0,"84":0,"85":0,"87":0,"88":0,"89":0,"94":0,"95":0,"97":0,"98":0,"99":0,"101":0,"102":0,"104":0,"106":0,"108":0,"109":0,"111":0,"112":0,"114":0,"116":0,"117":0,"119":0,"120":0,"122":0,"124":0,"125":0,"126":0,"130":0,"131":0,"136":0,"138":0,"139":0,"140":0,"141":0,"143":0,"145":0,"146":0,"147":0,"150":0,"152":0,"153":0,"155":0,"156":0,"157":0,"158":0,"162":0,"163":0,"164":0,"165":0,"166":0,"168":0,"170":0,"172":0,"174":0,"177":0,"179":0,"182":0,"184":0,"195":0,"209":0,"211":0,"219":0,"220":0,"221":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"230":0,"234":0,"236":0,"238":0,"242":0,"244":0,"257":0,"280":0,"281":0,"282":0};
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"].functions = {"drawSeries:29":0,"updateMarkerState:207":0,"_getPlotDefaults:255":0,"(anonymous 1):1":0};
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"].coveredLines = 99;
_yuitest_coverage["build/series-column-stacked/series-column-stacked.js"].coveredFunctions = 4;
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 1);
YUI.add('series-column-stacked', function (Y, NAME) {

/**
 * Provides functionality for creating a stacked column series.
 *
 * @module charts
 * @submodule series-column-stacked
 */
_yuitest_coverfunc("build/series-column-stacked/series-column-stacked.js", "(anonymous 1)", 1);
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 9);
var Y_Lang = Y.Lang;

/**
 * The StackedColumnSeries renders column chart in which series are stacked vertically to show
 * their contribution to the cumulative total.
 *
 * @class StackedColumnSeries
 * @extends ColumnSeries
 * @uses StackingUtil
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @submodule series-column-stacked
 */
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 22);
Y.StackedColumnSeries = Y.Base.create("stackedColumnSeries", Y.ColumnSeries, [Y.StackingUtil], {
    /**
     * Draws the series.
     *
     * @method drawSeries
	 * @protected
	 */
	drawSeries: function()
	{
        _yuitest_coverfunc("build/series-column-stacked/series-column-stacked.js", "drawSeries", 29);
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 31);
if(this.get("xcoords").length < 1)
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 33);
return;
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 35);
var isNumber = Y_Lang.isNumber,
            style = Y.clone(this.get("styles").marker),
            w = style.width,
            h = style.height,
            xcoords = this.get("xcoords"),
            ycoords = this.get("ycoords"),
            i = 0,
            len = xcoords.length,
            top = ycoords[0],
            type = this.get("type"),
            seriesCollection = this.get("seriesTypeCollection"),
            ratio,
            order = this.get("order"),
            graphOrder = this.get("graphOrder"),
            left,
            marker,
            fillColors,
            borderColors,
            lastCollection,
            negativeBaseValues,
            positiveBaseValues,
            useOrigin = order === 0,
            totalWidth = len * w,
            dimensions = {
                width: [],
                height: []
            },
            xvalues = [],
            yvalues = [],
            groupMarkers = this.get("groupMarkers");
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 65);
if(Y_Lang.isArray(style.fill.color))
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 67);
fillColors = style.fill.color.concat();
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 69);
if(Y_Lang.isArray(style.border.color))
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 71);
borderColors = style.border.color.concat();
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 73);
this._createMarkerCache();
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 74);
if(totalWidth > this.get("width"))
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 76);
ratio = this.get("width")/totalWidth;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 77);
w *= ratio;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 78);
w = Math.max(w, 1);
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 80);
if(!useOrigin)
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 82);
lastCollection = seriesCollection[order - 1];
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 83);
negativeBaseValues = lastCollection.get("negativeBaseValues");
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 84);
positiveBaseValues = lastCollection.get("positiveBaseValues");
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 85);
if(!negativeBaseValues || !positiveBaseValues)
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 87);
useOrigin = true;
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 88);
positiveBaseValues = [];
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 89);
negativeBaseValues = [];
            }
        }
        else
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 94);
negativeBaseValues = [];
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 95);
positiveBaseValues = [];
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 97);
this.set("negativeBaseValues", negativeBaseValues);
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 98);
this.set("positiveBaseValues", positiveBaseValues);
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 99);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 101);
left = xcoords[i];
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 102);
top = ycoords[i];

            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 104);
if(!isNumber(top) || !isNumber(left))
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 106);
if(useOrigin)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 108);
negativeBaseValues[i] = this._bottomOrigin;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 109);
positiveBaseValues[i] = this._bottomOrigin;
                }
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 111);
this._markers.push(null);
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 112);
continue;
            }
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 114);
if(useOrigin)
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 116);
h = Math.abs(this._bottomOrigin - top);
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 117);
if(top < this._bottomOrigin)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 119);
positiveBaseValues[i] = top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 120);
negativeBaseValues[i] = this._bottomOrigin;
                }
                else {_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 122);
if(top > this._bottomOrigin)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 124);
positiveBaseValues[i] = this._bottomOrigin;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 125);
negativeBaseValues[i] = top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 126);
top -= h;
                }
                else
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 130);
positiveBaseValues[i] = top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 131);
negativeBaseValues[i] = top;
                }}
            }
            else
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 136);
if(top > this._bottomOrigin)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 138);
top += (negativeBaseValues[i] - this._bottomOrigin);
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 139);
h = top - negativeBaseValues[i];
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 140);
negativeBaseValues[i] = top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 141);
top -= h;
                }
                else {_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 143);
if(top <= this._bottomOrigin)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 145);
top = positiveBaseValues[i] - (this._bottomOrigin - top);
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 146);
h = positiveBaseValues[i] - top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 147);
positiveBaseValues[i] = top;
                }}
            }
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 150);
if(!isNaN(h) && h > 0)
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 152);
left -= w/2;
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 153);
if(groupMarkers)
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 155);
dimensions.width[i] = w;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 156);
dimensions.height[i] = h;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 157);
xvalues.push(left);
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 158);
yvalues.push(top);
                }
                else
                {
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 162);
style.width = w;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 163);
style.height = h;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 164);
style.x = left;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 165);
style.y = top;
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 166);
if(fillColors)
                    {
                        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 168);
style.fill.color = fillColors[i % fillColors.length];
                    }
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 170);
if(borderColors)
                    {
                        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 172);
style.border.color = borderColors[i % borderColors.length];
                    }
                    _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 174);
marker = this.getMarker(style, graphOrder, i);
                }
            }
            else {_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 177);
if(!groupMarkers)
            {
               _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 179);
this._markers.push(null);
            }}
        }
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 182);
if(groupMarkers)
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 184);
this._createGroupMarker({
                fill: style.fill,
                border: style.border,
                dimensions: dimensions,
                xvalues: xvalues,
                yvalues: yvalues,
                shape: style.shape
            });
        }
        else
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 195);
this._clearMarkerCache();
        }
    },

    /**
     * Resizes and positions markers based on a mouse interaction.
     *
     * @method updateMarkerState
     * @param {String} type state of the marker
     * @param {Number} i index of the marker
     * @protected
     */
    updateMarkerState: function(type, i)
    {
        _yuitest_coverfunc("build/series-column-stacked/series-column-stacked.js", "updateMarkerState", 207);
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 209);
if(this._markers && this._markers[i])
        {
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 211);
var styles,
                markerStyles,
                state = this._getState(type),
                xcoords = this.get("xcoords"),
                marker = this._markers[i],
                offset = 0,
                fillColor,
                borderColor;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 219);
styles = this.get("styles").marker;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 220);
offset = styles.width * 0.5;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 221);
markerStyles = state == "off" || !styles[state] ? Y.clone(styles) : Y.clone(styles[state]);
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 222);
markerStyles.height = marker.get("height");
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 223);
markerStyles.x = (xcoords[i] - offset);
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 224);
markerStyles.y = marker.get("y");
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 225);
markerStyles.id = marker.get("id");
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 226);
fillColor = markerStyles.fill.color;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 227);
borderColor = markerStyles.border.color;
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 228);
if(Y_Lang.isArray(fillColor))
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 230);
markerStyles.fill.color = fillColor[i % fillColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 234);
markerStyles.fill.color = this._getItemColor(markerStyles.fill.color, i);
            }
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 236);
if(Y_Lang.isArray(borderColor))
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 238);
markerStyles.border.color = borderColor[i % borderColor.length];
            }
            else
            {
                _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 242);
markerStyles.border.color = this._getItemColor(markerStyles.border.color, i);
            }
            _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 244);
marker.set(markerStyles);
        }
    },

    /**
     * Gets the default values for the markers.
     *
     * @method _getPlotDefaults
     * @return Object
     * @protected
     */
    _getPlotDefaults: function()
    {
        _yuitest_coverfunc("build/series-column-stacked/series-column-stacked.js", "_getPlotDefaults", 255);
_yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 257);
var defs = {
            fill:{
                type: "solid",
                alpha: 1,
                colors:null,
                alphas: null,
                ratios: null
            },
            border:{
                weight: 0,
                alpha: 1
            },
            width: 24,
            height: 24,
            shape: "rect",

            padding:{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        };
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 280);
defs.fill.color = this._getDefaultColor(this.get("graphOrder"), "fill");
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 281);
defs.border.color = this._getDefaultColor(this.get("graphOrder"), "border");
        _yuitest_coverline("build/series-column-stacked/series-column-stacked.js", 282);
return defs;
    }
}, {
    ATTRS: {
        /**
         * Read-only attribute indicating the type of series.
         *
         * @attribute type
         * @type String
         * @default stackedColumn
         */
        type: {
            value: "stackedColumn"
        },

        /**
         * @attribute negativeBaseValues
         * @type Array
         * @default null
         * @private
         */
        negativeBaseValues: {
            value: null
        },

        /**
         * @attribute positiveBaseValues
         * @type Array
         * @default null
         * @private
         */
        positiveBaseValues: {
            value: null
        }

        /**
         * Style properties used for drawing markers. This attribute is inherited from `ColumnSeries`. Below are the default values:
         *  <dl>
         *      <dt>fill</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the fill. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              `["#66007f", "#a86f41", "#295454", "#996ab2", "#e8cdb7", "#90bdbd","#000000","#c3b8ca", "#968373", "#678585"]`
         *              </dd>
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker fill. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>border</dt><dd>A hash containing the following values:
         *          <dl>
         *              <dt>color</dt><dd>Color of the border. The default value is determined by the order of the series on the graph. The color
         *              will be retrieved from the below array:<br/>
         *              `["#205096", "#b38206", "#000000", "#94001e", "#9d6fa0", "#e55b00", "#5e85c9", "#adab9e", "#6ac291", "#006457"]`
         *              <dt>alpha</dt><dd>Number from 0 to 1 indicating the opacity of the marker border. The default value is 1.</dd>
         *              <dt>weight</dt><dd>Number indicating the width of the border. The default value is 1.</dd>
         *          </dl>
         *      </dd>
         *      <dt>width</dt><dd>indicates the width of the marker. The default value is 24.</dd>
         *      <dt>over</dt><dd>hash containing styles for markers when highlighted by a `mouseover` event. The default
         *      values for each style is null. When an over style is not set, the non-over value will be used. For example,
         *      the default value for `marker.over.fill.color` is equivalent to `marker.fill.color`.</dd>
         *  </dl>
         *
         * @attribute styles
         * @type Object
         */
    }
});



}, '3.9.0', {"requires": ["series-stacked", "series-column"]});
