class ApiComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            font-family: Arial, sans-serif;
            text-align: center;
          }
          img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 10px;
          }
          .loading {
            color: gray;
          }
          .error {
            color: red;
          }
        </style>
        <div id="output" class="loading">Loading...</div>
      `;
  
      this.fetchData();
    }
  
    async fetchData() {
      try {
        const response = await fetch(this.getAttribute('api-url'));
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.renderData(data);
      } catch (error) {
        this.shadowRoot.querySelector('#output').innerHTML = `
          <div class="error">Failed to fetch data: ${error.message}</div>
        `;
      }
    }
  
    renderData(data) {
      const output = this.shadowRoot.querySelector('#output');
      output.classList.remove('loading');
      const imageUrl = data[0]?.url || 'https://via.placeholder.com/150';
      output.innerHTML = `
        <img src="${imageUrl}" alt="Random Cat" />
      `;
    }
  }
  
  customElements.define('api-component', ApiComponent);
  