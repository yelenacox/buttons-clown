import { reservationForm } from "./reservationForm.js"
import { Reservations } from "./reservations.js"

export const buttonsClown = () => {
    return `
        <h1>Buttons and Lollipop the Clowns</h1>
        <section class="reservationForm">
            ${reservationForm()}
        </section>

        <section class="reservationRequests">
            <h2>Reservation Requests</h2>
            ${Reservations()}
        </section>
        `
}