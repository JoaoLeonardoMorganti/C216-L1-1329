$(document).ready(function () {

    $("#btn_inserir").click(function () {
        valorOrigem= $("#input_inserir_origem").val();
        valorDestino = $("#input_inserir_destino").val();
        valorPeso = $("#input_inserir_peso").val();
        valorData = $("#input_inserir_data").val();
        $.ajax({
            url: 'http://localhost:5001/encomenda/insert',
            type: 'POST',
            crossDomain: true,
            dataType: 'json',
            data: {
                origem: valorOrigem,
                destino: valorDestino,
                peso: valorPeso,
                data: valorData,
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); },
        });
    });

    $("#btn_listar").click(function () {
        $.ajax({
            url: 'http://localhost:5001/encomenda/list',
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result, status, xhr) {
                table = '<table class="table" border="1">';
                table += '<tr><th>id</th><th>Origem</th><th>Destino</th><th>Peso</th><th>Data</th></tr>'
                $.each(result, function (indice, obj) {
					table += `<tr><td>${obj.id}</td><td>${obj.origem}</td><td>${obj.destino}</td><td>${obj.peso}</td><td>${obj.data}</td></tr>`;
                });
                table += '</table>';
                $("#div_listar").html(table);
             },
            error: function () { alert("error"); }
        });
    });

    $("#btn_atualizar").click(function () {
        valorId = $("#input_atualizar_id").val();
        valorOrigem= $("#input_atualizar_origem").val();
        valorDestino = $("#input_atualizar_destino").val();
        valorPeso = $("#input_atualizar_peso").val();
        valorData = $("#input_atualizar_data").val();
        $.ajax({
            url: 'http://localhost:5001/encomenda/update',
            type: 'PUT',
            crossDomain: true,
            dataType: 'json',
            data: {
                id: valorId,
                origem: valorOrigem,
                destino: valorDestino,
                peso: valorPeso,
                data: valorData,
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); }
        });
    });

    $("#btn_excluir").click(function () {
        valorId = $("#input_excluir_id").val();
        $.ajax({
            url: 'http://localhost:5001/encomenda/exclude',
            type: 'DELETE',
            crossDomain: true,
            dataType: 'json',
            data: {
                id: valorId
            },
            success: function (result, status, xhr) { alert(status); },
            error: function () { alert("error"); }
        });
    });

    $("#btn_procurar").click(function () {
        valorId = $("#input_procurar_id").val();
        $.ajax({
            url: `http://localhost:5001/encomenda/search?id=${valorId}`,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (result, status, xhr) {
                table = '<table class="table" border="1">';
                table += '<tr><th>id</th><th>Origem</th><th>Destino</th><th>Peso</th><th>Data</th></tr>'
                $.each(result, function (indice, obj) {
					table += `<tr><td>${obj.id}</td><td>${obj.origem}</td><td>${obj.destino}</td><td>${obj.peso}</td><td>${obj.data}</td></tr>`;
                });
                table += '</table>';
                $("#div_listar_procura").html(table);
             },
            error: function () { alert("error"); }
        });
    });

});