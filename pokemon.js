const searchInput = document.querySelector("#poke-input")
const searchBtn = document.querySelector (".btn-search")
const pokeContainer = document.querySelector (".poke-container")

const pokeCount = 151; //! bu kadar pokemon üzerinde döneceğimiz için

const initPokemon = async () => {
    for(let i=1; i<=pokeCount; i++){
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    let url  = `https://pokeapi.co/api/v2/pokemon/${id}`
    let res = await fetch(url)
    let data = await res.json(); //! json halinden javascript objesi haline getirdik
    // console.log(data);  //! datanın neye benzediğini görmek için burada yazdırmak gerekir bir defa
    createPokemonBox(data)

}
const createPokemonBox = (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart (3,'0')  //!Örneğin, pokemon.id değeri 25 ise, padStart(3, '0') ifadesi dizesel değeri '025' olarak dönüştürecektir.  Burada 3 ilk parametre, oluşturulacak dizenin hedef uzunluğunu belirtir. Eğer id değeri 100'den küçükse, başına '0' karakterleri eklenerek 3 karakterli bir dize oluşturulur.
    //! padStart() yöntemi kullanılıyor. Bu yöntem, bir dizenin başına belirli bir karakteri ekleyerek dizenin belirli bir uzunluğa ulaşmasını sağlar. İkinci parametre olan '0', eklenecek karakteri belirtir.
    const weight = pokemon.weight;
    const type = pokemon.types[0].type.name


    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('poke-box')
    // pokemonEl.style.backgroundColor =`${color}`

    pokemonEl.innerHTML += `
    <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} Pokemon"
  />
    <h4 class="poke-name">${name}</h4>
    <p class="poke-id"> ${id}</p>
    <p class="poke-weight">${weight}</p>
    <p class="poke-type">Type :${type} grass</p>`

    pokeContainer.appendChild(pokemonEl)
}

initPokemon()

// console.log(searchInput);
searchInput.addEventListener('input',(e)=> {
    const pokeNames =document.querySelectorAll('.poke-name');
  //  console.log(pokeNames);
    const search = searchInput.value.toLowerCase();
    pokeNames.forEach(pokeName => {
      pokeName.parentElement.style.display = 'block';
      if (!pokeName.innerHTML.toLowerCase().includes(search)) {
        pokeName.parentNode.style.display = 'none';
      }
    });
  
}) 