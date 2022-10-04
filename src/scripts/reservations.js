import { getReservations, getClowns, deleteReservation, saveCompletion, getCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

const isCompleted = (reservation) => {
    const completions = getCompletions()
    let question = true
    //the function will be placed inside the requests.map, so it takes request as a parameter (no need to iterate through requests array because the map function will be doing that)
    for (const completion of completions) {
        //function iterates through completions array
        if (reservation.id === completion.reservationId) {
            //if request.id exists in competion.requestId, return false
            question = false
        }    
    } return question
    //otherwise, return true
}


export const Reservations = () => {
    const reservations = getReservations()
    const clowns = getClowns()

    let html = `
    <ul>
    ${reservations.map(reservation => isCompleted(reservation) ?
        `<li>Request by ${reservation.parentName} for ${reservation.childName} for a party of ${reservation.guests}, for ${reservation.length} hours on ${reservation.date}

        <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(
            clown => {
                return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
        }
</select>
        
        <button id="reservation--${reservation.id}">
        Deny
        </button>
        </li> `
        : "").join("")}
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

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [reservationId, clownId] = event.target.value.split("--")
            const completion = {
                reservationId: parseInt(reservationId),
                clownId: parseInt(clownId),
                date_completed: new Date().toString()
            }
            console.log(completion)
            saveCompletion(completion)

        }
    }
)

export const Completions = () => {
    const completions = getCompletions()
    let html = "<ul>"

    const completedReservations = completions.map(completion => {
        return `<li>
        Reservation #${completion.reservationId} was completed by ${filterCompletionsByClown(completion)} on ${completion.date_completed}
        </li>`
    })

    html += completedReservations?.join("")
    html += "</ul>"

    return html
}


const filterCompletionsByClown = (completion) => {
    const clowns = getClowns()
    let selectedClown = ""
    for (const clown of clowns) {
        if (completion.clownId === clown.id) {
            selectedClown = clown.name

        }
    }
    return selectedClown
}
