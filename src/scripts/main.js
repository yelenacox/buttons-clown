import { fetchReservations, fetchClowns, fetchCompletions } from "./dataAccess.js"
import { buttonsClown } from "./buttonsClown.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
    .then(() => fetchClowns())
    .then(() =>fetchCompletions())
     .then(
        () => {
            mainContainer.innerHTML = buttonsClown()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)