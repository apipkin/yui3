var HIDDEN = 'hidden',
    LI_SELECTOR = 'li:not(.' + HIDDEN + ') input',

    Filter = Y.Base.create('pf-filter', Y.Base, [Y.AutoCompleteBase], {
        initializer: function () {
            this._bindUIACBase();
            this._syncUIACBase();
        }
    }),

    Model = Y.Base.create('pf-model', Y.Model, []),

    View = Y.Base.create('pf-view', Y.View, [], {
        initializer: function () {
            this.get('container').delegate('click', Y.bind(this._btnClick, this), 'button');
            this.get('model').after(['keyChange', 'change'], Y.bind(this.panelFilterRender, this));
        },

        panelFilterRender: function () {
            var cb = this.get('container');
            cb.setHTML(this.get('template')(this.get('model').toJSON()));
            this._createFilter();
            this.show();
        },

        panelFilterHide: function () {
            this.get('container').addClass(HIDDEN);
        },

        panelFilterShow: function () {
            this.get('container').removeClass(HIDDEN);
        },

        _panelFilter_createFilter: function () {
            var cb = this.get('container'),
                filter = new Filter({
                    inputNode: cb.one('.filter-search input'),
                    queryDelay: 0,
                    minQueryLength: 0,
                    resultFilters: 'phraseMatch',
                    source: (function () {
                        var results = [];
                        cb.all('.filter-list li').each(function (node) {
                            results.push({
                                node: node,
                                tags: node.getData('text')
                            });
                        });
                        return results;
                    }()),
                    resultTextLocator: 'tags'
                });

            filter.on('results', this._panelFilter_filterResults, this);
        },

        _panelFilter_setTemplate: function (val) {
            if (typeof val === 'string') {
                val = new Y.Template.Handlebars.compile(val);
            }
            return val;
        },

        _panelFilter_filterResults: function (e) {
            this.get('container').all('.filter-list li').addClass(HIDDEN);

            Y.Array.each(e.results, function (result) {
                result.raw.node.removeClass(HIDDEN);
            });
        },

        _panelFilter_sortAZ: function () {
            var obj = {},
                key = this.get('model').get('key');

            obj[key] = 'asc';
            this.sort(obj);
            this.hide();
        },

        _panelFilter_sortZA: function () {
            var obj = {},
                key = this.get('model').get('key');

            obj[key] = 'desc';
            this.sort(obj);
            this.hide();
        },

        _panelFilter_selectAll: function () {
            var cb = this.get('container'),
                list = cb.one('.filter-list');

            list.all(LI_SELECTOR).set('checked', true);
        },

        _panelFilter_clearSelection: function () {
            var cb = this.get('container'),
                list = cb.one('.filter-list');

            list.all(LI_SELECTOR).set('checked', false);
        },

        _panelFilter_toggleSelection: function () {
            var cb = this.get('container'),
                list = cb.one('.filter-list');

            list.all(LI_SELECTOR).each(function (chk) {
                console.log(chk);
                chk.set('checked', !chk.get('checked'));
            });
        },

        _panelFilter_update: function () {
            var options = [],
                cb = this.get('container'),
                list = cb.one('.filter-list');

            list.all(LI_SELECTOR).each(function (chk) {
                if (chk.get('checked')) {
                    options.push(chk.ancestor('li').getData('text'));
                }
            });
            this.get('target').filter(option);
        },

        _panelFilter_close: function () {
            this.hide();
        },

        _btnClick: function (e) {
            e.preventDefault();

            var name = e.currentTarget.get('name'),
                fn = this['_panelFilter_' + name];

            if (fn && fn.call) {
                fn(e);
            }

            this.fire(NAME + ':' + name);

        }
    }, {
        ATTRS: {
            template: {
                value: Y.DataTable.PanelFilter.Templates.main,
                setter: '_setTemplate'
            }
        }
    });

Y.DataTable.PanelFilter = View;
Y.DataTable.PanelFilter.Model = Model;
Y.DataTable.PanelFilter.Filter = Filter;


Y.Base.mix(Y.DataTable, [Y.DataTable.PanelFilter]);
