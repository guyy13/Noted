import Swal from "sweetalert2";

const buttonColor = "#f5ba13";

const errorAlert = (alertTitle, alertText) => {
  Swal.fire({
    title: alertTitle,
    text: alertText,
    icon: "error",
    confirmButtonColor: buttonColor,
  });
};

const reloadPageAlert = (alertTitle, alertText, pageUrl) => {
  Swal.fire({
    title: alertTitle,
    text: alertText,
    icon: "error",
    confirmButtonColor: buttonColor,
    confirmButtonText: `<a style="text-decoration: none" href="${pageUrl}">Reload Page</a>`,
  });
};

export { errorAlert, reloadPageAlert };
