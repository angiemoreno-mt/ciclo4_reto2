function validarespacios(){
    if($('#email').val().length == 0 || $('#password').val().length == 0){
        console.log("Todos los deben ser rellenados");
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Hay campos vacíos.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    else{
        console.log("Todos los campos han sido completos");
        validardatos();
        
    }
}

function validardatos(){
    let TextUsuario = document.getElementById("email").value;
    let TextPassword = document.getElementById("password").value;
    console.log(TextUsuario);
    console.log(TextPassword);
        
            $.ajax({
                url:"http://129.151.113.224:8080/api/user/emailexist/"+TextUsuario,
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    console.log(respuesta);
                    if(respuesta === true){
                        $.ajax({
                            url:"http://l129.151.113.224:8080/api/user/"+TextUsuario+"/"+TextPassword,
                            type:"GET",
                            datatype:"JSON",
                            success:function(respuesta){
                                if(respuesta.email == TextUsuario || respuesta.password == TextPassword){
                                    if(respuesta.type === "ADMIN"){
                                        console.log(respuesta.id);
                                        console.log(respuesta.name);
                                        console.log(respuesta.password);
                                        console.log(respuesta.email);
                                        alert("Bienvenido admin"+respuesta.name);
                                        redireccionaradmin();
                                    }
                                    else {
                                        console.log(respuesta.id);
                                        console.log(respuesta.name);
                                        console.log(respuesta.password);
                                        console.log(respuesta.email);
                                        alert("Bienvenido usuario "+respuesta.name);
                                        redireccionarusers();
                                    }
                                }
                                else{
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Usuario y/o Contraseña no coninciden porfavor intentalo nuevamente.',
                                        showConfirmButton: false,
                                        timer: 3000
                                    })
                                    console.log("Contraseña o usuario incorrecto");
                                }
                            }
                        })
                    }
                    else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Usuario no existe porfavor intentalo nuevamente.',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        console.log("email no existe");
                    }
                }
            })
}

function redireccionaradmin(){
    window.location="/assets/html/inicioAdmin.html";
} 

function redireccionarusers(){
    window.location="/assets/html/iniciouser.html";
} 

//refrescar la pagina
function refrescar(){
    location.reload();
}