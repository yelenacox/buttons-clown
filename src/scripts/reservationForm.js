import { sendReservation} from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childName = document.querySelector("input[name='childName']").value
        const partyGuests = document.querySelector("input[name='partyGuests']").value
        const address = document.querySelector("input[name='address']").value
        const partyDate = document.querySelector("input[name='partyDate']").value
        const hourLength = document.querySelector("input[name='hourLength']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: parentName,
            childName: childName,
            guests: partyGuests,
            address: address,
            date: partyDate,
            length: hourLength
        }

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI)
    }
})


export const reservationForm = () => {
    let html = `
    <div class="field">
        <label class="label" for="parentName">Parent's Name</label>
        <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Child's Name</label>
        <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyGuests">Number of Children Attending</label>
        <input type="number" name="partyGuests" class="input" />
    </div>
    <div class="field">
        <label class="label" for="address">Address of the Party</label>
        <input type="text" name="address" class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyDate">Reservation Date</label>
        <input type="date" name="partyDate" class="input" />
    </div>
    <div class="field">
        <label class="label" for="hourLength">Length of Reservation in Hours</label>
        <input type="number" name="hourLength" class="input" />
    </div>

    <button class="button" id="submitRequest">Submit Request</button>
    `
    return html
}