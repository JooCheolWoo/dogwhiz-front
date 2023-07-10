import Swal from "sweetalert2";
import { ErrorMessage } from 'formik';

const icons = ["success", "error", "warning", "info", "question"];

export function ErrorMsg({ title, text }) {

  return Swal.fire({
    icon: `error`,
    title: `${title}`,
    text: `${text}`,
    footer: `<a href="#">관리자에게 문의하기</a>`
  });
}

export function WarningMsg({ title, text }) {

  return Swal.fire({
    icon: `warning`,
    title: `${title}`,
    text: `${text}`,
    footer: `<a href="#">관리자에게 문의하기</a>`
  });
}

export function SuccessMsg({ title, text }) {

  return Swal.fire({
    icon: `success`,
    title: `${title}`,
    text: `${text}`,
  });
}

export function ConfirmOrCancelMsg ({ icon, title, text }) {
  return Swal.fire({
  icon: `${icon}`,
    title: `${title}`,
    text: `${text}`,
    showConfirmButton: true,
    showCancelButton: true,
  });  
}
