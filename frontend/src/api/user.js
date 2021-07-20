export const getProfileAsync = () =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/account/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    resolve(request);
  });

export const addLocationAsync = (location) => {
  return new Promise((resolve, reject) => {
    const request = fetch("/api/account/me/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location,
      }),
    }).then((response) => response.json());
    resolve(request);
  });
};

export const removeLocationAsync = (location) => {
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/account/me/location?location=${location}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};

export const addInterestProductAsync = (productId) => {
  return new Promise((resolve, _) => {
    const request = fetch(`/api/account/me/interest?productId=${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resposne) => resposne.json());
    resolve(request);
  });
};

export const removeInterestProductAsync = (productId) => {
  return new Promise((resolve, _) => {
    const request = fetch(`/api/account/me/interest?productId=${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resposne) => resposne.json());
    resolve(request);
  });
};
