(function ($) {
    $(document).ready(function () {
        // imported settings
        var settings;

        var backup_data = {
            data_sizing: 0,
            data_growth: 0,
            transaction: 0,
            innovation: 0,
            investment: 0
        }

        var data = {
            availability: 2,
            consistency: 2,
            ptolerance: 1,
            data_sizing: 2,
            data_growth: 2,
            query_prediction: 1,
            innovation: 0,
            investment: 2,
            general: 1,
            requirements: 1,
            data: 1,
            data_type: 1,
            data_properties: 1,
            data_processing: 1,
            query_types: 1,
            transaction: 2
        }

        var data_structures = {
            relat: 100,
            graph: 0,
            hier: 0,
            doc: 0,
            kv: 0,
            bin: 0
        }

        var data_categories = {
            trans: 100,
            b_hot: 0,
            b_cold: 0,
            bulk: 0,
            time: 0
        }

        var query_types = {
            id: 100,
            example: 0,
            relation: 0,
            fulltext: 0
        }


        $(".tooltip").tooltip({
            showBody: " - ",
            fade: 250,
            tooltipClass: "custom-tooltip-styling",
            position: { my: "left center", at: "center", collision: "flipfit" }
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

        $('input:checkbox').change(function(){
            var name = this.id.replace(/checkbox-/, '')

            // TODO, you have to ckeck wheather its a labled or normal slider

            if(this.checked) {
                $('#slider-' + name).labeledslider('disable')
                backup_data[name] = data[name]
                data[name] = -1
            }
            else {
                $('#slider-' + name).labeledslider('enable')
                data[name] = backup_data[name]
            }

            var inv = $('#slider-investment').labeledslider('option').disabled
            var inno = $('#slider-innovation').labeledslider('option').disabled
            if(inv && inno)
                $('#slider-general').labeledslider('disable')
            else
                $('#slider-general').labeledslider('enable')

            var transaction = $('#slider-transaction').labeledslider('option').disabled
            if (transaction)
                $('#slider-data_processing').labeledslider('disable')
            else
                $('#slider-data_processing').labeledslider('enable')


            var size = $('#slider-data_sizing').labeledslider('option').disabled
            var growth = $('#slider-data_growth').labeledslider('option').disabled
            if(size && growth)
                $('#slider-data').labeledslider('disable')
            else
                $('#slider-data').labeledslider('enable')            

        });


        var update = function () {
            var p_relat = { value: Math.round(data_structures.relat*100/total(data_structures)) }
            var p_graph = { value: Math.round(data_structures.graph*100/total(data_structures)) }
            var p_hier = { value: Math.round(data_structures.hier*100/total(data_structures)) }
            var p_doc = { value: Math.round(data_structures.doc*100/total(data_structures)) }
            var p_kv = { value: Math.round(data_structures.kv*100/total(data_structures)) }
            var p_bin = { value: Math.round(data_structures.bin*100/total(data_structures)) }

            var p_total1 = p_relat.value + p_graph.value + p_hier.value + p_doc.value + p_kv.value + p_bin.value;

            var maximum1 = _.max([p_relat, p_graph, p_hier, p_doc, p_kv, p_bin], function (item) { return item.value })

            maximum1.value += 100 - p_total1

            $("#relational-value").html(p_relat.value);
            $("#graph-value").html(p_graph.value);
            $("#hierarchical-value").html(p_hier.value);
            $("#document-value").html(p_doc.value);
            $("#kv-value").html(p_kv.value);
            $("#binary-value").html(p_bin.value);

            var p_trans = { value: Math.round(data_categories.trans*100/total(data_categories)) }
            var p_bulk = { value: Math.round(data_categories.bulk*100/total(data_categories)) }
            var p_time = { value: Math.round(data_categories.time*100/total(data_categories)) }
            var p_hot = { value: Math.round(data_categories.b_hot*100/total(data_categories)) }
            var p_cold = { value: Math.round(data_categories.b_cold*100/total(data_categories)) }

            var p_total2 = p_trans.value + p_bulk.value + p_time.value + p_hot.value + p_cold.value;

            var maximum2 = _.max([p_trans, p_bulk, p_time, p_cold, p_hot], function (item) { return item.value })
            
            maximum2.value += 100 - p_total2

            $("#transient-value").html(p_trans.value);
            $("#bulk-value").html(p_bulk.value);
            $("#time-value").html(p_time.value);
            $("#hot-value").html(p_hot.value);
            $("#cold-value").html(p_cold.value);

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

        // category: data structure types
        normalSlider('#slider-relational', data_structures, 'relat')
        normalSlider('#slider-hierarchical', data_structures, 'hier')
        normalSlider('#slider-graph', data_structures, 'graph')
        normalSlider('#slider-kv', data_structures, 'kv')
        normalSlider('#slider-document', data_structures, 'doc')
        normalSlider('#slider-binary', data_structures, 'bin')

        // category: data properties
        normalSlider('#slider-transient', data_categories, 'trans')
        normalSlider('#slider-cold', data_categories, 'b_cold')
        normalSlider('#slider-hot', data_categories, 'b_hot')
        normalSlider('#slider-bulk', data_categories, 'bulk')
        normalSlider('#slider-time', data_categories, 'time')

        // category: query types
        normalSlider('#slider-query_type_id', query_types, 'id')
        normalSlider('#slider-query_type_example', query_types, 'example')
        normalSlider('#slider-query_type_relationship', query_types, 'relation')
        normalSlider('#slider-query_type_fulltext', query_types, 'fulltext')

        var labeledSlider = function (id, field, labels, tooltips) {
            $(id).labeledslider({
                min:  0,
                max:  labels.length - 1,
                step: 1,
                tickInterval: 1,
                tickLabels: labels,
                tickTooltips: tooltips,
                slide:  function(event, ui) {
                    if (data[field] !== ui.value) {
                        data[field] = ui.value
                    }
                }
            })
            $(id).labeledslider('value',data[field])
        }

        // labels
        var changes = ['none', 'marg', 'lin', 'poly', 'exp']
        var categories = ['not necessary', 'optional', 'important']
        var categories2 = ['low', 'medium', 'high']
        var categories3 = ['none', 'low', 'medium', 'high', 'no limit']

        // tooltips
        var tooltip1 = ['none', 'marginal', 'linear', 'polynomial', 'exponential']

        // category: requirements
        labeledSlider('#slider-availability', 'availability', categories)
        labeledSlider('#slider-consistency', 'consistency', categories)
        labeledSlider('#slider-ptolerance', 'ptolerance', categories)

        // category: data
        labeledSlider('#slider-data_sizing', 'data_sizing', ['&le;100 MB', '&le;1 GB', '&le;10 GB', '&le;100 GB', '&le;1 TB', '>1 TB'])
        labeledSlider('#slider-data_growth', 'data_growth', changes, tooltip1)

        // category: data processing
        labeledSlider('#slider-transaction', 'transaction', ['0%', '25%', '50%', '75%', '100%'])

        // category: general
        labeledSlider('#slider-innovation', 'innovation', categories2)
        labeledSlider('#slider-investment', 'investment', categories3)

        // categories
        labeledSlider('#slider-general', 'general', categories2)
        labeledSlider('#slider-requirements', 'requirements', categories2)
        labeledSlider('#slider-data', 'data', categories2)
        labeledSlider('#slider-data_type', 'data_type', categories2)
        labeledSlider('#slider-data_properties', 'data_properties', categories2)
        labeledSlider('#slider-data_processing', 'data_processing', categories2)
        labeledSlider('#slider-query_types', 'query_types', categories2)

        $('select.transaction').change(function () {
            if ($('select.transaction').val() == 'yes')
                data.transaction = 1
            else
                data.transaction = 0   
        });

        update()
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