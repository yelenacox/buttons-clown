const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (bookingReservations) => {
                applicationState.reservations = bookingReservations
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (fetchedClowns) => {
                applicationState.clowns = fetchedClowns
            }
        )
}


export const sendReservation = (bookingReservations) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingReservations)
    }

    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const getReservations = () => {
    return applicationState.reservations.map(reservation => ({ ...reservation }))
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({ ...clown }))
}

export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent
                    ("stateChanged"))
            }
        )
}
