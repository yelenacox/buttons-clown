import { fetchReservations, fetchClowns } from "./dataAccess.js"
import { buttonsClown } from "./buttonsClown.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
    .then(() => fetchClowns())
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