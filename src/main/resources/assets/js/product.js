$(document).ready(function(){
    traerInformacionProducto();
    $("#update").hide();
    $("#id").hide();
})

//validar todos los espacios
function validarespacios(){
    let availability = document.getElementById("availability").value;
    let erro = 'null';
    
    if($('#reference').val().length == 0 || $('#category').val().length == 0 || $('#size').val().length == 0 ||  $('#description').val().length == 0 ||$('#price').val().length == 0 || $('#quantity').val().length == 0 || availability === erro){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos deben ser rellenados.',
            showConfirmButton: false,
            timer: 3000
        })
        console.log("Todos los campos deben ser rellenados");
    }

    else{
        guardarInformacionProducto();
        setTimeout(refrescar, 3200);
    }
}

//guardar de los usuarios
function guardarInformacionProducto(){
    let var2 = {
        reference:$("#reference").val(),
        category:$("#category").val(),
        size:$("#size").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
        
    }
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.113.224:8080/api/clothe/new",
        
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'success',
                    title: 'Se guardo correctamente el producto'
                    
                })
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                
                Toast.fire({
                    icon: 'error',
                    title: 'No se guardo correctamente el producto, intentalo de nuevo.'
                    
                })
                console.log("No se guardo correctamente");
            }
    }) 
}

//traer la informacion de la base de datos de usuarios
function traerInformacionProducto(){
    $.ajax({
        url:"http://129.151.113.224:8080/api/clothe/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaProductos(respuesta);
        }
    });
}

//muestra de la tabla completa
function pintarRespuestaProductos(respuesta){
    let myTable="<table><thead><tr><th>Referencia</th><th>Categoria</th><th>Talla</th><th>Descripción</th><th>Disponibilidad</th><th>Precio</th><th>Cantidad</th><th>Imagen</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].size+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].photography+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger btnEliminarAbrir" style="margin: 5px"><i class="fas fa-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success btnEditarAbrir" style="margin: 5px"><i class="fas fa-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadocliente").html(myTable);
}

//borrar informacion por referencias
function borrarInformacionProductos (refer){
    let elemento={
        id:refer
    };
    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            
                $.ajax({
                    type:'DELETE',
                    contentType: "application/json; charset=utf-8",
                    dataType: 'JSON',
                    data:JSON.stringify(elemento),
                    url:"http://129.151.113.224:8080/api/clothe/"+refer,
                    success:function(response){
                        console.log(response);
                        console.log("Se borro correctamente");
                        window.location.reload();
                    },
            
                    error: function(jqXHR, textStatus, errorThrown) {
                        setTimeout(refrescar, 3000);
                        console.log("No se borro correctamente");
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        Toast.fire({
                            icon: 'error',
                            title: 'No se borro correctamente, intentalo de nuevo.'
                            
                        })
                    }
                })
        }
    })
}

function refrescar(){
    location.reload();
}

/////Recoger datos para el modal
$(document).on("click", ".btnEliminarAbrir", function(){
    fila = $(this).closest("tr");
    var referencia = fila.find('td:eq(0)').text();
    borrarInformacionProductos(referencia);

});

/////Recoger datos para el modal
$(document).on("click", ".btnEditarAbrir", function(){
    fila = $(this).closest("tr");
    var referencia = fila.find('td:eq(0)').text();
    InformacionProducto(referencia);

});

function InformacionProducto(refe){

    $.ajax({
        url:"http://129.151.113.224:8080/api/clothe/"+refe,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#reference").val(respuesta.reference),
            $("#category").val(respuesta.category),
            $("#size").val(respuesta.size),
            $("#description").val(respuesta.description),
            $("#price").val(respuesta.price),
            $("#quantity").val(respuesta.quantity),
            $("#photography").val(respuesta.photography),
            $("#"+respuesta.availability).attr("selected",true)
            $("#save").hide()
            $("#id").show()
            $("#update").show()
        }
    })
}

//edita la informacion 
function editarInformacionCliente(){
    let var2 = {
        reference:$("#reference").val(),
        category:$("#category").val(),
        size:$("#size").val(),
        description:$("#description").val(),
        availability:$("#availability").val(),
        price:$("#price").val(),
        quantity:$("#quantity").val(),
        photography:$("#photography").val()
    };

    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.113.224:8080/api/clothe/update",
        
        success:function(response) {
            console.log(response);
            console.log("Se actualizo correctamente");
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
                
            Toast.fire({
                icon: 'success',
                title: 'Se actualizo correctamente'
                    
            })
        },
    
        error: function(jqXHR, textStatus, errorThrown) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'error',
                title: 'No se actualizo correctamente, intentalo de nuevo.'
                    
            })
            console.log("No se actualizo correctamente");
        }
    })   
    setTimeout(refrescar, 3000);
}
