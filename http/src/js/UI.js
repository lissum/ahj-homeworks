import { Api } from "./api.js";
import { renderTickets, showModal, hideModal } from "./components.js";

export default class UI {
  constructor() {
    this.api = new Api();
    this.ticketsList = document.querySelector(".tickets-list");
    this.addTicketBtn = document.querySelector(".add-ticket-btn");
    this.modalClose = document.querySelector(".modal-close");
    this.ticketForm = document.querySelector(".ticket-form");

    this.init();
  }

  init() {
    this.loadTickets();
    this.addTicketBtn.addEventListener("click", () => showModal("add"));
    this.modalClose.addEventListener("click", hideModal);
    this.ticketForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    this.ticketsList.addEventListener("click", (e) =>
      this.handleTicketActions(e),
    );
  }

  async loadTickets() {
    try {
      const tickets = await this.api.getTickets();
      renderTickets(tickets, this.ticketsList);
    } catch (error) {
      alert("Ошибка загрузки тикетов");
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.id;

    const name = document.querySelector(".ticket-name").value;
    const description = document.querySelector(".ticket-description").value;

    try {
      if (id) {
        await this.api.updateTicket(id, { name, description });
      } else {
        await this.api.createTicket({ name, description });
      }
      hideModal();
      this.loadTickets();
    } catch (error) {
      alert("Ошибка сохранения тикета");
    }
  }

  async handleTicketActions(e) {
    const ticketItem = e.target.closest(".ticket-item");

    if (!ticketItem) return;

    const id = ticketItem.dataset.id;

    try {
      if (e.target.classList.contains("delete-btn")) {
        if (!confirm("Вы действительно хотите удалить тикет?")) {
          return;
        }

        await this.api.deleteTicket(id);
        this.loadTickets();
      } else if (e.target.classList.contains("edit-btn")) {
        const ticket = await this.api.getTicketById(id);

        showModal("edit", ticket);
      } else if (e.target.classList.contains("toggle-btn")) {
        const ticket = await this.api.getTicketById(id);
        await this.api.updateTicket(id, { ...ticket, status: !ticket.status });

        this.loadTickets();
      } else {
        const ticket = await this.api.getTicketById(id);
        ticketItem.querySelector(".ticket-item__details").innerHTML =
          ticket.description; // Доверяем серверу и не экранируем
      }
    } catch (error) {
      alert("Ошибка выполнения действия");
    }
  }
}
