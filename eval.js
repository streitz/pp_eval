(function ($) {
    $(document).ready(function () {
        var settings;

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


        $(".tooltip").tooltip({
            showBody: " - ",
            fade: 250,
            position: { my: "left top", at: "left bottom-30", collision: "flipfit" }
        })


        $.get("data/settings.csv", function(data){
            settings = processData(data);
        })

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


        $('#settings_load').change(function (evt) {
            var files = evt.target.files;

            for (var i = 0, f; (f = files[i]); i++) {
                /* global FileReader: true */
                var reader = new FileReader()
                reader.onload = (function () {
                    return function (e) {
                        var content = e.target.result
                        settings = processData(content);
                    }
                })(f)

                reader.readAsText(f)
                $('#settings_load').val('')
            }
        })


        var update = function () {
            var p_relat = { value: Math.round(data_structures.relat*100/total(data_structures)) }
            var p_graph = { value: Math.round(data_structures.graph*100/total(data_structures)) }
            var p_hier = { value: Math.round(data_structures.hier*100/total(data_structures)) }
            var p_doc = { value: Math.round(data_structures.doc*100/total(data_structures)) }
            var p_kv = { value: Math.round(data_structures.kv*100/total(data_structures)) }

            var p_total1 = p_relat.value + p_graph.value + p_hier.value + p_doc.value + p_kv.value;

            var maximum1 = _.max([p_relat, p_graph, p_hier, p_doc, p_kv], function (item) { return item.value })

            maximum1.value += 100 - p_total1

            $("#relational-value").html(p_relat.value);
            $("#graph-value").html(p_graph.value);
            $("#hierarchical-value").html(p_hier.value);
            $("#document-value").html(p_doc.value);
            $("#kv-value").html(p_kv.value);

            var p_trans = { value: Math.round(data_categories.trans*100/total(data_categories)) }
            var p_mass = { value: Math.round(data_categories.mass*100/total(data_categories)) }
            var p_bulk = { value: Math.round(data_categories.bulk*100/total(data_categories)) }
            var p_time = { value: Math.round(data_categories.time*100/total(data_categories)) }

            var p_total2 = p_trans.value + p_mass.value + p_bulk.value + p_time.value;

            var maximum2 = _.max([p_trans, p_mass, p_bulk, p_time], function (item) { return item.value })
            
            maximum2.value += 100 - p_total2

            $("#transient-value").html(p_trans.value);
            $("#mass-value").html(p_mass.value);
            $("#bulk-value").html(p_bulk.value);
            $("#time-value").html(p_time.value);

            var p_id = { value: Math.round(query_types.id*100/total(query_types)) }
            var p_example = { value: Math.round(query_types.example*100/total(query_types)) }
            var p_relation = { value: Math.round(query_types.relation*100/total(query_types)) }
            var p_fulltext = { value: Math.round(query_types.fulltext*100/total(query_types)) }

            var p_total3 = p_id.value + p_example.value + p_relation.value + p_fulltext.value;

            var maximum3 = _.max([p_id, p_example, p_relation, p_fulltext], function (item) { return item.value })
            
            maximum3.value += 100 - p_total3

            $("#query_type_id-value").html(p_id.value);
            $("#query_type_example-value").html(p_example.value);
            $("#query_type_relationship-value").html(p_relation.value);
            $("#query_type_fulltext-value").html(p_fulltext.value);
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
        labeledSlider('#slider-data_sizing', 'size', ['< 100 MB', '< 1 GB', '< 100 GB', '< 1 TB', 'TBs', 'PBs'])
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


    $(document).on('click', '#import', function() {
        $('#settings_load').trigger('click');
    });


})(jQuery);