function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (let state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (let city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
            }

            citySelect.disabled = false
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    // Adicionar ou remover uma classe com JacaScript
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log(itemId);
    
    // Verificar se existem itens selecionados
    // pegar todos esses itens selecionados
    
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    // Se já estiver selecionado
    if (alreadySelected >= 0) { // Ele compara com os índices do array que foi declarado anteriormente
        //tirar da seleção
        const filteredItens = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItens
    } else {
        // Se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // console.log(selectedItems);

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}