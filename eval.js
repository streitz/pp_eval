(function ($) {
    $(document).ready(function () {
        $(".tooltip").tooltip({
            showBody: " - ",
	    fade: 250
        })

        var features_pattern;
        var features_db;

        $.get("data/pattern.csv", function(data){
            features_pattern = processData(data);
        })

        // $.get("data/db.csv", function(data){
        //     features_db = processData(data);
        // })

        var data = {
            availability: 0,
            consistency: 0,
            ptolerance: 0,
            size: 0,
            growth: 0,
            frequency: 0,
            f_change: 0,
            innovation: 0,
            investment: 0,
            general: 0,
            requirements: 0,
            data: 0,
            data_structures: 0,
            data_properties: 0,
            query: 0,
            query_types: 0
        }

        var data_structures = {
            relat: 0,
            graph: 0,
            hier: 0,
            doc: 0,
            kv: 0
        }

        var data_categories = {
            trans: 0,
            mass: 0,
            bulk: 0,
            time: 0
        }

        var query_types = {
            id: 0,
            example: 0,
            relation: 0,
            fulltext: 0
        }

        var total = function (model) {
            var sum = 0;
            for(key in model) {
                sum += model[key];
            }
            if (sum == 0) {
                sum = 2;
            };
            return sum;
        }

        var features_db;
        var features_pattern;


        var update = function () {
            $("#relational-value").html(Math.floor(data_structures.relat*100/total(data_structures)));
            $("#graph-value").html(Math.floor(data_structures.graph*100/total(data_structures)));
            $("#hierarchical-value").html(Math.floor(data_structures.hier*100/total(data_structures)));
            $("#document-value").html(Math.floor(data_structures.doc*100/total(data_structures)));
            $("#kv-value").html(Math.floor(data_structures.kv*100/total(data_structures)));

            $("#transient-value").html(Math.floor(data_categories.trans*100/total(data_categories)));
            $("#mass-value").html(Math.floor(data_categories.mass*100/total(data_categories)));
            $("#bulk-value").html(Math.floor(data_categories.bulk*100/total(data_categories)));
            $("#time-value").html(Math.floor(data_categories.time*100/total(data_categories)));

            $("#query_type_id-value").html(Math.floor(query_types.id*100/total(query_types)));
            $("#query_type_example-value").html(Math.floor(query_types.example*100/total(query_types)));
            $("#query_type_relationship-value").html(Math.floor(query_types.relation*100/total(query_types)));
            $("#query_type_fulltext-value").html(Math.floor(query_types.fulltext*100/total(query_types)));
        }

        var normalSlider = function (id, model, field) {
            $(id).slider({
                min:  0,
                step: 5,
                max:  100,
                value: model[field],
                slide:  function(event, ui) {
                    if (model[field] !== ui.value) {
                        model[field] = ui.value
                        update()
                    }
                }
            }) 
        }

        normalSlider('#slider-relational', data_structures, 'relat')
        normalSlider('#slider-hierarchical', data_structures, 'hier')
        normalSlider('#slider-graph', data_structures, 'graph')
        normalSlider('#slider-kv', data_structures, 'kv')
        normalSlider('#slider-document', data_structures, 'doc')

        normalSlider('#slider-transient', data_categories, 'trans')
        normalSlider('#slider-mass', data_categories, 'mass')
        normalSlider('#slider-bulk', data_categories, 'bulk')
        normalSlider('#slider-time', data_categories, 'time')

        normalSlider('#slider-query_type_id', query_types, 'id')
        normalSlider('#slider-query_type_example', query_types, 'example')
        normalSlider('#slider-query_type_relationship', query_types, 'relation')
        normalSlider('#slider-query_type_fulltext', query_types, 'fulltext')

        var labeledSlider = function (id, field, labels) {
            $(id).labeledslider({
                min:  0,
                max:  labels.length - 1,
                step: 1,
                tickInterval: 1,
                tickLabels: labels,
                slide:  function(event, ui) {
                    if (data[field] !== ui.value) {
                        data[field] = ui.value
                        update()
                    }
                } 
            })
        }

        var changes = ['none', 'marg', 'lin', 'poly', 'exp']
        var categories = ['not nec', 'not imp', 'no matter', 'imp', 'very imp']
        var categories2 = ['low', 'medium', 'high']

        labeledSlider('#slider-availability', 'availability', categories)
        labeledSlider('#slider-consistency', 'consistency', categories)
        labeledSlider('#slider-ptolerance', 'ptolerance', categories)
        labeledSlider('#slider-data_sizing', 'size', ['< 100 MB', '< 1 GB', '< 100 GB', '< 1 TB', 'TB', 'PB'])
        labeledSlider('#slider-data_growth', 'growth', changes)
        labeledSlider('#slider-query_freq', 'frequency', ['<= 1', '10', '100', '1000', '10000', '>=100000'])
        labeledSlider('#slider-query_prediction', 'f_change', changes)
        labeledSlider('#slider-innovation', 'innovation', categories2)
        labeledSlider('#slider-investment', 'investment', categories2)

        labeledSlider('#slider-general', 'general', categories2)
        labeledSlider('#slider-requirements', 'requirements', categories2)
        labeledSlider('#slider-data', 'data', categories2)
        labeledSlider('#slider-data_type', 'data_type', categories2)
        labeledSlider('#slider-data_properties', 'data_properties', categories2)
        labeledSlider('#slider-query', 'query', categories2)
        labeledSlider('#slider-query_types', 'query_types', categories2)


        update();
    });

    function processData(content) {
        var contentLines = content.split(/\r\n|\n/);
        var lines = [];

        for (var i=0; i<contentLines.length; i++) {
            var data = contentLines[i].split(';');
            lines.push(data);
        }

        return lines;
    }
})(jQuery);