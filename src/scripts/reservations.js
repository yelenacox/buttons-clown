import { getReservations, getClowns, deleteReservation } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")


export const Reservations = () => {
    const reservations = getReservations()
    const clowns = getClowns()

    let html = `
    <ul>
    ${reservations.map(reservation =>
        `<li>Request by ${reservation.parentName} for ${reservation.childName} for a party of ${reservation.guests}, for ${reservation.length} hours on ${reservation.date}

        <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
</select>
        
        <button id="reservation--${reservation.id}">
        Deny
        </button>
        </li> `).join("")}
        </ul>
        `

    return html
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [, reservationId] = click.target.id.split("--")
        deleteReservation(parseInt(reservationId))
    }
})

