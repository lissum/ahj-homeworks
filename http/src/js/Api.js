export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "http://localhost:7070";
  }

  async request(method, params = {}, body = null) {
    try {
      const url = new URL(this.baseUrl);
      url.searchParams.append("method", method);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const options = body
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        : {};

      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error: ${response.status}`);
      }
      return response.status === 204 ? null : response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async getTickets() {
    return this.request("allTickets");
  }

  async getTicketById(id) {
    return this.request("ticketById", { id });
  }

  async createTicket(data) {
    return this.request("createTicket", {}, data);
  }

  async updateTicket(id, data) {
    return this.request("updateById", { id }, data);
  }

  async deleteTicket(id) {
    return this.request("deleteById", { id });
  }
}
