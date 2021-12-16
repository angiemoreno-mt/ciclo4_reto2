$(document).ready(function(){
    traerInformacionClientes();
    $("#update").hide();
    $("#id").hide();
})

//validacion del correo
function validar_email( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

//validar todos los espacios
function validarespacios(){
    let Zona = document.getElementById("zone").value;
    let type = document.getElementById("type").value;
    let valor = document.getElementById("email").value;
    let erro = 'null';
    
    if($('#name').val().length == 0 || $('#identification').val().length == 0 || $('#address').val().length == 0 ||  $('#cellPhone').val().length == 0 ||$('#email').val().length == 0 || $('#password').val().length == 0 || Zona === erro || type === erro){
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
        console.log("campos llenos");
        if( validar_email( valor ) ){
            console.log("La dirección de email " + valor + " es correcta.");
            guardarInformacionUsuario();
            setTimeout(refrescar, 3200);
        }
        else{
            console.log("La dirección de email es incorrecta.");
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'La dirección de email es incorrecta. ',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
}

//guardar de los usuarios
function guardarInformacionUsuario(){
    let var2 = {
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        identification:$("#identification").val(),
        address:$("#address").val(),
        cellPhone:$("#cellPhone").val(),
        zone:$("#zone").val(),
        type:$("#type").val()
        
    }
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.113.224:8080/api/user/new",
        
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
                    title: 'Se guardo correctamente'
                    
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
                    title: 'No se guardo correctamente, intentalo de nuevo.'
                    
                })
                console.log("No se guardo correctamente");
            }
    }) 
}

//traer la informacion de la base de datos de usuarios
function traerInformacionClientes(){
    $.ajax({
        url:"http://129.151.113.224:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

//muestra de la tabla completa
function pintarRespuestaClientes(respuesta){
    let myTable="<table><thead><tr><th>Nombre</th><th>Email</th><th>Contraseña</th><th>N° Identificacion</th><th>Direccion</th><th>Telefono</th><th>Zona</th><th>Tipo Usuario</th><th>Acciones</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].identification+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].cellPhone+"</td>";
        myTable+="<td>"+respuesta[i].zone+"</td>";
        myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+='<td><a id="btn-tabla" class="btn btn-danger" onclick="borrarInformacionClientes('+respuesta[i].id+')" style="margin: 5px"><i class="fas fa-trash-alt"></i></a>'+'<a id="btn-tabla" class="btn btn-success btnEditarAbrir" style="margin: 5px"><i class="fas fa-edit"></i></a></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadocliente").html(myTable);
}

//borrar informacion por id
function borrarInformacionClientes (idElemnto){
    let elemento={
        id:idElemnto
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
                    url:"http://129.151.113.224:8080/api/user/"+idElemnto,
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
$(document).on("click", ".btnEditarAbrir", function(){

    fila = $(this).closest("tr");
    var email = fila.find('td:eq(1)').text();
    var password = fila.find('td:eq(2)').text();
    InformacionCliente(email,password);

});

function InformacionCliente(correo,pass){
    $.ajax({
        url:"http://129.151.113.224:8080/api/user/"+correo+"/"+pass,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#id").val(respuesta.id),
            $("#email").val(respuesta.email),
            $("#password").val(respuesta.password),
            $("#name").val(respuesta.name),
            $("#identification").val(respuesta.identification),
            $("#address").val(respuesta.address),
            $("#cellPhone").val(respuesta.cellPhone),
            $("#zone").val(respuesta.zone),
            $("#"+respuesta.type).attr("selected",true)
            $("#save").hide()
            $("#id").show()
            $("#update").show()
        }
    })
}

//edita la informacion 
function editarInformacionCliente(){
    let var2 = {
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        identification:$("#identification").val(),
        address:$("#address").val(),
        cellPhone:$("#cellPhone").val(),
        zone:$("#zone").val(),
        type:$("#type").val()
    };

    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.113.224:8080/api/user/update",
        
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
