/* esta variable me la invento para salir del bucle
en caso de que haya error en el catch
de lo contrario el catch me salta 150 veces XD */

var hayError = false;

/*envuelvo esta funcion entreparéntesis por que quiero que se ejecute 
automaticamente, es por eso que al final de la funcion pongo "()" */

(async () => {
    for(let i=1;i<=150;i++){
        if(hayError === true){
            break;
        }
        //peticion a la api usando la i para cada iteración del bucle
        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => {
            return response.json(); // Aquí se convierte la respuesta en JSON
        })
        .then(data => {
            //la peticion salio bien y obtengo los datos que se los paso a la funcion
            insertaPokemon(data);
        })
        .catch(error => {
            console.error('HUBO ALGUN ERROR EN LA PETICION A LA API:', error); 
            hayError = true;  
            document.write("<h1>HUBO ALGUN ERROR EN LA PETICION A LA API</h1>");
        }); 
    }
})();
/* Esta funcion es para pintar en la web el pokemon que le envio por parametro*/
const insertaPokemon = (data) => {

    var pokemon = {
        nombre:data.name,
        image:data.sprites['front_default'],
        tipo:data.types.map((type) => type.type.name).join(', '),
        id:data.id
    }

    //creo los elementos html
    var article = document.createElement('article');
    var img = document.createElement('img');
    var nombre = document.createElement('span');

    //añado contenido y/o valor a atributos
    img.src = pokemon.image;
    nombre.innerHTML = pokemon.nombre;
    article.id = pokemon.nombre;

    //añado clases a los elementos html
    img.className += " img-pokemons animate__animated animate__fadeIn animate__delay-1s";       
    article.className += "card animate__animated animate__fadeIn";
    nombre.className += "bold  animate__animated animate__fadeIn animate__delay-1s";
    
    //meto la imagen y el nombre en el article
    article.appendChild(img);
    article.appendChild(nombre);

    //meto el article en el container
    document.getElementsByClassName('container')[0].append(article);

    //utilizo la libreria tooltip para mostrar el tipo de pokemon
    //asigno tippys por id, segun el nombre del poquemon
    //dentro del tooltip pongo el tipo del poquemon
    tippy(`#${pokemon.nombre}`, {
        theme:'tomato',
        content: pokemon.tipo,
        animation: 'scale',
        duration:200,
        arrow: false
    });

    //Mi idea era crear un tema para cada tipo de pokemon que haya pero no me da tiempo
}
