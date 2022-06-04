import * as qs from 'query-string';

export const DOMAIN = 'http://localhost:3001';

class Api {
  constructor(domain) {
    this.domain = domain;
  }

  async perform(url, data = '', config = {}) {
    const response = await fetch(`${this.domain}/${url}`, {
      ...config,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    });

    return await response.json();
  }

  async get(url, searchParams = {}) {
    const res = await fetch(`${this.domain}/${url}?${qs.stringify(searchParams)}`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    return await res.json();
  }

  async post(url, payload) {
    return await this.perform(url, payload, {
      method: 'POST',
    });
  }

  async put(url, payload) {
    return await this.perform(url, payload, {
      method: 'PUT',
    });
  }

  async delete(url) {
    return this.perform(url, '', {
      method: 'DELETE',
    });
  }
}

export default new Api(DOMAIN);
